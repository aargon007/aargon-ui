// utils.ts
import { type TextInputProps, type ViewStyle, type TextStyle, } from 'react-native'

// Types
export type InputVariant = 'default' | 'filled' | 'outline'
export type InputSize = 'sm' | 'md' | 'lg'
export type InputState = 'default' | 'success' | 'warning' | 'error'
export type AnimationType = 'none' | 'scale' | 'glow' | 'bounce'

export interface AnimatedInputProps extends Omit<TextInputProps, 'style'> {
    label?: string
    helperText?: string
    errorMessage?: string
    variant?: InputVariant
    size?: InputSize
    state?: InputState
    animationType?: AnimationType
    required?: boolean
    leftIcon?: string
    rightIcon?: string
    showClearButton?: boolean
    showPasswordToggle?: boolean
    onClear?: () => void
    containerStyle?: ViewStyle
    inputStyle?: TextStyle
    labelStyle?: TextStyle
    helperStyle?: TextStyle
    errorStyle?: TextStyle
}

// Get size values inline
export const sizeConfig = {
    sm: { height: 36, fontSize: 14, padding: 8, iconSize: 16 },
    md: { height: 44, fontSize: 16, padding: 12, iconSize: 18 },
    lg: { height: 52, fontSize: 18, padding: 16, iconSize: 20 },
}

// Define colors inline
export const getColors = (variant: InputVariant, state: InputState) => {
    const colors = {
        default: {
            border: '#E5E7EB',
            borderFocus: '#3B82F6',
            background: variant === 'filled' ? '#F9FAFB' : 'transparent',
            text: '#1F2937',
            label: '#374151',
            helper: '#6B7280',
        },
        success: {
            border: '#10B981',
            borderFocus: '#059669',
            background: variant === 'filled' ? '#ECFDF5' : 'transparent',
            text: '#1F2937',
            label: '#059669',
            helper: '#059669',
        },
        warning: {
            border: '#F59E0B',
            borderFocus: '#D97706',
            background: variant === 'filled' ? '#FFFBEB' : 'transparent',
            text: '#1F2937',
            label: '#D97706',
            helper: '#D97706',
        },
        error: {
            border: '#EF4444',
            borderFocus: '#DC2626',
            background: variant === 'filled' ? '#FEF2F2' : 'transparent',
            text: '#1F2937',
            label: '#DC2626',
            helper: '#DC2626',
        },
    };

    return colors[state];
}
