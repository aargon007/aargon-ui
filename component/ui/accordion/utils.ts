import { Feather } from "@expo/vector-icons"
import { type ViewStyle, type TextStyle } from 'react-native'

export type AccordionVariant = "default" | "bordered" | "filled" | "ghost"
export type AccordionSize = "sm" | "md" | "lg"
export type AnimationType = "timing" | "spring" | "bounce"

export interface AccordionTheme {
    colors: {
        background: string
        headerBackground: string
        headerBackgroundActive: string
        border: string
        text: string
        textActive: string
        icon: string
        iconActive: string
        shadow: string
    }
    borderRadius: number
    fontFamily?: string
}

export interface AnimatedAccordionProps {
    /** Content to display in the accordion body */
    children: React.ReactNode
    /** Title text for the accordion header */
    title?: string
    /** Custom header content */
    headerContent?: React.ReactNode
    /** Whether the accordion is initially expanded */
    defaultExpanded?: boolean
    /** Controlled expanded state */
    expanded?: boolean
    /** Callback when accordion state changes */
    onToggle?: (expanded: boolean) => void
    /** Animation duration in milliseconds */
    duration?: number
    /** Animation type */
    animationType?: AnimationType
    /** Accordion variant */
    variant?: AccordionVariant
    /** Size of the accordion */
    size?: AccordionSize
    /** Whether the accordion is disabled */
    disabled?: boolean
    /** Custom icon for collapsed state */
    collapsedIcon?: keyof typeof Feather.glyphMap
    /** Custom icon for expanded state */
    expandedIcon?: keyof typeof Feather.glyphMap
    /** Whether to show the expand/collapse icon */
    showIcon?: boolean
    /** Icon position */
    iconPosition?: "left" | "right"
    /** Custom theme */
    theme?: Partial<AccordionTheme>
    /** Additional container styles */
    style?: ViewStyle
    /** Additional header styles */
    headerStyle?: ViewStyle
    /** Additional header text styles */
    headerTextStyle?: TextStyle
    /** Additional body styles */
    bodyStyle?: ViewStyle
    /** Whether to add shadow */
    shadow?: boolean
    /** Accessibility label */
    accessibilityLabel?: string
    /** Test ID for testing */
    testID?: string
    /** Whether to animate on mount */
    animateOnMount?: boolean
    /** Custom easing function */
    easing?: any
}

// Helper functions
export const getAccordionVariantStyles = (variant: AccordionVariant, theme: AccordionTheme) => {
    switch (variant) {
        case "bordered":
            return {
                container: {
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    borderRadius: theme.borderRadius,
                    backgroundColor: theme.colors.background,
                },
                header: {
                    backgroundColor: "transparent",
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                    borderRadius: 0,
                },
                body: {
                    backgroundColor: "transparent",
                    borderRadius: 0,
                },
            }
        case "filled":
            return {
                container: {
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius,
                },
                header: {
                    backgroundColor: theme.colors.headerBackground,
                },
                body: {
                    backgroundColor: theme.colors.background,
                },
            }
        case "ghost":
            return {
                container: {
                    backgroundColor: "transparent",
                },
                header: {
                    backgroundColor: "transparent",
                },
                body: {
                    backgroundColor: "transparent",
                },
            }
        case "default":
        default:
            return {
                container: {
                    backgroundColor: "transparent",
                },
                header: {
                    backgroundColor: theme.colors.headerBackground,
                },
                body: {
                    backgroundColor: theme.colors.background,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                },
            }
    }
}

export const getAccordionSizeStyles = (size: AccordionSize) => {
    switch (size) {
        case "sm":
            return {
                header: {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                },
                content: {
                    padding: 12,
                },
                text: {
                    fontSize: 14,
                    lineHeight: 20,
                },
                iconSize: 16,
            }
        case "lg":
            return {
                header: {
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                },
                content: {
                    padding: 20,
                },
                text: {
                    fontSize: 18,
                    lineHeight: 28,
                },
                iconSize: 20,
            }
        case "md":
        default:
            return {
                header: {
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                },
                content: {
                    padding: 16,
                },
                text: {
                    fontSize: 16,
                    lineHeight: 24,
                },
                iconSize: 18,
            }
    }
}