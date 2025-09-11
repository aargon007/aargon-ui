import React, { useEffect, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    runOnJS,
    withTiming
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import {
    type SnackbarConfig,
    type SnackbarType,
    type SnackbarVariant,
    type SnackbarPosition,
    type SnackbarAnimation,
    getTypeColors,
    getVariantStyles,
    getPositionStyles,
    createEnterAnimation,
    createExitAnimation,
    calculateSwipeProgress,
    getTextColor,
    getIconColor,
    getAnimationConfig
} from './snackbarUtils'

export interface AnimatedSnackbarProps extends SnackbarConfig {
    visible?: boolean
    onDismiss?: () => void
    children?: React.ReactNode
}

export interface SnackbarRef {
    show: () => void
    hide: () => void
    dismiss: () => void
}

const AnimatedSnackbar = forwardRef<SnackbarRef, AnimatedSnackbarProps>(({
    visible = false,
    message,
    type = 'info',
    variant = 'default',
    position = 'bottom',
    animation = 'slide',
    duration = 4000,
    autoDismiss = true,
    dismissible = true,
    swipeToDismiss = true,
    showProgress = false,
    icon,
    action,
    onShow,
    onHide,
    onPress,
    onDismiss,
    style,
    textStyle,
    children
}, ref) => {
    // Animation values
    const translateX = useSharedValue(position === 'left' ? -300 : position === 'right' ? 300 : 0)
    const translateY = useSharedValue(position === 'top' ? -100 : position === 'bottom' ? 100 : 0)
    const scale = useSharedValue(animation === 'scale' ? 0.8 : 1)
    const opacity = useSharedValue(0)
    const rotation = useSharedValue(animation === 'flip' ? 90 : 0)
    const progress = useSharedValue(0)

    // Gesture values
    const gestureTranslateX = useSharedValue(0)
    const gestureTranslateY = useSharedValue(0)
    const gestureOpacity = useSharedValue(1)

    // Get theme colors and styles
    const colors = getTypeColors(type)
    const variantStyles = getVariantStyles(variant, colors)
    const positionStyles = getPositionStyles(position)
    const textColor = getTextColor(variant, colors)
    const iconColor = getIconColor(variant, colors)

    // Auto dismiss timer
    useEffect(() => {
        let timer: NodeJS.Timeout

        if (visible && autoDismiss && duration > 0) {
            // Start progress animation
            if (showProgress) {
                progress.value = withTiming(1, { duration })
            }

            timer = setTimeout(() => {
                hide()
            }, duration)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [visible, autoDismiss, duration])

    // Show/hide effects
    useEffect(() => {
        if (visible) {
            show()
        } else {
            hide()
        }
    }, [visible])

    const show = () => {
        createEnterAnimation(animation, position, translateX, translateY, scale, opacity, rotation)
        onShow?.()
    }

    const hide = () => {
        createExitAnimation(
            animation,
            position,
            translateX,
            translateY,
            scale,
            opacity,
            rotation,
            () => {
                onHide?.()
                onDismiss?.()
            }
        )
    }

    const dismiss = () => {
        hide()
    }

    // Imperative methods
    useImperativeHandle(ref, () => ({
        show,
        hide,
        dismiss
    }))

    // Gesture handler using the new Gesture API
    const panGesture = Gesture.Pan()
        .onStart(() => {
            gestureTranslateX.value = 0
            gestureTranslateY.value = 0
        })
        .onUpdate((event) => {
            if (!swipeToDismiss) return

            gestureTranslateX.value = event.translationX
            gestureTranslateY.value = event.translationY

            const swipeProgress = calculateSwipeProgress(
                event.translationX,
                event.translationY,
                position
            )

            gestureOpacity.value = 1 - swipeProgress * 0.5
        })
        .onEnd((event) => {
            if (!swipeToDismiss) return

            const swipeProgress = calculateSwipeProgress(
                event.translationX,
                event.translationY,
                position
            )

            if (swipeProgress > 0.3) {
                // Dismiss
                runOnJS(hide)()
            } else {
                // Snap back
                gestureTranslateX.value = withTiming(0)
                gestureTranslateY.value = withTiming(0)
                gestureOpacity.value = withTiming(1)
            }
        })
        .enabled(swipeToDismiss) // Enable/disable gesture based on prop

    // Animated styles
    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value + gestureTranslateX.value },
                { translateY: translateY.value + gestureTranslateY.value },
                { scale: scale.value },
                { rotateX: `${rotation.value}deg` }
            ],
            opacity: opacity.value * gestureOpacity.value
        }
    })

    const progressAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value * 100}%`
        }
    })

    if (!visible && opacity.value === 0) {
        return null
    }

    const handlePress = () => {
        if (onPress) {
            onPress()
        } else if (dismissible) {
            dismiss()
        }
    }

    const renderIcon = () => {
        if (!icon && type !== 'neutral') {
            const iconMap = {
                info: 'info',
                success: 'check-circle',
                warning: 'alert-triangle',
                error: 'x-circle'
            }
            return iconMap[type as keyof typeof iconMap] || 'info'
        }
        return icon
    }

    return (
        <Animated.View
            style={[
                styles.container,
                positionStyles as any,
                containerAnimatedStyle,
                { position: 'absolute', zIndex: 9999 }
            ]}
            pointerEvents="box-none"
        >
            <GestureDetector gesture={panGesture}>
                <Animated.View>
                    <TouchableOpacity
                        activeOpacity={dismissible || onPress ? 0.8 : 1}
                        onPress={handlePress}
                        style={[
                            styles.snackbar,
                            variantStyles,
                            style
                        ]}
                    >
                        {/* Progress bar */}
                        {showProgress && (
                            <View style={styles.progressContainer}>
                                <Animated.View
                                    style={[
                                        styles.progressBar,
                                        { backgroundColor: colors.primary },
                                        progressAnimatedStyle
                                    ]}
                                />
                            </View>
                        )}

                        <View style={styles.content}>
                            {/* Icon */}
                            {renderIcon() && (
                                <View style={styles.iconContainer}>
                                    <Feather
                                        name={renderIcon() as any}
                                        size={20}
                                        color={iconColor}
                                    />
                                </View>
                            )}

                            {/* Message */}
                            <View style={styles.messageContainer}>
                                {children || (
                                    <Text
                                        style={[
                                            styles.message,
                                            { color: textColor },
                                            textStyle
                                        ]}
                                        numberOfLines={3}
                                    >
                                        {message}
                                    </Text>
                                )}
                            </View>

                            {/* Action button */}
                            {action && (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={action.onPress}
                                    disabled={action.disabled}
                                >
                                    <Text
                                        style={[
                                            styles.actionText,
                                            {
                                                color: action.color || colors.primary,
                                                opacity: action.disabled ? 0.5 : 1
                                            }
                                        ]}
                                    >
                                        {action.label}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {/* Dismiss button */}
                            {dismissible && (
                                <TouchableOpacity
                                    style={styles.dismissButton}
                                    onPress={dismiss}
                                >
                                    <Feather
                                        name="x"
                                        size={18}
                                        color={iconColor}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {
        maxWidth: '90%',
        alignSelf: 'center'
    },
    snackbar: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 56,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }
        })
    },
    progressContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    iconContainer: {
        marginRight: 12
    },
    messageContainer: {
        flex: 1,
        marginRight: 8
    },
    message: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 8
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600'
    },
    dismissButton: {
        padding: 4,
        marginLeft: 8
    }
})

export default AnimatedSnackbar