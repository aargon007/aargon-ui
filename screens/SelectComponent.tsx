import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native'
import { AnimatedSelect, type SelectRef } from '@/component/ui/select/AnimatedSelect'
import type { SelectOption } from '@/component/ui/select/utils'

const sampleOptions: SelectOption[] = [
    { label: 'Apple', value: 'apple', icon: 'smartphone' },
    { label: 'Banana', value: 'banana', icon: 'star' },
    { label: 'Cherry', value: 'cherry', icon: 'heart' },
    { label: 'Date', value: 'date', icon: 'calendar' },
    { label: 'Elderberry', value: 'elderberry', icon: 'gift' },
    { label: 'Fig', value: 'fig', icon: 'coffee' },
    { label: 'Grape', value: 'grape', icon: 'music' },
    { label: 'Honeydew', value: 'honeydew', icon: 'sun' },
]

const countryOptions: SelectOption[] = [
    { label: 'United States', value: 'us', description: 'North America' },
    { label: 'United Kingdom', value: 'uk', description: 'Europe' },
    { label: 'Canada', value: 'ca', description: 'North America' },
    { label: 'Australia', value: 'au', description: 'Oceania' },
    { label: 'Germany', value: 'de', description: 'Europe' },
    { label: 'France', value: 'fr', description: 'Europe' },
    { label: 'Japan', value: 'jp', description: 'Asia' },
    { label: 'Brazil', value: 'br', description: 'South America' },
]

const statusOptions: SelectOption[] = [
    { label: 'Active', value: 'active', color: '#10B981' },
    { label: 'Inactive', value: 'inactive', color: '#6B7280' },
    { label: 'Pending', value: 'pending', color: '#F59E0B' },
    { label: 'Suspended', value: 'suspended', color: '#EF4444', disabled: true },
]

export default function SelectPage() {
    // State for different select examples
    const [basicValue, setBasicValue] = useState<string | number>('')
    const [multiValue, setMultiValue] = useState<(string | number)[]>([])
    const [searchableValue, setSearchableValue] = useState<string | number>('')
    const [countryValue, setCountryValue] = useState<string | number>('')
    const [statusValue, setStatusValue] = useState<string | number>('')
    const [customValue, setCustomValue] = useState<string | number>('')
    const [loadingValue, setLoadingValue] = useState<string | number>('')

    // Refs for imperative control
    const basicSelectRef = useRef<SelectRef>(null)
    const multiSelectRef = useRef<SelectRef>(null)

    const handleBasicChange = (value: string | number | (string | number)[]) => {
        setBasicValue(value as string | number)
        Alert.alert('Selection Changed', `Selected: ${value}`)
    }

    const handleMultiChange = (value: string | number | (string | number)[]) => {
        setMultiValue(value as (string | number)[])
    }

    const handleSearchableChange = (value: string | number | (string | number)[]) => {
        setSearchableValue(value as string | number)
    }

    const handleCountryChange = (value: string | number | (string | number)[]) => {
        setCountryValue(value as string | number)
    }

    const handleStatusChange = (value: string | number | (string | number)[]) => {
        setStatusValue(value as string | number)
    }

    const handleCustomChange = (value: string | number | (string | number)[]) => {
        setCustomValue(value as string | number)
    }

    const renderCustomOption = (option: SelectOption, isSelected: boolean) => (
        <View style={[styles.customOption, isSelected && styles.customOptionSelected]}>
            <View style={styles.customOptionContent}>
                <Text style={[styles.customOptionLabel, isSelected && styles.customOptionLabelSelected]}>
                    {option.label}
                </Text>
                {option.description && (
                    <Text style={[styles.customOptionDescription, isSelected && styles.customOptionDescriptionSelected]}>
                        {option.description}
                    </Text>
                )}
            </View>
            {option.color && (
                <View style={[styles.colorIndicator, { backgroundColor: option.color }]} />
            )}
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.title}>Animated Select Component</Text>
                    <Text style={styles.subtitle}>
                        Highly customizable select component with smooth animations
                    </Text>

                    {/* Basic Select */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Select</Text>
                        <AnimatedSelect
                            ref={basicSelectRef}
                            options={sampleOptions}
                            value={basicValue}
                            placeholder="Choose a fruit..."
                            onSelectionChange={handleBasicChange}
                            onOpen={() => console.log('Basic select opened')}
                            onClose={() => console.log('Basic select closed')}
                            testID="basic-select"
                        />
                    </View>

                    {/* Animation Types */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Animation Types</Text>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Scale Animation</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 4)}
                                    animationType="scale"
                                    placeholder="Scale animation"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Slide Animation</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 4)}
                                    animationType="slide"
                                    placeholder="Slide animation"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Bounce Animation</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 4)}
                                    animationType="bounce"
                                    placeholder="Bounce animation"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Flip Animation</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 4)}
                                    animationType="flip"
                                    placeholder="Flip animation"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Variants */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Variants</Text>
                        <View style={styles.variantGrid}>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Default</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="default"
                                    placeholder="Default"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Filled</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="filled"
                                    placeholder="Filled"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Outlined</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="outlined"
                                    placeholder="Outlined"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Soft</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="soft"
                                    placeholder="Soft"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Minimal</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="minimal"
                                    placeholder="Minimal"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.variantItem}>
                                <Text style={styles.label}>Glass</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    variant="glass"
                                    placeholder="Glass"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Sizes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sizes</Text>
                        <View style={styles.sizeContainer}>
                            <Text style={styles.label}>Small</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                size="sm"
                                placeholder="Small size"
                                onSelectionChange={() => { }}
                            />
                        </View>
                        <View style={styles.sizeContainer}>
                            <Text style={styles.label}>Medium (Default)</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                size="md"
                                placeholder="Medium size"
                                onSelectionChange={() => { }}
                            />
                        </View>
                        <View style={styles.sizeContainer}>
                            <Text style={styles.label}>Large</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                size="lg"
                                placeholder="Large size"
                                onSelectionChange={() => { }}
                            />
                        </View>
                        <View style={styles.sizeContainer}>
                            <Text style={styles.label}>Extra Large</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                size="xl"
                                placeholder="Extra large size"
                                onSelectionChange={() => { }}
                            />
                        </View>
                    </View>

                    {/* Color Schemes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Color Schemes</Text>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Primary</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="primary"
                                    placeholder="Primary"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Secondary</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="secondary"
                                    placeholder="Secondary"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Success</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="success"
                                    placeholder="Success"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Warning</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="warning"
                                    placeholder="Warning"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Error</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="error"
                                    placeholder="Error"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <Text style={styles.label}>Neutral</Text>
                                <AnimatedSelect
                                    options={sampleOptions.slice(0, 3)}
                                    colorScheme="neutral"
                                    placeholder="Neutral"
                                    onSelectionChange={() => { }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Multi-Select */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Multi-Select</Text>
                        <AnimatedSelect
                            ref={multiSelectRef}
                            options={sampleOptions}
                            value={multiValue}
                            placeholder="Select multiple fruits..."
                            multiple={true}
                            clearable={true}
                            onSelectionChange={handleMultiChange}
                            testID="multi-select"
                        />
                        <Text style={styles.helperText}>
                            Selected: {multiValue.length > 0 ? multiValue.join(', ') : 'None'}
                        </Text>
                    </View>

                    {/* Searchable Select */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Searchable Select</Text>
                        <AnimatedSelect
                            options={countryOptions}
                            value={searchableValue}
                            placeholder="Search and select a country..."
                            searchable={true}
                            clearable={true}
                            onSelectionChange={handleSearchableChange}
                            onSearch={(query) => console.log('Search query:', query)}
                            testID="searchable-select"
                        />
                    </View>

                    {/* With Descriptions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>With Descriptions</Text>
                        <AnimatedSelect
                            options={countryOptions}
                            value={countryValue}
                            placeholder="Select a country..."
                            variant="filled"
                            clearable={true}
                            onSelectionChange={handleCountryChange}
                        />
                    </View>

                    {/* Status Select */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Status Select</Text>
                        <AnimatedSelect
                            options={statusOptions}
                            value={statusValue}
                            placeholder="Select status..."
                            variant="soft"
                            colorScheme="success"
                            onSelectionChange={handleStatusChange}
                        />
                    </View>

                    {/* Custom Rendering */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Custom Option Rendering</Text>
                        <AnimatedSelect
                            options={statusOptions}
                            value={customValue}
                            placeholder="Custom rendered options..."
                            variant="outlined"
                            renderOption={renderCustomOption}
                            onSelectionChange={handleCustomChange}
                        />
                    </View>

                    {/* States */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>States</Text>
                        <View style={styles.stateContainer}>
                            <Text style={styles.label}>Disabled</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                placeholder="Disabled select"
                                disabled={true}
                                onSelectionChange={() => { }}
                            />
                        </View>
                        <View style={styles.stateContainer}>
                            <Text style={styles.label}>Loading</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                placeholder="Loading select"
                                loading={true}
                                value={loadingValue}
                                onSelectionChange={(value) => setLoadingValue(value as string | number)}
                            />
                        </View>
                        <View style={styles.stateContainer}>
                            <Text style={styles.label}>Required</Text>
                            <AnimatedSelect
                                options={sampleOptions.slice(0, 3)}
                                placeholder="Required select"
                                required={true}
                                onSelectionChange={() => { }}
                            />
                        </View>
                    </View>

                    {/* Usage Summary */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Current State Summary</Text>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.summaryText}>Basic Select: {basicValue || 'None'}</Text>
                            <Text style={styles.summaryText}>
                                Multi Select: {multiValue.length > 0 ? multiValue.join(', ') : 'None'}
                            </Text>
                            <Text style={styles.summaryText}>
                                Searchable: {searchableValue || 'None'}
                            </Text>
                            <Text style={styles.summaryText}>Country: {countryValue || 'None'}</Text>
                            <Text style={styles.summaryText}>Status: {statusValue || 'None'}</Text>
                            <Text style={styles.summaryText}>Custom: {customValue || 'None'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    helperText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
        fontStyle: 'italic',
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    halfWidth: {
        flex: 1,
    },
    variantGrid: {
        gap: 16,
    },
    variantItem: {
        marginBottom: 16,
    },
    sizeContainer: {
        marginBottom: 16,
    },
    stateContainer: {
        marginBottom: 16,
    },
    customOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    customOptionSelected: {
        backgroundColor: '#EEF2FF',
    },
    customOptionContent: {
        flex: 1,
    },
    customOptionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
    },
    customOptionLabelSelected: {
        color: '#6366F1',
    },
    customOptionDescription: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    customOptionDescriptionSelected: {
        color: '#6366F1',
    },
    colorIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 12,
    },
    summaryContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    summaryText: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 4,
        fontFamily: 'monospace',
    },
})