import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import CustomCheckbox from "@/component/ui/checkbox/CustomCheckbox"

export default function CheckboxPage() {
    const [isChecked, setIsChecked] = useState(true);

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
                                <CustomCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Accept terms and conditions"
                                />

                                <CustomCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Enable notifications"
                                    color="#4CAF50"
                                    borderColor="#2E7D32"
                                    iconColor="#FFFFFF"
                                />

                                <CustomCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Remember me"
                                    labelPosition="left"
                                />

                                <CustomCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Premium feature"
                                    labelStyle={{
                                        fontWeight: 'bold',
                                        color: '#FF5308',
                                        fontSize: 18
                                    }}
                                />

                                <CustomCheckbox
                                    checked={isChecked}
                                    onPress={() => setIsChecked(!isChecked)}
                                    label="Small checkbox"
                                    size="small"
                                    color="#2196F3"
                                />
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