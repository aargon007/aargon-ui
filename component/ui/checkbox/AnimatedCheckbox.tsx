import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate, interpolateColor, runOnJS, withSequence, withDelay, Easing, } from 'react-native-reanimated'
import { getColorStyles, getSizeStyles, getVariantStyles, type AnimatedCheckboxProps, type CheckboxTheme } from './utils'
import { Feather } from "@expo/vector-icons"

const defaultTheme: CheckboxTheme = {
    colors: {
        primary: "#6366F1",
        secondary: "#64748B",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        background: "#FFFFFF",
        backgroundChecked: "#6366F1",
        border: "#D1D5DB",
        borderChecked: "#6366F1",
        borderFocused: "#93C5FD",
        text: "#374151",
        textDisabled: "#9CA3AF",
        checkmark: "#FFFFFF",
        indeterminate: "#FFFFFF",
        shadow: "#000000",
    },
    borderRadius: 6,
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

const smoothConfig = {
    damping: 25,
    stiffness: 250,
    mass: 0.6,
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
    animationDuration = 250,
    checkIcon = "check",
    indeterminateIcon = "minus",
    labelPosition = "right",
    theme,
    style,
    checkboxStyle,
    labelStyle,
    descriptionStyle,
    showFocusRing = false,
    showRipple = true,
    accessibilityLabel,
    testID,
    fullWidth = false,
    borderRadius,
    hapticFeedback = true,
    shadow = false,
}: AnimatedCheckboxProps) => {
    // Merge theme with default
    const mergedTheme = { ...defaultTheme, ...theme };

    // Determine current state
    const currentState = state || (checked ? "checked" : "unchecked");
    const isChecked = currentState === "checked";
    const isIndeterminate = currentState === "indeterminate";
    const isActive = isChecked || isIndeterminate;

    // Animation values
    const scale = useSharedValue(1);
    const checkmarkScale = useSharedValue(0);
    const checkmarkOpacity = useSharedValue(0);
    const rotation = useSharedValue(0);
    const slideX = useSharedValue(-20);
    const slideY = useSharedValue(-10);
    const borderWidth = useSharedValue(mergedTheme.borderWidth);
    const focusRingScale = useSharedValue(0);
    const pressScale = useSharedValue(1);
    const rippleScale = useSharedValue(0);
    const rippleOpacity = useSharedValue(0);
    const morphProgress = useSharedValue(0);
    const pulseScale = useSharedValue(1);
    const backgroundOpacity = useSharedValue(0);

    // Get styles
    const sizeStyles = getSizeStyles(size);
    const colorStyles = getColorStyles(colorScheme, mergedTheme);

    // Initialize animation values
    useEffect(() => {
        animateToState(isActive)
    }, [isActive, animationType])

    // Animation function
    const animateToState = (active: boolean) => {
        const targetScale = active ? 1 : 0
        const targetOpacity = active ? 1 : 0
        const targetSlideX = active ? 0 : -20
        const targetSlideY = active ? 0 : -10
        const targetRotation = active ? 0 : -90
        const targetMorph = active ? 1 : 0
        const targetBackgroundOpacity = active ? 1 : 0

        // Background animation
        backgroundOpacity.value = withTiming(targetBackgroundOpacity, {
            duration: animationDuration,
            easing: Easing.out(Easing.cubic)
        })

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
                        withSpring(1.4, bounceConfig),
                        withSpring(0.9, bounceConfig),
                        withSpring(1, springConfig)
                    )
                    : withSpring(0, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration / 2
                })
                break

            case "slide":
                slideX.value = withSpring(targetSlideX, springConfig)
                slideY.value = withSpring(targetSlideY, smoothConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration
                })
                checkmarkScale.value = withSpring(targetScale, springConfig)
                break

            case "fade":
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration,
                    easing: active ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
                })
                checkmarkScale.value = withSpring(targetScale, smoothConfig)
                break

            case "rotate":
                rotation.value = withSpring(targetRotation, springConfig)
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration
                })
                break

            case "elastic":
                checkmarkScale.value = active
                    ? withSequence(
                        withSpring(1.6, elasticConfig),
                        withSpring(0.8, elasticConfig),
                        withSpring(1.1, elasticConfig),
                        withSpring(1, springConfig)
                    )
                    : withSpring(0, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration / 2
                })
                break

            case "morph":
                morphProgress.value = withTiming(targetMorph, {
                    duration: animationDuration * 1.2,
                    easing: Easing.bezier(0.4, 0, 0.2, 1)
                })
                checkmarkScale.value = withSpring(targetScale, smoothConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration
                })
                break

            case "pulse":
                if (active) {
                    pulseScale.value = withSequence(
                        withTiming(1.15, { duration: animationDuration / 3 }),
                        withTiming(0.95, { duration: animationDuration / 3 }),
                        withSpring(1, springConfig)
                    )
                } else {
                    pulseScale.value = withSpring(1, springConfig)
                }
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration
                })
                break

            default:
                checkmarkScale.value = withSpring(targetScale, springConfig)
                checkmarkOpacity.value = withTiming(targetOpacity, {
                    duration: animationDuration
                })
                break
        }

        // Border animation
        borderWidth.value = withSpring(
            active && variant !== "outline" ? 0 : mergedTheme.borderWidth,
            springConfig
        )
    };

    // Handle press
    const handlePress = () => {
        if (disabled) return

        // Press feedback animation
        pressScale.value = withSequence(
            withSpring(0.92, { damping: 15, stiffness: 400 }),
            withSpring(1, springConfig)
        )

        // Ripple effect
        if (showRipple) {
            rippleScale.value = 0
            rippleOpacity.value = 0.3

            rippleScale.value = withTiming(1, {
                duration: 400,
                easing: Easing.out(Easing.cubic)
            })
            rippleOpacity.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.cubic)
            })
        }

        // Focus ring animation
        if (showFocusRing) {
            focusRingScale.value = withSequence(
                withSpring(1.3, springConfig),
                withDelay(200, withSpring(0, springConfig))
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
    };

    // Animated styles
    const animatedCheckboxStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            backgroundOpacity.value,
            [0, 1],
            [mergedTheme.colors.background, colorStyles.backgroundChecked]
        )

        const borderColor = interpolateColor(
            Number(isActive),
            [0, 1],
            [mergedTheme.colors.border, colorStyles.borderChecked]
        )

        const morphScale = interpolate(
            morphProgress.value,
            [0, 0.5, 1],
            [1, 1.1, 1]
        )

        return {
            backgroundColor,
            borderColor,
            borderWidth: borderWidth.value,
            transform: [
                { scale: pressScale.value * morphScale * pulseScale.value }
            ],
            opacity: disabled ? 0.5 : 1,
        }
    });

    const animatedCheckmarkStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: checkmarkScale.value },
                { rotate: `${rotation.value}deg` },
            ],
            opacity: checkmarkOpacity.value,
        }
    });

    const animatedFocusRingStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: focusRingScale.value }],
            opacity: interpolate(focusRingScale.value, [0, 1.3], [0, 0.4]),
        }
    });

    const animatedRippleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: rippleScale.value }],
            opacity: rippleOpacity.value,
        }
    });

    const checkboxRadius = variant === "rounded"
        ? sizeStyles.size / 2
        : (borderRadius ?? mergedTheme.borderRadius);

    const currentIcon = isIndeterminate ? indeterminateIcon : checkIcon;
    const iconColor = isIndeterminate
        ? mergedTheme.colors.indeterminate
        : mergedTheme.colors.checkmark;

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
                {/* Ripple Effect */}
                {showRipple && (
                    <Animated.View
                        style={[
                            styles.ripple,
                            {
                                width: sizeStyles.size * 2,
                                height: sizeStyles.size * 2,
                                borderRadius: sizeStyles.size,
                                backgroundColor: colorStyles.backgroundChecked,
                            },
                            animatedRippleStyle,
                        ]}
                    />
                )}

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
                        getVariantStyles(variant, mergedTheme, shadow),
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
};

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
    ripple: {
        position: 'absolute',
        borderRadius: 50,
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
        position: 'relative',
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
        marginTop:-2
    },
    description: {
        opacity: 0.7,
        marginTop: 2,
    },
})