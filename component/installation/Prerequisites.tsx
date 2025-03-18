import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from "@expo/vector-icons"

const Prerequisites = () => {
    return (
        <View style={styles.prerequisitesCard}>
            <View style={styles.prerequisitesHeader}>
                <Feather name="info" size={20} color="#6366F1" />
                <Text style={styles.prerequisitesTitle}>
                    Prerequisites
                </Text>
            </View>

            <Text style={styles.prerequisitesText}>
                Before installing these libraries, make sure you have:
            </Text>

            <View style={styles.prerequisitesList}>
                <View style={styles.prerequisiteItem}>
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text style={styles.prerequisiteItemText}>
                        React Native project initialized
                    </Text>
                </View>

                <View style={styles.prerequisiteItem}>
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text style={styles.prerequisiteItemText}>
                        Node.js and npm/yarn installed
                    </Text>
                </View>

                <View style={styles.prerequisiteItem}>
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text style={styles.prerequisiteItemText}>
                        For iOS: CocoaPods installed
                    </Text>
                </View>

                <View style={styles.prerequisiteItem}>
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text style={styles.prerequisiteItemText}>
                        React Native 0.66 or higher recommended
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    prerequisitesCard: {
        backgroundColor: "#EEF2FF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    prerequisitesHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    prerequisitesTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        marginLeft: 8,
    },
    prerequisitesText: {
        fontSize: 14,
        color: "#4B5563",
        marginBottom: 12,
    },
    prerequisitesList: {
        marginTop: 8,
    },
    prerequisiteItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    prerequisiteItemText: {
        fontSize: 14,
        color: "#4B5563",
        marginLeft: 8,
    },
});

export default Prerequisites;