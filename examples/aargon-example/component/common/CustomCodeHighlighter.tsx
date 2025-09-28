import React from 'react';
import { Text } from 'react-native';

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

const CustomCodeHighlighter = ({ code }: { code: string }) => {
    const tokens = tokenize(code);

    return (
        <Text
            style={{
                fontSize: 14,
                fontFamily: "monospace",
                lineHeight: 24,
                color: "#EEFFFF",
            }}
        >
            {tokens.map((token, index) => (
                <Text key={index} style={getTokenStyle(token.type)}>
                    {token.value}
                </Text>
            ))}
        </Text>
    )
}

export default CustomCodeHighlighter;