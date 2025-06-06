import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native'
import { AnimatedModal, type AnimatedModalRef } from '@/component/ui/modal/AnimatedModal'
import type { ModalAnimationType, ModalVariant, ModalSize, ModalPosition } from '@/component/ui/modal/utils'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'

export default function ModalPage() {
    // State for different modals
    const [basicModal, setBasicModal] = useState(false)
    const [animationModal, setAnimationModal] = useState(false)
    const [variantModal, setVariantModal] = useState(false)
    const [sizeModal, setSizeModal] = useState(false)
    const [positionModal, setPositionModal] = useState(false)
    const [formModal, setFormModal] = useState(false)
    const [gestureModal, setGestureModal] = useState(false)

    // Current configurations
    const [currentAnimation, setCurrentAnimation] = useState<ModalAnimationType>('fade')
    const [currentVariant, setCurrentVariant] = useState<ModalVariant>('default')
    const [currentSize, setCurrentSize] = useState<ModalSize>('md')
    const [currentPosition, setCurrentPosition] = useState<ModalPosition>('center')

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    // Ref for imperative control
    const modalRef = useRef<AnimatedModalRef>(null)

    // Animation types
    const animationTypes: ModalAnimationType[] = [
        'fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'bounce', 'flip'
    ]

    // Variants
    const variants: ModalVariant[] = ['default', 'filled', 'outline', 'glass', 'elevated']

    // Sizes
    const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl']

    // Positions
    const positions: ModalPosition[] = ['center', 'top', 'bottom']

    const handleFormSubmit = () => {
        Alert.alert('Form Submitted', `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`)
        setFormModal(false)
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Animated Modal Component
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable modal component with smooth animations and modern design
                </Text>

                <View style={globalStyles.previewContainer}>
                    {/* Basic Modal */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Modal</Text>
                        <TouchableOpacity style={styles.button} onPress={() => setBasicModal(true)}>
                            <Text style={styles.buttonText}>Show Basic Modal</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Animation Types */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Animation Types</Text>
                        <View style={styles.optionGrid}>
                            {animationTypes.map((animation) => (
                                <TouchableOpacity
                                    key={animation}
                                    style={[
                                        styles.optionButton,
                                        currentAnimation === animation && styles.optionButtonActive
                                    ]}
                                    onPress={() => {
                                        setCurrentAnimation(animation)
                                        setAnimationModal(true)
                                    }}
                                >
                                    <Text style={[
                                        styles.optionButtonText,
                                        currentAnimation === animation && styles.optionButtonTextActive
                                    ]}>
                                        {animation}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Variants */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Variants</Text>
                        <View style={styles.optionGrid}>
                            {variants.map((variant) => (
                                <TouchableOpacity
                                    key={variant}
                                    style={[
                                        styles.optionButton,
                                        currentVariant === variant && styles.optionButtonActive
                                    ]}
                                    onPress={() => {
                                        setCurrentVariant(variant)
                                        setVariantModal(true)
                                    }}
                                >
                                    <Text style={[
                                        styles.optionButtonText,
                                        currentVariant === variant && styles.optionButtonTextActive
                                    ]}>
                                        {variant}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Sizes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sizes</Text>
                        <View style={styles.optionGrid}>
                            {sizes.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.optionButton,
                                        currentSize === size && styles.optionButtonActive
                                    ]}
                                    onPress={() => {
                                        setCurrentSize(size)
                                        setSizeModal(true)
                                    }}
                                >
                                    <Text style={[
                                        styles.optionButtonText,
                                        currentSize === size && styles.optionButtonTextActive
                                    ]}>
                                        {size.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Positions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Positions</Text>
                        <View style={styles.optionGrid}>
                            {positions.map((position) => (
                                <TouchableOpacity
                                    key={position}
                                    style={[
                                        styles.optionButton,
                                        currentPosition === position && styles.optionButtonActive
                                    ]}
                                    onPress={() => {
                                        setCurrentPosition(position)
                                        setPositionModal(true)
                                    }}
                                >
                                    <Text style={[
                                        styles.optionButtonText,
                                        currentPosition === position && styles.optionButtonTextActive
                                    ]}>
                                        {position}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Advanced Examples */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Advanced Examples</Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={() => setFormModal(true)}>
                                <Text style={styles.buttonText}>Form Modal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setGestureModal(true)}>
                                <Text style={styles.buttonText}>Gesture Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Imperative Control */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Imperative Control</Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={() => modalRef.current?.show()}>
                                <Text style={styles.buttonText}>Show via Ref</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => modalRef.current?.toggle()}>
                                <Text style={styles.buttonText}>Toggle via Ref</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Basic Modal */}
            <AnimatedModal
                visible={basicModal}
                onClose={() => setBasicModal(false)}
                title="Basic Modal"
                animationType="fade"
            >
                <Text style={styles.modalText}>
                    This is a basic modal with fade animation. It includes a title, close button, and can be dismissed by tapping the backdrop.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setBasicModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Animation Modal */}
            <AnimatedModal
                visible={animationModal}
                onClose={() => setAnimationModal(false)}
                title={`${currentAnimation} Animation`}
                animationType={currentAnimation}
            >
                <Text style={styles.modalText}>
                    This modal uses the "{currentAnimation}" animation type. Each animation has its own unique entrance and exit effects.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setAnimationModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Variant Modal */}
            <AnimatedModal
                visible={variantModal}
                onClose={() => setVariantModal(false)}
                title={`${currentVariant} Variant`}
                variant={currentVariant}
                animationType="scale"
            >
                <Text style={styles.modalText}>
                    This modal uses the "{currentVariant}" variant. Each variant has different styling, colors, and visual effects.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setVariantModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Size Modal */}
            <AnimatedModal
                visible={sizeModal}
                onClose={() => setSizeModal(false)}
                title={`${currentSize.toUpperCase()} Size`}
                size={currentSize}
                animationType="bounce"
            >
                <Text style={styles.modalText}>
                    This modal uses the "{currentSize}" size. Different sizes provide different maximum widths and heights for various use cases.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setSizeModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Position Modal */}
            <AnimatedModal
                visible={positionModal}
                onClose={() => setPositionModal(false)}
                title={`${currentPosition} Position`}
                position={currentPosition}
                animationType="slideUp"
            >
                <Text style={styles.modalText}>
                    This modal is positioned at "{currentPosition}". Different positions are useful for different types of content and user interactions.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setPositionModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Form Modal */}
            <AnimatedModal
                visible={formModal}
                onClose={() => setFormModal(false)}
                title="Contact Form"
                size="lg"
                animationType="slideUp"
                avoidKeyboard
            >
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Your Message"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline
                        numberOfLines={4}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.secondaryButton} onPress={() => setFormModal(false)}>
                            <Text style={styles.secondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleFormSubmit}>
                            <Text style={styles.primaryButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AnimatedModal>

            {/* Gesture Modal */}
            <AnimatedModal
                visible={gestureModal}
                onClose={() => setGestureModal(false)}
                title="Gesture Dismissal"
                animationType="slideUp"
                position="bottom"
                dismissOnGesture
                size="lg"
            >
                <Text style={styles.modalText}>
                    This modal can be dismissed by swiping down! Try dragging the modal downwards to close it.
                </Text>
                <Text style={styles.modalSubText}>
                    You can also tap the backdrop or use the close button as usual.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setGestureModal(false)}>
                    <Text style={styles.modalButtonText}>Close Modal</Text>
                </TouchableOpacity>
            </AnimatedModal>

            {/* Imperative Modal */}
            <AnimatedModal
                ref={modalRef}
                visible={false}
                onClose={() => { }}
                title="Imperative Control"
                animationType="flip"
            >
                <Text style={styles.modalText}>
                    This modal is controlled imperatively using a ref. You can show, hide, or toggle it programmatically.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => modalRef.current?.hide()}>
                    <Text style={styles.modalButtonText}>Hide via Ref</Text>
                </TouchableOpacity>
            </AnimatedModal>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 32
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16
    },
    button: {
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12
    },
    optionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    optionButtonActive: {
        backgroundColor: '#6366F1',
        borderColor: '#6366F1'
    },
    optionButtonText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500'
    },
    optionButtonTextActive: {
        color: '#FFFFFF'
    },
    modalText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
        marginBottom: 20
    },
    modalSubText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 20
    },
    modalButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center'
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
    form: {
        gap: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FFFFFF'
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top'
    },
    formButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    secondaryButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '500'
    }
})