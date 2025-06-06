import type { ViewStyle, TextStyle } from 'react-native'

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'neutral'
export type ToastVariant = 'default' | 'filled' | 'outlined' | 'soft' | 'minimal' | 'accent'
export type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type ToastAnimation = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip' | 'zoom' | 'none'
export type ToastSize = 'sm' | 'md' | 'lg'

export interface ToastConfig {
    id: string
    title?: string
    message: string
    type?: ToastType
    variant?: ToastVariant
    position?: ToastPosition
    animation?: ToastAnimation
    size?: ToastSize
    duration?: number
    showProgress?: boolean
    style?: ViewStyle
    titleStyle?: TextStyle
    messageStyle?: TextStyle
    onPress?: () => void
    onDismiss?: () => void
    testID?: string
}

export interface ToastOptions {
    title?: string
    message: string
    type?: ToastType
    variant?: ToastVariant
    position?: ToastPosition
    animation?: ToastAnimation
    size?: ToastSize
    duration?: number
    showProgress?: boolean
    style?: ViewStyle
    titleStyle?: TextStyle
    messageStyle?: TextStyle
    onPress?: () => void
    onDismiss?: () => void
    testID?: string
}

export interface PromiseToastOptions {
    loading: {
        title?: string
        message: string
    }
    success: {
        title?: string
        message: string
    }
    error: {
        title?: string
        message: string
    }
}

export const DEFAULT_TOAST_CONFIG: Partial<ToastConfig> = {
    type: 'info',
    variant: 'default',
    position: 'top',
    animation: 'slide',
    size: 'md',
    duration: 4000,
    showProgress: false,
}

export const getToastColors = (type: ToastType, variant: ToastVariant) => {
    const colorMap = {
        info: {
            primary: '#3b82f6',
            background: '#eff6ff',
            border: '#bfdbfe',
            text: '#1e40af',
        },
        success: {
            primary: '#10b981',
            background: '#ecfdf5',
            border: '#a7f3d0',
            text: '#047857',
        },
        warning: {
            primary: '#f59e0b',
            background: '#fffbeb',
            border: '#fde68a',
            text: '#d97706',
        },
        error: {
            primary: '#ef4444',
            background: '#fef2f2',
            border: '#fecaca',
            text: '#dc2626',
        },
        neutral: {
            primary: '#6b7280',
            background: '#f9fafb',
            border: '#d1d5db',
            text: '#374151',
        },
    }

    const colors = colorMap[type]

    switch (variant) {
        case 'filled':
            return {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                textColor: '#ffffff',
                titleColor: '#ffffff',
            }
        case 'outlined':
            return {
                backgroundColor: '#ffffff',
                borderColor: colors.primary,
                textColor: colors.text,
                titleColor: colors.text,
            }
        case 'soft':
            return {
                backgroundColor: colors.background,
                borderColor: colors.border,
                textColor: colors.text,
                titleColor: colors.text,
            }
        case 'minimal':
            return {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textColor: colors.text,
                titleColor: colors.text,
            }
        case 'accent':
            return {
                backgroundColor: colors.background,
                borderColor: colors.primary,
                textColor: colors.text,
                titleColor: colors.primary,
            }
        default:
            return {
                backgroundColor: '#ffffff',
                borderColor: colors.border,
                textColor: colors.text,
                titleColor: colors.text,
            }
    }
}

export const getToastSizeStyles = (size: ToastSize) => {
    switch (size) {
        case 'sm':
            return {
                padding: 12,
                titleSize: 14,
                messageSize: 12,
                iconSize: 16,
                borderRadius: 6,
                maxWidth: 280,
            }
        case 'lg':
            return {
                padding: 20,
                titleSize: 18,
                messageSize: 16,
                iconSize: 22,
                borderRadius: 12,
                maxWidth: 400,
            }
        default: // md
            return {
                padding: 16,
                titleSize: 16,
                messageSize: 14,
                iconSize: 20,
                borderRadius: 8,
                maxWidth: 340,
            }
    }
}

export const getToastIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return 'check-circle'
        case 'error':
            return 'x-circle'
        case 'warning':
            return 'alert-triangle'
        case 'info':
            return 'info'
        case 'neutral':
            return 'message-circle'
        default:
            return 'info'
    }
}

export const generateToastId = () => {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const getPositionStyles = (position: ToastPosition) => {
    const baseStyles = {
        position: 'absolute' as const,
        zIndex: 9999,
    }

    switch (position) {
        case 'top':
            return {
                ...baseStyles,
                top: 60,
                left: 20,
                right: 20,
                alignItems: 'center' as const,
            }
        case 'bottom':
            return {
                ...baseStyles,
                bottom: 60,
                left: 20,
                right: 20,
                alignItems: 'center' as const,
            }
        case 'top-left':
            return {
                ...baseStyles,
                top: 60,
                left: 20,
                alignItems: 'flex-start' as const,
            }
        case 'top-right':
            return {
                ...baseStyles,
                top: 60,
                right: 20,
                alignItems: 'flex-end' as const,
            }
        case 'bottom-left':
            return {
                ...baseStyles,
                bottom: 60,
                left: 20,
                alignItems: 'flex-start' as const,
            }
        case 'bottom-right':
            return {
                ...baseStyles,
                bottom: 60,
                right: 20,
                alignItems: 'flex-end' as const,
            }
        default:
            return {
                ...baseStyles,
                top: 60,
                left: 20,
                right: 20,
                alignItems: 'center' as const,
            }
    }
}