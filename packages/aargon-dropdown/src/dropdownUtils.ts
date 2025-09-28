import { Platform } from 'react-native'

// Types
export type DropdownVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'minimal' | 'glass'
export type DropdownSize = 'sm' | 'md' | 'lg' | 'xl'
export type DropdownColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
export type DropdownAnimationType = 'fade' | 'scale' | 'slide' | 'bounce' | 'flip' | 'none'
export type DropdownPosition = 'bottom' | 'top' | 'auto'

export interface DropdownItem {
    label: string
    value: string | number
    icon?: string
    description?: string
    disabled?: boolean
    divider?: boolean
    color?: string
}

export interface DropdownColors {
    background: string
    border: string
    borderFocus: string
    text: string
    placeholder: string
    icon: string
    dropdown: string
    dropdownBorder: string
    itemBackground: string
    itemHover: string
    itemText: string
    itemIcon: string
    divider: string
}

export interface DropdownSizes {
    container: {
        paddingVertical: number
        paddingHorizontal: number
        minHeight: number
        borderRadius: number
    }
    dropdown: {
        borderRadius: number
        maxHeight: number
        paddingVertical: number
    }
    item: {
        paddingVertical: number
        paddingHorizontal: number
        minHeight: number
    }
    text: {
        fontSize: number
        lineHeight: number
    }
    icon: number
}

// Color schemes
export const getDropdownColors = (
    colorScheme: DropdownColorScheme,
    variant: DropdownVariant
): DropdownColors => {
    const colorMap = {
        primary: {
            main: '#6366F1',
            light: '#A5B4FC',
            dark: '#4338CA',
        },
        secondary: {
            main: '#64748B',
            light: '#94A3B8',
            dark: '#475569',
        },
        success: {
            main: '#10B981',
            light: '#6EE7B7',
            dark: '#059669',
        },
        warning: {
            main: '#F59E0B',
            light: '#FCD34D',
            dark: '#D97706',
        },
        error: {
            main: '#EF4444',
            light: '#FCA5A5',
            dark: '#DC2626',
        },
        neutral: {
            main: '#6B7280',
            light: '#9CA3AF',
            dark: '#4B5563',
        },
    }

    const colors = colorMap[colorScheme]

    const baseColors = {
        background: '#FFFFFF',
        border: '#E5E7EB',
        borderFocus: colors.main,
        text: '#111827',
        placeholder: '#9CA3AF',
        icon: '#6B7280',
        dropdown: '#FFFFFF',
        dropdownBorder: '#E5E7EB',
        itemBackground: 'transparent',
        itemHover: '#F3F4F6',
        itemText: '#111827',
        itemIcon: '#6B7280',
        divider: '#E5E7EB',
    }

    switch (variant) {
        case 'filled':
            return {
                ...baseColors,
                background: '#F9FAFB',
                border: 'transparent',
                borderFocus: colors.main,
            }
        case 'outlined':
            return {
                ...baseColors,
                background: 'transparent',
                border: '#D1D5DB',
                borderFocus: colors.main,
            }
        case 'soft':
            return {
                ...baseColors,
                background: colors.light + '20',
                border: colors.light + '40',
                borderFocus: colors.main,
            }
        case 'minimal':
            return {
                ...baseColors,
                background: 'transparent',
                border: 'transparent',
                borderFocus: colors.main,
            }
        case 'glass':
            return {
                ...baseColors,
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'rgba(255, 255, 255, 0.2)',
                borderFocus: colors.main,
                dropdown: 'rgba(255, 255, 255, 0.95)',
                dropdownBorder: 'rgba(255, 255, 255, 0.3)',
            }
        default:
            return baseColors
    }
}

// Size configurations
export const getDropdownSizes = (size: DropdownSize): DropdownSizes => {
    const sizeMap = {
        sm: {
            container: {
                paddingVertical: 6,
                paddingHorizontal: 10,
                minHeight: 32,
                borderRadius: 6,
            },
            dropdown: {
                borderRadius: 8,
                maxHeight: 200,
                paddingVertical: 4,
            },
            item: {
                paddingVertical: 6,
                paddingHorizontal: 10,
                minHeight: 32,
            },
            text: {
                fontSize: 14,
                lineHeight: 20,
            },
            icon: 14,
        },
        md: {
            container: {
                paddingVertical: 8,
                paddingHorizontal: 12,
                minHeight: 40,
                borderRadius: 8,
            },
            dropdown: {
                borderRadius: 10,
                maxHeight: 250,
                paddingVertical: 6,
            },
            item: {
                paddingVertical: 8,
                paddingHorizontal: 12,
                minHeight: 40,
            },
            text: {
                fontSize: 16,
                lineHeight: 24,
            },
            icon: 16,
        },
        lg: {
            container: {
                paddingVertical: 10,
                paddingHorizontal: 14,
                minHeight: 48,
                borderRadius: 10,
            },
            dropdown: {
                borderRadius: 12,
                maxHeight: 300,
                paddingVertical: 8,
            },
            item: {
                paddingVertical: 10,
                paddingHorizontal: 14,
                minHeight: 48,
            },
            text: {
                fontSize: 18,
                lineHeight: 28,
            },
            icon: 18,
        },
        xl: {
            container: {
                paddingVertical: 12,
                paddingHorizontal: 16,
                minHeight: 56,
                borderRadius: 12,
            },
            dropdown: {
                borderRadius: 14,
                maxHeight: 350,
                paddingVertical: 10,
            },
            item: {
                paddingVertical: 12,
                paddingHorizontal: 16,
                minHeight: 56,
            },
            text: {
                fontSize: 20,
                lineHeight: 32,
            },
            icon: 20,
        },
    }

    return sizeMap[size]
}

// Animation configurations
export const getAnimationConfig = (animationType: DropdownAnimationType) => {
    const configs = {
        fade: {
            duration: 200,
            spring: { damping: 20, stiffness: 300, mass: 1 },
        },
        scale: {
            duration: 250,
            spring: { damping: 18, stiffness: 250, mass: 1 },
        },
        slide: {
            duration: 300,
            spring: { damping: 25, stiffness: 400, mass: 1 },
        },
        bounce: {
            duration: 400,
            spring: { damping: 12, stiffness: 200, mass: 1 },
        },
        flip: {
            duration: 350,
            spring: { damping: 20, stiffness: 300, mass: 1 },
        },
        none: {
            duration: 0,
            spring: { damping: 20, stiffness: 300, mass: 1 },
        },
    }

    return configs[animationType] || configs.fade
}

// Utility functions
export const findItemByValue = (items: DropdownItem[], value: string | number): DropdownItem | undefined => {
    return items.find(item => item.value === value)
}

export const filterItems = (items: DropdownItem[], query: string): DropdownItem[] => {
    if (!query.trim()) return items

    return items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
    )
}

export const highlightText = (text: string, query: string): string[] => {
    if (!query.trim()) return [text]

    const regex = new RegExp(`(${query})`, 'gi')
    return text.split(regex)
}

// Platform-specific styles
export const getPlatformStyles = () => {
    return {
        shadow: Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
        }),
        webInput: Platform.select({
            web: {
                // outline: 'none',
                outlineWidth: 0,
                outlineColor: 'transparent',
                // outlineStyle: 'none',
            },
            default: {},
        }),
    }
}

// Validation helpers
export const validateDropdownProps = (props: any) => {
    const { items, value, onSelectionChange } = props

    if (!Array.isArray(items)) {
        console.warn('Dropdown: items prop should be an array')
        return false
    }

    if (value !== undefined && value !== null && value !== '') {
        const foundItem = findItemByValue(items, value)
        if (!foundItem) {
            console.warn(`Dropdown: value "${value}" not found in items`)
        }
    }

    if (typeof onSelectionChange !== 'function') {
        console.warn('Dropdown: onSelectionChange should be a function')
        return false
    }

    return true
}

// Default items for demo
export const createSampleItems = (): DropdownItem[] => [
    { label: 'Option 1', value: '1', icon: 'star' },
    { label: 'Option 2', value: '2', icon: 'heart' },
    { label: 'Option 3', value: '3', icon: 'bookmark', description: 'With description' },
    { label: 'Disabled Option', value: '4', icon: 'x', disabled: true },
    { label: 'Divider Below', value: '5', divider: true },
    { label: 'Option 6', value: '6', icon: 'check' },
]
