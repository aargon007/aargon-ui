import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SnackbarProvider } from '@aargon-ui/snackbar'
import { useSnackbar } from '@aargon-ui/snackbar'
import type { SnackbarType, SnackbarVariant, SnackbarPosition, SnackbarAnimation } from '@aargon-ui/snackbar'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'

const SnackbarDemo = () => {
    const snackbar = useSnackbar()
    const [selectedType, setSelectedType] = useState<SnackbarType>('info')
    const [selectedVariant, setSelectedVariant] = useState<SnackbarVariant>('default')
    const [selectedPosition, setSelectedPosition] = useState<SnackbarPosition>('bottom')
    const [selectedAnimation, setSelectedAnimation] = useState<SnackbarAnimation>('slide')

    const showBasicSnackbar = () => {
        snackbar.show({
            message: 'This is a basic snackbar message',
            type: selectedType,
            variant: selectedVariant,
            position: selectedPosition,
            animation: selectedAnimation
        })
    }

    const showWithAction = () => {
        snackbar.show({
            message: 'Message sent successfully',
            type: 'success',
            variant: selectedVariant,
            position: selectedPosition,
            animation: selectedAnimation,
            action: {
                label: 'UNDO',
                onPress: () => {
                    snackbar.info('Action undone')
                }
            }
        })
    }

    const showWithProgress = () => {
        snackbar.show({
            message: 'File uploading...',
            type: 'info',
            variant: selectedVariant,
            position: selectedPosition,
            animation: selectedAnimation,
            showProgress: true,
            duration: 5000,
            dismissible: false
        })
    }

    const showPersistent = () => {
        snackbar.show({
            message: 'This snackbar will stay until dismissed',
            type: 'warning',
            variant: selectedVariant,
            position: selectedPosition,
            animation: selectedAnimation,
            autoDismiss: false,
            dismissible: true
        })
    }

    const showPromiseExample = async () => {
        const mockApiCall = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Data loaded') : reject('Network error')
            }, 2000)
        })

        try {
            await snackbar.promise(mockApiCall(), {
                loading: 'Loading data...',
                success: 'Data loaded successfully!',
                error: 'Failed to load data'
            })
        } catch (error) {
            // Error already handled by promise method
        }
    }

    const showMultiple = () => {
        snackbar.success('First message')
        setTimeout(() => snackbar.warning('Second message'), 500)
        setTimeout(() => snackbar.error('Third message'), 1000)
    }

    const types: SnackbarType[] = ['info', 'success', 'warning', 'error', 'neutral']
    const variants: SnackbarVariant[] = ['default', 'filled', 'outlined', 'soft', 'glass', 'minimal']
    const positions: SnackbarPosition[] = ['top', 'bottom', 'left', 'right']
    const animations: SnackbarAnimation[] = ['slide', 'fade', 'scale', 'bounce', 'flip', 'elastic', 'none']

    return (
        <ComponentPage>
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Animated Snackbar
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable snackbar component with smooth animations
                </Text>
            </View>

            <View style={globalStyles.previewContainer}>
                {/* Configuration */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configuration</Text>

                    {/* Type Selection */}
                    <Text style={styles.label}>Type</Text>
                    <View style={styles.optionRow}>
                        {types.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.option,
                                    selectedType === type && styles.selectedOption
                                ]}
                                onPress={() => setSelectedType(type)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedType === type && styles.selectedOptionText
                                ]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Variant Selection */}
                    <Text style={styles.label}>Variant</Text>
                    <View style={styles.optionRow}>
                        {variants.map((variant) => (
                            <TouchableOpacity
                                key={variant}
                                style={[
                                    styles.option,
                                    selectedVariant === variant && styles.selectedOption
                                ]}
                                onPress={() => setSelectedVariant(variant)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedVariant === variant && styles.selectedOptionText
                                ]}>
                                    {variant}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Position Selection */}
                    <Text style={styles.label}>Position</Text>
                    <View style={styles.optionRow}>
                        {positions.map((position) => (
                            <TouchableOpacity
                                key={position}
                                style={[
                                    styles.option,
                                    selectedPosition === position && styles.selectedOption
                                ]}
                                onPress={() => setSelectedPosition(position)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedPosition === position && styles.selectedOptionText
                                ]}>
                                    {position}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Animation Selection */}
                    <Text style={styles.label}>Animation</Text>
                    <View style={styles.optionRow}>
                        {animations.map((animation) => (
                            <TouchableOpacity
                                key={animation}
                                style={[
                                    styles.option,
                                    selectedAnimation === animation && styles.selectedOption
                                ]}
                                onPress={() => setSelectedAnimation(animation)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedAnimation === animation && styles.selectedOptionText
                                ]}>
                                    {animation}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Examples */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Examples</Text>

                    <TouchableOpacity style={styles.button} onPress={showBasicSnackbar}>
                        <Text style={styles.buttonText}>Show Basic Snackbar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={showWithAction}>
                        <Text style={styles.buttonText}>Show with Action</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={showWithProgress}>
                        <Text style={styles.buttonText}>Show with Progress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={showPersistent}>
                        <Text style={styles.buttonText}>Show Persistent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={showPromiseExample}>
                        <Text style={styles.buttonText}>Promise Example</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={showMultiple}>
                        <Text style={styles.buttonText}>Show Multiple</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <View style={styles.quickActions}>
                        <TouchableOpacity
                            style={[styles.quickButton, { backgroundColor: '#10B981' }]}
                            onPress={() => snackbar.success('Success message!')}
                        >
                            <Text style={styles.quickButtonText}>Success</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.quickButton, { backgroundColor: '#EF4444' }]}
                            onPress={() => snackbar.error('Error message!')}
                        >
                            <Text style={styles.quickButtonText}>Error</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.quickButton, { backgroundColor: '#F59E0B' }]}
                            onPress={() => snackbar.warning('Warning message!')}
                        >
                            <Text style={styles.quickButtonText}>Warning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.quickButton, { backgroundColor: '#3B82F6' }]}
                            onPress={() => snackbar.info('Info message!')}
                        >
                            <Text style={styles.quickButtonText}>Info</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#EF4444' }]}
                        onPress={() => snackbar.hideAll()}
                    >
                        <Text style={styles.buttonText}>Hide All</Text>
                    </TouchableOpacity>
                </View>

                {/* Current Configuration */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Configuration</Text>
                    <View style={styles.configDisplay}>
                        <Text style={styles.configText}>Type: {selectedType}</Text>
                        <Text style={styles.configText}>Variant: {selectedVariant}</Text>
                        <Text style={styles.configText}>Position: {selectedPosition}</Text>
                        <Text style={styles.configText}>Animation: {selectedAnimation}</Text>
                    </View>
                </View>
            </View>
        </ComponentPage>
    )
}

export default function SnackbarPage() {
    return (
        <SnackbarProvider maxSnackbars={3}>
            <SnackbarDemo />
        </SnackbarProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
        lineHeight: 24
    },
    section: {
        marginBottom: 32
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
        marginTop: 16
    },
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    option: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: '#E5E7EB',
        marginBottom: 8
    },
    selectedOption: {
        backgroundColor: '#3B82F6'
    },
    optionText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#374151'
    },
    selectedOptionText: {
        color: '#FFFFFF'
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16
    },
    quickButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        flex: 1,
        minWidth: 80,
        alignItems: 'center'
    },
    quickButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600'
    },
    configDisplay: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    configText: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 4
    }
})