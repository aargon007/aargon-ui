import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedCheckbox } from "@/component/ui/checkbox/AnimatedCheckbox"
import { useState } from "react"

export default function CheckboxPage() {
    const [basicChecked, setBasicChecked] = useState(false)
    const [multipleStates, setMultipleStates] = useState({
        option1: false,
        option2: true,
        option3: false,
    })
    const [indeterminateState, setIndeterminateState] = useState<"unchecked" | "checked" | "indeterminate">("indeterminate")

    const customTheme = {
        colors: {
            primary: "#8B5CF6",
            backgroundChecked: "#8B5CF6",
            borderChecked: "#8B5CF6",
            borderFocused: "#C4B5FD",
        },
        borderRadius: 8,
    }

    const handleMultipleChange = (key: string) => (checked: boolean) => {
        setMultipleStates(prev => ({ ...prev, [key]: checked }))
    }

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Animated Checkbox Component
                    </Text>
                    <Text style={globalStyles.description}>
                        Highly customizable checkbox component with smooth animations and modern design
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 24 }]}>
                        {/* Basic Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Checkboxes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Basic Checkbox"
                                    checked={basicChecked}
                                    onPress={setBasicChecked}
                                />
                                <AnimatedCheckbox
                                    label="Checked by Default"
                                    checked={true}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="With Description"
                                    description="This checkbox has additional description text"
                                    checked={false}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>

                        {/* Variants */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Variants</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Default Variant"
                                    variant="default"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Filled Variant"
                                    variant="filled"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Outline Variant"
                                    variant="outline"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Ghost Variant"
                                    variant="ghost"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Rounded Variant"
                                    variant="rounded"
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Sizes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sizes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Extra Small"
                                    size="xs"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Small"
                                    size="sm"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Medium (Default)"
                                    size="md"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Large"
                                    size="lg"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Extra Large"
                                    size="xl"
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Color Schemes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Color Schemes</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Primary"
                                    colorScheme="primary"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Secondary"
                                    colorScheme="secondary"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Success"
                                    colorScheme="success"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Warning"
                                    colorScheme="warning"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Error"
                                    colorScheme="error"
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Animation Types */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Animation Types</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Scale Animation (Default)"
                                    animationType="scale"
                                    checked={multipleStates.option1}
                                    onPress={handleMultipleChange('option1')}
                                />
                                <AnimatedCheckbox
                                    label="Bounce Animation"
                                    animationType="bounce"
                                    checked={multipleStates.option2}
                                    onPress={handleMultipleChange('option2')}
                                />
                                <AnimatedCheckbox
                                    label="Slide Animation"
                                    animationType="slide"
                                    checked={multipleStates.option3}
                                    onPress={handleMultipleChange('option3')}
                                />
                            </View>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Fade Animation"
                                    animationType="fade"
                                    checked={false}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Rotate Animation"
                                    animationType="rotate"
                                    checked={false}
                                    onPress={() => { }}
                                />
                                <AnimatedCheckbox
                                    label="Elastic Animation"
                                    animationType="elastic"
                                    checked={false}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>

                        {/* States */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>States</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Unchecked State"
                                    state="unchecked"
                                />
                                <AnimatedCheckbox
                                    label="Checked State"
                                    state="checked"
                                />
                                <AnimatedCheckbox
                                    label="Indeterminate State"
                                    state={indeterminateState}
                                    onPress={() => {
                                        setIndeterminateState(prev =>
                                            prev === "unchecked" ? "checked" :
                                                prev === "checked" ? "indeterminate" : "unchecked"
                                        )
                                    }}
                                />
                                <AnimatedCheckbox
                                    label="Disabled Unchecked"
                                    disabled={true}
                                    checked={false}
                                />
                                <AnimatedCheckbox
                                    label="Disabled Checked"
                                    disabled={true}
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Custom Icons */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Icons</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Custom Check Icon"
                                    checkIcon="heart"
                                    colorScheme="error"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Custom Indeterminate Icon"
                                    indeterminateIcon="x"
                                    state="indeterminate"
                                />
                                <AnimatedCheckbox
                                    label="Star Icon"
                                    checkIcon="star"
                                    colorScheme="warning"
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Label Positions */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Label Positions</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Label on Right (Default)"
                                    labelPosition="right"
                                    checked={true}
                                />
                                <AnimatedCheckbox
                                    label="Label on Left"
                                    labelPosition="left"
                                    checked={true}
                                />
                            </View>
                        </View>

                        {/* Custom Styling */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Styling</Text>
                            <View style={styles.checkboxGroup}>
                                {/* <AnimatedCheckbox
                                    label="Custom Theme"
                                    theme={customTheme}
                                    checked={true}
                                    showFocusRing={true}
                                /> */}
                                <AnimatedCheckbox
                                    label="Full Width Checkbox"
                                    fullWidth={true}
                                    checked={true}
                                    variant="filled"
                                />
                                <AnimatedCheckbox
                                    label="Custom Border Radius"
                                    borderRadius={12}
                                    checked={true}
                                    colorScheme="success"
                                />
                            </View>
                        </View>

                        {/* Form Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Form Examples</Text>
                            <View style={styles.formContainer}>
                                <Text style={styles.formTitle}>Newsletter Preferences</Text>
                                <View style={styles.checkboxGroup}>
                                    <AnimatedCheckbox
                                        label="Weekly Newsletter"
                                        description="Receive our weekly digest of the latest updates"
                                        checked={true}
                                        colorScheme="primary"
                                        size="sm"
                                    />
                                    <AnimatedCheckbox
                                        label="Product Updates"
                                        description="Get notified about new features and improvements"
                                        checked={false}
                                        colorScheme="primary"
                                        size="sm"
                                    />
                                    <AnimatedCheckbox
                                        label="Marketing Communications"
                                        description="Receive promotional content and special offers"
                                        checked={false}
                                        colorScheme="primary"
                                        size="sm"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Interactive Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Interactive Examples</Text>
                            <View style={styles.checkboxGroup}>
                                <AnimatedCheckbox
                                    label="Toggle with Bounce"
                                    animationType="bounce"
                                    animationDuration={300}
                                    checked={false}
                                    onPress={() => { }}
                                    showFocusRing={true}
                                />
                                <AnimatedCheckbox
                                    label="Elastic Animation"
                                    animationType="elastic"
                                    variant="rounded"
                                    colorScheme="success"
                                    checked={false}
                                    onPress={() => { }}
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
        backgroundColor: "#F9FAFB",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    formTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 12,
    },
})