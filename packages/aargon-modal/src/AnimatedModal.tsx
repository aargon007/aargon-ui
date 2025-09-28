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

export type ModalAnimationType = 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'slideLeft' | 'slideRight'
export type ModalVariant = 'default' | 'outline' | 'filled'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface AnimatedModalProps {
    /** Whether the modal is visible */
    visible: boolean
    /** Callback when modal requests to be closed */
    onClose: () => void
    /** Callback when modal is opened */
    onOpen?: () => void
    /** Modal content */
    children: React.ReactNode
    /** Animation type */
    animationType?: ModalAnimationType
    /** Modal variant */
    variant?: ModalVariant
    /** Modal size */
    size?: ModalSize
    /** Modal title */
    title?: string
    /** Whether to show close button */
    showCloseButton?: boolean
    /** Whether modal can be dismissed by tapping backdrop */
    dismissOnBackdropPress?: boolean
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
    /** Test ID for testing */
    testID?: string
}

export interface AnimatedModalRef {
    show: () => void
    hide: () => void
    toggle: () => void
}

const getSizeStyles = (size: ModalSize) => {
    switch (size) {
        case 'sm':
            return { width: '80%', maxWidth: 400 }
        case 'md':
            return { width: '90%', maxWidth: 500 }
        case 'lg':
            return { width: '95%', maxWidth: 600 }
        case 'xl':
            return { width: '98%', maxWidth: 800 }
        case 'full':
            return { width: '100%', height: '100%' }
        default:
            return { width: '90%', maxWidth: 500 }
    }
}

const getInitialTransform = (animationType: ModalAnimationType) => {
    switch (animationType) {
        case 'fade':
            return { opacity: 0, scale: 1, translateY: 0 }
        case 'slideUp':
            return { opacity: 1, scale: 1, translateY: 300 }
        case 'slideDown':
            return { opacity: 1, scale: 1, translateY: -300 }
        case 'scale':
            return { opacity: 0, scale: 0.8, translateY: 0 }
        case 'slideLeft':
            return { opacity: 1, scale: 1, translateX: -300, translateY: 0 }
        case 'slideRight':
            return { opacity: 1, scale: 1, translateX: 300, translateY: 0 }
        default:
            return { opacity: 0, scale: 1, translateY: 0 }
    }
}

const getFinalTransform = () => {
    return { opacity: 1, scale: 1, translateX: 0, translateY: 0 }
}

export const AnimatedModal = forwardRef<AnimatedModalRef, AnimatedModalProps>(({
    visible,
    onClose,
    onOpen,
    children,
    animationType = 'fade',
    variant = 'default',
    size = 'md',
    title,
    showCloseButton = true,
    dismissOnBackdropPress = true,
    handleBackButton = true,
    backdropColor,
    modalStyle,
    contentStyle,
    titleStyle,
    testID
}, ref) => {
    // Animation values
    const backdropOpacity = useSharedValue(0)
    const modalOpacity = useSharedValue(0)
    const modalScale = useSharedValue(0.8)
    const modalTranslateX = useSharedValue(0)
    const modalTranslateY = useSharedValue(0)

    // Get configurations
    const sizeStyles = getSizeStyles(size)

    // Initialize animation values
    const initializeValues = () => {
        const initialTransform = getInitialTransform(animationType)
        modalOpacity.value = initialTransform.opacity
        modalScale.value = initialTransform.scale
        modalTranslateX.value = initialTransform.translateX || 0
        modalTranslateY.value = initialTransform.translateY || 0
    }

    // Show modal animation
    const showModal = () => {
        const finalTransform = getFinalTransform()
        const config = {
            damping: 15,
            stiffness: 300,
            mass: 0.8
        }

        backdropOpacity.value = withTiming(1, { duration: 200 })
        modalOpacity.value = withSpring(finalTransform.opacity, config)
        modalScale.value = withSpring(finalTransform.scale, config)
        modalTranslateX.value = withSpring(finalTransform.translateX, config)
        modalTranslateY.value = withSpring(finalTransform.translateY, config)
    }

    // Hide modal animation
    const hideModal = (callback?: () => void) => {
        const initialTransform = getInitialTransform(animationType)
        const config = {
            damping: 15,
            stiffness: 300,
            mass: 0.8
        }

        backdropOpacity.value = withTiming(0, { duration: 200 })
        modalOpacity.value = withSpring(initialTransform.opacity, config)
        modalScale.value = withSpring(initialTransform.scale, config)
        modalTranslateX.value = withSpring(initialTransform.translateX || 0, config)
        modalTranslateY.value = withSpring(initialTransform.translateY || 0, config, (finished) => {
            if (finished && callback) {
                runOnJS(callback)()
            }
        })
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

    // Animated styles
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value
    }))

    const modalAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: modalOpacity.value,
            transform: [
                { scale: modalScale.value },
                { translateX: modalTranslateX.value },
                { translateY: modalTranslateY.value }
            ]
        }
    })

    // Imperative methods
    useImperativeHandle(ref, () => ({
        show: () => {
            if (!visible) {
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
            <View style={styles.container}>
                {/* Backdrop */}
                <TouchableWithoutFeedback
                    onPress={dismissOnBackdropPress ? onClose : undefined}
                >
                    <Animated.View
                        style={[
                            styles.backdrop,
                            backdropAnimatedStyle,
                            { backgroundColor: backdropColor || 'rgba(0, 0, 0, 0.5)' }
                        ]}
                    />
                </TouchableWithoutFeedback>

                {/* Modal Content */}
                <Animated.View
                    style={[
                        styles.modal,
                        sizeStyles,
                        modalAnimatedStyle,
                        {
                            backgroundColor: '#FFFFFF',
                            borderRadius: variant === 'outline' ? 12 : 8,
                            borderWidth: variant === 'outline' ? 2 : 0,
                            borderColor: variant === 'outline' ? '#E5E7EB' : 'transparent'
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
                                    <Text style={styles.closeButtonText}>
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
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        maxHeight: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
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

export default AnimatedModal;
