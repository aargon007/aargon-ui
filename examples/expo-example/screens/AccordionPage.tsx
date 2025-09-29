import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedAccordion } from "@aargon-ui/accordion"
import { useState } from "react"

export default function AccordionPage() {
    const [controlledExpanded, setControlledExpanded] = useState(false)

    const customTheme = {
        colors: {
            headerBackground: "#F0F9FF",
            headerBackgroundActive: "#E0F2FE",
            text: "#0369A1",
            textActive: "#0C4A6E",
            border: "#7DD3FC",
        },
        borderRadius: 12,
    }

    const sampleContent = (
        <View>
            <Text style={styles.contentText}>
                This is the accordion content. It can contain any React Native components including text, images, buttons, and more complex layouts.
            </Text>
            <Text style={styles.contentText}>
                The accordion smoothly animates the height transition and provides excellent user experience with proper accessibility support.
            </Text>
        </View>
    )

    const complexContent = (
        <View style={styles.complexContent}>
            <Text style={styles.contentTitle}>Features Include:</Text>
            <View style={styles.featureList}>
                <Text style={styles.featureItem}>• Smooth height animations</Text>
                <Text style={styles.featureItem}>• Multiple animation types</Text>
                <Text style={styles.featureItem}>• Customizable themes</Text>
                <Text style={styles.featureItem}>• Accessibility support</Text>
                <Text style={styles.featureItem}>• Icon customization</Text>
            </View>
        </View>
    )

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Animated Accordion Component
                    </Text>
                    <Text style={globalStyles.description}>
                        Highly customizable accordion component with smooth animations and modern design
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 24 }]}>
                        {/* Basic Examples */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Accordions</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Default Accordion"
                                    defaultExpanded={false}
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Initially Expanded"
                                    defaultExpanded={true}
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Variants */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Variants</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Default Variant"
                                    variant="default"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Bordered Variant"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Filled Variant"
                                    variant="filled"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Ghost Variant"
                                    variant="ghost"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Sizes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sizes</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Small Size"
                                    size="sm"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Medium Size (Default)"
                                    size="md"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Large Size"
                                    size="lg"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Animation Types */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Animation Types</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Spring Animation (Default)"
                                    animationType="spring"
                                    variant="filled"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Bounce Animation"
                                    animationType="bounce"
                                    variant="filled"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Timing Animation"
                                    animationType="timing"
                                    duration={500}
                                    variant="filled"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Icon Customization */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Icon Customization</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Custom Icons"
                                    // collapsedIcon="plus"
                                    // expandedIcon="minus"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="Left Icon Position"
                                    iconPosition="left"
                                    // collapsedIcon="arrow-right"
                                    // expandedIcon="arrow-down"
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>

                                <AnimatedAccordion
                                    title="No Icon"
                                    showIcon={false}
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Controlled State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Controlled State</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title={`Controlled Accordion (${controlledExpanded ? 'Expanded' : 'Collapsed'})`}
                                    expanded={controlledExpanded}
                                    onToggle={setControlledExpanded}
                                    variant="bordered"
                                >
                                    <Text style={styles.contentText}>
                                        This accordion's state is controlled by the parent component.
                                        Current state: {controlledExpanded ? 'Expanded' : 'Collapsed'}
                                    </Text>
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Custom Styling */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Styling</Text>
                            <View style={styles.accordionGroup}>
                                {/* <AnimatedAccordion
                                    title="Custom Theme"
                                    theme={customTheme}
                                    variant="bordered"
                                    shadow={true}
                                >
                                    {complexContent}
                                </AnimatedAccordion> */}

                                <AnimatedAccordion
                                    title="With Shadow"
                                    variant="filled"
                                    shadow={true}
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Disabled State */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>States</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Disabled Accordion"
                                    disabled={true}
                                    variant="bordered"
                                >
                                    {sampleContent}
                                </AnimatedAccordion>
                            </View>
                        </View>

                        {/* Nested Accordions */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nested Accordions</Text>
                            <View style={styles.accordionGroup}>
                                <AnimatedAccordion
                                    title="Parent Accordion"
                                    variant="bordered"
                                >
                                    <View>
                                        <Text style={styles.contentText}>
                                            This accordion contains nested accordions:
                                        </Text>

                                        <AnimatedAccordion
                                            title="Nested Accordion 1"
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Text style={styles.contentText}>
                                                First nested accordion content
                                            </Text>
                                        </AnimatedAccordion>

                                        <AnimatedAccordion
                                            title="Nested Accordion 2"
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Text style={styles.contentText}>
                                                Second nested accordion content
                                            </Text>
                                        </AnimatedAccordion>
                                    </View>
                                </AnimatedAccordion>
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
    accordionGroup: {
        gap: 8,
    },
    contentText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
        marginBottom: 8,
    },
    complexContent: {
        gap: 12,
    },
    contentTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 8,
    },
    featureList: {
        gap: 4,
    },
    featureItem: {
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 20,
    },
})

// {/* <CodeExample
//                 title="Code"
//                 code={accordionCode}
//                 filename="AnimatedAccordion.tsx"
//             />

//             {/* implementation section */}
//             <CodeExample
//                 title="Implementation"
//                 code={accordionExample}
//                 filename="Example.ts"
//             /> */}