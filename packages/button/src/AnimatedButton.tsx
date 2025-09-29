import { useEffect } from "react"
import { Pressable, Text, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate, runOnJS, withSequence, withRepeat, Easing, } from "react-native-reanimated"
import { getSizeStyles, getVariantStyles, type AnimatedButtonProps, type AnimationType, type ButtonTheme } from "./utils"

const defaultTheme: ButtonTheme = {
    colors: {
        primary: "#6366F1",
        secondary: "#F3F4F6",
        outline: "transparent",
        ghost: "transparent",
        destructive: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
        text: {
            primary: "#FFFFFF",
            secondary: "#374151",
            outline: "#374151",
            ghost: "#6366F1",
            destructive: "#FFFFFF",
            success: "#FFFFFF",
            warning: "#FFFFFF",
        },
        border: {
            primary: "#6366F1",
            secondary: "#E5E7EB",
            outline: "#E5E7EB",
            ghost: "transparent",
            destructive: "#EF4444",
            success: "#10B981",
            warning: "#F59E0B",
        }
    },
    borderRadius: 8,
    fontFamily: undefined,
}

// Smooth spring configuration
const smoothSpringConfig = {
    damping: 20,
    stiffness: 400,
    mass: 0.8,
}

// Ultra smooth spring for subtle animations
const ultraSmoothSpringConfig = {
    damping: 25,
    stiffness: 300,
    mass: 0.6,
}

export const AnimatedButton = ({
    title,
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    loadingComponent,
    onPress,
    onLongPress,
    style,
    textStyle,
    animationType = "smooth",
    animationDuration = 200,
    hapticFeedback = true,
    theme,
    fullWidth = false,
    accessibilityLabel,
    testID,
    rounded = false,
    borderRadius,
    shadow = false,
    ripple = true,
}: AnimatedButtonProps) => {
    // Merge theme with default
    const mergedTheme = { ...defaultTheme, ...theme }

    // Animation values
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const rotation = useSharedValue(0)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const spinRotation = useSharedValue(0)
    const loadingScale = useSharedValue(0)
    const buttonOpacity = useSharedValue(1)

    // Get variant and size styles
    const variantStyles = getVariantStyles(variant, mergedTheme);
    const sizeStyles = getSizeStyles(size);

    // Start loading spinner animation
    useEffect(() => {
        if (loading) {
            // Smooth scale in for loading state
            loadingScale.value = withSpring(1, ultraSmoothSpringConfig)
            buttonOpacity.value = withTiming(0.8, {
                duration: 300,
                easing: Easing.out(Easing.cubic)
            })

            // Continuous smooth spinning
            spinRotation.value = withRepeat(
                withTiming(360, {
                    duration: 1000,
                    easing: Easing.linear
                }),
                -1,
                false
            )
        } else {
            // Smooth scale out
            loadingScale.value = withSpring(0, ultraSmoothSpringConfig)
            buttonOpacity.value = withTiming(1, {
                duration: 200,
                easing: Easing.out(Easing.cubic)
            })
            spinRotation.value = 0
        }
    }, [loading]);

    // Enhanced animation handlers with smoother transitions
    const getAnimationForType = (type: AnimationType, isPressed: boolean) => {
        switch (type) {
            case "smooth":
                return isPressed
                    ? withSpring(0.96, ultraSmoothSpringConfig)
                    : withSpring(1, ultraSmoothSpringConfig)
            case "scale":
                return isPressed
                    ? withSpring(0.94, smoothSpringConfig)
                    : withSpring(1, smoothSpringConfig)
            case "bounce":
                return isPressed
                    ? withSequence(
                        withSpring(0.88, { damping: 12, stiffness: 400 }),
                        withSpring(1.04, { damping: 15, stiffness: 350 }),
                        withSpring(1, ultraSmoothSpringConfig)
                    )
                    : withSpring(1, ultraSmoothSpringConfig)
            case "pulse":
                return isPressed
                    ? withSequence(
                        withTiming(1.08, {
                            duration: animationDuration / 3,
                            easing: Easing.out(Easing.cubic)
                        }),
                        withTiming(0.96, {
                            duration: animationDuration / 3,
                            easing: Easing.inOut(Easing.cubic)
                        }),
                        withSpring(1, ultraSmoothSpringConfig)
                    )
                    : withSpring(1, ultraSmoothSpringConfig)
            case "shake":
                if (isPressed) {
                    translateX.value = withSequence(
                        withTiming(-3, { duration: 40, easing: Easing.out(Easing.cubic) }),
                        withTiming(3, { duration: 40, easing: Easing.inOut(Easing.cubic) }),
                        withTiming(-2, { duration: 40, easing: Easing.inOut(Easing.cubic) }),
                        withTiming(0, { duration: 40, easing: Easing.out(Easing.cubic) })
                    )
                }
                return withSpring(1, ultraSmoothSpringConfig)
            case "none":
                return 1
            default:
                return isPressed
                    ? withSpring(0.96, ultraSmoothSpringConfig)
                    : withSpring(1, ultraSmoothSpringConfig)
        }
    }

    // Handle press in with smoother opacity transition
    const handlePressIn = () => {
        if (disabled || loading) return

        if (animationType !== "none") {
            scale.value = getAnimationForType(animationType, true)
            opacity.value = withTiming(0.85, {
                duration: animationDuration / 2,
                easing: Easing.out(Easing.cubic)
            })

            // Subtle vertical movement for enhanced feedback
            if (animationType === "smooth") {
                translateY.value = withSpring(1, ultraSmoothSpringConfig)
            }
        }
    }

    // Handle press out with smoother transitions
    const handlePressOut = () => {
        if (animationType !== "none") {
            scale.value = getAnimationForType(animationType, false)
            opacity.value = withTiming(1, {
                duration: animationDuration,
                easing: Easing.out(Easing.cubic)
            })

            if (animationType === "smooth") {
                translateY.value = withSpring(0, ultraSmoothSpringConfig)
            }
        }
    }

    // Handle press with success feedback
    const handlePress = () => {
        if (disabled || loading) return

        // Success animation with smooth rotation
        if (animationType === "bounce" || animationType === "smooth") {
            rotation.value = withSpring(360, {
                damping: 18,
                stiffness: 200
            }, () => {
                rotation.value = 0
            })
        }

        // Haptic feedback
        if (hapticFeedback) {
            // In a real app, you'd use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }

        // Call onPress
        if (onPress) {
            runOnJS(onPress)()
        }
    }

    // Handle long press
    const handleLongPress = () => {
        if (disabled || loading) return
        if (onLongPress) {
            runOnJS(onLongPress)()
        }
    }

    // Enhanced animated styles with smoother interpolations
    const animatedStyle = useAnimatedStyle(() => {
        const disabledOpacity = interpolate(
            Number(disabled),
            [0, 1],
            [1, 0.4],
            'clamp'
        )

        return {
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
            opacity: opacity.value * disabledOpacity * buttonOpacity.value,
        }
    })

    // Smooth loading spinner animation
    const loadingSpinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${spinRotation.value}deg` },
                { scale: loadingScale.value }
            ],
            opacity: loadingScale.value,
        }
    })

    // Smooth content transition during loading
    const contentStyle = useAnimatedStyle(() => {
        const contentOpacity = interpolate(
            loadingScale.value,
            [0, 0.5, 1],
            [1, 0.7, 0.3],
            'clamp'
        )

        return {
            opacity: contentOpacity,
        }
    })

    const buttonRadius = rounded ? 50 : (borderRadius ?? mergedTheme.borderRadius)

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            onLongPress={handleLongPress}
            disabled={disabled || loading}
            accessibilityLabel={accessibilityLabel || title}
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading }}
            testID={testID}
            style={({ pressed }) => [
                styles.button,
                variantStyles.container,
                sizeStyles.container,
                {
                    borderRadius: buttonRadius,
                    width: fullWidth ? "100%" : undefined,
                },
                shadow && styles.shadow,
                style,
            ]}
        >
            <Animated.View style={[styles.buttonContent, animatedStyle]}>
                {/* Loading Spinner */}
                {loading && (
                    <Animated.View style={[styles.loadingContainer, loadingSpinnerStyle]}>
                        {loadingComponent || (
                            <Animated.View
                                style={[
                                    styles.loadingSpinner,
                                    {
                                        borderColor: `${variantStyles.text.color}30`,
                                        borderTopColor: variantStyles.text.color,
                                        borderRightColor: variantStyles.text.color,
                                        width: sizeStyles.iconSize,
                                        height: sizeStyles.iconSize,
                                    },
                                ]}
                            />
                        )}
                    </Animated.View>
                )}

                {/* Button Content */}
                <Animated.View style={[styles.contentContainer, contentStyle]}>
                    {leftIcon && !loading && (
                        <Text style={[styles.iconText, { fontSize: sizeStyles.iconSize, color: variantStyles.text.color }]}>
                            {leftIcon}
                        </Text>
                    )}

                    {children || (
                        <Text
                            style={[
                                styles.buttonText,
                                variantStyles.text,
                                sizeStyles.text,
                                { fontFamily: mergedTheme.fontFamily },
                                textStyle
                            ]}
                        >
                            {title}
                        </Text>
                    )}

                    {rightIcon && !loading && (
                        <Text style={[styles.iconText, { fontSize: sizeStyles.iconSize, color: variantStyles.text.color }]}>
                            {rightIcon}
                        </Text>
                    )}
                </Animated.View>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        overflow: 'hidden',
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: "600",
        textAlign: "center",
    },
    iconText: {
        marginHorizontal: 8,
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    loadingSpinner: {
        borderWidth: 2,
        borderRadius: 50,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 8,
    },
})

export default AnimatedButton;
