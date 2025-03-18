"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { MotiView } from "moti"
import { Feather } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/component/ui/accordion"
import { AdvancedAccordion } from "@/component/ui/accordion/advanced-accordion"

export default function AccordionDemoPage() {
    const inset = useSafeAreaInsets()
    const [activeTab, setActiveTab] = useState("basic")

    return (
        <ScrollView style={[styles.container, { paddingTop: inset.top }]} contentContainerStyle={styles.contentContainer}>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 18 }}
            >
                <Text style={styles.title}>Accordion Examples</Text>
                <Text style={styles.description}>
                    Explore different accordion implementations with smooth animations using Moti, Reanimated, and Skia.
                </Text>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <Pressable
                        style={[styles.tab, activeTab === "basic" && styles.activeTab]}
                        onPress={() => setActiveTab("basic")}
                    >
                        <Text style={[styles.tabText, activeTab === "basic" && styles.activeTabText]}>Basic</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, activeTab === "advanced" && styles.activeTab]}
                        onPress={() => setActiveTab("advanced")}
                    >
                        <Text style={[styles.tabText, activeTab === "advanced" && styles.activeTabText]}>Advanced</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, activeTab === "customized" && styles.activeTab]}
                        onPress={() => setActiveTab("customized")}
                    >
                        <Text style={[styles.tabText, activeTab === "customized" && styles.activeTabText]}>Customized</Text>
                    </Pressable>
                </View>

                {/* Basic Accordion Examples */}
                {activeTab === "basic" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Single Accordion</Text>
                            <Text style={styles.sectionDescription}>
                                Only one item can be open at a time. Uses Moti for smooth animations.
                            </Text>

                            <View style={styles.demoContainer}>
                                <Accordion>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>What is Motion UI?</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>
                                                Motion UI is a React Native animation library built on top of Moti and Reanimated. It provides a
                                                simple API for creating complex animations with minimal code.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>How do I install it?</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>You can install Motion UI using npm or yarn:</Text>
                                            <View style={styles.codeBlock}>
                                                <Text style={styles.codeText}>npm install @your-org/motion-ui</Text>
                                            </View>
                                            <Text style={styles.contentText}>
                                                Make sure you have the required peer dependencies installed as well.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Is it cross-platform?</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>
                                                Yes! Motion UI works seamlessly on iOS, Android, and Web with consistent behavior. It's built on
                                                top of cross-platform libraries like Moti and Reanimated.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Multiple Accordion</Text>
                            <Text style={styles.sectionDescription}>Multiple items can be open simultaneously.</Text>

                            <View style={styles.demoContainer}>
                                <Accordion type="multiple" defaultValue={["item-1"]}>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Getting Started</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>
                                                To get started with Motion UI, first install the package and its dependencies. Then import the
                                                components you need in your React Native application.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Basic Usage</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>
                                                Import components from our library and use them in your React Native application. All components
                                                are customizable through props.
                                            </Text>
                                            <View style={styles.codeBlock}>
                                                <Text style={styles.codeText}>
                                                    {`import { FadeIn } from '@your-org/motion-ui';

<FadeIn delay={300}>
  <Text>Hello World</Text>
</FadeIn>`}
                                                </Text>
                                            </View>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Advanced Techniques</AccordionTrigger>
                                        <AccordionContent>
                                            <Text style={styles.contentText}>
                                                For advanced animations, you can combine multiple components or use the lower-level APIs
                                                provided by Moti and Reanimated.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </View>
                        </View>
                    </MotiView>
                )}

                {/* Advanced Accordion Examples */}
                {activeTab === "advanced" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Advanced Accordion with Skia</Text>
                            <Text style={styles.sectionDescription}>
                                Uses Reanimated and Skia for advanced animations and shadow effects.
                            </Text>

                            <View style={styles.demoContainer}>
                                <AdvancedAccordion title="Interactive Animations">
                                    <Text style={styles.contentText}>
                                        This accordion uses Reanimated for precise control over animations and Skia for rendering
                                        high-quality shadows that animate smoothly with the accordion state.
                                    </Text>
                                    <Text style={styles.contentText}>
                                        Notice how the shadow grows and becomes more pronounced when the accordion is expanded, creating a
                                        subtle elevation effect.
                                    </Text>
                                </AdvancedAccordion>

                                <AdvancedAccordion title="Customizable Properties" accentColor="#10B981" initiallyExpanded={true}>
                                    <Text style={styles.contentText}>
                                        The AdvancedAccordion component accepts various props for customization:
                                    </Text>
                                    <View style={styles.propsList}>
                                        <View style={styles.propItem}>
                                            <Text style={styles.propName}>accentColor</Text>
                                            <Text style={styles.propDescription}>Changes the color theme of the accordion</Text>
                                        </View>
                                        <View style={styles.propItem}>
                                            <Text style={styles.propName}>initiallyExpanded</Text>
                                            <Text style={styles.propDescription}>Sets the initial expanded state</Text>
                                        </View>
                                        <View style={styles.propItem}>
                                            <Text style={styles.propName}>shadowEnabled</Text>
                                            <Text style={styles.propDescription}>Toggles the Skia shadow effect</Text>
                                        </View>
                                        <View style={styles.propItem}>
                                            <Text style={styles.propName}>borderRadius</Text>
                                            <Text style={styles.propDescription}>Customizes the corner radius</Text>
                                        </View>
                                    </View>
                                </AdvancedAccordion>

                                <AdvancedAccordion title="Performance Optimized" accentColor="#F59E0B">
                                    <Text style={styles.contentText}>This accordion implementation is optimized for performance:</Text>
                                    <View style={styles.bulletList}>
                                        <View style={styles.bulletItem}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>Uses Reanimated's native driver for smooth 60fps animations</Text>
                                        </View>
                                        <View style={styles.bulletItem}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>Skia provides hardware-accelerated rendering for shadows</Text>
                                        </View>
                                        <View style={styles.bulletItem}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>Optimized layout calculations to prevent janky animations</Text>
                                        </View>
                                        <View style={styles.bulletItem}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>Minimal re-renders during animation</Text>
                                        </View>
                                    </View>
                                </AdvancedAccordion>
                            </View>
                        </View>
                    </MotiView>
                )}

                {/* Customized Accordion Examples */}
                {activeTab === "customized" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Styled Accordions</Text>
                            <Text style={styles.sectionDescription}>Examples of accordions with custom styling and behavior.</Text>

                            <View style={styles.demoContainer}>
                                <Accordion>
                                    <AccordionItem value="item-1" style={styles.customAccordionItem}>
                                        <AccordionTrigger
                                            style={styles.customTrigger}
                                            textStyle={styles.customTriggerText}
                                            iconPosition="left"
                                            customIcon={
                                                <View style={styles.customIcon}>
                                                    <Feather name="plus" size={14} color="#FFFFFF" />
                                                </View>
                                            }
                                        >
                                            Left Icon Accordion
                                        </AccordionTrigger>
                                        <AccordionContent style={styles.customContent}>
                                            <Text style={styles.customContentText}>
                                                This accordion has a custom style with the icon positioned on the left. The icon is also
                                                customized to use a plus/minus indicator instead of a chevron.
                                            </Text>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <Accordion animationConfig={{ type: "timing", duration: 600 }}>
                                    <AccordionItem value="item-1" style={styles.cardAccordionItem}>
                                        <AccordionTrigger style={styles.cardTrigger}>
                                            <View style={styles.cardTriggerContent}>
                                                <Feather name="credit-card" size={20} color="#6366F1" style={styles.cardIcon} />
                                                <View>
                                                    <Text style={styles.cardTitle}>Card-Style Accordion</Text>
                                                    <Text style={styles.cardSubtitle}>With custom header layout</Text>
                                                </View>
                                            </View>
                                        </AccordionTrigger>
                                        <AccordionContent style={styles.cardContent}>
                                            <Text style={styles.contentText}>
                                                This accordion is styled to look like a card with a more complex header layout. It demonstrates
                                                how you can completely customize the trigger content.
                                            </Text>
                                            <View style={styles.cardActions}>
                                                <Pressable style={styles.cardButton}>
                                                    <Text style={styles.cardButtonText}>Action 1</Text>
                                                </Pressable>
                                                <Pressable style={styles.cardButton}>
                                                    <Text style={styles.cardButtonText}>Action 2</Text>
                                                </Pressable>
                                            </View>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <View style={styles.nestedAccordionContainer}>
                                    <Text style={styles.nestedTitle}>Nested Accordions</Text>
                                    <Accordion>
                                        <AccordionItem value="parent-1">
                                            <AccordionTrigger>Parent Accordion</AccordionTrigger>
                                            <AccordionContent>
                                                <Text style={styles.contentText}>This accordion contains nested child accordions.</Text>

                                                <View style={styles.nestedAccordion}>
                                                    <Accordion>
                                                        <AccordionItem value="child-1">
                                                            <AccordionTrigger>Child Accordion 1</AccordionTrigger>
                                                            <AccordionContent>
                                                                <Text style={styles.contentText}>
                                                                    This is the content of the first child accordion.
                                                                </Text>
                                                            </AccordionContent>
                                                        </AccordionItem>

                                                        <AccordionItem value="child-2">
                                                            <AccordionTrigger>Child Accordion 2</AccordionTrigger>
                                                            <AccordionContent>
                                                                <Text style={styles.contentText}>
                                                                    This is the content of the second child accordion.
                                                                </Text>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </View>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </View>
                            </View>
                        </View>
                    </MotiView>
                )}
            </MotiView>
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
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#4B5563",
        marginBottom: 24,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
    },
    activeTabText: {
        color: "#111827",
        fontWeight: "600",
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: "#6B7280",
        marginBottom: 16,
    },
    demoContainer: {
        marginTop: 8,
    },
    contentText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#4B5563",
        marginBottom: 12,
    },
    codeBlock: {
        backgroundColor: "#1F2937",
        borderRadius: 6,
        padding: 12,
        marginVertical: 8,
    },
    codeText: {
        fontSize: 13,
        fontFamily: "monospace",
        color: "#E5E7EB",
        lineHeight: 20,
    },
    propsList: {
        marginTop: 8,
    },
    propItem: {
        marginBottom: 8,
    },
    propName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 2,
    },
    propDescription: {
        fontSize: 14,
        color: "#6B7280",
    },
    bulletList: {
        marginTop: 8,
    },
    bulletItem: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "flex-start",
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#6366F1",
        marginTop: 8,
        marginRight: 8,
    },
    bulletText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#4B5563",
        flex: 1,
    },
    customAccordionItem: {
        borderWidth: 1,
        borderColor: "#6366F1",
        borderRadius: 8,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    customTrigger: {
        backgroundColor: "#EEF2FF",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    customTriggerText: {
        color: "#4F46E5",
        fontWeight: "600",
    },
    customIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#6366F1",
        alignItems: "center",
        justifyContent: "center",
    },
    customContent: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    customContentText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#4B5563",
    },
    cardAccordionItem: {
        borderRadius: 12,
        marginVertical: 12,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderBottomWidth: 0,
    },
    cardTrigger: {
        padding: 16,
    },
    cardTriggerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardIcon: {
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    cardSubtitle: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    cardContent: {
        padding: 16,
        backgroundColor: "#F9FAFB",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    cardActions: {
        flexDirection: "row",
        marginTop: 12,
    },
    cardButton: {
        backgroundColor: "#EEF2FF",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    cardButtonText: {
        fontSize: 14,
        color: "#6366F1",
        fontWeight: "500",
    },
    nestedAccordionContainer: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 16,
    },
    nestedTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 12,
    },
    nestedAccordion: {
        marginTop: 12,
        marginLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: "#E5E7EB",
        paddingLeft: 12,
    },
})

