import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    cancelAnimation,
    interpolate,
    Extrapolation,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Types
export type SkeletonShape = 'rectangle' | 'circle';
export type SkeletonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'blink' | 'spotlight' | 'gradient' | 'fade' | 'none';
export type SkeletonSpeed = 'slow' | 'medium' | 'fast';

// Props interfaces
interface BaseSkeletonProps {
    animation?: SkeletonAnimation;
    speed?: SkeletonSpeed;
    color?: string;
    highlightColor?: string;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}

interface SkeletonRectProps extends BaseSkeletonProps {
    width?: number | string;
    height?: number | string;
    size?: SkeletonSize;
    borderRadius?: number;
}

interface SkeletonCircleProps extends BaseSkeletonProps {
    size?: SkeletonSize | number;
}

// Helper functions
const getSizeStyles = (size: SkeletonSize): { width: number; height: number } => {
    switch (size) {
        case 'small':
            return { width: 80, height: 10 };
        case 'medium':
            return { width: 120, height: 16 };
        case 'large':
            return { width: 200, height: 20 };
        case 'xlarge':
            return { width: 250, height: 24 };
        default:
            return { width: 120, height: 16 };
    }
};

const getCircleSize = (size: SkeletonSize | number): number => {
    if (typeof size === 'number') return size;

    switch (size) {
        case 'small':
            return 24;
        case 'medium':
            return 40;
        case 'large':
            return 60;
        case 'xlarge':
            return 80;
        default:
            return 40;
    }
};

const getAnimationDuration = (speed: SkeletonSpeed): number => {
    switch (speed) {
        case 'slow':
            return 2000;
        case 'medium':
            return 1500;
        case 'fast':
            return 800;
        default:
            return 1500;
    }
};

// Skeleton Rectangle Component
export const SkeletonRect: React.FC<SkeletonRectProps> = ({
    width,
    height,
    size = 'medium',
    animation = 'shimmer',
    speed = 'medium',
    color = '#E5E7EB',
    highlightColor = '#F3F4F6',
    borderRadius = 4,
    style,
    testID,
}) => {
    // Animation shared values
    const animationValue = useSharedValue(0);
    const opacityValue = useSharedValue(1);
    const waveValue = useSharedValue(0);
    const spotlightValue = useSharedValue(-1);
    const gradientValue = useSharedValue(0);

    // Get dimensions
    const dimensions = width || height ? { width, height } : getSizeStyles(size);
    const animationDuration = getAnimationDuration(speed);

    // Setup animations
    useEffect(() => {
        if (animation === 'none') return;

        // Configure animation based on type
        switch (animation) {
            case 'shimmer':
                animationValue.value = withRepeat(
                    withTiming(1, { duration: animationDuration }),
                    -1,
                    false
                );
                break;

            case 'pulse':
                opacityValue.value = withRepeat(
                    withSequence(
                        withTiming(0.6, { duration: animationDuration / 2 }),
                        withTiming(1, { duration: animationDuration / 2 })
                    ),
                    -1,
                    true
                );
                break;

            case 'wave':
                waveValue.value = withRepeat(
                    withTiming(1, { duration: animationDuration }),
                    -1,
                    false
                );
                break;

            case 'blink':
                opacityValue.value = withRepeat(
                    withSequence(
                        withTiming(0.3, { duration: animationDuration / 3, easing: Easing.inOut(Easing.ease) }),
                        withTiming(1, { duration: animationDuration / 3, easing: Easing.inOut(Easing.ease) }),
                        withTiming(0.3, { duration: animationDuration / 3, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    true
                );
                break;

            case 'spotlight':
                spotlightValue.value = withRepeat(
                    withTiming(2, { duration: animationDuration * 1.2 }),
                    -1,
                    false
                );
                break;

            case 'gradient':
                gradientValue.value = withRepeat(
                    withTiming(1, { duration: animationDuration * 1.5 }),
                    -1,
                    false
                );
                break;

            case 'fade':
                opacityValue.value = withRepeat(
                    withSequence(
                        withTiming(0.4, { duration: animationDuration / 2, easing: Easing.inOut(Easing.sin) }),
                        withTiming(0.9, { duration: animationDuration / 2, easing: Easing.inOut(Easing.sin) })
                    ),
                    -1,
                    true
                );
                break;
        }

        // Cleanup animations
        return () => {
            cancelAnimation(animationValue);
            cancelAnimation(opacityValue);
            cancelAnimation(waveValue);
            cancelAnimation(spotlightValue);
            cancelAnimation(gradientValue);
        };
    }, [animation, animationDuration]);

    // Shimmer animation style
    const shimmerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        animationValue.value,
                        [0, 1],
                        [-100, 100],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    // Wave animation style
    const waveAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        waveValue.value,
                        [0, 0.5, 1],
                        [-100, 0, 100],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    translateY: interpolate(
                        waveValue.value,
                        [0, 0.25, 0.5, 0.75, 1],
                        [0, -5, 0, 5, 0],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    // Spotlight animation style
    const spotlightAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        spotlightValue.value,
                        [-1, 0, 1, 2],
                        [-150, -50, 50, 150],
                        Extrapolation.CLAMP
                    ),
                },
            ],
            opacity: interpolate(
                spotlightValue.value,
                [-1, -0.5, 0, 0.5, 1, 1.5, 2],
                [0, 0.5, 1, 0.5, 1, 0.5, 0],
                Extrapolation.CLAMP
            ),
        };
    });

    // Gradient animation style
    const gradientAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        gradientValue.value,
                        [0, 1],
                        [-100, 100],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    // Opacity animation style
    const opacityAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
        };
    });

    // Base container style
    const containerStyle = [
        styles.container,
        {
            width: Number(dimensions.width),
            height: Number(dimensions.height),
            backgroundColor: color,
            borderRadius,
        },
        style,
    ];

    // Render based on animation type
    const renderContent = () => {
        switch (animation) {
            case 'shimmer':
                return (
                    <View style={[containerStyle, { overflow: 'hidden' }]}>
                        <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]}>
                            <LinearGradient
                                colors={[color, highlightColor, color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </Animated.View>
                    </View>
                );

            case 'wave':
                return (
                    <View style={[containerStyle, { overflow: 'hidden' }]}>
                        <Animated.View style={[styles.shimmer, waveAnimatedStyle]}>
                            <LinearGradient
                                colors={[color, highlightColor, color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </Animated.View>
                    </View>
                );

            case 'spotlight':
                return (
                    <View style={[containerStyle, { overflow: 'hidden' }]}>
                        <Animated.View style={[styles.spotlight, spotlightAnimatedStyle]}>
                            <LinearGradient
                                colors={[color, highlightColor, color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </Animated.View>
                    </View>
                );

            case 'gradient':
                return (
                    <View style={[containerStyle, { overflow: 'hidden' }]}>
                        <Animated.View style={[styles.shimmer, gradientAnimatedStyle]}>
                            <LinearGradient
                                colors={[color, highlightColor, '#F9FAFB', highlightColor, color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </Animated.View>
                    </View>
                );

            case 'pulse':
            case 'blink':
            case 'fade':
                return (
                    <Animated.View style={[containerStyle, opacityAnimatedStyle]} />
                );

            default:
                return <View style={containerStyle} />;
        }
    };

    return (
        <View
            testID={testID}
            accessibilityLabel="Loading"
            accessibilityRole="none"
            style={{ width: Number(dimensions.width), height: Number(dimensions.height) }}
        >
            {renderContent()}
        </View>
    );
};

// Skeleton Circle Component
export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
    size = 'medium',
    animation = 'shimmer',
    speed = 'medium',
    color = '#E5E7EB',
    highlightColor = '#F3F4F6',
    style,
    testID,
}) => {
    const circleSize = getCircleSize(size);

    return (
        <SkeletonRect
            width={circleSize}
            height={circleSize}
            borderRadius={circleSize / 2}
            animation={animation}
            speed={speed}
            color={color}
            highlightColor={highlightColor}
            style={style}
            testID={testID}
        />
    );
};

// Default export as object with components
const AnimatedSkeleton = {
    Rect: SkeletonRect,
    Circle: SkeletonCircle,
};
;
export default AnimatedSkeleton;

// Styles
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    shimmer: {
        flex: 1,
        width: '200%',
        height: '100%',
    },
    spotlight: {
        flex: 1,
        width: '300%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});