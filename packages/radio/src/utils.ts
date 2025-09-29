// utils.ts - Optimized for direct animation
export type RadioVariant = 'default' | 'filled' | 'outline' | 'ghost' | 'soft' | 'minimal'
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type RadioColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type RadioAnimationType = 'scale' | 'bounce' | 'fade' | 'slide' | 'elastic' | 'pulse' | 'none'
export type RadioLabelPosition = 'left' | 'right'

export interface RadioColors {
    border: string
    borderSelected: string
    background: string
    backgroundSelected: string
    dot: string
    text: string
    textDisabled: string
    focus: string
}

export interface RadioSizes {
    container: {
        width: number
        height: number
        borderRadius: number
        borderWidth: number
    }
    dot: {
        width: number
        height: number
        borderRadius: number
    }
    text: {
        fontSize: number
        lineHeight: number
    }
    spacing: number
}

export interface RadioAnimationConfig {
    duration: number
    damping: number
    stiffness: number
    mass: number
    overshootClamping: boolean
}

// Color schemes
export const getRadioColors = (colorScheme: RadioColorScheme, variant: RadioVariant): RadioColors => {
    const colorMap = {
        primary: {
            main: '#6366F1',
            light: '#E0E7FF',
            dark: '#4338CA',
        },
        secondary: {
            main: '#64748B',
            light: '#F1F5F9',
            dark: '#475569',
        },
        success: {
            main: '#10B981',
            light: '#D1FAE5',
            dark: '#059669',
        },
        warning: {
            main: '#F59E0B',
            light: '#FEF3C7',
            dark: '#D97706',
        },
        error: {
            main: '#EF4444',
            light: '#FEE2E2',
            dark: '#DC2626',
        },
        info: {
            main: '#3B82F6',
            light: '#DBEAFE',
            dark: '#2563EB',
        },
    }

    const colors = colorMap[colorScheme]

    switch (variant) {
        case 'filled':
            return {
                border: colors.main,
                borderSelected: colors.main,
                background: '#FFFFFF',
                backgroundSelected: colors.main,
                dot: '#FFFFFF',
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
        case 'outline':
            return {
                border: '#D1D5DB',
                borderSelected: colors.main,
                background: 'transparent',
                backgroundSelected: 'transparent',
                dot: colors.main,
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
        case 'ghost':
            return {
                border: 'transparent',
                borderSelected: colors.main,
                background: 'transparent',
                backgroundSelected: colors.light,
                dot: colors.main,
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
        case 'soft':
            return {
                border: colors.light,
                borderSelected: colors.main,
                background: colors.light,
                backgroundSelected: colors.light,
                dot: colors.main,
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
        case 'minimal':
            return {
                border: '#E5E7EB',
                borderSelected: colors.main,
                background: 'transparent',
                backgroundSelected: 'transparent',
                dot: colors.main,
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
        default:
            return {
                border: '#D1D5DB',
                borderSelected: colors.main,
                background: '#FFFFFF',
                backgroundSelected: '#FFFFFF',
                dot: colors.main,
                text: '#374151',
                textDisabled: '#9CA3AF',
                focus: colors.light,
            }
    }
}

// Size configurations
export const getRadioSizes = (size: RadioSize): RadioSizes => {
    switch (size) {
        case 'xs':
            return {
                container: {
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                },
                dot: {
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                },
                text: {
                    fontSize: 12,
                    lineHeight: 16,
                },
                spacing: 6,
            }
        case 'sm':
            return {
                container: {
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 1,
                },
                dot: {
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                },
                text: {
                    fontSize: 14,
                    lineHeight: 18,
                },
                spacing: 8,
            }
        case 'md':
            return {
                container: {
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                },
                dot: {
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                },
                text: {
                    fontSize: 16,
                    lineHeight: 20,
                },
                spacing: 10,
            }
        case 'lg':
            return {
                container: {
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                },
                dot: {
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                },
                text: {
                    fontSize: 18,
                    lineHeight: 24,
                },
                spacing: 12,
            }
        case 'xl':
            return {
                container: {
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: 2,
                },
                dot: {
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                },
                text: {
                    fontSize: 20,
                    lineHeight: 28,
                },
                spacing: 14,
            }
        default:
            return {
                container: {
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                },
                dot: {
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                },
                text: {
                    fontSize: 16,
                    lineHeight: 20,
                },
                spacing: 10,
            }
    }
}

// Animation configurations
export const getRadioAnimationConfig = (animationType: RadioAnimationType): RadioAnimationConfig => {
    switch (animationType) {
        case 'scale':
            return {
                duration: 150,
                damping: 25,
                stiffness: 500,
                mass: 0.4,
                overshootClamping: false,
            }
        case 'bounce':
            return {
                duration: 200,
                damping: 15,
                stiffness: 400,
                mass: 0.5,
                overshootClamping: false,
            }
        case 'fade':
            return {
                duration: 120,
                damping: 30,
                stiffness: 600,
                mass: 0.3,
                overshootClamping: true,
            }
        case 'slide':
            return {
                duration: 180,
                damping: 28,
                stiffness: 450,
                mass: 0.4,
                overshootClamping: false,
            }
        case 'elastic':
            return {
                duration: 250,
                damping: 12,
                stiffness: 300,
                mass: 0.6,
                overshootClamping: false,
            }
        case 'pulse':
            return {
                duration: 100,
                damping: 35,
                stiffness: 700,
                mass: 0.2,
                overshootClamping: true,
            }
        case 'none':
            return {
                duration: 0,
                damping: 20,
                stiffness: 300,
                mass: 1,
                overshootClamping: true,
            }
        default:
            return {
                duration: 150,
                damping: 25,
                stiffness: 500,
                mass: 0.4,
                overshootClamping: false,
            }
    }
}

// Feedback animation config
export const getFeedbackAnimationConfig = () => ({
    duration: 80,
    damping: 30,
    stiffness: 600,
    mass: 0.3,
    overshootClamping: false,
})
