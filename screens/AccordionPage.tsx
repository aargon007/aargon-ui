import { View, Text, StyleSheet, } from "react-native"
import CodeExample from "@/component/common/CodeExample";
import ComponentPage from "@/component/common/ComponentPage";
import { globalStyles } from "@/styles/globalStyles";
import AnimatedAccordion from "@/component/ui/accordion/AnimatedAccordion";
import { accordionCode } from "@/component/ui/accordion/code";
import { accordionExample } from "@/component/ui/accordion/example";

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
                    {/* open by default  */}
                    <AnimatedAccordion title="Show More" isExpanded={true}>
                        <Text>This is the hidden content.</Text>
                        <Text>It will appear smoothly on toggle.</Text>
                    </AnimatedAccordion>

                    <AnimatedAccordion title="Show More">
                        <Text>This is the hidden content.</Text>
                        <Text>It will appear smoothly on toggle.</Text>
                    </AnimatedAccordion>
                </View>
            </View>

            {/* Code Display */}
            <CodeExample
                title="Code"
                code={accordionCode}
                filename="AnimatedAccordion.tsx"
            />

            {/* implementation section */}
            <CodeExample
                title="Implementation"
                code={accordionExample}
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