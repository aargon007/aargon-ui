import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AnimatedSwitch from "@/component/ui/switch/AnimatedSwitch"

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
            <View style={styles.codeSection}>
                <Text style={styles.codeTitle}>
                    Code
                </Text>
                <ScrollView style={styles.codeContainer}>
                    <Text style={styles.codeText}>
                        {`type Props = {
    onPress: any
    value: SharedValue<boolean>
    isDisabled: boolean
    duration?: number
    trackColors?: {
        on: string
        off: string
    }
    thumbColors?: {
        on: string
        off: string
    }
};

const AnimatedSwitch = ({
    onPress,
    value,
    isDisabled,
    duration = 300,
    trackColors = { on: "#0879CC", off: "#111111" },
    thumbColors = { on: "#FFFFFF", off: "#A3A3A8" },
}: Props) => {
    const height = useSharedValue(0)
    const width = useSharedValue(0)

    const trackAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(value.value)

        const color = interpolateColor(baseValue, [0, 1], [trackColors.off, trackColors.on])
        const borderColor = interpolateColor(baseValue, [0, 1], ["#A3A3A8", "#0879CC"])
        const opacity = interpolate(Number(isDisabled), [0, 1], [1, 0.3])

        const colorValue = withTiming(color, { duration })
        const borderColorValue = withTiming(borderColor, { duration })
        const opacityValue = withTiming(opacity, { duration })

        return {
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
            borderColor: borderColorValue,
            opacity: opacityValue,
        }
    })

    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const baseValue = Number(value.value)

        const moveValue = interpolate(baseValue, [0, 1], [0, width.value - height.value])
        const color = interpolateColor(baseValue, [0, 1], [thumbColors.off, thumbColors.on])

        const colorValue = withTiming(color, { duration })
        const translateValue = withTiming(moveValue, { duration })

        return {
            transform: [{ translateX: translateValue }],
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
        }
    })

    return (
        <Pressable onPress={onPress} disabled={isDisabled}>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height
                    width.value = e.nativeEvent.layout.width
                }}
                style={[styles.track, styles.switch, trackAnimatedStyle]}
            >
                <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    thumb: {
        height: "100%",
        maxHeight: 45,
        aspectRatio: 1,
    },
    track: {
        alignItems: 'flex-start',
        // width: 100,
        // height: 40,
        padding: 5,
    },
    switch: {
        width: 60,
        height: 32,
        padding: 5,
        borderWidth: 1.5,
    },
})`}
                    </Text>
                </ScrollView>
            </View>

            {/* implementation section */}
            <View style={styles.codeSection}>
                <Text style={styles.codeTitle}>
                    Example
                </Text>
                <ScrollView style={styles.codeContainer}>
                    <Text style={styles.codeText}>
                        { `
    const switch1 = useSharedValue(false);
    
    <AnimatedSwitch
        value={switch1}
        onPress={() => (switch1.value = !switch1.value)}
        isDisabled={false}
    />
    <AnimatedSwitch
        value={switch3}
        onPress={() => (switch3.value = !switch3.value)}
        isDisabled={false}
        trackColors={{ on: "#10B981", off: "#374151" }}
        thumbColors={{ on: "#FFFFFF", off: "#9CA3AF" }}
    />
                        `}
                    </Text>
                </ScrollView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    contentContainer: {
        padding: 24,
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
    codeSection: {
        marginTop: 16,
    },
    codeTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 16,
    },
    codeContainer: {
        backgroundColor: "#1F2937",
        borderRadius: 8,
        padding: 16,
        maxHeight: 400,
    },
    codeText: {
        fontSize: 13,
        fontFamily: "monospace",
        color: "#E5E7EB",
        lineHeight: 20,
    },
})
