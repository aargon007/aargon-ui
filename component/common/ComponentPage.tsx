import type React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MotiView } from "moti"
import { Feather } from "@expo/vector-icons"

interface ComponentPageProps {
    title: string
    description: string
    usage: string
    examples: Array<{
        title: string
        description: string
        code: string
        preview?: React.ReactNode
    }>
    props: Array<{
        name: string
        type: string
        default?: string
        description: string
    }>
}

const ComponentPage = ({ title, description, usage, examples, props }: ComponentPageProps) => {
    const inset = useSafeAreaInsets()

    return (
        <ScrollView
            style={[styles.contentScroll, { paddingTop: inset.top }]}
            contentContainerStyle={styles.contentContainer}
        >
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 18 }}
            >
                <Text style={styles.contentTitle}>{title}</Text>
                <Text style={styles.contentText}>{description}</Text>

                {/* Installation */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Installation</Text>
                    <Text style={styles.contentText}>
                        This component is included in the core package. You don't need to install any additional dependencies.
                    </Text>
                </View>

                {/* Usage */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Usage</Text>
                    <Text style={styles.contentText}>Import the component from the package:</Text>
                    <View style={styles.codeBlock}>
                        <Text style={styles.codeText}>{usage}</Text>
                    </View>
                </View>

                {/* Examples */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Examples</Text>

                    {examples.map((example, index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                type: "spring",
                                damping: 18,
                                delay: index * 100,
                            }}
                            style={styles.exampleCard}
                        >
                            <View style={styles.exampleHeader}>
                                <Text style={styles.exampleTitle}>{example.title}</Text>
                            </View>
                            <Text style={styles.exampleDescription}>{example.description}</Text>

                            <View style={styles.codeBlock}>
                                <Text style={styles.codeText}>{example.code}</Text>
                            </View>

                            {example.preview && (
                                <View style={styles.previewContainer}>
                                    <Text style={styles.previewTitle}>Preview</Text>
                                    <View style={styles.preview}>{example.preview}</View>
                                </View>
                            )}
                        </MotiView>
                    ))}
                </View>

                {/* Props */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Props</Text>
                    <View style={styles.propsTable}>
                        <View style={styles.propsHeader}>
                            <Text style={[styles.propHeaderCell, { flex: 1 }]}>Name</Text>
                            <Text style={[styles.propHeaderCell, { flex: 1 }]}>Type</Text>
                            <Text style={[styles.propHeaderCell, { flex: 0.8 }]}>Default</Text>
                            <Text style={[styles.propHeaderCell, { flex: 2 }]}>Description</Text>
                        </View>

                        {props.map((prop, index) => (
                            <View key={index} style={[styles.propRow, index % 2 === 0 && styles.propRowEven]}>
                                <Text style={[styles.propCell, styles.propName, { flex: 1 }]}>{prop.name}</Text>
                                <Text style={[styles.propCell, styles.propType, { flex: 1 }]}>{prop.type}</Text>
                                <Text style={[styles.propCell, { flex: 0.8 }]}>{prop.default || "-"}</Text>
                                <Text style={[styles.propCell, { flex: 2 }]}>{prop.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Accessibility */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Accessibility</Text>
                    <Text style={styles.contentText}>This component adheres to accessibility best practices:</Text>
                    <View style={styles.accessibilityList}>
                        <View style={styles.accessibilityItem}>
                            <Feather name="check" size={16} color="#10B981" style={styles.accessibilityIcon} />
                            <Text style={styles.accessibilityText}>Supports screen readers with appropriate ARIA labels</Text>
                        </View>
                        <View style={styles.accessibilityItem}>
                            <Feather name="check" size={16} color="#10B981" style={styles.accessibilityIcon} />
                            <Text style={styles.accessibilityText}>Keyboard navigable for web environments</Text>
                        </View>
                        <View style={styles.accessibilityItem}>
                            <Feather name="check" size={16} color="#10B981" style={styles.accessibilityIcon} />
                            <Text style={styles.accessibilityText}>Respects user's reduced motion settings</Text>
                        </View>
                    </View>
                </View>
            </MotiView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentScroll: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 40,
    },
    contentTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#4B5563",
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    codeBlock: {
        backgroundColor: "#1F2937",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    codeText: {
        fontSize: 13,
        fontFamily: "monospace",
        color: "#E5E7EB",
        lineHeight: 20,
    },
    exampleCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 16,
    },
    exampleHeader: {
        marginBottom: 12,
    },
    exampleTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },
    exampleDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
        marginBottom: 16,
    },
    previewContainer: {
        marginTop: 16,
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 12,
    },
    preview: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    propsTable: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        overflow: "hidden",
    },
    propsHeader: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    propHeaderCell: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    propRow: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    propRowEven: {
        backgroundColor: "#F9FAFB",
    },
    propCell: {
        fontSize: 14,
        color: "#4B5563",
        paddingRight: 8,
    },
    propName: {
        fontWeight: "500",
        color: "#111827",
    },
    propType: {
        fontFamily: "monospace",
        color: "#6366F1",
    },
    accessibilityList: {
        marginTop: 8,
    },
    accessibilityItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    accessibilityIcon: {
        marginRight: 8,
        marginTop: 2,
    },
    accessibilityText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
        flex: 1,
    },
})

export default ComponentPage

