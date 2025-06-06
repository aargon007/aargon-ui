import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedInput } from "@/component/ui/input/AnimatedInput"
import { useState } from "react"

export default function InputPage() {
    const [inputs, setInputs] = useState({
        basic: '',
        email: '',
        password: '',
        search: '',
        message: '',
    })

    const handleChange = (key: string) => (text: string) => {
        setInputs(prev => ({ ...prev, [key]: text }))
    }

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Lightweight Animated Input
                    </Text>
                    <Text style={globalStyles.description}>
                        Flexible and lightweight input component with smooth Reanimated animations
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 24 }]}>
                        {/* Basic Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Usage</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Basic Input"
                                    placeholder="Enter text here..."
                                    value={inputs.basic}
                                    onChangeText={handleChange('basic')}
                                />

                                <AnimatedInput
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    value={inputs.email}
                                    onChangeText={handleChange('email')}
                                    leftIcon="mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    errorMessage={inputs.email && !validateEmail(inputs.email) ? "Invalid email format" : undefined}
                                />

                                <AnimatedInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={inputs.password}
                                    onChangeText={handleChange('password')}
                                    leftIcon="lock"
                                    showPasswordToggle={true}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        {/* Variants */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Variants</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Default Variant"
                                    placeholder="Default styling"
                                    variant="default"
                                />

                                <AnimatedInput
                                    label="Filled Variant"
                                    placeholder="Filled background"
                                    variant="filled"
                                />

                                <AnimatedInput
                                    label="Outline Variant"
                                    placeholder="Outlined border"
                                    variant="outline"
                                />
                            </View>
                        </View>

                        {/* Sizes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sizes</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Small Size"
                                    placeholder="Small input"
                                    size="sm"
                                />

                                <AnimatedInput
                                    label="Medium Size (Default)"
                                    placeholder="Medium input"
                                    size="md"
                                />

                                <AnimatedInput
                                    label="Large Size"
                                    placeholder="Large input"
                                    size="lg"
                                />
                            </View>
                        </View>

                        {/* States */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>States</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Default State"
                                    placeholder="Normal input"
                                    state="default"
                                />

                                <AnimatedInput
                                    label="Success State"
                                    placeholder="Valid input"
                                    state="success"
                                    value="Valid input"
                                />

                                <AnimatedInput
                                    label="Warning State"
                                    placeholder="Warning input"
                                    state="warning"
                                    helperText="Please double-check this"
                                />

                                <AnimatedInput
                                    label="Error State"
                                    placeholder="Invalid input"
                                    errorMessage="This field is required"
                                />
                            </View>
                        </View>

                        {/* Animations */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Animation Types</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="No Animation"
                                    placeholder="Focus to see no animation"
                                    animationType="none"
                                />

                                <AnimatedInput
                                    label="Scale Animation"
                                    placeholder="Focus to see scale effect"
                                    animationType="scale"
                                />

                                <AnimatedInput
                                    label="Glow Animation"
                                    placeholder="Focus to see glow effect"
                                    animationType="glow"
                                />

                                <AnimatedInput
                                    label="Bounce Animation"
                                    placeholder="Focus to see bounce effect"
                                    animationType="bounce"
                                />
                            </View>
                        </View>

                        {/* Features */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Features</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Search Input"
                                    placeholder="Search something..."
                                    value={inputs.search}
                                    onChangeText={handleChange('search')}
                                    leftIcon="search"
                                    showClearButton={true}
                                    rightIcon="filter"
                                />

                                <AnimatedInput
                                    label="Required Field"
                                    placeholder="This field is required"
                                    required={true}
                                    helperText="Please fill this field"
                                />

                                <AnimatedInput
                                    label="Multiline Input"
                                    placeholder="Enter your message..."
                                    value={inputs.message}
                                    onChangeText={handleChange('message')}
                                    multiline={true}
                                    numberOfLines={4}
                                    variant="outline"
                                />
                            </View>
                        </View>

                        {/* Custom Styling */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Styling</Text>
                            <View style={styles.inputGroup}>
                                <AnimatedInput
                                    label="Custom Container Style"
                                    placeholder="Custom styled input"
                                    containerStyle={{
                                        backgroundColor: '#F0F9FF',
                                        borderColor: '#0EA5E9',
                                        borderRadius: 16,
                                    }}
                                />

                                <AnimatedInput
                                    label="Custom Input Style"
                                    placeholder="Custom text styling"
                                    inputStyle={{
                                        fontWeight: '600',
                                        color: '#7C3AED',
                                    }}
                                    labelStyle={{
                                        color: '#7C3AED',
                                        fontWeight: '700',
                                    }}
                                />
                            </View>
                        </View>

                        {/* Current Values */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Current Input Values</Text>
                            <View style={styles.valueContainer}>
                                {Object.entries(inputs).map(([key, value]) => (
                                    <Text key={key} style={styles.valueText}>
                                        {key}: "{value}"
                                    </Text>
                                ))}
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
    inputGroup: {
        gap: 16,
    },
    valueContainer: {
        backgroundColor: "#F9FAFB",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    valueText: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
    },
})