"use client"
import { Pressable, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
    withSequence,
    withDelay,
} from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning"
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"
export type AnimationType = "scale" | "bounce" | "pulse" | "shake" | "none"

export interface ButtonTheme {
    colors: {
        primary: string
        secondary: string
        outline: string
        ghost: string
        destructive: string
        success: string
        warning: string
        text: {
            primary: string
            secondary: string
            outline: string
            ghost: string
            destructive: string
            success: string
            warning: string
        }
        border: {
            primary: string
            secondary: string
            outline: string
            ghost: string
            destructive: string
            success: string
            warning: string
        }
    }
    borderRadius: number
    fontFamily?: string
}

export interface AnimatedButtonProps {
    /** The text to display on the button */
    title?: string
    /** Custom content to render instead of title */
    children?: React.ReactNode
    /** The variant of the button */
    variant?: ButtonVariant
    /** The size of the button */
    size?: ButtonSize
    /** Whether the button is disabled */
    disabled?: boolean
    /** Whether the button is in loading state */
    loading?: boolean
    /** Icon to display before the text */
    leftIcon?: keyof typeof Feather.glyphMap
    /** Icon to display after the text */
    rightIcon?: keyof typeof Feather.glyphMap
    /** Custom loading component */
    loadingComponent?: React.ReactNode
    /** Callback when the button is pressed */
    onPress?: () => void
    /** Callback when the button is long pressed */
    onLongPress?: () => void
    /** Additional styles for the button container */
    style?: ViewStyle
    /** Additional styles for the button text */
    textStyle?: TextStyle
    /** Animation type */
    animationType?: AnimationType
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Whether to use haptic feedback */
    hapticFeedback?: boolean
    /** Custom theme */
    theme?: Partial<ButtonTheme>
    /** Whether the button should take full width */
    fullWidth?: boolean
    /** Accessibility label */
    accessibilityLabel?: string
    /** Test ID for testing */
    testID?: string
    /** Whether the button should be rounded */
    rounded?: boolean
    /** Custom border radius */
    borderRadius?: number
    /** Shadow configuration */
    shadow?: boolean
    /** Ripple effect on Android */
    ripple?: boolean
}

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
    animationType = "scale",
    animationDuration = 150,
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

    // Get variant and size styles
    const variantStyles = getVariantStyles(variant, mergedTheme)
    const sizeStyles = getSizeStyles(size)

    // Animation handlers
    const getAnimationForType = (type: AnimationType, isPressed: boolean) => {
        switch (type) {
            case "scale":
                return isPressed
                    ? withSpring(0.95, { damping: 15, stiffness: 300 })
                    : withSpring(1, { damping: 15, stiffness: 300 })
            case "bounce":
                return isPressed
                    ? withSequence(
                        withSpring(0.9, { damping: 15, stiffness: 300 }),
                        withSpring(1.05, { damping: 15, stiffness: 300 }),
                        withSpring(1, { damping: 15, stiffness: 300 })
                    )
                    : withSpring(1, { damping: 15, stiffness: 300 })
            case "pulse":
                return isPressed
                    ? withSequence(
                        withTiming(1.1, { duration: animationDuration / 2 }),
                        withTiming(1, { duration: animationDuration / 2 })
                    )
                    : withSpring(1, { damping: 15, stiffness: 300 })
            case "shake":
                if (isPressed) {
                    translateX.value = withSequence(
                        withTiming(-5, { duration: 50 }),
                        withTiming(5, { duration: 50 }),
                        withTiming(-5, { duration: 50 }),
                        withTiming(0, { duration: 50 })
                    )
                }
                return withSpring(1, { damping: 15, stiffness: 300 })
            case "none":
                return 1
            default:
                return isPressed
                    ? withSpring(0.95, { damping: 15, stiffness: 300 })
                    : withSpring(1, { damping: 15, stiffness: 300 })
        }
    }

    // Handle press in
    const handlePressIn = () => {
        if (animationType !== "none") {
            scale.value = getAnimationForType(animationType, true)
            opacity.value = withTiming(0.8, { duration: animationDuration })
        }
    }

    // Handle press out
    const handlePressOut = () => {
        if (animationType !== "none") {
            scale.value = getAnimationForType(animationType, false)
            opacity.value = withTiming(1, { duration: animationDuration })
        }
    }

    // Handle press
    const handlePress = () => {
        if (disabled || loading) return

        // Success animation
        if (animationType === "bounce") {
            rotation.value = withSpring(360, { damping: 20 }, () => {
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

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        const disabledOpacity = interpolate(Number(disabled), [0, 1], [1, 0.5])
        const loadingOpacity = interpolate(Number(loading), [0, 1], [1, 0.7])

        return {
            transform: [
                { scale: scale.value },
                { rotate: `${rotation.value}deg` },
                { translateX: translateX.value }
            ],
            opacity: opacity.value * disabledOpacity * loadingOpacity,
        }
    })

    const loadingAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(Number(loading), [0, 1], [0, 1]),
            transform: [{ scale: interpolate(Number(loading), [0, 1], [0.5, 1]) }],
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
                pressed && styles.pressed,
                style,
            ]}
        >
            <Animated.View style={[styles.buttonContent, animatedStyle]}>
                {leftIcon && !loading && (
                    <Feather
                        name={leftIcon}
                        size={sizeStyles.iconSize}
                        color={variantStyles.text.color}
                        style={styles.leftIcon}
                    />
                )}

                {loading && (
                    <Animated.View style={[styles.loadingContainer, loadingAnimatedStyle]}>
                        {loadingComponent || (
                            <Animated.View
                                style={[
                                    styles.loadingSpinner,
                                    {
                                        borderColor: variantStyles.text.color,
                                        borderTopColor: "transparent",
                                        width: sizeStyles.iconSize,
                                        height: sizeStyles.iconSize,
                                    },
                                ]}
                            />
                        )}
                    </Animated.View>
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
                    <Feather
                        name={rightIcon}
                        size={sizeStyles.iconSize}
                        color={variantStyles.text.color}
                        style={styles.rightIcon}
                    />
                )}
            </Animated.View>
        </Pressable>
    )
}

// Helper functions for variant styles
const getVariantStyles = (variant: ButtonVariant, theme: ButtonTheme) => {
    return {
        container: {
            backgroundColor: theme.colors[variant],
            borderColor: theme.colors.border[variant],
        },
        text: {
            color: theme.colors.text[variant],
        },
    }
}

// Helper functions for size styles
const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
        case "xs":
            return {
                container: {
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    minHeight: 32,
                },
                text: {
                    fontSize: 12,
                },
                iconSize: 14,
            }
        case "sm":
            return {
                container: {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    minHeight: 36,
                },
                text: {
                    fontSize: 14,
                },
                iconSize: 16,
            }
        case "md":
            return {
                container: {
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    minHeight: 40,
                },
                text: {
                    fontSize: 16,
                },
                iconSize: 18,
            }
        case "lg":
            return {
                container: {
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    minHeight: 44,
                },
                text: {
                    fontSize: 18,
                },
                iconSize: 20,
            }
        case "xl":
            return {
                container: {
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    minHeight: 52,
                },
                text: {
                    fontSize: 20,
                },
                iconSize: 22,
            }
        default:
            return {
                container: {
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    minHeight: 40,
                },
                text: {
                    fontSize: 16,
                },
                iconSize: 18,
            }
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    pressed: {
        opacity: 0.8,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: "600",
        textAlign: "center",
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
    loadingContainer: {
        marginRight: 8,
    },
    loadingSpinner: {
        borderWidth: 2,
        borderRadius: 50,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
})