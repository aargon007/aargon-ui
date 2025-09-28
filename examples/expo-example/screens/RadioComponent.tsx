import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet,  Alert } from 'react-native'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'
import { AnimatedRadio, type AnimatedRadioRef } from 'aargon-radio'

export default function RadioPage() {
    // State for different radio groups
    const [basicSelected, setBasicSelected] = useState<string>('option1')
    const [variantSelected, setVariantSelected] = useState<string>('default')
    const [sizeSelected, setSizeSelected] = useState<string>('md')
    const [colorSelected, setColorSelected] = useState<string>('primary')
    const [animationSelected, setAnimationSelected] = useState<string>('scale')
    const [advancedSelected, setAdvancedSelected] = useState<string>('option1')

    // Refs for imperative control
    const radioRef = useRef<AnimatedRadioRef>(null)

    // Radio group data
    const basicOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ]

    const variantOptions = [
        { value: 'default', label: 'Default' },
        { value: 'filled', label: 'Filled' },
        { value: 'outline', label: 'Outline' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'soft', label: 'Soft' },
        { value: 'minimal', label: 'Minimal' },
    ]

    const sizeOptions = [
        { value: 'xs', label: 'Extra Small' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
    ]

    const colorOptions = [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'info', label: 'Info' },
    ]

    const animationOptions = [
        { value: 'scale', label: 'Scale' },
        { value: 'bounce', label: 'Bounce' },
        { value: 'fade', label: 'Fade' },
        { value: 'slide', label: 'Slide' },
        { value: 'elastic', label: 'Elastic' },
        { value: 'pulse', label: 'Pulse' },
        { value: 'none', label: 'None' },
    ]

    const advancedOptions = [
        {
            value: 'option1',
            label: 'Premium Plan',
            description: 'Full access to all features with priority support'
        },
        {
            value: 'option2',
            label: 'Standard Plan',
            description: 'Access to core features with email support'
        },
        {
            value: 'option3',
            label: 'Basic Plan',
            description: 'Limited access to basic features'
        },
    ]

    return (
        <ComponentPage>
            {/* Header */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Radio Button Component
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable radio button component with smooth animations
                </Text>
            </View>

            <View style={globalStyles.previewContainer}>
                {/* Basic Usage */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Basic Usage</Text>
                    <View style={styles.radioGroup}>
                        {basicOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={basicSelected === option.value}
                                label={option.label}
                                onPress={() => setBasicSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {basicSelected}</Text>
                </View>

                {/* Variants */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Variants</Text>
                    <View style={styles.radioGroup}>
                        {variantOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={variantSelected === option.value}
                                variant={option.value as any}
                                label={option.label}
                                onPress={() => setVariantSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {variantSelected}</Text>
                </View>

                {/* Sizes */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Sizes</Text>
                    <View style={styles.radioGroup}>
                        {sizeOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={sizeSelected === option.value}
                                size={option.value as any}
                                label={option.label}
                                onPress={() => setSizeSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {sizeSelected}</Text>
                </View>

                {/* Color Schemes */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Color Schemes</Text>
                    <View style={styles.radioGroup}>
                        {colorOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={colorSelected === option.value}
                                colorScheme={option.value as any}
                                label={option.label}
                                onPress={() => setColorSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {colorSelected}</Text>
                </View>

                {/* Animation Types */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Animation Types</Text>
                    <View style={styles.radioGroup}>
                        {animationOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={animationSelected === option.value}
                                animationType={option.value as any}
                                label={option.label}
                                onPress={() => setAnimationSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {animationSelected}</Text>
                </View>

                {/* Advanced Features */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Advanced Features</Text>
                    <View style={styles.radioGroup}>
                        {advancedOptions.map((option) => (
                            <AnimatedRadio
                                key={option.value}
                                selected={advancedSelected === option.value}
                                label={option.label}
                                description={option.description}
                                variant="soft"
                                colorScheme="primary"
                                animationType="bounce"
                                onPress={() => setAdvancedSelected(option.value)}
                                style={styles.radioItem}
                            />
                        ))}
                    </View>
                    <Text style={styles.stateText}>Selected: {advancedSelected}</Text>
                </View>

                {/* Label Positions */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Label Positions</Text>
                    <View style={styles.radioGroup}>
                        <AnimatedRadio
                            selected={true}
                            label="Label on Right (Default)"
                            labelPosition="right"
                            style={styles.radioItem}
                        />
                        <AnimatedRadio
                            selected={true}
                            label="Label on Left"
                            labelPosition="left"
                            style={styles.radioItem}
                        />
                    </View>
                </View>

                {/* States */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>States</Text>
                    <View style={styles.radioGroup}>
                        <AnimatedRadio
                            selected={false}
                            label="Normal State"
                            style={styles.radioItem}
                        />
                        <AnimatedRadio
                            selected={true}
                            label="Selected State"
                            style={styles.radioItem}
                        />
                        <AnimatedRadio
                            selected={false}
                            label="Disabled State"
                            disabled={true}
                            style={styles.radioItem}
                        />
                        <AnimatedRadio
                            selected={true}
                            label="Disabled Selected"
                            disabled={true}
                            style={styles.radioItem}
                        />
                    </View>
                </View>

                {/* Custom Content */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Custom Content</Text>
                    <View style={styles.radioGroup}>
                        <AnimatedRadio
                            selected={true}
                            variant="soft"
                            colorScheme="success"
                            labelContent={
                                <View style={styles.customLabel}>
                                    <Text style={styles.customLabelTitle}>Premium Package</Text>
                                    <Text style={styles.customLabelPrice}>$29.99/month</Text>
                                    <Text style={styles.customLabelFeatures}>
                                        • Unlimited access{'\n'}
                                        • Priority support{'\n'}
                                        • Advanced features
                                    </Text>
                                </View>
                            }
                            style={styles.radioItem}
                        />
                    </View>
                </View>

                {/* Interactive Demo */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Interactive Demo</Text>
                    <View style={styles.interactiveDemo}>
                        <AnimatedRadio
                            ref={radioRef}
                            selected={false}
                            label="Controlled Radio"
                            variant="filled"
                            colorScheme="primary"
                            animationType="elastic"
                            onPress={(selected: any) => {
                                Alert.alert(
                                    'Radio Pressed',
                                    `Radio is now ${selected ? 'selected' : 'deselected'}`
                                )
                            }}
                            onLongPress={() => {
                                Alert.alert('Long Press', 'Radio was long pressed!')
                            }}
                        />
                    </View>
                </View>

                {/* State Summary */}
                <View style={globalStyles.demoSection}>
                    <Text style={styles.sectionTitle}>Current State Summary</Text>
                    <View style={styles.stateSummary}>
                        <Text style={styles.summaryText}>Basic: {basicSelected}</Text>
                        <Text style={styles.summaryText}>Variant: {variantSelected}</Text>
                        <Text style={styles.summaryText}>Size: {sizeSelected}</Text>
                        <Text style={styles.summaryText}>Color: {colorSelected}</Text>
                        <Text style={styles.summaryText}>Animation: {animationSelected}</Text>
                        <Text style={styles.summaryText}>Advanced: {advancedSelected}</Text>
                    </View>
                </View>
            </View>
        </ComponentPage >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    radioGroup: {
        gap: 12,
    },
    radioItem: {
        marginBottom: 4,
    },
    stateText: {
        marginTop: 12,
        fontSize: 14,
        color: '#6B7280',
        fontStyle: 'italic',
    },
    customLabel: {
        flex: 1,
    },
    customLabelTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    customLabelPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#059669',
        marginBottom: 8,
    },
    customLabelFeatures: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    interactiveDemo: {
        padding: 20,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        alignItems: 'center',
    },
    stateSummary: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 8,
        gap: 8,
    },
    summaryText: {
        fontSize: 14,
        color: '#374151',
        fontFamily: 'monospace',
    },
})