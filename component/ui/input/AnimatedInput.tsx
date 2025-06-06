import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    type TextInputProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolateColor,
    interpolate,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'

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
    leftIcon?: keyof typeof Feather.glyphMap
    rightIcon?: keyof typeof Feather.glyphMap
    showClearButton?: boolean
    showPasswordToggle?: boolean
    onClear?: () => void
    containerStyle?: ViewStyle
    inputStyle?: TextStyle
    labelStyle?: TextStyle
    helperStyle?: TextStyle
    errorStyle?: TextStyle
}

export const AnimatedInput = forwardRef<TextInput, AnimatedInputProps>(({
    label,
    helperText,
    errorMessage,
    variant = 'default',
    size = 'md',
    state = 'default',
    animationType = 'scale',
    required = false,
    leftIcon,
    rightIcon,
    showClearButton = false,
    showPasswordToggle = false,
    onClear,
    containerStyle,
    inputStyle,
    labelStyle,
    helperStyle,
    errorStyle,
    value,
    secureTextEntry,
    ...textInputProps
}, ref) => {
    const inputRef = useRef<TextInput>(null)
    const [isFocused, setIsFocused] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    // Animation values
    const focusAnimation = useSharedValue(0)
    const scaleAnimation = useSharedValue(1)

    // Forward ref
    useImperativeHandle(ref, () => inputRef.current!)

    // Handle focus
    const handleFocus = (e: any) => {
        setIsFocused(true)
        focusAnimation.value = withSpring(1, { damping: 15, stiffness: 300 })

        if (animationType === 'scale' || animationType === 'bounce') {
            scaleAnimation.value = withSpring(1.02, { damping: 15, stiffness: 300 })
        }

        textInputProps.onFocus?.(e)
    }

    // Handle blur
    const handleBlur = (e: any) => {
        setIsFocused(false)
        focusAnimation.value = withTiming(0, { duration: 200 })
        scaleAnimation.value = withSpring(1, { damping: 15, stiffness: 300 })

        textInputProps.onBlur?.(e)
    }

    // Get current state for colors
    const currentState = errorMessage ? 'error' : state

    // Define colors inline
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
    }

    // Get size values inline
    const sizeConfig = {
        sm: { height: 36, fontSize: 14, padding: 8, iconSize: 16 },
        md: { height: 44, fontSize: 16, padding: 12, iconSize: 18 },
        lg: { height: 52, fontSize: 18, padding: 16, iconSize: 20 },
    }

    const currentColors = colors[currentState]
    const currentSize = sizeConfig[size]

    // Animated styles
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            focusAnimation.value,
            [0, 1],
            [currentColors.border, currentColors.borderFocus]
        )

        const backgroundColor = interpolateColor(
            focusAnimation.value,
            [0, 1],
            [currentColors.background, currentColors.background]
        )

        let transform = []

        if (animationType === 'scale' || animationType === 'bounce') {
            transform.push({ scale: scaleAnimation.value })
        }

        if (animationType === 'glow') {
            const shadowOpacity = interpolate(focusAnimation.value, [0, 1], [0, 0.3])
            return {
                borderColor,
                backgroundColor,
                shadowColor: currentColors.borderFocus,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity,
                shadowRadius: interpolate(focusAnimation.value, [0, 1], [0, 8]),
                elevation: interpolate(focusAnimation.value, [0, 1], [0, 4]),
            }
        }

        return {
            borderColor,
            backgroundColor,
            transform,
        }
    })

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    // Clear input
    const handleClear = () => {
        onClear?.()
    }

    // Show clear button
    const shouldShowClearButton = showClearButton && value && value.length > 0

    // Show password toggle
    const shouldShowPasswordToggle = showPasswordToggle || secureTextEntry

    return (
        <View style={[styles.wrapper, containerStyle]}>
            {/* Label */}
            {label && (
                <Text style={[
                    styles.label,
                    {
                        color: currentColors.label,
                        fontSize: currentSize.fontSize - 2,
                    },
                    labelStyle
                ]}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}

            {/* Input Container */}
            <Animated.View style={[
                styles.container,
                {
                    height: textInputProps.multiline ? undefined : currentSize.height,
                    minHeight: textInputProps.multiline ? currentSize.height : undefined,
                    borderWidth: variant === 'outline' ? 2 : 1,
                    borderRadius: variant === 'outline' ? 8 : 6,
                },
                containerAnimatedStyle,
            ]}>
                {/* Left Icon */}
                {leftIcon && (
                    <Feather
                        name={leftIcon}
                        size={currentSize.iconSize}
                        color={isFocused ? currentColors.borderFocus : currentColors.label}
                        style={styles.leftIcon}
                    />
                )}

                {/* Text Input */}
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.input,
                        {
                            fontSize: currentSize.fontSize,
                            color: currentColors.text,
                            paddingHorizontal: currentSize.padding,
                            paddingVertical: textInputProps.multiline ? currentSize.padding : 0,
                        },
                        inputStyle,
                    ]}
                    value={value}
                    secureTextEntry={shouldShowPasswordToggle ? !isPasswordVisible : secureTextEntry}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor="#9CA3AF"
                    {...textInputProps}
                />

                {/* Right Icons */}
                <View style={styles.rightIcons}>
                    {shouldShowClearButton && (
                        <TouchableOpacity onPress={handleClear} style={styles.iconButton}>
                            <Feather
                                name="x"
                                size={currentSize.iconSize}
                                color={currentColors.label}
                            />
                        </TouchableOpacity>
                    )}

                    {shouldShowPasswordToggle && (
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
                            <Feather
                                name={isPasswordVisible ? "eye-off" : "eye"}
                                size={currentSize.iconSize}
                                color={currentColors.label}
                            />
                        </TouchableOpacity>
                    )}

                    {rightIcon && !shouldShowClearButton && !shouldShowPasswordToggle && (
                        <Feather
                            name={rightIcon}
                            size={currentSize.iconSize}
                            color={isFocused ? currentColors.borderFocus : currentColors.label}
                            style={styles.rightIcon}
                        />
                    )}
                </View>
            </Animated.View>

            {/* Helper/Error Text */}
            {(helperText || errorMessage) && (
                <Text style={[
                    styles.helperText,
                    {
                        color: currentColors.helper,
                        fontSize: currentSize.fontSize - 4,
                    },
                    errorMessage ? errorStyle : helperStyle,
                ]}>
                    {errorMessage || helperText}
                </Text>
            )}
        </View>
    )
})

AnimatedInput.displayName = 'AnimatedInput'

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
    },
    required: {
        color: '#EF4444',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        fontWeight: '400',
        textAlignVertical: 'top',
    },
    leftIcon: {
        marginLeft: 12,
        marginRight: 8,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
    },
    rightIcon: {
        marginLeft: 8,
    },
    iconButton: {
        padding: 4,
        marginLeft: 4,
    },
    helperText: {
        marginTop: 6,
        fontWeight: '400',
    },
})