import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { libraries } from '@/constants/installationLibraries';
import { Feather } from "@expo/vector-icons"
import { MotiView } from 'moti';

const Libraries = ({ installMethod }: { installMethod: string }) => {
    const [expandedLibrary, setExpandedLibrary] = React.useState("reanimated");

    return (
        <>
            {libraries.map((library, index) => (
                <MotiView
                    key={library.id}
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: "spring",
                        damping: 18,
                        delay:  100,
                    }}
                    style={styles.libraryCard}
                >
                    <Pressable
                        style={styles.libraryHeader}
                        onPress={() => setExpandedLibrary(expandedLibrary === library.id ? "" : library.id)}
                    >
                        <View style={styles.libraryTitleContainer}>
                            <View style={styles.libraryIconContainer}>
                                <Feather
                                    name={
                                        library.id === "reanimated"
                                            ? "activity"
                                            : library.id === "gesture"
                                                ? "hand"
                                                : library.id === "skia"
                                                    ? "pen-tool"
                                                    : "box" as any
                                    }
                                    size={18}
                                    color="#6366F1"
                                />
                            </View>
                            <Text style={styles.libraryTitle}>
                                {library.name}
                            </Text>
                        </View>
                        <Feather
                            name={expandedLibrary === library.id ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#6B7280"
                        />
                    </Pressable>

                    {expandedLibrary === library.id && (
                        <MotiView
                            from={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ type: "timing", duration: 300 }}
                            style={styles.libraryContent}
                        >
                            <Text style={styles.libraryDescription}>
                                {library.description}
                            </Text>

                            <View style={styles.installCommand}>
                                <Text style={styles.installCommandText}>
                                    {installMethod === "npm" ? library.npm : library.yarn}
                                </Text>
                                <Pressable style={styles.copyButton}>
                                    <Feather name="copy" size={16} color="#6366F1" />
                                </Pressable>
                            </View>

                            {library.extraSteps.length > 0 && (
                                <View style={styles.extraSteps}>
                                    <Text style={styles.extraStepsTitle}>
                                        Additional Setup
                                    </Text>
                                    {library.extraSteps.map((step, stepIndex) => (
                                        <React.Fragment key={stepIndex}>
                                            {step.includes("{") ? (
                                                <View style={styles.codeBlock}>
                                                    <Text style={styles.codeText}>{step}</Text>
                                                </View>
                                            ) : (
                                                <Text
                                                    style={[
                                                        styles.extraStepText,
                                                        stepIndex > 0 && !library.extraSteps[stepIndex - 1].includes("{") && { marginTop: 12 },
                                                    ]}
                                                >
                                                    {step}
                                                </Text>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </View>
                            )}
                        </MotiView>
                    )}
                </MotiView>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    libraryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    libraryHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        userSelect:"none"
    },
    libraryTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    libraryIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#EEF2FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    libraryTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    libraryContent: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    libraryDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
        marginBottom: 16,
        marginTop:10
    },
    installCommand: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    installCommandText: {
        fontSize: 14,
        fontFamily: "monospace",
        color: "#111827",
    },
    copyButton: {
        padding: 4,
    },
    extraSteps: {
        marginTop: 8,
    },
    extraStepsTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 12,
    },
    extraStepText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
    },
    codeBlock: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
    },
    codeText: {
        fontSize: 13,
        fontFamily: "monospace",
        color: "#111827",
        lineHeight: 20,
    },
});

export default Libraries;