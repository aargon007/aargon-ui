import { View, Text, StyleSheet, } from "react-native"
import CodeExample from "@/component/common/CodeExample";
import ComponentPage from "@/component/common/ComponentPage";
import { globalStyles } from "@/styles/globalStyles";
import { AnimatedButton } from "@/component/ui/button/AnimatedButton";

export default function ButtonPage() {

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Button Component
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable button component with smooth animations
                </Text>

                <View style={globalStyles.previewContainer}>
                    <AnimatedButton title="Primary" variant="primary" onPress={() => console.log("Primary pressed")} />
                    <AnimatedButton title="Secondary" variant="secondary" onPress={() => console.log("Secondary pressed")} />
                    <AnimatedButton title="Outline" variant="outline" onPress={() => console.log("Outline pressed")} />
                    <AnimatedButton title="Ghost" variant="ghost" onPress={() => console.log("Ghost pressed")} />
                    <AnimatedButton
                        title="Destructive"
                        variant="destructive"
                        onPress={() => console.log("Destructive pressed")}
                    />
                </View>
            </View>

            {/* Code Display */}
            {/* <CodeExample
                title="Code"
                code={accordionCode}
                filename="AnimatedAccordion.tsx"
            /> */}

            {/* implementation section */}
            {/* <CodeExample
                title="Implementation"
                code={accordionExample}
                filename="Example.ts"
            /> */}
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