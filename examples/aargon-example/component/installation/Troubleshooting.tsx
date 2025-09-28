import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Troubleshooting = () => {
    return (
        <View style={styles.troubleshootingCard}>
            <View style={styles.troubleshootingHeader}>
                <Feather name="alert-circle" size={20} color="#F59E0B" />
                <Text style={styles.troubleshootingTitle}>Troubleshooting</Text>
            </View>

            <Text style={styles.troubleshootingText}>Common issues and their solutions:</Text>

            <View style={styles.troubleshootingList}>
                <View style={styles.troubleshootingItem}>
                    <Text style={styles.troubleshootingItemTitle}>Metro bundler errors after installing Reanimated</Text>
                    <Text style={styles.troubleshootingItemText}>Clear cache and restart: npx react-native start --reset-cache</Text>
                </View>

                <View style={styles.troubleshootingItem}>
                    <Text style={styles.troubleshootingItemTitle}>iOS build fails with Reanimated or Skia</Text>
                    <Text style={styles.troubleshootingItemText}>
                        Try cleaning the build folder: cd ios && rm -rf build/ && pod install
                    </Text>
                </View>

                <View style={styles.troubleshootingItem}>
                    <Text style={styles.troubleshootingItemTitle}>Android build issues</Text>
                    <Text style={styles.troubleshootingItemText}>
                        Check your minSdkVersion in android/build.gradle (should be at least 21)
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    troubleshootingCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        marginBottom: 24,
    },
    troubleshootingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    troubleshootingTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginLeft: 8,
    },
    troubleshootingText: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 12,
    },
    troubleshootingList: {
        marginTop: 8,
    },
    troubleshootingItem: {
        marginBottom: 12,
    },
    troubleshootingItemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    troubleshootingItemText: {
        fontSize: 14,
        color: '#4B5563',
    },
});

export default Troubleshooting;
