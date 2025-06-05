import { Feather } from "@expo/vector-icons"
import { type ViewStyle, type TextStyle } from "react-native"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning"
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"
export type AnimationType = "scale" | "bounce" | "pulse" | "shake" | "smooth" | "none"

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

// Helper functions for variant styles
export const getVariantStyles = (variant: ButtonVariant, theme: ButtonTheme) => {
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
export const getSizeStyles = (size: ButtonSize) => {
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