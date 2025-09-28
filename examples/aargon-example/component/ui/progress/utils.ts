export type ProgressVariant = 'default' | 'filled' | 'outlined' | 'gradient' | 'glass' | 'minimal'
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ProgressColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ProgressAnimationType = 'none' | 'smooth' | 'bounce' | 'elastic' | 'spring' | 'pulse' | 'wave'
export type ProgressShape = 'rounded' | 'square' | 'pill'

export interface ProgressTheme {
    colors: {
        primary: string
        secondary: string
        success: string
        warning: string
        error: string
        info: string
        background: string
        backgroundSecondary: string
        border: string
        text: string
        textSecondary: string
    }
    shadows: {
        sm: {
            shadowColor: string
            shadowOffset: { width: number; height: number }
            shadowOpacity: number
            shadowRadius: number
            elevation: number
        }
        md: {
            shadowColor: string
            shadowOffset: { width: number; height: number }
            shadowOpacity: number
            shadowRadius: number
            elevation: number
        }
        lg: {
            shadowColor: string
            shadowOffset: { width: number; height: number }
            shadowOpacity: number
            shadowRadius: number
            elevation: number
        }
    }
    borderRadius: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
        full: number
    }
}

export const defaultProgressTheme: ProgressTheme = {
    colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
        background: '#F3F4F6',
        backgroundSecondary: '#E5E7EB',
        border: '#D1D5DB',
        text: '#111827',
        textSecondary: '#6B7280',
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
    },
    borderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12,
        full: 9999,
    },
}

export const getProgressVariantStyles = (
    variant: ProgressVariant,
    colorScheme: ProgressColorScheme,
    theme: ProgressTheme
) => {
    const baseColor = theme.colors[colorScheme]

    switch (variant) {
        case 'filled':
            return {
                container: {
                    backgroundColor: theme.colors.backgroundSecondary,
                    borderWidth: 0,
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: theme.shadows.sm,
            }

        case 'outlined':
            return {
                container: {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: {},
            }

        case 'gradient':
            return {
                container: {
                    backgroundColor: theme.colors.background,
                    borderWidth: 0,
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: theme.shadows.md,
            }

        case 'glass':
            return {
                container: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: theme.shadows.lg,
            }

        case 'minimal':
            return {
                container: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 0,
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: {},
            }

        default:
            return {
                container: {
                    backgroundColor: theme.colors.background,
                    borderWidth: 0,
                },
                fill: {
                    backgroundColor: baseColor,
                },
                shadow: theme.shadows.sm,
            }
    }
}

export const getProgressSizeStyles = (size: ProgressSize) => {
    switch (size) {
        case 'xs':
            return {
                height: 4,
                borderRadius: 2,
                textSize: 10,
            }
        case 'sm':
            return {
                height: 6,
                borderRadius: 3,
                textSize: 12,
            }
        case 'md':
            return {
                height: 8,
                borderRadius: 4,
                textSize: 14,
            }
        case 'lg':
            return {
                height: 12,
                borderRadius: 6,
                textSize: 16,
            }
        case 'xl':
            return {
                height: 16,
                borderRadius: 8,
                textSize: 18,
            }
        default:
            return {
                height: 8,
                borderRadius: 4,
                textSize: 14,
            }
    }
}

export const getProgressShapeStyles = (shape: ProgressShape, size: ProgressSize) => {
    const sizeStyles = getProgressSizeStyles(size)

    switch (shape) {
        case 'square':
            return {
                borderRadius: 0,
            }
        case 'pill':
            return {
                borderRadius: sizeStyles.height / 2,
            }
        case 'rounded':
        default:
            return {
                borderRadius: sizeStyles.borderRadius,
            }
    }
}

export const getAnimationConfig = (animationType: ProgressAnimationType) => {
    switch (animationType) {
        case 'smooth':
            return {
                damping: 20,
                stiffness: 150,
                mass: 1,
                duration: 800,
            }
        case 'bounce':
            return {
                damping: 8,
                stiffness: 200,
                mass: 1.2,
                duration: 1000,
            }
        case 'elastic':
            return {
                damping: 12,
                stiffness: 100,
                mass: 0.8,
                duration: 1200,
            }
        case 'spring':
            return {
                damping: 15,
                stiffness: 300,
                mass: 1,
                duration: 600,
            }
        case 'pulse':
            return {
                damping: 25,
                stiffness: 200,
                mass: 1,
                duration: 400,
            }
        case 'wave':
            return {
                damping: 18,
                stiffness: 120,
                mass: 1.1,
                duration: 1500,
            }
        case 'none':
        default:
            return {
                damping: 20,
                stiffness: 200,
                mass: 1,
                duration: 300,
            }
    }
}