import { Dimensions, Platform } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// Animation Types
export type ModalAnimationType =
    | 'fade'
    | 'scale'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'bounce'
    | 'flip'

// Modal Variants
export type ModalVariant = 'default' | 'filled' | 'outline' | 'glass' | 'elevated'

// Modal Sizes
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

// Modal Position
export type ModalPosition = 'center' | 'top' | 'bottom'

// Animation Configuration
export interface AnimationConfig {
    duration: number
    damping: number
    stiffness: number
    mass: number
}

// Modal Theme
export interface ModalTheme {
    colors: {
        backdrop: string
        background: string
        border: string
        text: string
        shadow: string
    }
    borderRadius: number
    shadowOpacity: number
    blurRadius?: number
}

// Get animation configuration based on type
export const getAnimationConfig = (type: ModalAnimationType): AnimationConfig => {
    const configs: Record<ModalAnimationType, AnimationConfig> = {
        fade: { duration: 300, damping: 20, stiffness: 300, mass: 1 },
        scale: { duration: 400, damping: 15, stiffness: 200, mass: 1.2 },
        slideUp: { duration: 350, damping: 18, stiffness: 250, mass: 1 },
        slideDown: { duration: 350, damping: 18, stiffness: 250, mass: 1 },
        slideLeft: { duration: 300, damping: 20, stiffness: 280, mass: 1 },
        slideRight: { duration: 300, damping: 20, stiffness: 280, mass: 1 },
        bounce: { duration: 600, damping: 8, stiffness: 150, mass: 1.5 },
        flip: { duration: 500, damping: 12, stiffness: 180, mass: 1.3 }
    }
    return configs[type]
}

// Get initial transform values for animations
export const getInitialTransform = (type: ModalAnimationType) => {
    const transforms: Record<ModalAnimationType, any> = {
        fade: { opacity: 0, scale: 1, translateX: 0, translateY: 0, rotateY: '0deg' },
        scale: { opacity: 0, scale: 0.8, translateX: 0, translateY: 0, rotateY: '0deg' },
        slideUp: { opacity: 1, scale: 1, translateX: 0, translateY: SCREEN_HEIGHT, rotateY: '0deg' },
        slideDown: { opacity: 1, scale: 1, translateX: 0, translateY: -SCREEN_HEIGHT, rotateY: '0deg' },
        slideLeft: { opacity: 1, scale: 1, translateX: SCREEN_WIDTH, translateY: 0, rotateY: '0deg' },
        slideRight: { opacity: 1, scale: 1, translateX: -SCREEN_WIDTH, translateY: 0, rotateY: '0deg' },
        bounce: { opacity: 0, scale: 0.3, translateX: 0, translateY: 0, rotateY: '0deg' },
        flip: { opacity: 0, scale: 1, translateX: 0, translateY: 0, rotateY: '90deg' }
    }
    return transforms[type]
}

// Get final transform values for animations
export const getFinalTransform = () => ({
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
    rotateY: '0deg'
})

// Get modal size styles
export const getModalSizeStyles = (size: ModalSize): ViewStyle => {
    const sizes: Record<ModalSize, ViewStyle> = {
        sm: {
            width: SCREEN_WIDTH * 0.8,
            maxWidth: 320,
            maxHeight: SCREEN_HEIGHT * 0.4,
        },
        md: {
            width: SCREEN_WIDTH * 0.85,
            maxWidth: 400,
            maxHeight: SCREEN_HEIGHT * 0.6,
        },
        lg: {
            width: SCREEN_WIDTH * 0.9,
            maxWidth: 500,
            maxHeight: SCREEN_HEIGHT * 0.75,
        },
        xl: {
            width: SCREEN_WIDTH * 0.95,
            maxWidth: 600,
            maxHeight: SCREEN_HEIGHT * 0.85,
        }
    }
    return sizes[size]
}

// Get modal variant theme
export const getModalTheme = (variant: ModalVariant): ModalTheme => {
    const themes: Record<ModalVariant, ModalTheme> = {
        default: {
            colors: {
                backdrop: 'rgba(0, 0, 0, 0.5)',
                background: '#FFFFFF',
                border: '#E5E7EB',
                text: '#1F2937',
                shadow: '#000000'
            },
            borderRadius: 12,
            shadowOpacity: 0.25
        },
        filled: {
            colors: {
                backdrop: 'rgba(0, 0, 0, 0.6)',
                background: '#1F2937',
                border: '#374151',
                text: '#FFFFFF',
                shadow: '#000000'
            },
            borderRadius: 16,
            shadowOpacity: 0.3
        },
        outline: {
            colors: {
                backdrop: 'rgba(0, 0, 0, 0.4)',
                background: 'transparent',
                border: '#6366F1',
                text: '#1F2937',
                shadow: '#6366F1'
            },
            borderRadius: 12,
            shadowOpacity: 0.2
        },
        glass: {
            colors: {
                backdrop: 'rgba(0, 0, 0, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'rgba(255, 255, 255, 0.2)',
                text: '#1F2937',
                shadow: '#000000'
            },
            borderRadius: 20,
            shadowOpacity: 0.15,
            blurRadius: 20
        },
        elevated: {
            colors: {
                backdrop: 'rgba(0, 0, 0, 0.7)',
                background: '#FFFFFF',
                border: 'transparent',
                text: '#1F2937',
                shadow: '#000000'
            },
            borderRadius: 24,
            shadowOpacity: 0.4
        }
    }
    return themes[variant]
}

// Get position styles
export const getPositionStyles = (position: ModalPosition): ViewStyle => {
    const positions: Record<ModalPosition, ViewStyle> = {
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        top: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 60 : 40
        },
        bottom: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: Platform.OS === 'ios' ? 40 : 20
        }
    }
    return positions[position]
}

// Utility to create shadow styles
export const createShadowStyle = (theme: ModalTheme): ViewStyle => {
    if (Platform.OS === 'ios') {
        return {
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: theme.shadowOpacity,
            shadowRadius: 16
        }
    } else {
        return {
            elevation: 8
        }
    }
}

// Utility to create backdrop blur style (for glass variant)
export const createBackdropBlurStyle = (variant: ModalVariant): ViewStyle => {
    if (variant === 'glass' && Platform.OS === 'ios') {
        return {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
    }
    return {}
}

// Constants
export const MODAL_CONSTANTS = {
    BACKDROP_OPACITY: 0.5,
    ANIMATION_DURATION: 300,
    GESTURE_THRESHOLD: 100,
    SPRING_CONFIG: {
        damping: 20,
        stiffness: 300,
        mass: 1
    }
} as const
