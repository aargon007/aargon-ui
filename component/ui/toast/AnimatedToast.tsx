import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    interpolate,
    Easing,
    withSequence,
    withDelay,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import {
   type ToastConfig,
    getToastColors,
    getToastSizeStyles,
    getToastIcon,
} from './toastUtils'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface AnimatedToastProps {
    toast: ToastConfig
    onDismiss: (id: string) => void
}

export const AnimatedToast: React.FC<AnimatedToastProps> = ({ toast, onDismiss }) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const scale = useSharedValue(0)
    const opacity = useSharedValue(0)
    const progress = useSharedValue(0)
    const rotateY = useSharedValue(0)

    const colors = getToastColors(toast.type, toast.variant || 'default')
    const sizeStyles = getToastSizeStyles(toast.size || 'md')
    const iconName = getToastIcon(toast.type)

    const timerRef = useRef<NodeJS.Timeout>(null)

    const dismiss = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        // Exit animation
        switch (toast.animation) {
            case 'slide':
                if (toast.position?.includes('top')) {
                    translateY.value = withTiming(-200, { duration: 300 })
                } else {
                    translateY.value = withTiming(200, { duration: 300 })
                }
                break
            case 'fade':
                opacity.value = withTiming(0, { duration: 300 })
                break
            case 'scale':
                scale.value = withTiming(0, { duration: 300 })
                break
            case 'bounce':
                scale.value = withSequence(
                    withTiming(1.1, { duration: 100 }),
                    withTiming(0, { duration: 200 })
                )
                break
            case 'flip':
                rotateY.value = withTiming(90, { duration: 300 })
                break
            case 'zoom':
                scale.value = withTiming(0, { duration: 300 })
                opacity.value = withTiming(0, { duration: 300 })
                break
            default:
                opacity.value = withTiming(0, { duration: 300 })
        }

        setTimeout(() => {
            runOnJS(onDismiss)(toast.id)
            if (toast.onDismiss) {
                runOnJS(toast.onDismiss)()
            }
        }, 300)
    }

    const startTimer = () => {
        if (toast.duration && toast.duration > 0) {
            if (toast.showProgress) {
                progress.value = withTiming(1, {
                    duration: toast.duration,
                    easing: Easing.linear,
                })
            }

            timerRef.current = setTimeout(() => {
                dismiss()
            }, toast.duration)
        }
    }

    useEffect(() => {
        // Entry animation
        switch (toast.animation) {
            case 'slide':
                if (toast.position?.includes('top')) {
                    translateY.value = -200
                    translateY.value = withSpring(0, { damping: 20, stiffness: 300 })
                } else {
                    translateY.value = 200
                    translateY.value = withSpring(0, { damping: 20, stiffness: 300 })
                }
                opacity.value = withTiming(1, { duration: 300 })
                break
            case 'fade':
                opacity.value = withTiming(1, { duration: 400 })
                break
            case 'scale':
                scale.value = withSpring(1, { damping: 15, stiffness: 200 })
                opacity.value = withTiming(1, { duration: 300 })
                break
            case 'bounce':
                scale.value = withSequence(
                    withTiming(1.2, { duration: 200 }),
                    withSpring(1, { damping: 10, stiffness: 300 })
                )
                opacity.value = withTiming(1, { duration: 300 })
                break
            case 'flip':
                rotateY.value = 90
                rotateY.value = withSpring(0, { damping: 15, stiffness: 200 })
                opacity.value = withTiming(1, { duration: 300 })
                break
            case 'zoom':
                scale.value = withSpring(1, { damping: 15, stiffness: 200 })
                opacity.value = withTiming(1, { duration: 300 })
                break
            default:
                opacity.value = withTiming(1, { duration: 300 })
                scale.value = 1
        }

        startTimer()

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > 100 || Math.abs(event.velocityX) > 500) {
                translateX.value = withTiming(
                    event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
                    { duration: 200 }
                )
                runOnJS(dismiss)()
            } else {
                translateX.value = withSpring(0)
            }
        })

    const animatedStyle = useAnimatedStyle(() => {
        const scaleValue = toast.animation === 'none' ? 1 : scale.value

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scaleValue },
                { rotateY: `${rotateY.value}deg` },
            ],
            opacity: opacity.value,
        }
    })

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
        }
    })

    const handlePress = () => {
        if (toast.onPress) {
            toast.onPress()
        }
    }

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[animatedStyle]}>
                <Pressable
                    onPress={handlePress}
                    style={[
                        styles.container,
                        {
                            backgroundColor: colors.backgroundColor,
                            borderColor: colors.borderColor,
                            borderRadius: sizeStyles.borderRadius,
                            padding: sizeStyles.padding,
                            maxWidth: sizeStyles.maxWidth,
                            borderWidth: toast.variant === 'outlined' ? 1 : 0,
                        },
                        toast.style,
                    ]}
                    testID={toast.testID}
                >
                    <View style={styles.content}>
                        <Feather
                            name={iconName as any}
                            size={sizeStyles.iconSize}
                            color={colors.titleColor}
                            style={styles.icon}
                        />

                        <View style={styles.textContainer}>
                            {toast.title && (
                                <Text
                                    style={[
                                        styles.title,
                                        {
                                            color: colors.titleColor,
                                            fontSize: sizeStyles.titleSize,
                                        },
                                        toast.titleStyle,
                                    ]}
                                >
                                    {toast.title}
                                </Text>
                            )}

                            <Text
                                style={[
                                    styles.message,
                                    {
                                        color: colors.textColor,
                                        fontSize: sizeStyles.messageSize,
                                    },
                                    toast.messageStyle,
                                ]}
                            >
                                {toast.message}
                            </Text>
                        </View>

                        <Pressable onPress={dismiss} style={styles.closeButton}>
                            <Feather name="x" size={16} color={colors.textColor} />
                        </Pressable>
                    </View>

                    {toast.showProgress && toast.duration && toast.duration > 0 && (
                        <View style={styles.progressContainer}>
                            <Animated.View
                                style={[
                                    styles.progressBar,
                                    { backgroundColor: colors.titleColor },
                                    progressStyle,
                                ]}
                            />
                        </View>
                    )}
                </Pressable>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginVertical: 4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        marginRight: 12,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        marginBottom: 4,
    },
    message: {
        lineHeight: 20,
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },
    progressContainer: {
        height: 3,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 12,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
    },
})