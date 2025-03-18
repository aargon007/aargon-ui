import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MotiView } from "moti";

const Examples = () => {

    return (
        <ScrollView style={styles.contentScroll}>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 18 }}
            >
                <Text style={styles.contentTitle}>
                    Examples
                </Text>
                <Text style={styles.contentText}>
                    Check out these examples to see how to use our components in your application.
                </Text>

                <View style={styles.exampleContainer}>
                    <MotiView
                        style={styles.exampleBox}
                        from={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <Text style={styles.exampleTitle}>
                            Button Example
                        </Text>
                        <Pressable style={({ pressed }) => [styles.exampleButton, pressed && styles.exampleButtonPressed]}>
                            <Text style={styles.exampleButtonText}>
                                Press Me
                            </Text>
                        </Pressable>
                    </MotiView>

                    <MotiView
                        style={styles.exampleBox}
                        from={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 100,
                        }}
                    >
                        <Text style={styles.exampleTitle}>
                            Card Example
                        </Text>
                        <View style={styles.exampleCard}>
                            <Text style={styles.exampleCardTitle}>
                                Card Title
                            </Text>
                            <Text style={styles.exampleCardText}>
                                This is an example card component with subtle animations.
                            </Text>
                        </View>
                    </MotiView>
                </View>
            </MotiView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentScroll: {
        flex: 1,
        backgroundColor: "#F9FAFB",
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
    exampleContainer: {
        marginTop: 24,
    },
    exampleBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    exampleTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 16,
    },
    exampleButton: {
        backgroundColor: "#6366F1",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    exampleButtonPressed: {
        backgroundColor: "#4F46E5",
        transform: [{ scale: 0.98 }],
    },
    exampleButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    exampleCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    exampleCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    exampleCardText: {
        fontSize: 14,
        color: "#6B7280",
    },
});

export default Examples;