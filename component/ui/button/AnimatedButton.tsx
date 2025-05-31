"use client"
import { Pressable, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
} from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive"
export type ButtonSize = "sm" | "md" | "lg" | "xl"

export interface AnimatedButtonProps {
    /** The text to display on the button */
    title: string
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
    /** Callback when the button is pressed */
    onPress?: () => void
    /** Additional styles for the button container */
    style?: ViewStyle
    /** Additional styles for the button text */
    textStyle?: TextStyle
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Whether to use haptic feedback */
    hapticFeedback?: boolean
}

export const AnimatedButton = ({
    title,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    onPress,
    style,
    textStyle,
    animationDuration = 150,
    hapticFeedback = true,
}: AnimatedButtonProps) => {
    // Animation values
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const rotation = useSharedValue(0)

    // Get variant and size styles
    const variantStyles = getVariantStyles(variant)
    const sizeStyles = getSizeStyles(size)

    // Handle press in
    const handlePressIn = () => {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 300 })
        opacity.value = withTiming(0.8, { duration: animationDuration })
    }

    // Handle press out
    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 })
        opacity.value = withTiming(1, { duration: animationDuration })
    }

    // Handle press
    const handlePress = () => {
        if (disabled || loading) return

        // Success animation
        rotation.value = withSpring(360, { damping: 20 }, () => {
            rotation.value = 0
        })

        // Haptic feedback
        if (hapticFeedback) {
            // In a real app, you'd use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }

        // Call onPress
        if (onPress) {
            runOnJS(onPress)()
        }
    }

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        const disabledOpacity = interpolate(Number(disabled), [0, 1], [1, 0.5])
        const loadingOpacity = interpolate(Number(loading), [0, 1], [1, 0.7])

        return {
            transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
            opacity: opacity.value * disabledOpacity * loadingOpacity,
        }
    })

    const loadingAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(Number(loading), [0, 1], [0, 1]),
            transform: [{ scale: interpolate(Number(loading), [0, 1], [0.5, 1]) }],
        }
    })

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.button,
                variantStyles.container,
                sizeStyles.container,
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
                    </Animated.View>
                )}

                <Text style={[styles.buttonText, variantStyles.text, sizeStyles.text, textStyle]}>{title}</Text>

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
const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
        case "primary":
            return {
                container: {
                    backgroundColor: "#6366F1",
                    borderColor: "#6366F1",
                },
                text: {
                    color: "#FFFFFF",
                },
            }
        case "secondary":
            return {
                container: {
                    backgroundColor: "#F3F4F6",
                    borderColor: "#E5E7EB",
                },
                text: {
                    color: "#374151",
                },
            }
        case "outline":
            return {
                container: {
                    backgroundColor: "transparent",
                    borderColor: "#E5E7EB",
                },
                text: {
                    color: "#374151",
                },
            }
        case "ghost":
            return {
                container: {
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                },
                text: {
                    color: "#6366F1",
                },
            }
        case "destructive":
            return {
                container: {
                    backgroundColor: "#EF4444",
                    borderColor: "#EF4444",
                },
                text: {
                    color: "#FFFFFF",
                },
            }
        default:
            return {
                container: {
                    backgroundColor: "#6366F1",
                    borderColor: "#6366F1",
                },
                text: {
                    color: "#FFFFFF",
                },
            }
    }
}

// Helper functions for size styles
const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
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
        borderRadius: 8,
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
})
