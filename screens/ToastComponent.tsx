import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ToastProvider, useToast } from '@/component/ui/toast/ToastProvider'
import type { ToastType, ToastVariant, ToastPosition, ToastAnimation, ToastSize } from '@/component/ui/toast/toastUtils'

const ToastPageContent = () => {
    const toast = useToast()
    const [counter, setCounter] = useState(1)

    // Basic Toast Examples
    const showBasicToast = () => {
        toast.show({
            title: 'Basic Toast',
            message: 'This is a basic toast message',
            type: 'info',
        })
    }

    const showSuccessToast = () => {
        toast.success('Operation completed successfully!')
    }

    const showErrorToast = () => {
        toast.error('Something went wrong. Please try again.')
    }

    const showWarningToast = () => {
        toast.warning('Please check your internet connection')
    }

    const showInfoToast = () => {
        toast.info('New update available')
    }

    // Animation Examples
    const showAnimationExamples = () => {
        const animations: ToastAnimation[] = ['slide', 'fade', 'scale', 'bounce', 'flip', 'zoom']

        animations.forEach((animation, index) => {
            setTimeout(() => {
                toast.show({
                    title: `${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`,
                    message: `Toast with ${animation} animation`,
                    type: 'info',
                    animation,
                    duration: 2000,
                })
            }, index * 500)
        })
    }

    // Variant Examples
    const showVariantExamples = () => {
        const variants: ToastVariant[] = ['default', 'filled', 'outlined', 'soft', 'minimal', 'accent']

        variants.forEach((variant, index) => {
            setTimeout(() => {
                toast.show({
                    title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`,
                    message: `Toast with ${variant} variant`,
                    type: 'success',
                    variant,
                    duration: 2500,
                })
            }, index * 600)
        })
    }

    // Position Examples
    const showPositionExamples = () => {
        const positions: ToastPosition[] = ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

        positions.forEach((position, index) => {
            setTimeout(() => {
                toast.show({
                    title: `${position.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Position`,
                    message: `Toast positioned at ${position}`,
                    type: 'neutral',
                    position,
                    duration: 2000,
                })
            }, index * 400)
        })
    }

    // Size Examples
    const showSizeExamples = () => {
        const sizes: ToastSize[] = ['sm', 'md', 'lg']

        sizes.forEach((size, index) => {
            setTimeout(() => {
                toast.show({
                    title: `${size.toUpperCase()} Size Toast`,
                    message: `This is a ${size} sized toast message`,
                    type: 'info',
                    size,
                    duration: 2500,
                })
            }, index * 800)
        })
    }

    // Advanced Examples
    const showLongToast = () => {
        toast.show({
            title: 'Long Duration Toast',
            message: 'This toast will stay visible for 10 seconds to demonstrate long duration behavior',
            type: 'warning',
            duration: 10000,
            showProgress: true,
        })
    }

    const showPersistentToast = () => {
        toast.show({
            title: 'Persistent Toast',
            message: 'This toast will not auto-dismiss. Swipe to close.',
            type: 'error',
            duration: 0, // 0 means no auto-dismiss
            showProgress: false,
        })
    }

    const showProgressToast = () => {
        toast.show({
            title: 'Progress Toast',
            message: 'Watch the progress bar at the bottom',
            type: 'info',
            duration: 5000,
            showProgress: true,
            variant: 'filled',
        })
    }

    const showCustomToast = () => {
        toast.show({
            title: 'Custom Styled Toast',
            message: 'This toast has custom styling applied',
            type: 'success',
            variant: 'accent',
            animation: 'bounce',
            size: 'lg',
            duration: 4000,
            showProgress: true,
            position: 'top-right',
        })
    }

    // Promise Integration Examples
    const showPromiseToast = async () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Success!') : reject('Failed!')
            }, 3000)
        })

        toast.promise(promise, {
            loading: {
                title: 'Processing...',
                message: 'Please wait while we process your request',
            },
            success: {
                title: 'Success!',
                message: 'Your request has been processed successfully',
            },
            error: {
                title: 'Error!',
                message: 'Failed to process your request',
            },
        })
    }

    // Multiple Toasts
    const showMultipleToasts = () => {
        for (let i = 1; i <= 5; i++) {
            setTimeout(() => {
                toast.show({
                    title: `Toast ${i}`,
                    message: `This is toast number ${i} in the queue`,
                    type: i % 2 === 0 ? 'success' : 'info',
                    duration: 3000,
                })
            }, i * 200)
        }
    }

    const showSequentialToasts = () => {
        const messages = [
            { title: 'Step 1', message: 'Initializing process...', type: 'info' as ToastType },
            { title: 'Step 2', message: 'Validating data...', type: 'warning' as ToastType },
            { title: 'Step 3', message: 'Processing request...', type: 'info' as ToastType },
            { title: 'Complete', message: 'Process completed successfully!', type: 'success' as ToastType },
        ]

        messages.forEach((msg, index) => {
            setTimeout(() => {
                toast.show({
                    ...msg,
                    duration: 2000,
                    animation: 'slide',
                })
            }, index * 2500)
        })
    }

    const clearAllToasts = () => {
        toast.clear()
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Animated Toast Component</Text>
                <Text style={styles.subtitle}>
                    Highly customizable toast notifications with smooth animations
                </Text>
            </View>

            {/* Basic Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Basic Toast Types</Text>
                <View style={styles.buttonGrid}>
                    <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={showBasicToast}>
                        <Feather name="info" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Basic Toast</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.successButton]} onPress={showSuccessToast}>
                        <Feather name="check-circle" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Success</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={showErrorToast}>
                        <Feather name="x-circle" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Error</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={showWarningToast}>
                        <Feather name="alert-triangle" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Warning</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={showInfoToast}>
                        <Feather name="info" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Info</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Animation Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Animation Types</Text>
                <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showAnimationExamples}>
                    <Feather name="zap" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Show All Animations</Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Demonstrates slide, fade, scale, bounce, flip, and zoom animations
                </Text>
            </View>

            {/* Variant Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Variant Styles</Text>
                <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showVariantExamples}>
                    <Feather name="layers" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Show All Variants</Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Shows default, filled, outlined, soft, minimal, and accent variants
                </Text>
            </View>

            {/* Position Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Position Options</Text>
                <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showPositionExamples}>
                    <Feather name="move" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Show All Positions</Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Demonstrates all 6 position options: top, bottom, corners
                </Text>
            </View>

            {/* Size Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Size Options</Text>
                <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showSizeExamples}>
                    <Feather name="maximize-2" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Show All Sizes</Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Shows small, medium, and large toast sizes
                </Text>
            </View>

            {/* Advanced Examples */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Advanced Features</Text>
                <View style={styles.buttonGrid}>
                    <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={showLongToast}>
                        <Feather name="clock" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Long Duration</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={showPersistentToast}>
                        <Feather name="lock" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Persistent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={showProgressToast}>
                        <Feather name="activity" size={16} color="#fff" />
                        <Text style={styles.buttonText}>With Progress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.successButton]} onPress={showCustomToast}>
                        <Feather name="star" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Custom Style</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Promise Integration */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Promise Integration</Text>
                <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showPromiseToast}>
                    <Feather name="loader" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Promise Toast</Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Shows loading, success, or error toast based on promise result
                </Text>
            </View>

            {/* Multiple Toasts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Multiple Toasts</Text>
                <View style={styles.buttonGrid}>
                    <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showMultipleToasts}>
                        <Feather name="layers" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Queue Multiple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={showSequentialToasts}>
                        <Feather name="play" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Sequential</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={clearAllToasts}>
                        <Feather name="x" size={16} color="#fff" />
                        <Text style={styles.buttonText}>Clear All</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Usage Instructions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Usage Instructions</Text>
                <View style={styles.instructionCard}>
                    <Text style={styles.instructionTitle}>Basic Usage:</Text>
                    <Text style={styles.instructionText}>
                        • Use toast.success(), toast.error(), toast.warning(), or toast.info() for quick notifications{'\n'}
                        • Use toast.show() for full customization{'\n'}
                        • Swipe toasts to dismiss them manually{'\n'}
                        • Use toast.clear() to remove all toasts
                    </Text>
                </View>

                <View style={styles.instructionCard}>
                    <Text style={styles.instructionTitle}>Advanced Features:</Text>
                    <Text style={styles.instructionText}>
                        • Set duration to 0 for persistent toasts{'\n'}
                        • Use showProgress for visual timing feedback{'\n'}
                        • toast.promise() for async operation feedback{'\n'}
                        • Multiple toasts stack automatically
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Toast component with Reanimated animations
                </Text>
            </View>
        </ScrollView>
    )
}

const ToastPage = () => {
    return (
        <ToastProvider>
            <ToastPageContent />
        </ToastProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        lineHeight: 24,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 12,
        padding: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e9ecef',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 8,
        lineHeight: 20,
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
        minWidth: 120,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#6366f1',
    },
    successButton: {
        backgroundColor: '#10b981',
    },
    errorButton: {
        backgroundColor: '#ef4444',
    },
    warningButton: {
        backgroundColor: '#f59e0b',
    },
    infoButton: {
        backgroundColor: '#3b82f6',
    },
    instructionCard: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1',
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#6c757d',
    },
})

export default ToastPage