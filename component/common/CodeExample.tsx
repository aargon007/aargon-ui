import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';

interface Token {
    type: "keyword" | "string" | "comment" | "number" | "type" | "operator" | "punctuation" | "text"
    value: string
}

const tokenize = (code: string): Token[] => {
    const tokens: Token[] = []
    let current = 0

    while (current < code.length) {
        const char = code[current]

        // Skip whitespace but preserve it
        if (/\s/.test(char)) {
            let whitespace = ""
            while (current < code.length && /\s/.test(code[current])) {
                whitespace += code[current]
                current++
            }
            tokens.push({ type: "text", value: whitespace })
            continue
        }

        // Comments
        if (char === "/" && code[current + 1] === "/") {
            let comment = ""
            while (current < code.length && code[current] !== "\n") {
                comment += code[current]
                current++
            }
            tokens.push({ type: "comment", value: comment })
            continue
        }

        // Strings
        if (char === '"' || char === "'" || char === "`") {
            const quote = char
            let string = char
            current++
            while (current < code.length && code[current] !== quote) {
                if (code[current] === "\\") {
                    string += code[current]
                    current++
                    if (current < code.length) {
                        string += code[current]
                        current++
                    }
                } else {
                    string += code[current]
                    current++
                }
            }
            if (current < code.length) {
                string += code[current]
                current++
            }
            tokens.push({ type: "string", value: string })
            continue
        }

        // Numbers
        if (/\d/.test(char)) {
            let number = ""
            while (current < code.length && /[\d.]/.test(code[current])) {
                number += code[current]
                current++
            }
            tokens.push({ type: "number", value: number })
            continue
        }

        // Operators and punctuation
        if (/[+\-*/%=<>!&|^~?:;,(){}[\]]/.test(char)) {
            let operator = char
            current++
            // Handle multi-character operators
            if (current < code.length) {
                const twoChar = operator + code[current]
                if (["==", "!=", "<=", ">=", "&&", "||", "++", "--", "=>", "??"].includes(twoChar)) {
                    operator = twoChar
                    current++
                }
            }
            tokens.push({ type: "operator", value: operator })
            continue
        }

        // Identifiers and keywords
        if (/[a-zA-Z_$]/.test(char)) {
            let identifier = ""
            while (current < code.length && /[a-zA-Z0-9_$]/.test(code[current])) {
                identifier += code[current]
                current++
            }

            const keywords = [
                "const",
                "let",
                "var",
                "function",
                "return",
                "if",
                "else",
                "for",
                "while",
                "import",
                "export",
                "default",
                "from",
                "as",
                "new",
                "this",
                "super",
                "class",
                "extends",
                "interface",
                "type",
                "enum",
                "async",
                "await",
                "try",
                "catch",
                "finally",
                "throw",
                "typeof",
                "instanceof",
                "in",
                "true",
                "false",
                "null",
                "undefined",
                "void",
            ]

            const types = [
                "string",
                "number",
                "boolean",
                "object",
                "any",
                "unknown",
                "never",
                "Props",
                "SharedValue",
                "React",
                "Component",
                "FC",
                "ReactNode",
            ]

            if (keywords.includes(identifier)) {
                tokens.push({ type: "keyword", value: identifier })
            } else if (types.includes(identifier)) {
                tokens.push({ type: "type", value: identifier })
            } else {
                tokens.push({ type: "text", value: identifier })
            }
            continue
        }

        // Default case
        tokens.push({ type: "text", value: char })
        current++
    }

    return tokens
}

const getTokenStyle = (type: Token["type"]) => {
    switch (type) {
        case "keyword":
            return { color: "#C792EA" } // Purple
        case "string":
            return { color: "#C3E88D" } // Green
        case "comment":
            return { color: "#546E7A", fontStyle: "italic" as const } // Gray italic
        case "number":
            return { color: "#F78C6C" } // Orange
        case "type":
            return { color: "#FFCB6B" } // Yellow
        case "operator":
            return { color: "#89DDFF" } // Cyan
        case "punctuation":
            return { color: "#89DDFF" } // Cyan
        default:
            return { color: "#EEFFFF" } // White
    }
}

const HighlightedCode = ({ code }: { code: string }) => {
    const tokens = tokenize(code)

    return (
        <Text style={styles.codeText}>
            {tokens.map((token, index) => (
                <Text key={index} style={getTokenStyle(token.type)}>
                    {token.value}
                </Text>
            ))}
        </Text>
    )
}

const CodeExample = ({ title, code }: { title: string; code: string }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
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
                        example.tsx
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
                    contentContainerStyle={styles.codeContent}
                    contentInsetAdjustmentBehavior="automatic"
                    showsVerticalScrollIndicator={false}
                >
                    <HighlightedCode code={code} />
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
