export interface SelectOption {
    label: string
    value: string | number
    disabled?: boolean
    icon?: string
    description?: string
    color?: string
}

export type SelectVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'minimal' | 'glass'
export type SelectSize = 'sm' | 'md' | 'lg' | 'xl'
export type SelectColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
export type SelectAnimationType = 'fade' | 'scale' | 'slide' | 'bounce' | 'flip' | 'none'

export interface SelectColors {
    background: string
    border: string
    borderFocus: string
    text: string
    placeholder: string
    icon: string
    dropdown: string
    dropdownBorder: string
    optionBackground: string
    optionBackgroundHover: string
    optionText: string
    selectedBackground: string
    selectedText: string
}

export interface SelectSizes {
    container: {
        paddingVertical: number
        paddingHorizontal: number
        minHeight: number
        borderRadius: number
    }
    text: {
        fontSize: number
    }
    icon: number
    dropdown: {
        maxHeight: number
        borderRadius: number
    }
    option: {
        paddingVertical: number
        paddingHorizontal: number
        minHeight: number
    }
}

export const getSelectColors = (
    variant: SelectVariant,
    colorScheme: SelectColorScheme
): SelectColors => {
    const baseColors = {
        primary: '#6366F1',
        secondary: '#64748B',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        neutral: '#6B7280',
    }

    const schemeColor = baseColors[colorScheme]

    switch (variant) {
        case 'filled':
            return {
                background: '#F8FAFC',
                border: '#E2E8F0',
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: '#64748B',
                dropdown: '#FFFFFF',
                dropdownBorder: '#E2E8F0',
                optionBackground: 'transparent',
                optionBackgroundHover: '#F1F5F9',
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
        case 'outlined':
            return {
                background: 'transparent',
                border: '#E2E8F0',
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: '#64748B',
                dropdown: '#FFFFFF',
                dropdownBorder: '#E2E8F0',
                optionBackground: 'transparent',
                optionBackgroundHover: '#F1F5F9',
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
        case 'soft':
            return {
                background: `${schemeColor}15`,
                border: `${schemeColor}30`,
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: schemeColor,
                dropdown: '#FFFFFF',
                dropdownBorder: '#E2E8F0',
                optionBackground: 'transparent',
                optionBackgroundHover: `${schemeColor}10`,
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
        case 'minimal':
            return {
                background: 'transparent',
                border: 'transparent',
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: '#64748B',
                dropdown: '#FFFFFF',
                dropdownBorder: '#E2E8F0',
                optionBackground: 'transparent',
                optionBackgroundHover: '#F1F5F9',
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
        case 'glass':
            return {
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'rgba(255, 255, 255, 0.2)',
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: '#64748B',
                dropdown: 'rgba(255, 255, 255, 0.95)',
                dropdownBorder: 'rgba(255, 255, 255, 0.2)',
                optionBackground: 'transparent',
                optionBackgroundHover: 'rgba(255, 255, 255, 0.5)',
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
        default:
            return {
                background: '#FFFFFF',
                border: '#E2E8F0',
                borderFocus: schemeColor,
                text: '#1E293B',
                placeholder: '#64748B',
                icon: '#64748B',
                dropdown: '#FFFFFF',
                dropdownBorder: '#E2E8F0',
                optionBackground: 'transparent',
                optionBackgroundHover: '#F1F5F9',
                optionText: '#1E293B',
                selectedBackground: schemeColor,
                selectedText: '#FFFFFF',
            }
    }
}

export const getSelectSizes = (size: SelectSize): SelectSizes => {
    switch (size) {
        case 'sm':
            return {
                container: {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    minHeight: 36,
                    borderRadius: 6,
                },
                text: {
                    fontSize: 14,
                },
                icon: 16,
                dropdown: {
                    maxHeight: 200,
                    borderRadius: 6,
                },
                option: {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    minHeight: 32,
                },
            }
        case 'lg':
            return {
                container: {
                    paddingVertical: 14,
                    paddingHorizontal: 18,
                    minHeight: 48,
                    borderRadius: 10,
                },
                text: {
                    fontSize: 18,
                },
                icon: 22,
                dropdown: {
                    maxHeight: 280,
                    borderRadius: 10,
                },
                option: {
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    minHeight: 44,
                },
            }
        case 'xl':
            return {
                container: {
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    minHeight: 52,
                    borderRadius: 12,
                },
                text: {
                    fontSize: 20,
                },
                icon: 24,
                dropdown: {
                    maxHeight: 320,
                    borderRadius: 12,
                },
                option: {
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    minHeight: 48,
                },
            }
        default: // md
            return {
                container: {
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    minHeight: 44,
                    borderRadius: 8,
                },
                text: {
                    fontSize: 16,
                },
                icon: 20,
                dropdown: {
                    maxHeight: 240,
                    borderRadius: 8,
                },
                option: {
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    minHeight: 40,
                },
            }
    }
}

export const getAnimationConfig = (animationType: SelectAnimationType) => {
    switch (animationType) {
        case 'scale':
            return {
                duration: 200,
                spring: {
                    damping: 20,
                    stiffness: 300,
                    mass: 0.8,
                },
            }
        case 'slide':
            return {
                duration: 250,
                spring: {
                    damping: 25,
                    stiffness: 250,
                    mass: 1.0,
                },
            }
        case 'bounce':
            return {
                duration: 300,
                spring: {
                    damping: 15,
                    stiffness: 200,
                    mass: 1.2,
                },
            }
        case 'flip':
            return {
                duration: 350,
                spring: {
                    damping: 20,
                    stiffness: 180,
                    mass: 1.0,
                },
            }
        case 'none':
            return {
                duration: 0,
                spring: {
                    damping: 50,
                    stiffness: 500,
                    mass: 0.5,
                },
            }
        default: // fade
            return {
                duration: 150,
                spring: {
                    damping: 30,
                    stiffness: 400,
                    mass: 0.6,
                },
            }
    }
  }