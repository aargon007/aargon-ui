import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeExample = ({ title, code, filename }: { title: string; code: string; filename: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <View style={styles.codeSection}>
            <View style={styles.codeTitleContainer}>
                <Text style={styles.codeTitle}>
                    {title}
                </Text>
                {/* <View style={styles.codeLanguageTag}>
                    <Text style={styles.codeLanguageText}>
                        TypeScript
                    </Text>
                </View> */}
            </View>

            <View style={styles.codeWrapper}>
                <View style={styles.codeHeader}>
                    <View style={styles.windowControls}>
                        <View style={[styles.windowControl, styles.closeButton]} />
                        <View style={[styles.windowControl, styles.minimizeButton]} />
                        <View style={[styles.windowControl, styles.maximizeButton]} />
                    </View>
                    <Text style={styles.fileName}>
                        {filename}
                    </Text>
                    <View style={styles.copyContainer}>
                        <Pressable onPress={copyToClipboard} style={styles.copyButton}>
                            {copied ?
                                <Feather name="check" size={16} color="#10B981" />
                                :
                                <Feather name="copy" size={16} color="#9CA3AF" />
                            }
                        </Pressable>
                    </View>
                </View>

                <ScrollView
                    style={styles.codeContainer}
                    // contentContainerStyle={styles.codeContent}
                    contentInsetAdjustmentBehavior="automatic"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <CodeHighlighter
                        hljsStyle={atomOneDark}
                        textStyle={styles.codeText}
                        language="typescript"
                        scrollViewProps={{
                            showsVerticalScrollIndicator: false,
                            bounces: false,
                            contentContainerStyle: {
                                flexGrow: 1,
                                backgroundColor: "#0F172A",
                                padding: 25
                            },
                        }}
                        wrapLines
                    >
                        {code}
                    </CodeHighlighter>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D1117",
        padding: 20,
    },
    codeSection: {
        marginTop: 24,
    },
    codeTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    codeTitle: {
        fontSize: 24,
        fontWeight: "700",
    },
    codeLanguageTag: {
        backgroundColor: "#1F2937",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#374151",
    },
    codeLanguageText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#9CA3AF",
    },
    codeWrapper: {
        backgroundColor: "#0F172A",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#1E293B",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    codeHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E293B",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
    },
    windowControls: {
        flexDirection: "row",
        marginRight: 16,
    },
    windowControl: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    closeButton: {
        backgroundColor: "#EF4444",
    },
    minimizeButton: {
        backgroundColor: "#F59E0B",
    },
    maximizeButton: {
        backgroundColor: "#10B981",
    },
    fileName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#CBD5E1",
    },

    codeContainer: {
        backgroundColor: "#0F172A",
        maxHeight: 600,
    },
    codeContent: {
        padding: 24,
    },
    codeText: {
        fontSize: 14,
        fontFamily: "monospace",
        lineHeight: 24,
        color: "#EEFFFF",
    },
    copyContainer: {
        marginLeft: "auto",
    },
    copyButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
})
export default CodeExample;
