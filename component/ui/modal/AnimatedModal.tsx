import React, { forwardRef, useImperativeHandle, useEffect } from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
    BackHandler,
    type ViewStyle,
    type TextStyle
} from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    interpolate,
    Extrapolation
} from 'react-native-reanimated'
import { Gesture, GestureDetector, type PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
    type ModalAnimationType,
    type ModalVariant,
    type ModalSize,
    type ModalPosition,
    getAnimationConfig,
    getInitialTransform,
    getFinalTransform,
    getModalSizeStyles,
    getModalTheme,
    getPositionStyles,
    createShadowStyle,
    createBackdropBlurStyle,
    MODAL_CONSTANTS
} from './utils'

export interface AnimatedModalProps {
    /** Whether the modal is visible */
    visible: boolean
    /** Callback when modal requests to be closed */
    onClose: () => void
    /** Callback when modal is opened */
    onOpen?: () => void
    /** Callback when modal is dismissed (backdrop tap or gesture) */
    onDismiss?: () => void
    /** Modal content */
    children: React.ReactNode
    /** Animation type */
    animationType?: ModalAnimationType
    /** Modal variant */
    variant?: ModalVariant
    /** Modal size */
    size?: ModalSize
    /** Modal position */
    position?: ModalPosition
    /** Modal title */
    title?: string
    /** Whether to show close button */
    showCloseButton?: boolean
    /** Whether modal can be dismissed by tapping backdrop */
    dismissOnBackdropPress?: boolean
    /** Whether modal can be dismissed by gesture */
    dismissOnGesture?: boolean
    /** Whether to handle back button on Android */
    handleBackButton?: boolean
    /** Custom backdrop color */
    backdropColor?: string
    /** Custom modal styles */
    modalStyle?: ViewStyle
    /** Custom content styles */
    contentStyle?: ViewStyle
    /** Custom title styles */
    titleStyle?: TextStyle
    /** Whether to avoid keyboard */
    avoidKeyboard?: boolean
    /** Test ID for testing */
    testID?: string
}

export interface AnimatedModalRef {
    show: () => void
    hide: () => void
    toggle: () => void
}

export const AnimatedModal = forwardRef<AnimatedModalRef, AnimatedModalProps>(({
    visible,
    onClose,
    onOpen,
    onDismiss,
    children,
    animationType = 'fade',
    variant = 'default',
    size = 'md',
    position = 'center',
    title,
    showCloseButton = true,
    dismissOnBackdropPress = true,
    dismissOnGesture = true,
    handleBackButton = true,
    backdropColor,
    modalStyle,
    contentStyle,
    titleStyle,
    avoidKeyboard = true,
    testID
}, ref) => {
    const insets = useSafeAreaInsets()

    // Animation values
    const backdropOpacity = useSharedValue(0)
    const modalOpacity = useSharedValue(0)
    const modalScale = useSharedValue(0.8)
    const modalTranslateX = useSharedValue(0)
    const modalTranslateY = useSharedValue(0)
    const modalRotateY = useSharedValue(0)
    const gestureTranslateY = useSharedValue(0)

    // Get configurations
    const animationConfig = getAnimationConfig(animationType)
    const theme = getModalTheme(variant)
    const sizeStyles = getModalSizeStyles(size)
    const positionStyles = getPositionStyles(position)
    const shadowStyles = createShadowStyle(theme)
    const backdropBlurStyles = createBackdropBlurStyle(variant)

    // Initialize animation values
    const initializeValues = () => {
        const initialTransform = getInitialTransform(animationType)
        modalOpacity.value = initialTransform.opacity
        modalScale.value = initialTransform.scale
        modalTranslateX.value = initialTransform.translateX
        modalTranslateY.value = initialTransform.translateY
        modalRotateY.value = parseFloat(initialTransform.rotateY)
        gestureTranslateY.value = 0
    }

    // Show modal animation
    const showModal = () => {
        const finalTransform = getFinalTransform()
        const config = {
            damping: animationConfig.damping,
            stiffness: animationConfig.stiffness,
            mass: animationConfig.mass
        }

        backdropOpacity.value = withTiming(1, { duration: animationConfig.duration })
        modalOpacity.value = withSpring(finalTransform.opacity, config)
        modalScale.value = withSpring(finalTransform.scale, config)
        modalTranslateX.value = withSpring(finalTransform.translateX, config)
        modalTranslateY.value = withSpring(finalTransform.translateY, config)
        modalRotateY.value = withSpring(parseFloat(finalTransform.rotateY), config)
    }

    // Hide modal animation
    const hideModal = (callback?: () => void) => {
        const initialTransform = getInitialTransform(animationType)
        const config = {
            damping: animationConfig.damping,
            stiffness: animationConfig.stiffness,
            mass: animationConfig.mass
        }

        backdropOpacity.value = withTiming(0, { duration: animationConfig.duration })
        modalOpacity.value = withSpring(initialTransform.opacity, config)
        modalScale.value = withSpring(initialTransform.scale, config)
        modalTranslateX.value = withSpring(initialTransform.translateX, config)
        modalTranslateY.value = withSpring(initialTransform.translateY, config, (finished) => {
            if (finished && callback) {
                runOnJS(callback)()
            }
        })
        modalRotateY.value = withSpring(parseFloat(initialTransform.rotateY), config)
    }

    // Handle modal show/hide
    useEffect(() => {
        if (visible) {
            initializeValues()
            showModal()
            onOpen?.()
        } else {
            hideModal()
        }
    }, [visible])

    // Handle Android back button
    useEffect(() => {
        if (!handleBackButton || Platform.OS !== 'android') return

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (visible) {
                onClose()
                return true
            }
            return false
        })

        return () => backHandler.remove()
    }, [visible, handleBackButton, onClose])

    // Gesture handler for swipe to dismiss
    const panGesture = Gesture.Pan()
        .onStart(() => {
            // Store initial position - nothing needed here for basic implementation
        })
        .onUpdate((event) => {
            if (dismissOnGesture && (animationType === 'slideUp' || position === 'bottom')) {
                gestureTranslateY.value = Math.max(0, event.translationY)
            }
        })
        .onEnd((event) => {
            if (dismissOnGesture && (animationType === 'slideUp' || position === 'bottom')) {
                if (event.translationY > MODAL_CONSTANTS.GESTURE_THRESHOLD) {
                    // Dismiss modal
                    gestureTranslateY.value = withSpring(500, MODAL_CONSTANTS.SPRING_CONFIG, (finished) => {
                        if (finished) {
                            runOnJS(onClose)()
                        }
                    })
                } else {
                    // Snap back
                    gestureTranslateY.value = withSpring(0, MODAL_CONSTANTS.SPRING_CONFIG)
                }
            }
        })

    // Animated styles
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value
    }))

    const modalAnimatedStyle = useAnimatedStyle(() => {
        const totalTranslateY = modalTranslateY.value + gestureTranslateY.value

        return {
            opacity: modalOpacity.value,
            transform: [
                { scale: modalScale.value },
                { translateX: modalTranslateX.value },
                { translateY: totalTranslateY },
                { rotateY: `${modalRotateY.value}deg` }
            ]
        }
    })

    // Backdrop gesture opacity
    const backdropGestureStyle = useAnimatedStyle(() => {
        if (dismissOnGesture && gestureTranslateY.value > 0) {
            const opacity = interpolate(
                gestureTranslateY.value,
                [0, MODAL_CONSTANTS.GESTURE_THRESHOLD * 2],
                [1, 0],
                Extrapolation.CLAMP
            )
            return { opacity }
        }
        return {}
    })

    // Imperative methods
    useImperativeHandle(ref, () => ({
        show: () => {
            if (!visible) {
                // This would typically trigger a state change in parent
                onOpen?.()
            }
        },
        hide: () => {
            if (visible) {
                onClose()
            }
        },
        toggle: () => {
            if (visible) {
                onClose()
            } else {
                onOpen?.()
            }
        }
    }))

    if (!visible) return null

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
            testID={testID}
        >
            <View style={[styles.container, positionStyles]}>
                {/* Backdrop */}
                <TouchableWithoutFeedback
                    onPress={dismissOnBackdropPress ? onClose : undefined}
                >
                    <Animated.View
                        style={[
                            styles.backdrop,
                            backdropAnimatedStyle,
                            backdropGestureStyle,
                            backdropBlurStyles,
                            { backgroundColor: backdropColor || theme.colors.backdrop }
                        ]}
                    />
                </TouchableWithoutFeedback>

                {/* Modal Content */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[
                            styles.modal,
                            sizeStyles,
                            shadowStyles,
                            modalAnimatedStyle,
                            {
                                backgroundColor: theme.colors.background,
                                borderColor: theme.colors.border,
                                borderRadius: theme.borderRadius,
                                borderWidth: variant === 'outline' ? 2 : 0
                            },
                            modalStyle
                        ]}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <View style={styles.header}>
                                {title && (
                                    <Text
                                        style={[
                                            styles.title,
                                            { color: theme.colors.text },
                                            titleStyle
                                        ]}
                                    >
                                        {title}
                                    </Text>
                                )}
                                {showCloseButton && (
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={onClose}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Text style={[styles.closeButtonText, { color: theme.colors.text }]}>
                                            ✕
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        {/* Content */}
                        <View style={[styles.content, contentStyle]}>
                            {children}
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        maxHeight: '90%'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280'
    },
    content: {
        padding: 20
    }
})

AnimatedModal.displayName = 'AnimatedModal'