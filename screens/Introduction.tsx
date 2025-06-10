import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { ContentStackNavigation } from '@/navigators/ContentNavigator';
import ComponentPage from '@/component/common/ComponentPage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';

const Introduction = () => {
    const [setupMethod, setSetupMethod] = useState('expo');
    const { navigate } = useNavigation<ContentStackNavigation>();

    const onNavigateToInstallation = () => {
        navigate('Installation');
    };

    return (
        <ComponentPage>
            {/* Hero Section */}
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18 }}
            >
                {/* <Text style={styles.contentTitle}>
                    Introduction
                </Text> */}

                <View style={styles.heroSection}>
                    <MotiView
                        from={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 15, delay: 100 }}
                        style={styles.heroIcon}
                    >
                        <Feather name="box" size={32} color="#FFFFFF" />
                    </MotiView>

                    <MotiText
                        from={{ translateY: 10, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 18, delay: 200 }}
                        style={styles.heroTitle}
                    >
                        Aargon UI Library
                    </MotiText>

                    <MotiText
                        from={{ translateY: 10, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 18, delay: 300 }}
                        style={styles.heroSubtitle}
                    >
                        A powerful React Native animation library built on Moti, Skia and Reanimated
                    </MotiText>
                </View>
            </MotiView>

            {/* Overview Section */}
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18, delay: 400 }}
                style={styles.section}
            >
                <Text style={styles.sectionTitle}>
                    Overview
                </Text>
                <Text style={styles.contentText}>
                    Our UI library provides a collection of beautifully animated components that are easy to use and highly customizable.
                    Built on top of Moti and Reanimated, it offers a simple API for creating complex animations with minimal code.
                </Text>

                <View style={styles.featuresGrid}>
                    {[
                        { icon: 'layers', title: 'Component-Based', description: 'Ready-to-use animated UI components' },
                        { icon: 'zap', title: 'High Performance', description: 'Native-driven animations for smooth 60fps' },
                        { icon: 'sliders', title: 'Customizable', description: 'Easily adapt to your design system' },
                        { icon: 'smartphone', title: 'Cross-Platform', description: 'Works on iOS, Android, and Web' },
                    ].map((feature, index) => (
                        <MotiView
                            key={index}
                            from={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 15, delay: 500 + index * 100 }}
                            style={styles.featureCard}
                        >
                            <View style={styles.featureIconContainer}>
                                <Feather name={feature.icon as any} size={20} color="#6366F1" />
                            </View>
                            <Text style={styles.featureTitle}>
                                {feature.title}
                            </Text>
                            <Text style={styles.featureDescription}>
                                {feature.description}
                            </Text>
                        </MotiView>
                    ))}
                </View>
            </MotiView>

            {/* Project Setup Section */}
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18, delay: 900 }}
                style={styles.section}
            >
                <Text style={styles.sectionTitle}>
                    Project Setup
                </Text>
                <Text style={styles.contentText}>
                    Get started with a new React Native project using either Expo or React Native CLI.
                </Text>

                <View style={styles.setupMethodToggle}>
                    <Pressable
                        style={[styles.methodButton, setupMethod === 'expo' && styles.methodButtonActive]}
                        onPress={() => setSetupMethod('expo')}
                    >
                        <Text style={[styles.methodButtonText, setupMethod === 'expo' && styles.methodButtonTextActive]}>
                            Expo
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.methodButton, setupMethod === 'cli' && styles.methodButtonActive]}
                        onPress={() => setSetupMethod('cli')}
                    >
                        <Text style={[styles.methodButtonText, setupMethod === 'cli' && styles.methodButtonTextActive]}>
                            React Native CLI
                        </Text>
                    </Pressable>
                </View>

                {setupMethod === 'expo' ? (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
                        <View style={styles.setupSteps}>
                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>1</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Create a new Expo project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            npx create-expo-app@latest MyAnimatedApp
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>2</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Navigate to your project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            cd MyAnimatedApp
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>3</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Start your project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            npx expo start
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoCard}>
                            <Feather name="info" size={20} color="#6366F1" style={styles.infoIcon} />
                            <Text style={styles.infoText}>
                                Expo is a framework and platform for universal React applications. It's a set of tools and services built
                                around React Native that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps.
                            </Text>
                        </View>
                    </MotiView>
                ) : (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
                        <View style={styles.setupSteps}>
                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>1</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Create a new React Native project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            npx @react-native-community/cli@latest init MyAnimatedApp
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>2</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Navigate to your project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            cd MyAnimatedApp
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.setupStep}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>3</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>
                                        Start your project
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            npm run start or yarn start
                                        </Text>
                                    </View>
                                    <Text style={styles.stepDescription}>
                                        In a separate terminal:
                                    </Text>
                                    <View style={styles.codeBlock}>
                                        <Text style={styles.codeText}>
                                            yarn android or npm run android
                                        </Text>
                                        <Text style={styles.codeText}>// or</Text>
                                        <Text style={styles.codeText}>
                                            yarn ios or npm run ios
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoCard}>
                            <Feather name="info" size={20} color="#6366F1" style={styles.infoIcon} />
                            <Text style={styles.infoText}>
                                React Native CLI gives you more control over the native side of your application. It's recommended for
                                projects that require deep integration with native modules or custom native code.
                            </Text>
                        </View>
                    </MotiView>
                )}
            </MotiView>

            {/* Quick Start Section */}
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18, delay: 1000 }}
                style={styles.section}
            >
                <Text style={styles.sectionTitle}>
                    Quick Start
                </Text>
                <Text style={styles.contentText}>
                    After setting up your project, you can install our UI library and start using the components.
                </Text>

                <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>
                        npm install moti react-native-reanimated
                    </Text>
                </View>

                <Text style={styles.contentText}>
                    Here's a simple example of using a fade-in animation component:
                </Text>

                <View style={styles.exampleContainer}>
                    <View style={styles.codeBlock}>
                        <Text style={styles.codeText}>
                            {`import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
            type: "timing",
            duration: 1000,
            loop: true,
            repeatReverse: true,
            }}
      >
        <Text style={{ fontSize: 24 }}>
           Hello, Animations!
        </Text>
      </MotiView>
    </View>
  );
}`}
                        </Text>
                    </View>

                    <View style={styles.examplePreview}>
                        <Text style={styles.examplePreviewLabel}>
                            Preview:
                        </Text>
                        <View style={styles.examplePreviewContent}>
                            <MotiView
                                from={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    type: 'timing',
                                    duration: 1000,
                                    loop: true,
                                    repeatReverse: true,
                                }}
                            >
                                <Text style={styles.examplePreviewText}>
                                    Hello, Animations!
                                </Text>
                            </MotiView>
                        </View>
                    </View>
                </View>
            </MotiView>

            {/* Next Steps Section */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', damping: 18, delay: 1100 }}
            >
                <View style={styles.nextStepsCard}>
                    <Text style={styles.nextStepsTitle}>
                        Next Steps
                    </Text>
                    <Text style={styles.nextStepsText}>
                        Now that you understand the basics of our UI library, the next step is to set up the required dependencies. Head to
                        the Installation page to learn how to install React Native Reanimated, Gesture Handler, React Native Skia, and Moti
                        in your project.
                    </Text>
                    <Pressable
                        style={styles.nextStepsButton}
                        onPress={onNavigateToInstallation}
                        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', radius: 20 }}
                    >
                        <Text style={styles.nextStepsButtonText}>
                            Go to Installation
                        </Text>
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
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 16,
    },
    heroIcon: {
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: 300,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    featureCard: {
        width: '50%',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    featureIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    setupMethodToggle: {
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
    setupSteps: {
        marginBottom: 24,
    },
    setupStep: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stepNumberContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6366F1',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
        marginBottom: 8,
    },
    codeBlock: {
        backgroundColor: '#1F2937',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    codeText: {
        fontSize: 13,
        fontFamily: 'monospace',
        color: '#E5E7EB',
        lineHeight: 20,
    },
    infoCard: {
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    infoIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
    exampleContainer: {
        marginBottom: 16,
    },
    examplePreview: {
        marginTop: 16,
    },
    examplePreviewLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    examplePreviewContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        height: 100,
    },
    examplePreviewText: {
        fontSize: 24,
        color: '#111827',
    },
    nextStepsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        marginTop: 32,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    nextStepsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    nextStepsText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#4B5563',
        marginBottom: 20,
    },
    nextStepsButton: {
        backgroundColor: '#6366F1',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    nextStepsButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
    },
});

export default Introduction;
