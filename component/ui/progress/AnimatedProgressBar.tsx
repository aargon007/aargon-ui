import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { View, Text, StyleSheet, type ViewStyle, type TextStyle, Platform } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
    interpolate,
    Easing,
    runOnJS,
} from 'react-native-reanimated'
import {
    type ProgressVariant,
    type ProgressSize,
    type ProgressColorScheme,
    type ProgressAnimationType,
    type ProgressShape,
    type ProgressTheme,
    defaultProgressTheme,
    getProgressVariantStyles,
    getProgressSizeStyles,
    getProgressShapeStyles,
    getAnimationConfig,
} from './utils'

export interface AnimatedProgressBarProps {
    /** Progress value (0-100) */
    progress: number
    /** Variant style of the progress bar */
    variant?: ProgressVariant
    /** Size of the progress bar */
    size?: ProgressSize
    /** Color scheme */
    colorScheme?: ProgressColorScheme
    /** Animation type */
    animationType?: ProgressAnimationType
    /** Shape of the progress bar */
    shape?: ProgressShape
    /** Whether to show progress text */
    showText?: boolean
    /** Custom text to display */
    text?: string
    /** Text position */
    textPosition?: 'inside' | 'outside' | 'top' | 'bottom'
    /** Whether the progress bar is indeterminate */
    indeterminate?: boolean
    /** Whether to show stripes */
    striped?: boolean
    /** Whether stripes should be animated */
    stripedAnimated?: boolean
    /** Custom theme */
    theme?: Partial<ProgressTheme>
    /** Whether the progress bar is disabled */
    disabled?: boolean
    /** Custom container style */
    style?: ViewStyle
    /** Custom fill style */
    fillStyle?: ViewStyle
    /** Custom text style */
    textStyle?: TextStyle
    /** Animation duration in milliseconds */
    animationDuration?: number
    /** Callback when animation completes */
    onAnimationComplete?: () => void
    /** Test ID for testing */
    testID?: string
}

export interface AnimatedProgressBarRef {
    setProgress: (progress: number, animated?: boolean) => void
    reset: () => void
    complete: () => void
}

export const AnimatedProgressBar = forwardRef<AnimatedProgressBarRef, AnimatedProgressBarProps>(
    (
        {
            progress = 0,
            variant = 'default',
            size = 'md',
            colorScheme = 'primary',
            animationType = 'smooth',
            shape = 'rounded',
            showText = false,
            text,
            textPosition = 'outside',
            indeterminate = false,
            striped = false,
            stripedAnimated = false,
            theme: customTheme,
            disabled = false,
            style,
            fillStyle,
            textStyle,
            animationDuration,
            onAnimationComplete,
            testID,
        },
        ref
    ) => {
        // Merge custom theme with default theme
        const theme = { ...defaultProgressTheme, ...customTheme }

        // Animation values
        const progressValue = useSharedValue(0)
        const indeterminateValue = useSharedValue(0)
        const pulseValue = useSharedValue(1)
        const waveValue = useSharedValue(0)
        const stripeValue = useSharedValue(0)

        // Get styles
        const variantStyles = getProgressVariantStyles(variant, colorScheme, theme)
        const sizeStyles = getProgressSizeStyles(size)
        const shapeStyles = getProgressShapeStyles(shape, size)
        const animationConfig = getAnimationConfig(animationType) as any;

        // Clamp progress between 0 and 100
        const clampedProgress = Math.max(0, Math.min(100, progress))

        // Animation duration
        const duration = animationDuration || animationConfig.duration

        // Update progress animation
        useEffect(() => {
            if (indeterminate) return

            const targetProgress = clampedProgress / 100

            if (animationType === 'none') {
                progressValue.value = targetProgress
                if (onAnimationComplete) {
                    runOnJS(onAnimationComplete)()
                }
            } else if (animationType === 'smooth' || animationType === 'pulse') {
                progressValue.value = withTiming(targetProgress, {
                    duration,
                    easing: Easing.out(Easing.cubic),
                }, (finished) => {
                    if (finished && onAnimationComplete) {
                        runOnJS(onAnimationComplete)()
                    }
                })
            } else {
                progressValue.value = withSpring(targetProgress, {
                    damping: animationConfig.damping,
                    stiffness: animationConfig.stiffness,
                    mass: animationConfig.mass,
                }, (finished) => {
                    if (finished && onAnimationComplete) {
                        runOnJS(onAnimationComplete)()
                    }
                })
            }
        }, [clampedProgress, animationType, indeterminate])

        // Indeterminate animation
        useEffect(() => {
            if (indeterminate) {
                indeterminateValue.value = withRepeat(
                    withSequence(
                        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    false
                )
            } else {
                indeterminateValue.value = 0
            }
        }, [indeterminate])

        // Pulse animation
        useEffect(() => {
            if (animationType === 'pulse' && !indeterminate) {
                pulseValue.value = withRepeat(
                    withSequence(
                        withTiming(1.05, { duration: 600 }),
                        withTiming(1, { duration: 600 })
                    ),
                    -1,
                    true
                )
            } else {
                pulseValue.value = 1
            }
        }, [animationType, indeterminate])

        // Wave animation
        useEffect(() => {
            if (animationType === 'wave' && !indeterminate) {
                waveValue.value = withRepeat(
                    withTiming(1, { duration: 2000, easing: Easing.linear }),
                    -1,
                    false
                )
            } else {
                waveValue.value = 0
            }
        }, [animationType, indeterminate])

        // Stripe animation
        useEffect(() => {
            if (striped && stripedAnimated) {
                stripeValue.value = withRepeat(
                    withTiming(1, { duration: 1000, easing: Easing.linear }),
                    -1,
                    false
                )
            } else {
                stripeValue.value = 0
            }
        }, [striped, stripedAnimated])

        // Imperative methods
        useImperativeHandle(ref, () => ({
            setProgress: (newProgress: number, animated = true) => {
                const targetProgress = Math.max(0, Math.min(100, newProgress)) / 100
                if (animated) {
                    progressValue.value = withSpring(targetProgress, animationConfig)
                } else {
                    progressValue.value = targetProgress
                }
            },
            reset: () => {
                progressValue.value = withSpring(0, animationConfig)
            },
            complete: () => {
                progressValue.value = withSpring(1, animationConfig)
            },
        }))

        // Animated styles
        const containerAnimatedStyle = useAnimatedStyle(() => {
            const scale = animationType === 'pulse' ? pulseValue.value : 1
            const opacity = disabled ? 0.5 : 1

            return {
                transform: [{ scaleY: scale }],
                opacity,
            }
        })

        const fillAnimatedStyle = useAnimatedStyle(() => {
            if (indeterminate) {
                const translateX = interpolate(
                    indeterminateValue.value,
                    [0, 1],
                    [-100, 100]
                )
                return {
                    width: '30%',
                    transform: [{ translateX: `${translateX}%` }],
                }
            }

            const width = interpolate(progressValue.value, [0, 1], [0, 100])

            // Wave effect
            let transform = []
            if (animationType === 'wave') {
                const waveOffset = interpolate(waveValue.value, [0, 1], [0, 360])
                const scaleY = 1 + Math.sin((waveOffset * Math.PI) / 180) * 0.1
                transform.push({ scaleY })
            }

            return {
                width: `${width}%`,
                transform,
            }
        })

        const stripeAnimatedStyle = useAnimatedStyle(() => {
            if (!striped) return {}

            const translateX = stripedAnimated
                ? interpolate(stripeValue.value, [0, 1], [0, 20])
                : 0

            return {
                transform: [{ translateX }],
            }
        })

        // Progress text
        const displayText = text || `${Math.round(clampedProgress)}%`
        const shouldShowText = showText && !indeterminate

        // Container styles
        const containerStyle = [
            styles.container,
            {
                height: sizeStyles.height,
                backgroundColor: variantStyles.container.backgroundColor,
                borderWidth: variantStyles.container.borderWidth,
                borderColor: variantStyles.container.borderColor,
                ...shapeStyles,
                ...variantStyles.shadow,
            },
            style,
        ]

        // Fill styles
        const fillStyleCombined = [
            styles.fill,
            {
                backgroundColor: variantStyles.fill.backgroundColor,
                ...shapeStyles,
            },
            fillStyle,
        ]

        // Text styles
        const textStyleCombined = [
            styles.text,
            {
                fontSize: sizeStyles.textSize,
                color: theme.colors.text,
            },
            textStyle,
        ]

        // Stripe pattern
        const stripePattern = striped ? (
            <Animated.View style={[styles.stripes, stripeAnimatedStyle]}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <View key={index} style={styles.stripe} />
                ))}
            </Animated.View>
        ) : null

        return (
            <View style={styles.wrapper} testID={testID}>
                {shouldShowText && textPosition === 'top' && (
                    <Text style={[textStyleCombined, styles.textTop]}>{displayText}</Text>
                )}

                <View style={styles.progressContainer}>
                    {shouldShowText && textPosition === 'outside' && (
                        <Text style={[textStyleCombined, styles.textOutside]}>{displayText}</Text>
                    )}

                    <Animated.View style={[containerStyle, containerAnimatedStyle]}>
                        <Animated.View style={[fillStyleCombined, fillAnimatedStyle]}>
                            {stripePattern}
                            {shouldShowText && textPosition === 'inside' && (
                                <Text style={[textStyleCombined, styles.textInside]}>{displayText}</Text>
                            )}
                        </Animated.View>
                    </Animated.View>
                </View>

                {shouldShowText && textPosition === 'bottom' && (
                    <Text style={[textStyleCombined, styles.textBottom]}>{displayText}</Text>
                )}
            </View>
        )
    }
)

AnimatedProgressBar.displayName = 'AnimatedProgressBar'

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    fill: {
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
    textTop: {
        marginBottom: 8,
    },
    textBottom: {
        marginTop: 8,
    },
    textOutside: {
        marginRight: 12,
        minWidth: 40,
    },
    textInside: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    stripes: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        opacity: 0.3,
    },
    stripe: {
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginRight: 3,
        transform: [{ skewX: '-20deg' }],
    },
})