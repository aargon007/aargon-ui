import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackedToastProvider } from 'aargon-toast'
import { ToastApp } from 'aargon-toast'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'

const ToastPage = () => {

    return (
        <StackedToastProvider>
            <ComponentPage>
                {/* UI Demo */}
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Animated Toast Component
                    </Text>
                    <Text style={globalStyles.description}>
                        Highly customizable toast notifications with smooth animations
                    </Text>
                </View>
                <View style={globalStyles.previewContainer}>
                    <ToastApp />
                </View>
            </ComponentPage>
        </StackedToastProvider >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        lineHeight: 24,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 12,
        padding: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e9ecef',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 8,
        lineHeight: 20,
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
        minWidth: 120,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#6366f1',
    },
    successButton: {
        backgroundColor: '#10b981',
    },
    errorButton: {
        backgroundColor: '#ef4444',
    },
    warningButton: {
        backgroundColor: '#f59e0b',
    },
    infoButton: {
        backgroundColor: '#3b82f6',
    },
    instructionCard: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1',
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#6c757d',
    },
})

export default ToastPage