import { View, Text, StyleSheet } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { AnimatedButton } from "@/component/ui/button/AnimatedButton"
import { globalStyles } from "@/styles/globalStyles"
import CodeExample from "@/component/common/CodeExample"

export default function ButtonPage() {

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Enhanced Button Component
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable button component with smooth animations and theming
                </Text>

                <View style={[globalStyles.previewContainer, { rowGap: 15 }]}>
                    {/* Basic Variants */}
                    <Text style={styles.sectionTitle}>
                        Basic Variants
                    </Text>
                    <View style={styles.row}>
                        <AnimatedButton
                            title="Primary"
                            variant="primary"
                            onPress={() => console.log("Primary pressed")}
                        />
                        <AnimatedButton
                            title="Secondary"
                            variant="secondary"
                            onPress={() => console.log("Secondary pressed")}
                        />
                        <AnimatedButton
                            title="Success"
                            variant="success"
                            onPress={() => console.log("Success pressed")}
                        />
                        <AnimatedButton
                            title="Warning"
                            variant="warning"
                            onPress={() => console.log("Warning pressed")}
                        />
                    </View>

                    {/* Sizes */}
                    <Text style={styles.sectionTitle}>
                        Sizes
                    </Text>
                    <View style={styles.row}>
                        <View>
                            <AnimatedButton title="Extra Small" size="xs" />
                        </View>
                        <View>
                            <AnimatedButton title="Small" size="sm" />
                        </View>
                        <View>
                            <AnimatedButton title="Medium" size="md" />
                        </View>
                        <View>
                            <AnimatedButton title="Large" size="lg" />
                        </View>
                        <View>
                            <AnimatedButton title="Extra Large" size="xl" />
                        </View>
                    </View>

                    {/* With Icons */}
                    <Text style={styles.sectionTitle}>
                        With Icons
                    </Text>
                    <View style={styles.row}>
                        <AnimatedButton
                            title="Download"
                            leftIcon="download"
                            variant="primary"
                        />
                        <AnimatedButton
                            title="Share"
                            rightIcon="share"
                            variant="outline"
                        />
                    </View>

                    {/* Animation Types */}
                    <Text style={styles.sectionTitle}>
                        Animation Types
                    </Text>
                    <View style={styles.row}>
                        <AnimatedButton
                            title="Scale Animation"
                            animationType="scale"
                            variant="primary"
                        />
                        <AnimatedButton
                            title="Bounce Animation"
                            animationType="bounce"
                            variant="secondary"
                        />
                        <AnimatedButton
                            title="Pulse Animation"
                            animationType="pulse"
                            variant="success"
                        />
                        <AnimatedButton
                            title="Shake Animation"
                            animationType="shake"
                            variant="warning"
                        />
                    </View>

                    {/* States */}
                    <Text style={styles.sectionTitle}>
                        States
                    </Text>
                    <View style={styles.row}>
                        <AnimatedButton
                            title="Loading"
                            loading={true}
                            variant="primary"
                        />
                        <AnimatedButton
                            title="Disabled"
                            disabled={true}
                            variant="secondary"
                        />
                    </View>

                    {/* Custom Styling */}
                    <Text style={styles.sectionTitle}>Custom Styling</Text>
                    <View style={styles.column}>
                        <AnimatedButton
                            title="Full Width"
                            fullWidth={true}
                            variant="primary"
                        />
                        <AnimatedButton
                            title="Rounded"
                            rounded={true}
                            variant="success"
                        />
                        <AnimatedButton
                            title="With Shadow"
                            shadow={true}
                            variant="warning"
                        />
                    </View>
                </View>
            </View>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: 8,
        color: "#374151",
    },
    row: {
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
    },
    column: {
        gap: 10,
    },
})