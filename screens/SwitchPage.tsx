import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import AnimatedSwitch from "@/component/ui/switch/AnimatedSwitch"
import CodeExample from "@/component/common/CodeExample";
import { switchCode } from "@/component/ui/switch/code";
import { switchExample } from "@/component/ui/switch/example";
import { globalStyles } from "@/styles/globalStyles";
import ComponentPage from "@/component/common/ComponentPage";

export default function SwitchDemoPage() {
    // Switch states
    const switch1 = useSharedValue(false);
    const switch3 = useSharedValue(true);
    const switch5 = useSharedValue(false);

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Switch Component
                </Text>
                <Text style={globalStyles.description}>
                    A performant and customizable switch component built with Reanimated, ideal for toggling boolean states with smooth animations.
                </Text>

                <View style={globalStyles.previewContainer}>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>
                            Default Switch
                        </Text>
                        <AnimatedSwitch
                            value={switch1}
                            onPress={() => (switch1.value = !switch1.value)}
                            isDisabled={false}
                        />
                    </View>

                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>
                            Custom Colors
                        </Text>
                        <AnimatedSwitch
                            value={switch3}
                            onPress={() => (switch3.value = !switch3.value)}
                            isDisabled={false}
                            trackColors={{ on: "#10B981", off: "#374151" }}
                            thumbColors={{ on: "#FFFFFF", off: "#9CA3AF" }}
                        />
                    </View>

                    <View style={styles.switchRow}>
                        <Text style={[styles.switchLabel, styles.disabledLabel]}>
                            Disabled Switch
                        </Text>
                        <AnimatedSwitch
                            value={switch5}
                            onPress={() => (switch5.value = !switch5.value)}
                            isDisabled={true}
                        />
                    </View>
                </View>
            </View>

            {/* Code Display */}
            <CodeExample
                title="Code"
                code={switchCode}
                filename="AnimatedSwitch.tsx"
            />

            {/* implementation section */}
            <CodeExample
                title="Implementation"
                code={switchExample}
                filename="Example.ts"
            />
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
    },
    disabledLabel: {
        color: "#9CA3AF",
    },
})
