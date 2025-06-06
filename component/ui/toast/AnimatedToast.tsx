import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, AccessibilityInfo } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS,
    withSequence,
    withDelay,
    cancelAnimation,
    interpolateColor,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {
   type ToastItem,
    getPositionStyle,
    getVariantStyles,
    getSizeStyles,
    getAnimationConfig,
    getSpringConfig,
    getTypeColors,
} from './toastUtils';

interface AnimatedToastProps {
    toast: ToastItem;
    onClose: (id: string) => void;
    index: number;
    totalCount: number;
}

const AnimatedToast: React.FC<AnimatedToastProps> = ({ toast, onClose, index, totalCount }) => {
    // Extract toast options
    const {
        id,
        message,
        title,
        type = 'default',
        position = 'top',
        duration = 3000,
        variant = 'default',
        size = 'md',
        animation = 'slide',
        animationIn = animation,
        animationOut = 'fade',
        icon = true,
        showProgress = true,
        swipeToClose = true,
        hideCloseButton = false,
        style,
        textStyle,
        titleStyle,
        accessibilityAnnouncement,
        testID,
    } = toast;

    // Animation values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);
    const progress = useSharedValue(0);
    const isPressing = useSharedValue(0);
    const isVisible = useSharedValue(1);

    // Refs
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Get styles based on options
    const positionStyle = getPositionStyle(position);
    const variantStyles = getVariantStyles(variant, type || 'default');
    const sizeStyles = getSizeStyles(size);
    const colors = getTypeColors(type || 'default');

    // Animation configurations
    const inAnimation = getAnimationConfig(animationIn, position);
    const outAnimation = getAnimationConfig(animationOut, position);
    const springConfig = getSpringConfig(animationIn);

    // Calculate offset for stacked toasts
    const getStackOffset = () => {
        if (totalCount <= 1) return 0;
        const offset = index * 10;
        return position.includes('top') ? offset : -offset;
    };

    // Handle close
    const handleClose = () => {
        // Cancel any running animations
        cancelAnimation(opacity);
        cancelAnimation(scale);
        cancelAnimation(translateY);
        cancelAnimation(translateX);
        cancelAnimation(rotateX);
        cancelAnimation(rotateY);
        cancelAnimation(progress);

        // Clear timeouts
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Animate out
        isVisible.value = 0;

        // Apply exit animation
        if (outAnimation.exit.opacity !== undefined) {
            opacity.value = withTiming(outAnimation.exit.opacity, { duration: 300 });
        }

        if (outAnimation.exit.scale !== undefined) {
            scale.value = withTiming(outAnimation.exit.scale, { duration: 300 });
        }

        if (outAnimation.exit.translateY !== undefined) {
            translateY.value = withTiming(outAnimation.exit.translateY, { duration: 300 });
        }

        if (outAnimation.exit.translateX !== undefined) {
            translateX.value = withTiming(outAnimation.exit.translateX, { duration: 300 });
        }

        // Delay actual removal to allow animation to complete
        closeTimeoutRef.current = setTimeout(() => {
            if (toast.onClose) {
                toast.onClose();
            }
            onClose(id);
        }, 300);
    };

    // Gesture handler for swipe to dismiss
    const panGesture = Gesture.Pan()
        .enabled(!!swipeToClose)
        .onBegin(() => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            isPressing.value = 1;
        })
        .onUpdate((event) => {
            // Determine swipe direction based on position
            if (position.includes('top') || position === 'bottom') {
                translateX.value = event.translationX;
            } else {
                translateY.value = event.translationY;
            }
        })
        .onEnd((event) => {
            isPressing.value = 0;

            // Determine if swipe should dismiss
            const threshold = 80;
            let shouldDismiss = false;

            if (position.includes('top') || position === 'bottom') {
                shouldDismiss = Math.abs(event.translationX) > threshold;
                if (shouldDismiss) {
                    translateX.value = withTiming(
                        event.translationX > 0 ? 500 : -500,
                        { duration: 200 },
                        () => runOnJS(handleClose)()
                    );
                } else {
                    translateX.value = withSpring(0, springConfig);

                    // Restart auto-dismiss timer if needed
                    if (duration > 0) {
                        timeoutRef.current = setTimeout(handleClose, duration);
                    }
                }
            } else {
                shouldDismiss = Math.abs(event.translationY) > threshold;
                if (shouldDismiss) {
                    translateY.value = withTiming(
                        event.translationY > 0 ? 500 : -500,
                        { duration: 200 },
                        () => runOnJS(handleClose)()
                    );
                } else {
                    translateY.value = withSpring(0, springConfig);

                    // Restart auto-dismiss timer if needed
                    if (duration > 0) {
                        timeoutRef.current = setTimeout(handleClose, duration);
                    }
                }
            }
        });

    // Press gesture for feedback
    const pressGesture = Gesture.Tap()
        .onBegin(() => {
            isPressing.value = 1;
        })
        .onEnd(() => {
            isPressing.value = withSequence(
                withTiming(0.95, { duration: 100 }),
                withTiming(1, { duration: 100 })
            );
        });

    // Combined gestures
    const gestures = Gesture.Simultaneous(panGesture, pressGesture);

    // Initialize animations
    useEffect(() => {
        // Announce for screen readers
        if (accessibilityAnnouncement) {
            AccessibilityInfo.announceForAccessibility(accessibilityAnnouncement);
        } else if (title) {
            AccessibilityInfo.announceForAccessibility(`${title}: ${message}`);
        } else {
            AccessibilityInfo.announceForAccessibility(message);
        }

        // Set initial animation values
        if (inAnimation.initial.opacity !== undefined) {
            opacity.value = inAnimation.initial.opacity;
        }

        if (inAnimation.initial.scale !== undefined) {
            scale.value = inAnimation.initial.scale;
        }

        if (inAnimation.initial.translateY !== undefined) {
            translateY.value = inAnimation.initial.translateY;
        }

        if (inAnimation.initial.translateX !== undefined) {
            translateX.value = inAnimation.initial.translateX;
        }

        // Apply entrance animation with slight delay based on index for stacking effect
        const delay = index * 100;

        opacity.value = withDelay(
            delay,
            withSpring(inAnimation.animate.opacity, springConfig)
        );

        scale.value = withDelay(
            delay,
            withSpring(inAnimation.animate.scale, springConfig)
        );

        translateY.value = withDelay(
            delay,
            withSpring(inAnimation.animate.translateY + getStackOffset(), springConfig)
        );

        translateX.value = withDelay(
            delay,
            withSpring(inAnimation.animate.translateX, springConfig)
        );

        // Start progress animation if duration is set
        if (duration > 0 && showProgress) {
            progress.value = withTiming(1, { duration });
        }

        // Set auto-dismiss timeout if duration is set
        if (duration > 0) {
            timeoutRef.current = setTimeout(handleClose, duration);
        }

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        const pressScale = interpolate(
            isPressing.value,
            [0, 1],
            [1, 0.98],
            Extrapolate.CLAMP
        );

        return {
            opacity: opacity.value,
            transform: [
                { translateY: translateY.value },
                { translateX: translateX.value },
                { scale: scale.value * pressScale },
                { rotateX: `${rotateX.value}deg` },
                { rotateY: `${rotateY.value}deg` },
            ],
        };
    });

    // Progress bar animated style
    const progressAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: `${(1 - progress.value) * 100}%`,
            backgroundColor: variant === 'filled' ? 'rgba(255,255,255,0.4)' : colors.background,
            height: 3,
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderBottomLeftRadius: sizeStyles.container.borderRadius,
        };
    });

    // Background color animation for press state
    const backgroundAnimatedStyle = useAnimatedStyle(() => {
        let baseColor = variantStyles.container.backgroundColor as string;
        if (!baseColor || baseColor === 'transparent') {
            baseColor = '#FFFFFF';
        }

        const pressedColor = variant === 'filled'
            ? 'rgba(0,0,0,0.1)'
            : 'rgba(0,0,0,0.05)';

        return {
            backgroundColor: interpolateColor(
                isPressing.value,
                [0, 1],
                [baseColor, pressedColor]
            ),
        };
    });

    // Get icon component if enabled
    const getIconComponent = () => {
        if (!icon) return null;

        const iconName = typeof icon === 'string' ? icon : colors.icon;

        return (
            <View style={styles.iconContainer}>
                <Feather name={iconName as any} size={sizeStyles.iconSize} color={
                    variant === 'filled' ? colors.text : colors.background
                } />
            </View>
        );
    };

    return (
        <GestureDetector gesture={gestures}>
            <Animated.View
                style={[
                    styles.container,
                    positionStyle,
                    sizeStyles.container,
                    variantStyles.container,
                    backgroundAnimatedStyle,
                    animatedStyle,
                    style,
                ]}
                accessibilityRole="alert"
                testID={testID}
            >
                {/* Content */}
                <View style={styles.contentContainer}>
                    {getIconComponent()}

                    <View style={styles.textContainer}>
                        {title && (
                            <Text
                                style={[
                                    styles.title,
                                    sizeStyles.title,
                                    variantStyles.text,
                                    titleStyle,
                                ]}
                                numberOfLines={1}
                            >
                                {title}
                            </Text>
                        )}

                        <Text
                            style={[
                                styles.message,
                                sizeStyles.message,
                                variantStyles.text,
                                textStyle,
                            ]}
                            numberOfLines={2}
                        >
                            {message}
                        </Text>
                    </View>

                    {!hideCloseButton && (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                            accessibilityLabel="Close"
                            accessibilityRole="button"
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        >
                            <Feather
                                name="x"
                                size={sizeStyles.iconSize - 2}
                                color={variant === 'filled' ? colors.text : colors.textSoft}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Progress bar */}
                {showProgress && duration > 0 && (
                    <Animated.View style={progressAnimatedStyle} />
                )}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        marginVertical: 4,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        marginBottom: 2,
    },
    message: {
        fontWeight: '400',
    },
    closeButton: {
        marginLeft: 10,
        padding: 2,
    },
});

export default AnimatedToast;