"use client"
import React, { useEffect } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    type ViewStyle,
    type TextStyle
} from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    interpolateColor,
    runOnJS,
    withSequence,
    Easing,
} from 'react-native-reanimated'
import { Feather } from "@expo/vector-icons"

export type CheckboxVariant = "default" | "filled" | "outline" | "ghost" | "rounded"
export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl"
export type CheckboxState = "unchecked" | "checked" | "indeterminate"
export type AnimationType = "scale" | "bounce" | "slide" | "fade" | "rotate" | "elastic"

export interface CheckboxTheme {
    colors: {
        primary: string
        secondary: string
        success: string
        warning: string
        error: string
        background: string
        backgroundChecked: string
        border: string
        borderChecked: string
        borderFocused: string
        text: string
        textDisabled: string
        checkmark: string
        indeterminate: string
    }
    borderRadius: number
    borderWidth: number
    fontFamily?: string
}

export interface AnimatedCheckboxProps {
    /** Current checked state */
    checked?: boolean
    /** Checkbox state (unchecked, checked, indeterminate) */
    state?: CheckboxState
    /** Callback when checkbox state changes */
    onPress?: (checked: boolean) => void
    /** Label text */
    label?: string
    /** Description text */
    description?: string
    /** Custom label content */
    labelContent?: React.ReactNode
    /** Checkbox variant */
    variant?: CheckboxVariant
    /** Size of the checkbox */
    size?: CheckboxSize
    /** Color scheme */
    colorScheme?: "primary" | "secondary" | "success" | "warning" | "error"
    /** Whether the checkbox is disabled */
    disabled?: boolean
    /** Animation type */
    animationType?: AnimationType
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Custom checkmark icon */
    checkIcon?: keyof typeof Feather.glyphMap
    /** Custom indeterminate icon */
    indeterminateIcon?: keyof typeof Feather.glyphMap
    /** Label position */
    labelPosition?: "right" | "left"
    /** Custom theme */
    theme?: Partial<CheckboxTheme>
    /** Additional container styles */
    style?: ViewStyle
    /** Additional checkbox styles */
    checkboxStyle?: ViewStyle
    /** Additional label styles */
    labelStyle?: TextStyle
    /** Additional description styles */
    descriptionStyle?: TextStyle
    /** Whether to show focus ring */
    showFocusRing?: boolean
    /** Accessibility label */
    accessibilityLabel?: string
    /** Test ID for testing */
    testID?: string
    /** Whether checkbox should take full width */
    fullWidth?: boolean
    /** Custom border radius */
    borderRadius?: number
    /** Whether to use haptic feedback */
    hapticFeedback?: boolean
}

const defaultTheme: CheckboxTheme = {
    colors: {
        primary: "#6366F1",
        secondary: "#64748B",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        background: "#FFFFFF",
        backgroundChecked: "#6366F1",
        border: "#D1D5DB",
        borderChecked: "#6366F1",
        borderFocused: "#93C5FD",
        text: "#374151",
        textDisabled: "#9CA3AF",
        checkmark: "#FFFFFF",
        indeterminate: "#FFFFFF",
    },
    borderRadius: 4,
    borderWidth: 2,
    fontFamily: undefined,
}

// Animation configurations
const springConfig = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
}

const bounceConfig = {
    damping: 12,
    stiffness: 400,
    mass: 0.6,
}

const elasticConfig = {
    damping: 8,
    stiffness: 200,
    mass: 1,
}

export const AnimatedCheckbox = ({
    checked = false,
    state,
    onPress,
    label,
    description,
    labelContent,
    variant = "default",
    size = "md",
    colorScheme = "primary",
    disabled = false,
    animationType = "scale",
    animationDuration = 200,
    checkIcon = "check",
    indeterminateIcon = "minus",
    labelPosition = "right",
    theme,
    style,
    checkboxStyle,
    labelStyle,
    descriptionStyle,
    showFocusRing = false,
    accessibilityLabel,
    testID,
    fullWidth = false,
    borderRadius,
    hapticFeedback = true,
}: AnimatedCheckboxProps) => {
    // Merge theme with default
    const mergedTheme = { ...defaultTheme, ...theme }

    // Determine current state
    const currentState = state || (checked ? "checked" : "unchecked")
    const isChecked = currentState === "checked"
    const isIndeterminate = currentState === "indeterminate"
    const isActive = isChecked || isIndeterminate

    // Animation values
    const scale = useSharedValue(1)
    const checkmarkScale = useSharedValue(0)
    const checkmarkOpacity = useSharedValue(0)
    const rotation = useSharedValue(0)
    const slideX = useSharedValue(-20)
    const borderWidth = useSharedValue(mergedTheme.borderWidth)
    const focusRingScale = useSharedValue(0)
    const pressScale = useSharedValue(1)

    // Get styles
    const sizeStyles = getSizeStyles(size)
    const colorStyles = getColorStyles(colorScheme, mergedTheme)

    // Initialize animation values
    useEffect(() => {
        animateToState(isActive)
    }, [isActive, animationType])

    // Animation function
    const animateToState = (active: boolean) => {
        const targetScale = active ? 1 : 0
        const targetOpacity = active ? 1 : 0
        const targetSlideX = active ? 0 : -20
        const targetRotation = active ? 0 : -90

        switch (animationType) {
            case "scale":
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration,
                    easing: Easing.out(Easing.cubic)
                })
                break

            case "bounce":
                checkmarkScale.value = active
                    ? withSequence(
                        withSpring(1.3, bounceConfig),
                        withSpring(1, springConfig)
                    )
                    : withSpring(0, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, { duration: animationDuration / 2 })
                break

            case "slide":
                slideX.value = withSpring(targetSlideX, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, { duration: animationDuration })
                checkmarkScale.value = withSpring(targetScale, springConfig)
                break

            case "fade":
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration,
                    easing: active ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
                })
                checkmarkScale.value = 1
                break

            case "rotate":
                rotation.value = withSpring(targetRotation, springConfig)
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, { duration: animationDuration })
                break

            case "elastic":
                checkmarkScale.value = active
                    ? withSequence(
                        withSpring(1.5, elasticConfig),
                        withSpring(0.9, elasticConfig),
                        withSpring(1, springConfig)
                    )
                    : withSpring(0, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, { duration: animationDuration / 2 })
                break

            default:
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, { duration: animationDuration })
                break
        }

        // Border animation
        borderWidth.value = withSpring(active ? 0 : mergedTheme.borderWidth, springConfig)
    }

    // Handle press
    const handlePress = () => {
        if (disabled) return

        // Press feedback animation
        pressScale.value = withSequence(
            withSpring(0.95, { damping: 15, stiffness: 400 }),
            withSpring(1, springConfig)
        )

        // Focus ring animation
        if (showFocusRing) {
            focusRingScale.value = withSequence(
                withSpring(1.2, springConfig),
                withSpring(0, springConfig)
            )
        }

        // Haptic feedback
        if (hapticFeedback) {
            // In a real app, you'd use Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }

        // Call callback
        if (onPress) {
            const newChecked = currentState === "unchecked"
            runOnJS(onPress)(newChecked)
        }
    }

    // Animated styles
    const animatedCheckboxStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            Number(isActive),
            [0, 1],
            [mergedTheme.colors.background, colorStyles.backgroundChecked]
        )

        const borderColor = interpolateColor(
            Number(isActive),
            [0, 1],
            [mergedTheme.colors.border, colorStyles.borderChecked]
        )

        return {
            backgroundColor,
            borderColor,
            borderWidth: borderWidth.value,
            transform: [{ scale: pressScale.value }],
            opacity: disabled ? 0.5 : 1,
        }
    })

    const animatedCheckmarkStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: checkmarkScale.value },
                { rotate: `${rotation.value}deg` },
                { translateX: slideX.value }
            ],
            opacity: checkmarkOpacity.value,
        }
    })

    const animatedFocusRingStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: focusRingScale.value }],
            opacity: interpolate(focusRingScale.value, [0, 1.2], [0, 0.3]),
        }
    })

    const checkboxRadius = variant === "rounded"
        ? sizeStyles.size / 2
        : (borderRadius ?? mergedTheme.borderRadius)

    const currentIcon = isIndeterminate ? indeterminateIcon : checkIcon
    const iconColor = isIndeterminate
        ? mergedTheme.colors.indeterminate
        : mergedTheme.colors.checkmark

    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.8}
            onPress={handlePress}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityRole="checkbox"
            accessibilityState={{
                checked: isChecked,
                disabled,
                ...(isIndeterminate && { checked: "mixed" })
            }}
            testID={testID}
            style={[
                styles.container,
                {
                    flexDirection: labelPosition === "left" ? "row-reverse" : "row",
                    width: fullWidth ? "100%" : undefined,
                },
                style,
            ]}
        >
            {/* Checkbox */}
            <View style={[styles.checkboxContainer, sizeStyles.container]}>
                {/* Focus Ring */}
                {showFocusRing && (
                    <Animated.View
                        style={[
                            styles.focusRing,
                            {
                                width: sizeStyles.size + 8,
                                height: sizeStyles.size + 8,
                                borderRadius: checkboxRadius + 4,
                                borderColor: mergedTheme.colors.borderFocused,
                            },
                            animatedFocusRingStyle,
                        ]}
                    />
                )}

                {/* Checkbox Box */}
                <Animated.View
                    style={[
                        styles.checkbox,
                        sizeStyles.checkbox,
                        {
                            borderRadius: checkboxRadius,
                        },
                        getVariantStyles(variant),
                        animatedCheckboxStyle,
                        checkboxStyle,
                    ]}
                >
                    {/* Checkmark */}
                    <Animated.View
                        style={[
                            styles.checkmarkContainer,
                            animatedCheckmarkStyle,
                        ]}
                    >
                        <Feather
                            name={currentIcon}
                            size={sizeStyles.iconSize}
                            color={iconColor}
                        />
                    </Animated.View>
                </Animated.View>
            </View>

            {/* Label Content */}
            {(label || description || labelContent) && (
                <View
                    style={[
                        styles.labelContainer,
                        {
                            marginLeft: labelPosition === "right" ? 12 : 0,
                            marginRight: labelPosition === "left" ? 12 : 0,
                        }
                    ]}
                >
                    {labelContent || (
                        <>
                            {label && (
                                <Text
                                    style={[
                                        styles.label,
                                        sizeStyles.label,
                                        {
                                            color: disabled
                                                ? mergedTheme.colors.textDisabled
                                                : mergedTheme.colors.text,
                                            fontFamily: mergedTheme.fontFamily,
                                        },
                                        labelStyle,
                                    ]}
                                >
                                    {label}
                                </Text>
                            )}
                            {description && (
                                <Text
                                    style={[
                                        styles.description,
                                        sizeStyles.description,
                                        {
                                            color: disabled
                                                ? mergedTheme.colors.textDisabled
                                                : mergedTheme.colors.text,
                                            fontFamily: mergedTheme.fontFamily,
                                        },
                                        descriptionStyle,
                                    ]}
                                >
                                    {description}
                                </Text>
                            )}
                        </>
                    )}
                </View>
            )}
        </TouchableOpacity>
    )
}

// Helper functions
const getColorStyles = (colorScheme: string, theme: CheckboxTheme) => {
    const colorKey = colorScheme as keyof typeof theme.colors
    const color = theme.colors[colorKey] || theme.colors.primary

    return {
        backgroundChecked: color,
        borderChecked: color,
    }
}

const getSizeStyles = (size: CheckboxSize) => {
    switch (size) {
        case "xs":
            return {
                container: { width: 16, height: 16 },
                checkbox: { width: 16, height: 16 },
                size: 16,
                iconSize: 10,
                label: { fontSize: 12, lineHeight: 16 },
                description: { fontSize: 10, lineHeight: 14 },
            }
        case "sm":
            return {
                container: { width: 18, height: 18 },
                checkbox: { width: 18, height: 18 },
                size: 18,
                iconSize: 12,
                label: { fontSize: 14, lineHeight: 20 },
                description: { fontSize: 12, lineHeight: 16 },
            }
        case "lg":
            return {
                container: { width: 24, height: 24 },
                checkbox: { width: 24, height: 24 },
                size: 24,
                iconSize: 16,
                label: { fontSize: 18, lineHeight: 28 },
                description: { fontSize: 16, lineHeight: 24 },
            }
        case "xl":
            return {
                container: { width: 28, height: 28 },
                checkbox: { width: 28, height: 28 },
                size: 28,
                iconSize: 18,
                label: { fontSize: 20, lineHeight: 30 },
                description: { fontSize: 18, lineHeight: 26 },
            }
        case "md":
        default:
            return {
                container: { width: 20, height: 20 },
                checkbox: { width: 20, height: 20 },
                size: 20,
                iconSize: 14,
                label: { fontSize: 16, lineHeight: 24 },
                description: { fontSize: 14, lineHeight: 20 },
            }
    }
}

const getVariantStyles = (variant: CheckboxVariant) => {
    switch (variant) {
        case "filled":
            return {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
            }
        case "outline":
            return {
                borderWidth: 2,
            }
        case "ghost":
            return {
                backgroundColor: "transparent",
            }
        case "rounded":
            return {}
        case "default":
        default:
            return {}
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    checkboxContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    focusRing: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    checkmarkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontWeight: '500',
    },
    description: {
        opacity: 0.7,
        marginTop: 2,
    },
})