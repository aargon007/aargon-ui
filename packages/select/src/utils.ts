import { Platform } from 'react-native'

// Types
export interface SelectOption {
    label: string
    value: string | number
    disabled?: boolean
    icon?: string
    description?: string
    [key: string]: any
}

export type SelectVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'minimal' | 'glass'
export type SelectSize = 'sm' | 'md' | 'lg' | 'xl'
export type SelectColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
export type SelectAnimationType = 'fade' | 'scale' | 'slide' | 'bounce' | 'flip' | 'none'

// Color schemes
const colorSchemes = {
    primary: {
        main: '#6366F1',
        light: '#EEF2FF',
        dark: '#4F46E5',
        contrast: '#FFFFFF',
    },
    secondary: {
        main: '#64748B',
        light: '#F1F5F9',
        dark: '#475569',
        contrast: '#FFFFFF',
    },
    success: {
        main: '#10B981',
        light: '#ECFDF5',
        dark: '#059669',
        contrast: '#FFFFFF',
    },
    warning: {
        main: '#F59E0B',
        light: '#FFFBEB',
        dark: '#D97706',
        contrast: '#FFFFFF',
    },
    error: {
        main: '#EF4444',
        light: '#FEF2F2',
        dark: '#DC2626',
        contrast: '#FFFFFF',
    },
    neutral: {
        main: '#6B7280',
        light: '#F3F4F6',
        dark: '#4B5563',
        contrast: '#FFFFFF',
    },
}

// Get select colors based on variant and color scheme
export const getSelectColors = (colorScheme: SelectColorScheme = 'primary', variant: SelectVariant = 'default') => {
    const colors = colorSchemes[colorScheme]

    const variants = {
        default: {
            background: '#FFFFFF',
            border: '#E2E8F0',
            borderFocus: colors.main,
            text: '#1E293B',
            placeholder: '#94A3B8',
            icon: '#64748B',
            dropdownBackground: '#FFFFFF',
            dropdownBorder: '#E2E8F0',
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 1,
        },
        filled: {
            background: colors.light,
            border: colors.light,
            borderFocus: colors.main,
            text: '#1E293B',
            placeholder: '#94A3B8',
            icon: colors.main,
            dropdownBackground: '#FFFFFF',
            dropdownBorder: '#E2E8F0',
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 1,
        },
        outlined: {
            background: 'transparent',
            border: colors.main,
            borderFocus: colors.main,
            text: colors.main,
            placeholder: '#94A3B8',
            icon: colors.main,
            dropdownBackground: '#FFFFFF',
            dropdownBorder: colors.main,
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 1,
        },
        soft: {
            background: colors.light,
            border: colors.light,
            borderFocus: colors.main,
            text: colors.dark,
            placeholder: '#94A3B8',
            icon: colors.main,
            dropdownBackground: '#FFFFFF',
            dropdownBorder: '#E2E8F0',
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 1,
        },
        minimal: {
            background: 'transparent',
            border: 'transparent',
            borderFocus: 'transparent',
            text: '#1E293B',
            placeholder: '#94A3B8',
            icon: '#64748B',
            dropdownBackground: '#FFFFFF',
            dropdownBorder: '#E2E8F0',
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 0,
        },
        glass: {
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'rgba(255, 255, 255, 0.2)',
            borderFocus: colors.main,
            text: '#1E293B',
            placeholder: '#94A3B8',
            icon: '#64748B',
            dropdownBackground: 'rgba(255, 255, 255, 0.9)',
            dropdownBorder: 'rgba(255, 255, 255, 0.2)',
            optionText: '#1E293B',
            optionHover: colors.light,
            optionSelected: colors.light,
            optionSelectedText: colors.main,
            borderWidth: 1,
        },
    }

    return variants[variant]
}

// Get select sizes
export const getSelectSizes = (size: SelectSize = 'md') => {
    const sizes = {
        sm: {
            container: {
                paddingVertical: 6,
                paddingHorizontal: 10,
                minHeight: 32,
                borderRadius: 6,
            },
            text: {
                fontSize: 14,
            },
            icon: 14,
            dropdown: {
                borderRadius: 6,
                maxHeight: 200,
            },
            option: {
                paddingVertical: 6,
                paddingHorizontal: 10,
                minHeight: 32,
            },
            iconSize: 14,
        },
        md: {
            container: {
                paddingVertical: 8,
                paddingHorizontal: 12,
                minHeight: 40,
                borderRadius: 8,
            },
            text: {
                fontSize: 16,
            },
            icon: 16,
            dropdown: {
                borderRadius: 8,
                maxHeight: 250,
            },
            option: {
                paddingVertical: 8,
                paddingHorizontal: 12,
                minHeight: 40,
            },
            iconSize: 16,
        },
        lg: {
            container: {
                paddingVertical: 10,
                paddingHorizontal: 16,
                minHeight: 48,
                borderRadius: 10,
            },
            text: {
                fontSize: 18,
            },
            icon: 18,
            dropdown: {
                borderRadius: 10,
                maxHeight: 300,
            },
            option: {
                paddingVertical: 10,
                paddingHorizontal: 16,
                minHeight: 48,
            },
            iconSize: 18,
        },
        xl: {
            container: {
                paddingVertical: 12,
                paddingHorizontal: 20,
                minHeight: 56,
                borderRadius: 12,
            },
            text: {
                fontSize: 20,
            },
            icon: 20,
            dropdown: {
                borderRadius: 12,
                maxHeight: 350,
            },
            option: {
                paddingVertical: 12,
                paddingHorizontal: 20,
                minHeight: 56,
            },
            iconSize: 20,
        },
    }

    return sizes[size]
}

// Get animation configuration
export const getAnimationConfig = (animationType: SelectAnimationType = 'fade') => {
    const configs = {
        fade: {
            spring: {
                damping: 20,
                mass: 1,
                stiffness: 300,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 200,
            },
        },
        scale: {
            spring: {
                damping: 20,
                mass: 1,
                stiffness: 300,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 250,
            },
        },
        slide: {
            spring: {
                damping: 25,
                mass: 1,
                stiffness: 400,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 300,
            },
        },
        bounce: {
            spring: {
                damping: 15,
                mass: 1,
                stiffness: 200,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 400,
            },
        },
        flip: {
            spring: {
                damping: 20,
                mass: 1,
                stiffness: 300,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 350,
            },
        },
        none: {
            spring: {
                damping: 20,
                mass: 1,
                stiffness: 300,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            },
            timing: {
                duration: 0,
            },
        },
    }

    return configs[animationType]
}

// Get select styles (combines colors and sizes)
export const getSelectStyles = (size: SelectSize = 'md') => {
    return getSelectSizes(size)
}

// Highlight text with search query
export const highlightText = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts
}

// Platform-specific shadow styles
export const getShadowStyle = (elevation: number = 8) => {
    if (Platform.OS === 'android') {
        return {
            elevation,
        }
    }

    if (Platform.OS === 'ios') {
        return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: elevation / 2 },
            shadowOpacity: 0.1 + elevation * 0.01,
            shadowRadius: elevation,
        }
    }

    // Web
    return {
        boxShadow: `0 ${elevation / 2}px ${elevation}px rgba(0, 0, 0, 0.1)`,
    }
}
