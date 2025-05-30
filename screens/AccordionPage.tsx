import { View, Text, StyleSheet, } from "react-native"
import CodeExample from "@/component/common/CodeExample";
import { switchCode } from "@/component/ui/switch/code";
import { switchExample } from "@/component/ui/switch/example";
import ComponentPage from "@/component/common/ComponentPage";
import { globalStyles } from "@/styles/globalStyles";

export default function AccordionPage() {

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Accordion Component
                </Text>
                <Text style={globalStyles.description}>
                    An accordion component powerd by Reanimated that allows users to toggle between showing and hiding content sections.
                </Text>

                <View style={globalStyles.previewContainer}>

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