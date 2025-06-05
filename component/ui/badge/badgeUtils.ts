import { type ViewStyle, type TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

export type BadgeVariant =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"

export type BadgeSize = "xs" | "sm" | "md" | "lg"

export type BadgeAnimation =
    | "none"
    | "pulse"
    | "bounce"
    | "shake"
    | "glow"
    | "heartbeat"
    | "wiggle"
    | "scale"

export interface BadgeTheme {
    colors: {
        default: { bg: string; text: string; border: string }
        primary: { bg: string; text: string; border: string }
        secondary: { bg: string; text: string; border: string }
        success: { bg: string; text: string; border: string }
        warning: { bg: string; text: string; border: string }
        error: { bg: string; text: string; border: string }
        info: { bg: string; text: string; border: string }
        outline: { bg: string; text: string; border: string }
    }
    borderRadius: {
        xs: number
        sm: number
        md: number
        lg: number
    }
    fontFamily?: string
}

export interface AnimatedBadgeProps {
    /** The text content of the badge */
    children?: React.ReactNode
    /** Badge variant for different styling */
    variant?: BadgeVariant
    /** Size of the badge */
    size?: BadgeSize
    /** Animation type */
    animation?: BadgeAnimation
    /** Whether the badge should be rounded (pill shape) */
    rounded?: boolean
    /** Icon to display before text */
    leftIcon?: keyof typeof Feather.glyphMap
    /** Icon to display after text */
    rightIcon?: keyof typeof Feather.glyphMap
    /** Whether to show a dot indicator */
    dot?: boolean
    /** Custom dot color */
    dotColor?: string
    /** Whether the badge is removable */
    removable?: boolean
    /** Callback when remove button is pressed */
    onRemove?: () => void
    /** Whether the badge is clickable */
    clickable?: boolean
    /** Callback when badge is pressed */
    onPress?: () => void
    /** Custom theme */
    theme?: Partial<BadgeTheme>
    /** Additional container styles */
    style?: ViewStyle
    /** Additional text styles */
    textStyle?: TextStyle
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Whether animation should repeat */
    repeatAnimation?: boolean
    /** Accessibility label */
    accessibilityLabel?: string
    /** Test ID for testing */
    testID?: string
    /** Whether badge should have shadow */
    shadow?: boolean
    /** Custom border radius */
    borderRadius?: number
}

// Helper functions
export const getBadgeVariantStyles = (variant: BadgeVariant, theme: BadgeTheme) => {
    const colors = theme.colors[variant]
    return {
        container: {
            backgroundColor: colors.bg,
            borderColor: colors.border,
        },
        bg: colors.bg,
        text: {
            color: colors.text,
        },
    }
}

export const getBadgeSizeStyles = (size: BadgeSize) => {
    switch (size) {
        case "xs":
            return {
                container: {
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                    minHeight: 16,
                },
                text: {
                    fontSize: 10,
                    lineHeight: 12,
                },
                iconSize: 10,
                dot: {
                    width: 4,
                    height: 4,
                },
                removeButton: {
                    marginLeft: 4,
                    padding: 1,
                },
                removeIconSize: 8,
            }
        case "sm":
            return {
                container: {
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                    minHeight: 20,
                },
                text: {
                    fontSize: 12,
                    lineHeight: 14,
                },
                iconSize: 12,
                dot: {
                    width: 5,
                    height: 5,
                },
                removeButton: {
                    marginLeft: 4,
                    padding: 1,
                },
                removeIconSize: 10,
            }
        case "md":
            return {
                container: {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    minHeight: 24,
                },
                text: {
                    fontSize: 14,
                    lineHeight: 16,
                },
                iconSize: 14,
                dot: {
                    width: 6,
                    height: 6,
                },
                removeButton: {
                    marginLeft: 6,
                    padding: 2,
                },
                removeIconSize: 12,
            }
        case "lg":
            return {
                container: {
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    minHeight: 32,
                },
                text: {
                    fontSize: 16,
                    lineHeight: 18,
                },
                iconSize: 16,
                dot: {
                    width: 8,
                    height: 8,
                },
                removeButton: {
                    marginLeft: 8,
                    padding: 2,
                },
                removeIconSize: 14,
            }
        default:
            return {
                container: {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    minHeight: 24,
                },
                text: {
                    fontSize: 14,
                    lineHeight: 16,
                },
                iconSize: 14,
                dot: {
                    width: 6,
                    height: 6,
                },
                removeButton: {
                    marginLeft: 6,
                    padding: 2,
                },
                removeIconSize: 12,
            }
    }
}