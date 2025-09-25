import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Prerequisites from '@/component/installation/Prerequisites';
import Troubleshooting from '@/component/installation/Troubleshooting';
import Libraries from '@/component/installation/Libraries';
import ComponentPage from '@/component/common/ComponentPage';
import { MotiView } from '@/component/ui/moti';

const Installation = () => {
    const [installMethod, setInstallMethod] = React.useState('npm');

    return (
        <ComponentPage>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring' }}>
                <Text style={styles.contentTitle}>Installation</Text>

                <Text style={styles.contentText}>
                    Follow these steps to install and configure the required libraries for your React Native UI project. Each library serves
                    a specific purpose in creating fluid, interactive animations and UI components.
                </Text>

                <View style={styles.installMethodToggle}>
                    <Pressable
                        style={[styles.methodButton, installMethod === 'npm' && styles.methodButtonActive]}
                        onPress={() => setInstallMethod('npm')}>
                        <Text style={[styles.methodButtonText, installMethod === 'npm' && styles.methodButtonTextActive]}>npm</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.methodButton, installMethod === 'yarn' && styles.methodButtonActive]}
                        onPress={() => setInstallMethod('yarn')}>
                        <Text style={[styles.methodButtonText, installMethod === 'yarn' && styles.methodButtonTextActive]}>yarn</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.methodButton, installMethod === 'expo' && styles.methodButtonActive]}
                        onPress={() => setInstallMethod('expo')}>
                        <Text style={[styles.methodButtonText, installMethod === 'expo' && styles.methodButtonTextActive]}>expo</Text>
                    </Pressable>
                </View>

                <Prerequisites />

                <Libraries installMethod={installMethod} />

                <Troubleshooting />

                <View style={styles.nextStepsCard}>
                    <Text style={styles.nextStepsTitle}>Next Steps</Text>
                    <Text style={styles.nextStepsText}>
                        After installing these libraries, you're ready to start building beautiful, animated UI components. Check out the
                        Components and Examples sections to see how to use these libraries together.
                    </Text>
                    <Pressable style={styles.nextStepsButton}>
                        <Text style={styles.nextStepsButtonText}>View Components</Text>
                        <Feather name="arrow-right" size={16} color="#FFFFFF" />
                    </Pressable>
                </View>
            </MotiView>
        </ComponentPage>
    );
};

const styles = StyleSheet.create({
    contentScroll: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 40,
    },
    contentTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4B5563',
        marginBottom: 24,
    },
    installMethodToggle: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
        alignSelf: 'flex-start',
    },
    methodButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        userSelect: 'none',
    },
    methodButtonActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    methodButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    methodButtonTextActive: {
        color: '#111827',
    },

    nextStepsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    nextStepsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    nextStepsText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
        marginBottom: 16,
    },
    nextStepsButton: {
        backgroundColor: '#6366F1',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        userSelect: 'none',
    },
    nextStepsButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
    },
});

export default Installation;