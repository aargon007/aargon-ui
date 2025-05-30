import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AnimatedSwitch from "@/component/ui/switch/AnimatedSwitch"
import CodeExample from "@/component/common/CodeExample";
import { switchCode } from "@/component/ui/switch/code";
import { switchExample } from "@/component/ui/switch/example";

export default function SwitchDemoPage() {
    const inset = useSafeAreaInsets();

    // Switch states
    const switch1 = useSharedValue(false);
    const switch3 = useSharedValue(true);
    const switch5 = useSharedValue(false);

    return (
        <ScrollView
            style={[styles.container, { paddingTop: inset.top }]}
            contentContainerStyle={styles.contentContainer}
        >
            {/* UI Demo */}
            <View style={styles.demoSection}>
                <Text style={styles.title}>
                    Switch Component
                </Text>
                <Text>
                    A switch component that can be used to toggle a boolean value.
                </Text>

                <View style={styles.switchContainer}>
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
            />

            {/* implementation section */}
            <CodeExample
                title="Implementation"
                code={switchExample}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    contentContainer: {
        padding: 64,
        paddingBottom: 40,
    },
    demoSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 24,
        textAlign: "center",
    },
    switchContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
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
