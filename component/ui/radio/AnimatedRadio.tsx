import React, { forwardRef, useImperativeHandle } from 'react'
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    type ViewStyle,
    type TextStyle,
    Platform,
} from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    interpolateColor,
    runOnJS,
    Easing,
} from 'react-native-reanimated'
import {
    type RadioVariant,
    type RadioSize,
    type RadioColorScheme,
    type RadioAnimationType,
    type RadioLabelPosition,
    getRadioColors,
    getRadioSizes,
    getRadioAnimationConfig,
} from './utils'

export interface AnimatedRadioProps {
    /** Whether the radio is selected */
    selected?: boolean
    /** The variant of the radio */
    variant?: RadioVariant
    /** The size of the radio */
    size?: RadioSize
    /** The color scheme of the radio */
    colorScheme?: RadioColorScheme
    /** The animation type */
    animationType?: RadioAnimationType
    /** The label text */
    label?: string
    /** The description text */
    description?: string
    /** Custom label content */
    labelContent?: React.ReactNode
    /** Label position */
    labelPosition?: RadioLabelPosition
    /** Whether the radio is disabled */
    disabled?: boolean
    /** Whether to show focus ring */
    showFocusRing?: boolean
    /** Whether to enable haptic feedback */
    hapticFeedback?: boolean
    /** Callback when the radio is pressed */
    onPress?: (selected: boolean) => void
    /** Callback when the radio is long pressed */
    onLongPress?: () => void
    /** Additional styles for the container */
    style?: ViewStyle
    /** Additional styles for the radio container */
    radioStyle?: ViewStyle
    /** Additional styles for the label text */
    labelStyle?: TextStyle
    /** Additional styles for the description text */
    descriptionStyle?: TextStyle
    /** Test ID for testing */
    testID?: string
    /** Accessibility label */
    accessibilityLabel?: string
}

export interface AnimatedRadioRef {
    select: () => void
    deselect: () => void
    toggle: () => void
    focus: () => void
    blur: () => void
}

export const AnimatedRadio = forwardRef<AnimatedRadioRef, AnimatedRadioProps>(
    (
        {
            selected = false,
            variant = 'default',
            size = 'md',
            colorScheme = 'primary',
            animationType = 'scale',
            label,
            description,
            labelContent,
            labelPosition = 'right',
            disabled = false,
            showFocusRing = true,
            hapticFeedback = true,
            onPress,
            onLongPress,
            style,
            radioStyle,
            labelStyle,
            descriptionStyle,
            testID,
            accessibilityLabel,
        },
        ref
    ) => {
        // Animation values
        const selectedAnimation = useSharedValue(selected ? 1 : 0)
        const pressAnimation = useSharedValue(0)
        const focusAnimation = useSharedValue(0)
        const dotScale = useSharedValue(selected ? 1 : 0)
        const rippleScale = useSharedValue(0)

        // Get configurations
        const colors = getRadioColors(colorScheme, variant)
        const sizes = getRadioSizes(size)
        const animationConfig = getRadioAnimationConfig(animationType)

        // Update animation when selected prop changes
        React.useEffect(() => {
            if (animationType === 'none') {
                selectedAnimation.value = selected ? 1 : 0
                dotScale.value = selected ? 1 : 0
                return
            }

            const springConfig = {
                damping: animationConfig.damping,
                stiffness: animationConfig.stiffness,
                mass: animationConfig.mass,
                overshootClamping: animationConfig.overshootClamping,
            }

            selectedAnimation.value = withSpring(selected ? 1 : 0, springConfig)

            switch (animationType) {
                case 'scale':
                    dotScale.value = withSpring(selected ? 1 : 0, springConfig)
                    break
                case 'bounce':
                    dotScale.value = withSpring(selected ? 1 : 0, {
                        ...springConfig,
                        damping: 8,
                        stiffness: 150,
                    })
                    break
                case 'fade':
                    dotScale.value = withTiming(selected ? 1 : 0, {
                        duration: animationConfig.duration,
                        easing: Easing.out(Easing.cubic),
                    })
                    break
                case 'slide':
                    dotScale.value = withSpring(selected ? 1 : 0, springConfig)
                    break
                case 'elastic':
                    dotScale.value = withSpring(selected ? 1 : 0, {
                        ...springConfig,
                        damping: 6,
                        stiffness: 120,
                    })
                    break
                case 'pulse':
                    if (selected) {
                        dotScale.value = withSpring(1.2, { damping: 10, stiffness: 300 }, () => {
                            dotScale.value = withSpring(1, springConfig)
                        })
                    } else {
                        dotScale.value = withSpring(0, springConfig)
                    }
                    break
                default:
                    dotScale.value = withSpring(selected ? 1 : 0, springConfig)
            }
        }, [selected, animationType])

        // Imperative methods
        useImperativeHandle(ref, () => ({
            select: () => {
                if (!disabled && onPress) {
                    runOnJS(onPress)(true)
                }
            },
            deselect: () => {
                if (!disabled && onPress) {
                    runOnJS(onPress)(false)
                }
            },
            toggle: () => {
                if (!disabled && onPress) {
                    runOnJS(onPress)(!selected)
                }
            },
            focus: () => {
                focusAnimation.value = withSpring(1, {
                    damping: 15,
                    stiffness: 200,
                })
            },
            blur: () => {
                focusAnimation.value = withSpring(0, {
                    damping: 15,
                    stiffness: 200,
                })
            },
        }))

        // Handle press
        const handlePress = () => {
            if (disabled) return

            // Haptic feedback
            if (hapticFeedback && Platform.OS !== 'web') {
                // In production, use: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }

            // Ripple effect
            rippleScale.value = 0
            rippleScale.value = withSpring(1, { damping: 15, stiffness: 300 }, () => {
                rippleScale.value = withTiming(0, { duration: 200 })
            })

            // Call onPress
            if (onPress) {
                onPress(!selected)
            }
        }

        // Handle press in/out
        const handlePressIn = () => {
            if (disabled) return
            pressAnimation.value = withSpring(1, {
                damping: 15,
                stiffness: 300,
            })
        }

        const handlePressOut = () => {
            pressAnimation.value = withSpring(0, {
                damping: 15,
                stiffness: 300,
            })
        }

        // Animated styles
        const containerAnimatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(pressAnimation.value, [0, 1], [1, 0.95])

            return {
                transform: [{ scale }],
            }
        })

        const radioAnimatedStyle = useAnimatedStyle(() => {
            const borderColor = interpolateColor(
                selectedAnimation.value,
                [0, 1],
                [colors.border, colors.borderSelected]
            )

            const backgroundColor = interpolateColor(
                selectedAnimation.value,
                [0, 1],
                [colors.background, colors.backgroundSelected]
              )

            const focusRingOpacity = interpolate(focusAnimation.value, [0, 1], [0, 0.3])
            const focusRingScale = interpolate(focusAnimation.value, [0, 1], [0.8, 1.2])

            return {
                borderColor,
                backgroundColor,
                shadowColor: showFocusRing ? colors.focus : 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: focusRingOpacity,
                shadowRadius: 8,
                transform: [{ scale: focusRingScale }],
                elevation: Platform.OS === 'android' ? focusRingOpacity * 8 : 0,
            }
        })

        const dotAnimatedStyle = useAnimatedStyle(() => {
            let transform = []

            switch (animationType) {
                case 'scale':
                    transform.push({ scale: dotScale.value })
                    break
                case 'bounce':
                    transform.push({ scale: dotScale.value })
                    break
                case 'fade':
                    // Fade uses opacity instead of scale
                    break
                case 'slide':
                    const translateX = interpolate(dotScale.value, [0, 1], [-sizes.dot.width, 0])
                    transform.push({ translateX })
                    transform.push({ scale: dotScale.value })
                    break
                case 'elastic':
                    transform.push({ scale: dotScale.value })
                    break
                case 'pulse':
                    transform.push({ scale: dotScale.value })
                    break
                default:
                    transform.push({ scale: dotScale.value })
            }

            const opacity = animationType === 'fade' ? dotScale.value : 1

            return {
                transform,
                opacity,
            }
        })

        const rippleAnimatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(rippleScale.value, [0, 1], [0, 2])
            const opacity = interpolate(rippleScale.value, [0, 0.5, 1], [0, 0.3, 0])

            return {
                transform: [{ scale }],
                opacity,
            }
        })

        // Render label content
        const renderLabel = () => {
            if (labelContent) {
                return labelContent
            }

            if (!label && !description) {
                return null
            }

            return (
                <View style={styles.labelContainer}>
                    {label && (
                        <Text
                            style={[
                                styles.labelText,
                                {
                                    fontSize: sizes.text.fontSize,
                                    lineHeight: sizes.text.lineHeight,
                                    color: disabled ? colors.textDisabled : colors.text,
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
                                styles.descriptionText,
                                {
                                    fontSize: sizes.text.fontSize - 2,
                                    lineHeight: sizes.text.lineHeight - 2,
                                    color: disabled ? colors.textDisabled : colors.text,
                                    opacity: 0.7,
                                },
                                descriptionStyle,
                            ]}
                        >
                            {description}
                        </Text>
                    )}
                </View>
            )
        }

        return (
            <Animated.View style={[containerAnimatedStyle, style]}>
                <Pressable
                    onPress={handlePress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onLongPress={onLongPress}
                    disabled={disabled}
                    style={[
                        styles.container,
                        {
                            opacity: disabled ? 0.5 : 1,
                            flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
                        },
                    ]}
                    testID={testID}
                    accessibilityRole="radio"
                    accessibilityState={{ selected, disabled }}
                    accessibilityLabel={accessibilityLabel || label}
                >
                    <View style={styles.radioContainer}>
                        <Animated.View
                            style={[
                                styles.radio,
                                {
                                    width: sizes.container.width,
                                    height: sizes.container.height,
                                    borderRadius: sizes.container.borderRadius,
                                    borderWidth: sizes.container.borderWidth,
                                },
                                radioAnimatedStyle,
                                radioStyle,
                            ]}
                        >
                            {/* Ripple effect */}
                            <Animated.View
                                style={[
                                    styles.ripple,
                                    {
                                        width: sizes.container.width,
                                        height: sizes.container.height,
                                        borderRadius: sizes.container.borderRadius,
                                        backgroundColor: colors.borderSelected,
                                    },
                                    rippleAnimatedStyle,
                                ]}
                            />

                            {/* Dot */}
                            <Animated.View
                                style={[
                                    styles.dot,
                                    {
                                        width: sizes.dot.width,
                                        height: sizes.dot.height,
                                        borderRadius: sizes.dot.borderRadius,
                                        backgroundColor: colors.dot,
                                    },
                                    dotAnimatedStyle,
                                ]}
                            />
                        </Animated.View>
                    </View>

                    {(label || description || labelContent) && (
                        <View
                            style={[
                                styles.labelWrapper,
                                {
                                    marginLeft: labelPosition === 'right' ? sizes.spacing : 0,
                                    marginRight: labelPosition === 'left' ? sizes.spacing : 0,
                                },
                            ]}
                        >
                            {renderLabel()}
                        </View>
                    )}
                </Pressable>
            </Animated.View>
        )
    }
)

AnimatedRadio.displayName = 'AnimatedRadio'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    radioContainer: {
        position: 'relative',
    },
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    ripple: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    dot: {
        position: 'absolute',
    },
    labelWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    labelContainer: {
        flex: 1,
    },
    labelText: {
        fontWeight: '500',
        marginBottom: 2,
    },
    descriptionText: {
        fontWeight: '400',
    },
})

export default AnimatedRadio