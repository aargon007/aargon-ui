import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Platform, } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolateColor,
    interpolate,
} from 'react-native-reanimated'
import { getColors, sizeConfig, type AnimatedInputProps } from './utils'

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
    onChangeText,
    ...textInputProps
}, ref) => {
    const inputRef = useRef<TextInput>(null)
    const [isFocused, setIsFocused] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || '')

    // Animation values
    const focusAnimation = useSharedValue(0)
    const scaleAnimation = useSharedValue(1)

    // Forward ref
    useImperativeHandle(ref, () => inputRef.current!)

    // Update internal value when prop changes
    React.useEffect(() => {
        if (value !== undefined) {
            setInputValue(value)
        }
    }, [value])

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

    // Handle text change
    const handleChangeText = (text: string) => {
        setInputValue(text)
        onChangeText?.(text)
    }

    // Get current state for colors
    const currentState = errorMessage ? 'error' : state

    const currentColors = getColors(variant, currentState);
    const currentSize = sizeConfig[size];

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

        // Base style
        const style: any = {
            borderColor,
            backgroundColor,
        }

        // Add transform if needed
        if (transform.length > 0) {
            style.transform = transform
        }

        // Add shadow for glow effect
        if (animationType === 'glow') {
            const shadowOpacity = interpolate(focusAnimation.value, [0, 1], [0, 0.3])

            if (Platform.OS === 'ios') {
                style.shadowColor = currentColors.borderFocus
                style.shadowOffset = { width: 0, height: 0 }
                style.shadowOpacity = shadowOpacity
                style.shadowRadius = interpolate(focusAnimation.value, [0, 1], [0, 8])
            } else {
                style.elevation = interpolate(focusAnimation.value, [0, 1], [0, 4])
            }
        }

        return style
    });

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    };

    // Clear input
    const handleClear = () => {
        setInputValue('')
        onChangeText?.('')
        onClear?.()
        inputRef.current?.focus()
    };

    // Show clear button
    const shouldShowClearButton = showClearButton && inputValue && inputValue.length > 0;

    // Show password toggle
    const shouldShowPasswordToggle = showPasswordToggle || secureTextEntry;

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
                    <Text style={[
                        styles.leftIcon,
                        {
                            fontSize: currentSize.iconSize,
                            color: isFocused ? currentColors.borderFocus : currentColors.label,
                        }
                    ]}>
                        {leftIcon}
                    </Text>
                )}

                {/* Text Input */}
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.input,
                        {
                            fontSize: currentSize.fontSize,
                            color: currentColors.text,
                            paddingHorizontal: leftIcon ? 4 : currentSize.padding,
                            paddingLeft: leftIcon ? 0 : currentSize.padding,
                            paddingRight: (shouldShowClearButton || shouldShowPasswordToggle || rightIcon) ? 4 : currentSize.padding,
                            paddingVertical: textInputProps.multiline ? currentSize.padding : 0,
                        },
                        inputStyle,
                        Platform.OS === 'web' && styles.webInput, // Remove outline for web
                    ]}
                    value={inputValue}
                    secureTextEntry={shouldShowPasswordToggle ? !isPasswordVisible : secureTextEntry}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleChangeText}
                    placeholderTextColor="#9CA3AF"
                    {...textInputProps}
                />

                {/* Right Icons */}
                <View style={styles.rightIcons}>
                    {shouldShowClearButton && (
                        <TouchableOpacity onPress={handleClear} style={styles.iconButton}>
                            <Text style={[
                                styles.iconText,
                                {
                                    fontSize: currentSize.iconSize - 2,
                                    color: currentColors.label,
                                }
                            ]}>
                                ×
                            </Text>
                        </TouchableOpacity>
                    )}

                    {shouldShowPasswordToggle && (
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
                            <Text style={[
                                styles.iconText,
                                {
                                    fontSize: currentSize.iconSize - 2,
                                    color: currentColors.label,
                                }
                            ]}>
                                {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {rightIcon && !shouldShowClearButton && !shouldShowPasswordToggle && (
                        <Text style={[
                            styles.rightIcon,
                            {
                                fontSize: currentSize.iconSize,
                                color: isFocused ? currentColors.borderFocus : currentColors.label,
                            }
                        ]}>
                            {rightIcon}
                        </Text>
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
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        fontWeight: '400',
        textAlignVertical: 'center',
    },
    // Web-specific style to remove outline
    webInput: {
        outlineWidth: 0,
        outlineColor: 'transparent',
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
    iconText: {
        textAlign: 'center',
    },
    helperText: {
        marginTop: 6,
        fontWeight: '400',
    },
})

export default AnimatedInput;
