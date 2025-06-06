// utils.ts
import { Feather } from "@expo/vector-icons"
import { type ViewStyle, type TextStyle } from 'react-native'

export type CheckboxVariant = "default" | "filled" | "outline" | "ghost" | "rounded" | "soft"
export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl"
export type CheckboxState = "unchecked" | "checked" | "indeterminate"
export type AnimationType = "scale" | "bounce" | "slide" | "fade" | "rotate" | "elastic" | "morph" | "pulse"
export type ColorScheme = "primary" | "secondary" | "success" | "warning" | "error" | "info"

export interface CheckboxTheme {
    colors: {
        primary: string
        secondary: string
        success: string
        warning: string
        error: string
        info: string
        background: string
        backgroundChecked: string
        border: string
        borderChecked: string
        borderFocused: string
        text: string
        textDisabled: string
        checkmark: string
        indeterminate: string
        shadow: string
    }
    borderRadius: number
    borderWidth: number
    fontFamily?: string
}

export interface AnimatedCheckboxProps {
    /** Current checked state */
    checked?: boolean
    /** Checkbox state (unchecked, checked, indeterminate) */
    state?: CheckboxState
    /** Callback when checkbox state changes */
    onPress?: (checked: boolean) => void
    /** Label text */
    label?: string
    /** Description text */
    description?: string
    /** Custom label content */
    labelContent?: React.ReactNode
    /** Checkbox variant */
    variant?: CheckboxVariant
    /** Size of the checkbox */
    size?: CheckboxSize
    /** Color scheme */
    colorScheme?: ColorScheme
    /** Whether the checkbox is disabled */
    disabled?: boolean
    /** Animation type */
    animationType?: AnimationType
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Custom checkmark icon */
    checkIcon?: keyof typeof Feather.glyphMap
    /** Custom indeterminate icon */
    indeterminateIcon?: keyof typeof Feather.glyphMap
    /** Label position */
    labelPosition?: "right" | "left"
    /** Custom theme */
    theme?: Partial<CheckboxTheme>
    /** Additional container styles */
    style?: ViewStyle
    /** Additional checkbox styles */
    checkboxStyle?: ViewStyle
    /** Additional label styles */
    labelStyle?: TextStyle
    /** Additional description styles */
    descriptionStyle?: TextStyle
    /** Whether to show focus ring */
    showFocusRing?: boolean
    /** Whether to show ripple effect */
    showRipple?: boolean
    /** Accessibility label */
    accessibilityLabel?: string
    /** Test ID for testing */
    testID?: string
    /** Whether checkbox should take full width */
    fullWidth?: boolean
    /** Custom border radius */
    borderRadius?: number
    /** Whether to use haptic feedback */
    hapticFeedback?: boolean
    /** Whether to show shadow */
    shadow?: boolean
}

// Helper functions
export const getColorStyles = (colorScheme: ColorScheme, theme: CheckboxTheme) => {
    const colorKey = colorScheme as keyof typeof theme.colors
    const color = theme.colors[colorKey] || theme.colors.primary

    return {
        backgroundChecked: color,
        borderChecked: color,
    }
}

export const getSizeStyles = (size: CheckboxSize) => {
    switch (size) {
        case "xs":
            return {
                container: { width: 16, height: 16 },
                checkbox: { width: 16, height: 16 },
                size: 16,
                iconSize: 10,
                label: { fontSize: 12, lineHeight: 16 },
                description: { fontSize: 10, lineHeight: 14 },
            }
        case "sm":
            return {
                container: { width: 18, height: 18 },
                checkbox: { width: 18, height: 18 },
                size: 18,
                iconSize: 12,
                label: { fontSize: 14, lineHeight: 20 },
                description: { fontSize: 12, lineHeight: 16 },
            }
        case "lg":
            return {
                container: { width: 24, height: 24 },
                checkbox: { width: 24, height: 24 },
                size: 24,
                iconSize: 16,
                label: { fontSize: 18, lineHeight: 28 },
                description: { fontSize: 16, lineHeight: 24 },
            }
        case "xl":
            return {
                container: { width: 28, height: 28 },
                checkbox: { width: 28, height: 28 },
                size: 28,
                iconSize: 18,
                label: { fontSize: 20, lineHeight: 30 },
                description: { fontSize: 18, lineHeight: 26 },
            }
        case "md":
        default:
            return {
                container: { width: 20, height: 20 },
                checkbox: { width: 20, height: 20 },
                size: 20,
                iconSize: 14,
                label: { fontSize: 16, lineHeight: 24 },
                description: { fontSize: 14, lineHeight: 20 },
            }
    }
}

export const getVariantStyles = (variant: CheckboxVariant, theme: CheckboxTheme, shadow: boolean) => {
    const baseStyle = {
        ...(shadow && {
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        })
    }

    switch (variant) {
        case "filled":
            return {
                ...baseStyle,
                shadowOpacity: shadow ? 0.15 : 0,
                elevation: shadow ? 4 : 0,
            }
        case "outline":
            return {
                ...baseStyle,
                borderWidth: 2,
                backgroundColor: "transparent",
            }
        case "ghost":
            return {
                ...baseStyle,
                backgroundColor: "transparent",
                borderWidth: 0,
            }
        case "soft":
            return {
                ...baseStyle,
                backgroundColor: `${theme.colors.primary}10`,
            }
        case "rounded":
            return baseStyle
        case "default":
        default:
            return baseStyle
    }
}