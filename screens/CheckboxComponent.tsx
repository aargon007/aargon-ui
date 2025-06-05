import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedCheckbox } from "@/component/ui/checkbox/AnimatedCheckbox"
import { useState } from "react"

export default function CheckboxPage() {
    // State management for different examples
    const [basicStates, setBasicStates] = useState({
        simple: false,
        withDescription: true,
        disabled: false,
    })

    const [variantStates, setVariantStates] = useState({
        default: false,
        filled: true,
        outline: false,
        ghost: true,
        rounded: false,
        soft: true,
    })

    const [sizeStates, setSizeStates] = useState({
        xs: true,
        sm: false,
        md: true,
        lg: false,
        xl: true,
    })

    const [colorStates, setColorStates] = useState({
        primary: true,
        secondary: false,
        success: true,
        warning: false,
        error: true,
        info: false,
    })

    const [animationStates, setAnimationStates] = useState({
        scale: false,
        bounce: true,
        slide: false,
        fade: true,
        rotate: false,
        elastic: true,
        morph: false,
        pulse: true,
    })

    const [specialStates, setSpecialStates] = useState({
        indeterminate: "indeterminate" as "unchecked" | "checked" | "indeterminate",
        focusRing: false,
        ripple: true,
        shadow: false,
    })

    const [formStates, setFormStates] = useState({
        newsletter: true,
        updates: false,
        marketing: false,
        terms: false,
    })

    // Helper functions
    const handleBasicChange = (key: string) => (checked: boolean) => {
        setBasicStates(prev => ({ ...prev, [key]: checked }))
    }

    const handleVariantChange = (key: string) => (checked: boolean) => {
        setVariantStates(prev => ({ ...prev, [key]: checked }))
    }

    const handleSizeChange = (key: string) => (checked: boolean) => {
        setSizeStates(prev => ({ ...prev, [key]: checked }))
    }

    const handleColorChange = (key: string) => (checked: boolean) => {
        setColorStates(prev => ({ ...prev, [key]: checked }))
    }

    const handleAnimationChange = (key: string) => (checked: boolean) => {
        setAnimationStates(prev => ({ ...prev, [key]: checked }))
    }

    const handleSpecialChange = (key: string) => (checked: boolean) => {
        if (key === 'indeterminate') {
            setSpecialStates(prev => ({
                ...prev,
                indeterminate: prev.indeterminate === "unchecked" ? "checked" :
                    prev.indeterminate === "checked" ? "indeterminate" : "unchecked"
            }))
        } else {
            setSpecialStates(prev => ({ ...prev, [key]: checked }))
        }
    }

    const handleFormChange = (key: string) => (checked: boolean) => {
        setFormStates(prev => ({ ...prev, [key]: checked }))
    }

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Animated Checkbox Component
                    </Text>
                    <Text style={globalStyles.description}>
                        Comprehensive checkbox component with smooth Reanimated animations and modern UI design
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 24 }]}>
                        {/* Basic Examples with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Checkboxes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Simple Checkbox"
                                    checked={basicStates.simple}
                                    onPress={handleBasicChange('simple')}
                                />
                                <AnimatedCheckbox
                                    label="With Description"
                                    description="This checkbox includes additional description text below the label"
                                    checked={basicStates.withDescription}
                                    onPress={handleBasicChange('withDescription')}
                                />
                                <AnimatedCheckbox
                                    label="Disabled State"
                                    disabled={true}
                                    checked={basicStates.disabled}
                                    onPress={handleBasicChange('disabled')}
                                />
                            </View>
                        </View>

                        {/* Variants with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Variants</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Default Variant"
                                    variant="default"
                                    checked={variantStates.default}
                                    onPress={handleVariantChange('default')}
                                />
                                <AnimatedCheckbox
                                    label="Filled Variant"
                                    variant="filled"
                                    shadow={true}
                                    checked={variantStates.filled}
                                    onPress={handleVariantChange('filled')}
                                />
                                <AnimatedCheckbox
                                    label="Outline Variant"
                                    variant="outline"
                                    checked={variantStates.outline}
                                    onPress={handleVariantChange('outline')}
                                />
                                <AnimatedCheckbox
                                    label="Ghost Variant"
                                    variant="ghost"
                                    checked={variantStates.ghost}
                                    onPress={handleVariantChange('ghost')}
                                />
                                <AnimatedCheckbox
                                    label="Rounded Variant"
                                    variant="rounded"
                                    checked={variantStates.rounded}
                                    onPress={handleVariantChange('rounded')}
                                />
                                <AnimatedCheckbox
                                    label="Soft Variant"
                                    variant="soft"
                                    checked={variantStates.soft}
                                    onPress={handleVariantChange('soft')}
                                />
                            </View>
                        </View>

                        {/* Sizes with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sizes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Extra Small (xs)"
                                    size="xs"
                                    checked={sizeStates.xs}
                                    onPress={handleSizeChange('xs')}
                                />
                                <AnimatedCheckbox
                                    label="Small (sm)"
                                    size="sm"
                                    checked={sizeStates.sm}
                                    onPress={handleSizeChange('sm')}
                                />
                                <AnimatedCheckbox
                                    label="Medium (md) - Default"
                                    size="md"
                                    checked={sizeStates.md}
                                    onPress={handleSizeChange('md')}
                                />
                                <AnimatedCheckbox
                                    label="Large (lg)"
                                    size="lg"
                                    checked={sizeStates.lg}
                                    onPress={handleSizeChange('lg')}
                                />
                                <AnimatedCheckbox
                                    label="Extra Large (xl)"
                                    size="xl"
                                    checked={sizeStates.xl}
                                    onPress={handleSizeChange('xl')}
                                />
                            </View>
                        </View>

                        {/* Color Schemes with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Color Schemes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Primary Color"
                                    colorScheme="primary"
                                    checked={colorStates.primary}
                                    onPress={handleColorChange('primary')}
                                />
                                <AnimatedCheckbox
                                    label="Secondary Color"
                                    colorScheme="secondary"
                                    checked={colorStates.secondary}
                                    onPress={handleColorChange('secondary')}
                                />
                                <AnimatedCheckbox
                                    label="Success Color"
                                    colorScheme="success"
                                    checked={colorStates.success}
                                    onPress={handleColorChange('success')}
                                />
                                <AnimatedCheckbox
                                    label="Warning Color"
                                    colorScheme="warning"
                                    checked={colorStates.warning}
                                    onPress={handleColorChange('warning')}
                                />
                                <AnimatedCheckbox
                                    label="Error Color"
                                    colorScheme="error"
                                    checked={colorStates.error}
                                    onPress={handleColorChange('error')}
                                />
                                <AnimatedCheckbox
                                    label="Info Color"
                                    colorScheme="info"
                                    checked={colorStates.info}
                                    onPress={handleColorChange('info')}
                                />
                            </View>
                        </View>

                        {/* Animation Types with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Animation Types</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Scale Animation"
                                    animationType="scale"
                                    checked={animationStates.scale}
                                    onPress={handleAnimationChange('scale')}
                                />
                                <AnimatedCheckbox
                                    label="Bounce Animation"
                                    animationType="bounce"
                                    checked={animationStates.bounce}
                                    onPress={handleAnimationChange('bounce')}
                                />
                                <AnimatedCheckbox
                                    label="Slide Animation"
                                    animationType="slide"
                                    checked={animationStates.slide}
                                    onPress={handleAnimationChange('slide')}
                                />
                                <AnimatedCheckbox
                                    label="Fade Animation"
                                    animationType="fade"
                                    checked={animationStates.fade}
                                    onPress={handleAnimationChange('fade')}
                                />
                                <AnimatedCheckbox
                                    label="Rotate Animation"
                                    animationType="rotate"
                                    checked={animationStates.rotate}
                                    onPress={handleAnimationChange('rotate')}
                                />
                                <AnimatedCheckbox
                                    label="Elastic Animation"
                                    animationType="elastic"
                                    checked={animationStates.elastic}
                                    onPress={handleAnimationChange('elastic')}
                                />
                                <AnimatedCheckbox
                                    label="Morph Animation"
                                    animationType="morph"
                                    checked={animationStates.morph}
                                    onPress={handleAnimationChange('morph')}
                                />
                                <AnimatedCheckbox
                                    label="Pulse Animation"
                                    animationType="pulse"
                                    checked={animationStates.pulse}
                                    onPress={handleAnimationChange('pulse')}
                                />
                            </View>
                        </View>

                        {/* Special Features with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Special Features</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Indeterminate State"
                                    description="Click to cycle: unchecked → checked → indeterminate"
                                    state={specialStates.indeterminate}
                                    onPress={handleSpecialChange('indeterminate')}
                                />
                                <AnimatedCheckbox
                                    label="With Focus Ring"
                                    showFocusRing={true}
                                    checked={specialStates.focusRing}
                                    onPress={handleSpecialChange('focusRing')}
                                />
                                <AnimatedCheckbox
                                    label="With Ripple Effect"
                                    showRipple={true}
                                    checked={specialStates.ripple}
                                    onPress={handleSpecialChange('ripple')}
                                />
                                <AnimatedCheckbox
                                    label="With Shadow"
                                    shadow={true}
                                    variant="filled"
                                    checked={specialStates.shadow}
                                    onPress={handleSpecialChange('shadow')}
                                />
                            </View>
                        </View>

                        {/* Custom Icons with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Icons</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Heart Icon"
                                    checkIcon="heart"
                                    colorScheme="error"
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Star Icon"
                                    checkIcon="star"
                                    colorScheme="warning"
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Thumbs Up Icon"
                                    checkIcon="thumbs-up"
                                    colorScheme="success"
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Custom Indeterminate"
                                    indeterminateIcon="x"
                                    state="indeterminate"
                                    colorScheme="error"
                                />
                            </View>
                        </View>

                        {/* Label Positions with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Label Positions</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Label on Right (Default)"
                                    labelPosition="right"
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Label on Left"
                                    labelPosition="left"
                                    checked={true}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>

                        {/* Form Example with State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Form Example</Text>
                            <View style={styles.formContainer}>
                                <Text style={styles.formTitle}>Newsletter Preferences</Text>
                                <Text style={styles.formDescription}>
                                    Choose which emails you'd like to receive from us
                                </Text>
                                <View style={styles.checkboxGroup}>
                                    <AnimatedCheckbox
                                        label="Weekly Newsletter"
                                        description="Get our weekly digest of the latest updates and features"
                                        checked={formStates.newsletter}
                                        onPress={handleFormChange('newsletter')}
                                        colorScheme="primary"
                                        animationType="bounce"
                                    />
                                    <AnimatedCheckbox
                                        label="Product Updates"
                                        description="Be the first to know about new features and improvements"
                                        checked={formStates.updates}
                                        onPress={handleFormChange('updates')}
                                        colorScheme="info"
                                        animationType="elastic"
                                    />
                                    <AnimatedCheckbox
                                        label="Marketing Communications"
                                        description="Receive promotional content and special offers"
                                        checked={formStates.marketing}
                                        onPress={handleFormChange('marketing')}
                                        colorScheme="success"
                                        animationType="morph"
                                    />
                                    <AnimatedCheckbox
                                        label="Terms and Conditions"
                                        description="I agree to the terms of service and privacy policy"
                                        checked={formStates.terms}
                                        onPress={handleFormChange('terms')}
                                        colorScheme="error"
                                        animationType="pulse"
                                        variant="outline"
                                    />
                                </View>

                                <View style={styles.formSummary}>
                                    <Text style={styles.summaryTitle}>Current Selections:</Text>
                                    <Text style={styles.summaryText}>
                                        Newsletter: {formStates.newsletter ? '✓' : '✗'} |
                                        Updates: {formStates.updates ? '✓' : '✗'} |
                                        Marketing: {formStates.marketing ? '✓' : '✗'} |
                                        Terms: {formStates.terms ? '✓' : '✗'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Advanced Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Advanced Examples</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Full Width Checkbox"
                                    description="This checkbox takes the full width of its container"
                                    fullWidth={true}
                                    variant="soft"
                                    checked={true}
                                    onPress={() => { }}
                                    showRipple={true}
                                />
                                <AnimatedCheckbox
                                    label="Custom Border Radius"
                                    borderRadius={12}
                                    variant="filled"
                                    shadow={true}
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Slow Animation"
                                    animationType="elastic"
                                    animationDuration={600}
                                    checked={false}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>

                        {/* State Summary */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>State Summary</Text>
                            <View style={styles.summaryContainer}>
                                <Text style={styles.summaryTitle}>Current Component States:</Text>
                                <View style={styles.summaryGrid}>
                                    <View style={styles.summaryColumn}>
                                        <Text style={styles.summaryLabel}>Basic States:</Text>
                                        <Text style={styles.summaryValue}>
                                            {Object.entries(basicStates).map(([key, value]) =>
                                                `${key}: ${value ? '✓' : '✗'}`
                                            ).join('\n')}
                                        </Text>
                                    </View>
                                    <View style={styles.summaryColumn}>
                                        <Text style={styles.summaryLabel}>Variant States:</Text>
                                        <Text style={styles.summaryValue}>
                                            {Object.entries(variantStates).map(([key, value]) =>
                                                `${key}: ${value ? '✓' : '✗'}`
                                            ).join('\n')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: "#1F2937",
    },
    checkboxGroup: {
        gap: 12,
    },
    formContainer: {
        backgroundColor: "#F8FAFC",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 4,
    },
    formDescription: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 16,
        lineHeight: 20,
    },
    formSummary: {
        marginTop: 16,
        padding: 12,
        backgroundColor: "#EFF6FF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#BFDBFE",
    },
    summaryTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E40AF",
        marginBottom: 4,
    },
    summaryText: {
        fontSize: 12,
        color: "#3730A3",
        lineHeight: 16,
    },
    summaryContainer: {
        backgroundColor: "#F9FAFB",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    summaryGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    summaryColumn: {
        flex: 1,
    },
    summaryLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 11,
        color: "#6B7280",
        lineHeight: 16,
    },
})