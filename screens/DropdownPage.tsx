import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native'
import { AnimatedDropdown, type DropdownRef } from '@/component/ui/dropdown/AnimatedDropdown'
import {
    createSampleItems,
    type DropdownItem,
    type DropdownVariant,
    type DropdownSize,
    type DropdownColorScheme,
    type DropdownAnimationType,
} from '@/component/ui/dropdown/dropdownUtils'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'

export default function DropdownPage() {
    // Sample data
    const sampleItems = createSampleItems()
    const fruitItems: DropdownItem[] = [
        { label: 'Apple', value: 'apple', icon: 'circle', color: '#EF4444' },
        { label: 'Banana', value: 'banana', icon: 'circle', color: '#F59E0B' },
        { label: 'Orange', value: 'orange', icon: 'circle', color: '#F97316' },
        { label: 'Grapes', value: 'grapes', icon: 'circle', color: '#8B5CF6' },
        { label: 'Strawberry', value: 'strawberry', icon: 'circle', color: '#EC4899' },
    ]

    const countryItems: DropdownItem[] = [
        { label: 'United States', value: 'us', icon: 'flag', description: 'North America' },
        { label: 'United Kingdom', value: 'uk', icon: 'flag', description: 'Europe' },
        { label: 'Canada', value: 'ca', icon: 'flag', description: 'North America' },
        { label: 'Australia', value: 'au', icon: 'flag', description: 'Oceania' },
        { label: 'Germany', value: 'de', icon: 'flag', description: 'Europe' },
        { label: 'France', value: 'fr', icon: 'flag', description: 'Europe' },
        { label: 'Japan', value: 'jp', icon: 'flag', description: 'Asia' },
        { label: 'Brazil', value: 'br', icon: 'flag', description: 'South America' },
    ]

    // State for different examples
    const [basicValue, setBasicValue] = useState<string | number>('')
    const [variantValues, setVariantValues] = useState<Record<DropdownVariant, string | number>>({
        default: '',
        filled: 'apple',
        outlined: '',
        soft: 'banana',
        minimal: '',
        glass: 'orange',
    })
    const [sizeValues, setSizeValues] = useState<Record<DropdownSize, string | number>>({
        sm: '',
        md: 'us',
        lg: '',
        xl: 'uk',
    })
    const [colorValues, setColorValues] = useState<Record<DropdownColorScheme, string | number>>({
        primary: '',
        secondary: 'apple',
        success: '',
        warning: 'banana',
        error: '',
        neutral: 'orange',
    })
    const [animationValues, setAnimationValues] = useState<Record<DropdownAnimationType, string | number>>({
        fade: '',
        scale: 'us',
        slide: '',
        bounce: 'uk',
        flip: '',
        none: 'ca',
    })
    const [featureValues, setFeatureValues] = useState({
        searchable: '',
        clearable: 'apple',
        disabled: 'banana',
        loading: '',
        required: '',
    })

    // Refs for imperative control
    const dropdownRef = useRef<DropdownRef>(null)

    const handleBasicChange = (value: string | number) => {
        setBasicValue(value)
        Alert.alert('Selection Changed', `Selected: ${value}`)
    }

    const handleVariantChange = (variant: DropdownVariant) => (value: string | number) => {
        setVariantValues(prev => ({ ...prev, [variant]: value }))
    }

    const handleSizeChange = (size: DropdownSize) => (value: string | number) => {
        setSizeValues(prev => ({ ...prev, [size]: value }))
    }

    const handleColorChange = (color: DropdownColorScheme) => (value: string | number) => {
        setColorValues(prev => ({ ...prev, [color]: value }))
    }

    const handleAnimationChange = (animation: DropdownAnimationType) => (value: string | number) => {
        setAnimationValues(prev => ({ ...prev, [animation]: value }))
    }

    const handleFeatureChange = (feature: string) => (value: string | number) => {
        setFeatureValues(prev => ({ ...prev, [feature]: value }))
    }

    return (
        <ComponentPage>
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Animated Dropdown
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable dropdown component with smooth animations
                </Text>
            </View>
            <View style={globalStyles.previewContainer}>
                {/* Basic Example */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Usage</Text>
                    <Text style={styles.sectionDescription}>
                        Simple dropdown with basic functionality
                    </Text>

                    <View style={styles.example}>
                        <AnimatedDropdown
                            items={sampleItems}
                            value={basicValue}
                            placeholder="Choose an option..."
                            onSelectionChange={handleBasicChange}
                            onOpen={() => console.log('Dropdown opened')}
                            onClose={() => console.log('Dropdown closed')}
                        />
                    </View>
                </View>

                {/* Variants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Variants</Text>
                    <Text style={styles.sectionDescription}>
                        Different visual styles for various design needs
                    </Text>

                    <View style={styles.grid}>
                        {(['default', 'filled', 'outlined', 'soft', 'minimal', 'glass'] as DropdownVariant[]).map((variant) => (
                            <View key={variant} style={styles.gridItem}>
                                <Text style={styles.label}>{variant}</Text>
                                <AnimatedDropdown
                                    items={fruitItems}
                                    value={variantValues[variant]}
                                    placeholder={`${variant} dropdown`}
                                    variant={variant}
                                    onSelectionChange={handleVariantChange(variant)}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sizes</Text>
                    <Text style={styles.sectionDescription}>
                        Different sizes for various use cases
                    </Text>

                    <View style={styles.grid}>
                        {(['sm', 'md', 'lg', 'xl'] as DropdownSize[]).map((size) => (
                            <View key={size} style={styles.gridItem}>
                                <Text style={styles.label}>{size.toUpperCase()}</Text>
                                <AnimatedDropdown
                                    items={countryItems}
                                    value={sizeValues[size]}
                                    placeholder={`${size} size`}
                                    size={size}
                                    onSelectionChange={handleSizeChange(size)}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Color Schemes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Color Schemes</Text>
                    <Text style={styles.sectionDescription}>
                        Different color themes for brand consistency
                    </Text>

                    <View style={styles.grid}>
                        {(['primary', 'secondary', 'success', 'warning', 'error', 'neutral'] as DropdownColorScheme[]).map((color) => (
                            <View key={color} style={styles.gridItem}>
                                <Text style={styles.label}>{color}</Text>
                                <AnimatedDropdown
                                    items={fruitItems}
                                    value={colorValues[color]}
                                    placeholder={`${color} theme`}
                                    colorScheme={color}
                                    onSelectionChange={handleColorChange(color)}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Animation Types */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Animation Types</Text>
                    <Text style={styles.sectionDescription}>
                        Different animation styles for enhanced user experience
                    </Text>

                    <View style={styles.grid}>
                        {(['fade', 'scale', 'slide', 'bounce', 'flip', 'none'] as DropdownAnimationType[]).map((animation) => (
                            <View key={animation} style={styles.gridItem}>
                                <Text style={styles.label}>{animation}</Text>
                                <AnimatedDropdown
                                    items={countryItems}
                                    value={animationValues[animation]}
                                    placeholder={`${animation} animation`}
                                    animationType={animation}
                                    onSelectionChange={handleAnimationChange(animation)}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Features */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <Text style={styles.sectionDescription}>
                        Advanced features and states
                    </Text>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Searchable</Text>
                            <AnimatedDropdown
                                items={countryItems}
                                value={featureValues.searchable}
                                placeholder="Search countries..."
                                searchable
                                onSelectionChange={handleFeatureChange('searchable')}
                                onSearch={(query) => console.log('Search:', query)}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Clearable</Text>
                            <AnimatedDropdown
                                items={fruitItems}
                                value={featureValues.clearable}
                                placeholder="Clearable dropdown"
                                clearable
                                onSelectionChange={handleFeatureChange('clearable')}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Disabled</Text>
                            <AnimatedDropdown
                                items={fruitItems}
                                value={featureValues.disabled}
                                placeholder="Disabled dropdown"
                                disabled
                                onSelectionChange={handleFeatureChange('disabled')}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Loading</Text>
                            <AnimatedDropdown
                                items={fruitItems}
                                value={featureValues.loading}
                                placeholder="Loading dropdown"
                                loading
                                onSelectionChange={handleFeatureChange('loading')}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Required</Text>
                            <AnimatedDropdown
                                items={fruitItems}
                                value={featureValues.required}
                                placeholder="Required field"
                                required
                                onSelectionChange={handleFeatureChange('required')}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Custom Max Height</Text>
                            <AnimatedDropdown
                                items={countryItems}
                                value=""
                                placeholder="Max height 150px"
                                maxHeight={150}
                                onSelectionChange={() => { }}
                            />
                        </View>
                    </View>
                </View>

                {/* Imperative Control */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Imperative Control</Text>
                    <Text style={styles.sectionDescription}>
                        Control dropdown programmatically using refs
                    </Text>

                    <View style={styles.example}>
                        <AnimatedDropdown
                            ref={dropdownRef}
                            items={sampleItems}
                            value=""
                            placeholder="Controlled dropdown"
                            onSelectionChange={() => { }}
                        />

                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.button}
                                onPress={() => dropdownRef.current?.open()}
                            >
                                Open
                            </Text>
                            <Text
                                style={styles.button}
                                onPress={() => dropdownRef.current?.close()}
                            >
                                Close
                            </Text>
                            <Text
                                style={styles.button}
                                onPress={() => dropdownRef.current?.toggle()}
                            >
                                Toggle
                            </Text>
                            <Text
                                style={styles.button}
                                onPress={() => dropdownRef.current?.clear()}
                            >
                                Clear
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Current Values Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Values</Text>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Basic: {basicValue || 'None'}</Text>
                        <Text style={styles.summaryText}>
                            Variants: {Object.entries(variantValues)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => `${key}=${value}`)
                                .join(', ') || 'None'}
                        </Text>
                        <Text style={styles.summaryText}>
                            Sizes: {Object.entries(sizeValues)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => `${key}=${value}`)
                                .join(', ') || 'None'}
                        </Text>
                        <Text style={styles.summaryText}>
                            Colors: {Object.entries(colorValues)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => `${key}=${value}`)
                                .join(', ') || 'None'}
                        </Text>
                        <Text style={styles.summaryText}>
                            Features: {Object.entries(featureValues)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => `${key}=${value}`)
                                .join(', ') || 'None'}
                        </Text>
                    </View>
                </View>
            </View>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        lineHeight: 24,
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16,
        lineHeight: 20,
    },
    example: {
        gap: 16,
    },
    grid: {
        gap: 16,
    },
    gridItem: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        textTransform: 'capitalize',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#6366F1',
        color: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        overflow: 'hidden',
    },
    summary: {
        backgroundColor: '#F1F5F9',
        padding: 16,
        borderRadius: 8,
        gap: 8,
    },
    summaryText: {
        fontSize: 14,
        color: '#475569',
        fontFamily: 'monospace',
    },
})