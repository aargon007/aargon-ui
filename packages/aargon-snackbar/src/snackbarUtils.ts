import { Dimensions, Platform } from 'react-native'
import {
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    interpolate,
    Easing,
    runOnJS
} from 'react-native-reanimated'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// Types
export type SnackbarType = 'info' | 'success' | 'warning' | 'error' | 'neutral'
export type SnackbarVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'glass' | 'minimal'
export type SnackbarPosition = 'top' | 'bottom' | 'left' | 'right'
export type SnackbarAnimation = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip' | 'elastic' | 'none'

export interface SnackbarAction {
    label: string
    onPress: () => void
    color?: string
    disabled?: boolean
}

export interface SnackbarConfig {
    id?: string
    message: string
    type?: SnackbarType
    variant?: SnackbarVariant
    position?: SnackbarPosition
    animation?: SnackbarAnimation
    duration?: number
    autoDismiss?: boolean
    dismissible?: boolean
    swipeToDismiss?: boolean
    showProgress?: boolean
    icon?: string
    action?: SnackbarAction
    onShow?: () => void
    onHide?: () => void
    onPress?: () => void
    style?: any
    textStyle?: any
}

// Animation configurations
export const getAnimationConfig = (animation: SnackbarAnimation) => {
    const configs = {
        slide: {
            spring: { damping: 20, stiffness: 300, mass: 1 },
            timing: { duration: 300, easing: Easing.out(Easing.cubic) }
        },
        fade: {
            spring: { damping: 15, stiffness: 200, mass: 0.8 },
            timing: { duration: 250, easing: Easing.inOut(Easing.ease) }
        },
        scale: {
            spring: { damping: 18, stiffness: 400, mass: 0.9 },
            timing: { duration: 280, easing: Easing.out(Easing.back(1.2)) }
        },
        bounce: {
            spring: { damping: 12, stiffness: 500, mass: 1.2 },
            timing: { duration: 400, easing: Easing.bounce }
        },
        flip: {
            spring: { damping: 25, stiffness: 350, mass: 1.1 },
            timing: { duration: 350, easing: Easing.out(Easing.cubic) }
        },
        elastic: {
            spring: { damping: 8, stiffness: 300, mass: 1.5 },
            timing: { duration: 500, easing: Easing.elastic(2) }
        },
        none: {
            spring: { damping: 20, stiffness: 300, mass: 1 },
            timing: { duration: 0 }
        }
    }
    return configs[animation] || configs.slide
}

// Color schemes
export const getTypeColors = (type: SnackbarType) => {
    const colors = {
        info: {
            primary: '#3B82F6',
            secondary: '#EFF6FF',
            text: '#1E40AF',
            border: '#BFDBFE'
        },
        success: {
            primary: '#10B981',
            secondary: '#ECFDF5',
            text: '#047857',
            border: '#A7F3D0'
        },
        warning: {
            primary: '#F59E0B',
            secondary: '#FFFBEB',
            text: '#D97706',
            border: '#FDE68A'
        },
        error: {
            primary: '#EF4444',
            secondary: '#FEF2F2',
            text: '#DC2626',
            border: '#FECACA'
        },
        neutral: {
            primary: '#6B7280',
            secondary: '#F9FAFB',
            text: '#374151',
            border: '#E5E7EB'
        }
    }
    return colors[type] || colors.info
}

// Variant styles
export const getVariantStyles = (variant: SnackbarVariant, colors: any) => {
    const variants = {
        default: {
            backgroundColor: colors.secondary,
            borderColor: colors.border,
            borderWidth: 1
        },
        filled: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            borderWidth: 0
        },
        outlined: {
            backgroundColor: 'transparent',
            borderColor: colors.primary,
            borderWidth: 2
        },
        soft: {
            backgroundColor: colors.secondary,
            borderColor: 'transparent',
            borderWidth: 0
        },
        glass: {
            backgroundColor: `${colors.primary}20`,
            borderColor: `${colors.primary}40`,
            borderWidth: 1
        },
        minimal: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0
        }
    }
    return variants[variant] || variants.default
}

// Position calculations
export const getPositionStyles = (position: SnackbarPosition) => {
    const safeAreaTop = Platform.OS === 'ios' ? 44 : 24
    const safeAreaBottom = Platform.OS === 'ios' ? 34 : 24

    const positions = {
        top: {
            top: safeAreaTop + 20,
            left: 20,
            right: 20,
            bottom: 0//undefined
        },
        bottom: {
            top: 0,// undefined,
            left: 20,
            right: 20,
            bottom: safeAreaBottom + 20
        },
        left: {
            top: '50%',
            left: 20,
            right: 0,// undefined,
            bottom: 0,//undefined,
            transform: [{ translateY: -25 }]
        },
        right: {
            top: '50%',
            left: 0,//undefined,
            right: 20,
            bottom: 0,//undefined,
            transform: [{ translateY: -25 }]
        }
    }
    return positions[position] || positions.bottom
}

// Animation functions
export const createEnterAnimation = (
    animation: SnackbarAnimation,
    position: SnackbarPosition,
    translateX: any,
    translateY: any,
    scale: any,
    opacity: any,
    rotation: any
) => {
    const config = getAnimationConfig(animation)

    switch (animation) {
        case 'slide':
            const slideDistance = position === 'top' ? -100 : position === 'bottom' ? 100 :
                position === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH

            if (position === 'left' || position === 'right') {
                translateX.value = withSpring(0, config.spring)
            } else {
                translateY.value = withSpring(0, config.spring)
            }
            opacity.value = withTiming(1, config.timing)
            break

        case 'fade':
            opacity.value = withTiming(1, config.timing)
            break

        case 'scale':
            scale.value = withSpring(1, config.spring)
            opacity.value = withTiming(1, config.timing)
            break

        case 'bounce':
            scale.value = withSequence(
                withSpring(1.1, config.spring),
                withSpring(1, config.spring)
            )
            opacity.value = withTiming(1, config.timing)
            break

        case 'flip':
            rotation.value = withSpring(0, config.spring)
            opacity.value = withTiming(1, config.timing)
            break

        case 'elastic':
            scale.value = withSpring(1, config.spring)
            translateY.value = withSpring(0, config.spring)
            opacity.value = withTiming(1, config.timing)
            break

        default:
            opacity.value = 1
            scale.value = 1
            translateX.value = 0
            translateY.value = 0
            rotation.value = 0
    }
}

export const createExitAnimation = (
    animation: SnackbarAnimation,
    position: SnackbarPosition,
    translateX: any,
    translateY: any,
    scale: any,
    opacity: any,
    rotation: any,
    onComplete?: () => void
) => {
    const config = getAnimationConfig(animation)

    switch (animation) {
        case 'slide':
            const slideDistance = position === 'top' ? -100 : position === 'bottom' ? 100 :
                position === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH

            if (position === 'left' || position === 'right') {
                translateX.value = withTiming(slideDistance, config.timing, () => {
                    onComplete && runOnJS(onComplete)()
                })
            } else {
                translateY.value = withTiming(slideDistance, config.timing, () => {
                    onComplete && runOnJS(onComplete)()
                })
            }
            opacity.value = withTiming(0, { duration: config.timing.duration / 2 })
            break

        case 'fade':
            opacity.value = withTiming(0, config.timing, () => {
                onComplete && runOnJS(onComplete)()
            })
            break

        case 'scale':
            scale.value = withTiming(0.8, config.timing)
            opacity.value = withTiming(0, config.timing, () => {
                onComplete && runOnJS(onComplete)()
            })
            break

        case 'bounce':
            scale.value = withSequence(
                withSpring(1.1, config.spring),
                withTiming(0, { duration: 200 }, () => {
                    onComplete && runOnJS(onComplete)()
                })
            )
            opacity.value = withDelay(150, withTiming(0, { duration: 200 }))
            break

        case 'flip':
            rotation.value = withTiming(180, config.timing)
            opacity.value = withTiming(0, config.timing, () => {
                onComplete && runOnJS(onComplete)()
            })
            break

        case 'elastic':
            scale.value = withTiming(0, config.timing)
            translateY.value = withTiming(position === 'top' ? -50 : 50, config.timing)
            opacity.value = withTiming(0, config.timing, () => {
                onComplete && runOnJS(onComplete)()
            })
            break

        default:
            onComplete && runOnJS(onComplete)()
    }
}

// Gesture calculations
export const calculateSwipeProgress = (
    translationX: number,
    translationY: number,
    position: SnackbarPosition
) => {
    const threshold = 100

    switch (position) {
        case 'top':
            return Math.max(0, Math.min(1, -translationY / threshold))
        case 'bottom':
            return Math.max(0, Math.min(1, translationY / threshold))
        case 'left':
            return Math.max(0, Math.min(1, -translationX / threshold))
        case 'right':
            return Math.max(0, Math.min(1, translationX / threshold))
        default:
            return 0
    }
}

// Utility functions
export const generateId = () => {
    return `snackbar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const getTextColor = (variant: SnackbarVariant, colors: any) => {
    if (variant === 'filled') {
        return '#FFFFFF'
    }
    return colors.text
}

export const getIconColor = (variant: SnackbarVariant, colors: any) => {
    if (variant === 'filled') {
        return '#FFFFFF'
    }
    return colors.primary
}
