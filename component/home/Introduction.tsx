import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { MotiView } from "moti";

const Introduction = () => {

    return (
        <ScrollView style={styles.contentScroll}>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 18 }}
            >
                <Text style={styles.contentTitle}>
                    Introduction
                </Text>
                <Text style={styles.contentText}>
                    Welcome to our React Native UI library based on Moti and Reanimated. This library provides a set of animated components that are easy to use and highly customizable.
                </Text>
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
    }
});

export default Introduction;