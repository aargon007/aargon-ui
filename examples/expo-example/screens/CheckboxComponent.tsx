"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedCheckbox } from "aargon-checkbox"

export default function CheckboxPage() {
    const [isChecked, setIsChecked] = useState(true)
    const [formState, setFormState] = useState({
        terms: false,
        notifications: false,
        marketing: false,
        premium: false,
    })

    const handleFormChange = (key: keyof typeof formState) => {
        setFormState((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>Animated Checkbox Component</Text>
                    <Text style={globalStyles.description}>
                        Comprehensive checkbox component with smooth Reanimated animations and modern UI design
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 24 }]}>
                        {/* Basic Examples with Pulse Animation */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Examples</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    checked={formState.terms}
                                    onPress={() => handleFormChange("terms")}
                                    label="Accept terms and conditions"
                                />
                                <AnimatedCheckbox
                                    checked={formState.notifications}
                                    onPress={() => handleFormChange("notifications")}
                                    label="Enable notifications"
                                    color="#4CAF50"
                                    borderColor="#2E7D32"
                                    iconColor="#FFFFFF"
                                />
                                <AnimatedCheckbox
                                    checked={formState.marketing}
                                    onPress={() => handleFormChange("marketing")}
                                    label="Marketing emails"
                                    labelPosition="left"
                                    color="#9C27B0"
                                />
                                <AnimatedCheckbox
                                    checked={formState.premium}
                                    onPress={() => handleFormChange("premium")}
                                    label="Premium feature"
                                    color="#FF9800"
                                    labelStyle={{
                                        fontWeight: "bold",
                                        color: "#FF9800",
                                        fontSize: 18,
                                    }}
                                />
                            </View>
                        </View>

                        {/* Size Variations with Pulse */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Size Variations</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Small checkbox"
                                    size="small"
                                    color="#2196F3"
                                />
                                <AnimatedCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Medium checkbox"
                                    size="medium"
                                    color="#FF5722"
                                />
                                <AnimatedCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Large checkbox"
                                    size="large"
                                    color="#795548"
                                />
                            </View>
                        </View>

                        {/* Form Summary */}
                        <View style={styles.formSummary}>
                            <Text style={styles.summaryTitle}>Form State</Text>
                            <Text style={styles.summaryText}>
                                Terms: {formState.terms ? "✅" : "❌"} | Notifications: {formState.notifications ? "✅" : "❌"} |
                                Marketing: {formState.marketing ? "✅" : "❌"} | Premium: {formState.premium ? "✅" : "❌"}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    section: {
        width: "100%",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: "#1F2937",
    },
    checkboxGroup: {
        gap: 16,
    },
    formSummary: {
        marginTop: 16,
        padding: 16,
        backgroundColor: "#EFF6FF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#BFDBFE",
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E40AF",
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        color: "#3730A3",
        lineHeight: 20,
    },
})
