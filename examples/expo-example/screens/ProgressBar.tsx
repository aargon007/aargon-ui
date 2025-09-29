import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { AnimatedProgressBar, type AnimatedProgressBarRef } from '@aargon-ui/progress'
import type { ProgressVariant, ProgressSize, ProgressColorScheme, ProgressAnimationType, ProgressShape } from '@aargon-ui/progress'
import ComponentPage from '@/component/common/ComponentPage'
import { globalStyles } from '@/styles/globalStyles'

export default function ProgressPage() {
    const [progress, setProgress] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const progressRef = useRef<AnimatedProgressBarRef>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null);

    // Auto progress simulation
    const startProgress = () => {
        if (isRunning) return
        setIsRunning(true)
        setProgress(0)

        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setIsRunning(false)
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                    }
                    return 100
                }
                return prev + 2
            })
        }, 100)
    }

    const stopProgress = () => {
        setIsRunning(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    const resetProgress = () => {
        stopProgress()
        setProgress(0)
        progressRef.current?.reset()
    }

    const completeProgress = () => {
        stopProgress()
        setProgress(100)
        progressRef.current?.complete()
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Animated Progress Bar
                </Text>
                <Text style={globalStyles.description}>
                    Highly customizable progress bar component with smooth animations
                </Text>
            </View>

            <View style={globalStyles.previewContainer}>
                {/* Interactive Demo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Interactive Demo</Text>
                    <View style={styles.demoContainer}>
                        <AnimatedProgressBar
                            ref={progressRef}
                            progress={progress}
                            variant="filled"
                            size="lg"
                            colorScheme="primary"
                            animationType="smooth"
                            showText
                            textPosition="outside"
                            onAnimationComplete={() => console.log('Animation completed!')}
                        />

                        <View style={styles.controls}>
                            <TouchableOpacity
                                style={[styles.button, styles.primaryButton]}
                                onPress={startProgress}
                                disabled={isRunning}
                            >
                                <Text style={styles.buttonText}>Start</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]}
                                onPress={stopProgress}
                                disabled={!isRunning}
                            >
                                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Stop</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]}
                                onPress={resetProgress}
                            >
                                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Reset</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.successButton]}
                                onPress={completeProgress}
                            >
                                <Text style={styles.buttonText}>Complete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Variants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Variants</Text>
                    <View style={styles.grid}>
                        {(['default', 'filled', 'outlined', 'gradient', 'glass', 'minimal'] as ProgressVariant[]).map((variant) => (
                            <View key={variant} style={styles.gridItem}>
                                <Text style={styles.label}>{variant}</Text>
                                <AnimatedProgressBar
                                    progress={75}
                                    variant={variant}
                                    size="md"
                                    colorScheme="primary"
                                    animationType="smooth"
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sizes</Text>
                    <View style={styles.grid}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as ProgressSize[]).map((size) => (
                            <View key={size} style={styles.gridItem}>
                                <Text style={styles.label}>{size}</Text>
                                <AnimatedProgressBar
                                    progress={60}
                                    variant="filled"
                                    size={size}
                                    colorScheme="primary"
                                    animationType="smooth"
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Color Schemes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Color Schemes</Text>
                    <View style={styles.grid}>
                        {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as ProgressColorScheme[]).map((colorScheme) => (
                            <View key={colorScheme} style={styles.gridItem}>
                                <Text style={styles.label}>{colorScheme}</Text>
                                <AnimatedProgressBar
                                    progress={65}
                                    variant="filled"
                                    size="md"
                                    colorScheme={colorScheme}
                                    animationType="smooth"
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Animation Types */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Animation Types</Text>
                    <View style={styles.grid}>
                        {(['smooth', 'bounce', 'elastic', 'spring', 'pulse', 'wave'] as ProgressAnimationType[]).map((animationType) => (
                            <View key={animationType} style={styles.gridItem}>
                                <Text style={styles.label}>{animationType}</Text>
                                <AnimatedProgressBar
                                    progress={70}
                                    variant="filled"
                                    size="md"
                                    colorScheme="primary"
                                    animationType={animationType}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Shapes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shapes</Text>
                    <View style={styles.grid}>
                        {(['rounded', 'square', 'pill'] as ProgressShape[]).map((shape) => (
                            <View key={shape} style={styles.gridItem}>
                                <Text style={styles.label}>{shape}</Text>
                                <AnimatedProgressBar
                                    progress={80}
                                    variant="filled"
                                    size="lg"
                                    colorScheme="primary"
                                    animationType="smooth"
                                    shape={shape}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Text Positions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Text Positions</Text>
                    <View style={styles.grid}>
                        {(['outside', 'inside', 'top', 'bottom'] as const).map((textPosition) => (
                            <View key={textPosition} style={styles.gridItem}>
                                <Text style={styles.label}>{textPosition}</Text>
                                <AnimatedProgressBar
                                    progress={85}
                                    variant="filled"
                                    size="lg"
                                    colorScheme="primary"
                                    animationType="smooth"
                                    showText
                                    textPosition={textPosition}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Special Features */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Special Features</Text>

                    <View style={styles.featureItem}>
                        <Text style={styles.label}>Indeterminate</Text>
                        <AnimatedProgressBar
                            progress={0}
                            variant="filled"
                            size="md"
                            colorScheme="primary"
                            animationType="smooth"
                            indeterminate
                        />
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.label}>Striped</Text>
                        <AnimatedProgressBar
                            progress={60}
                            variant="filled"
                            size="lg"
                            colorScheme="success"
                            animationType="smooth"
                            striped
                        />
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.label}>Striped Animated</Text>
                        <AnimatedProgressBar
                            progress={75}
                            variant="filled"
                            size="lg"
                            colorScheme="warning"
                            animationType="smooth"
                            striped
                            stripedAnimated
                        />
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.label}>Custom Text</Text>
                        <AnimatedProgressBar
                            progress={90}
                            variant="gradient"
                            size="lg"
                            colorScheme="success"
                            animationType="bounce"
                            showText
                            text="Almost Done!"
                            textPosition="outside"
                        />
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.label}>Disabled</Text>
                        <AnimatedProgressBar
                            progress={50}
                            variant="filled"
                            size="md"
                            colorScheme="secondary"
                            animationType="smooth"
                            disabled
                            showText
                            textPosition="outside"
                        />
                    </View>
                </View>

                {/* Complex Examples */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Complex Examples</Text>

                    <View style={styles.complexExample}>
                        <Text style={styles.label}>File Upload Progress</Text>
                        <AnimatedProgressBar
                            progress={progress}
                            variant="gradient"
                            size="lg"
                            colorScheme="info"
                            animationType="smooth"
                            showText
                            text={`${Math.round(progress)}% uploaded`}
                            textPosition="top"
                            striped
                            stripedAnimated
                        />
                    </View>

                    <View style={styles.complexExample}>
                        <Text style={styles.label}>Health Bar (Gaming)</Text>
                        <AnimatedProgressBar
                            progress={35}
                            variant="filled"
                            size="xl"
                            colorScheme="error"
                            animationType="pulse"
                            showText
                            text="35 HP"
                            textPosition="inside"
                            shape="pill"
                        />
                    </View>

                    <View style={styles.complexExample}>
                        <Text style={styles.label}>Loading Animation</Text>
                        <AnimatedProgressBar
                            progress={0}
                            variant="glass"
                            size="md"
                            colorScheme="primary"
                            animationType="wave"
                            indeterminate
                        />
                    </View>
                </View>

            </View>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    section: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    demoContainer: {
        backgroundColor: '#F9FAFB',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    controls: {
        flex: 1,
        flexDirection: Dimensions.get('window').width < 768 ? 'column' : 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        flexWrap: "wrap",
        gap: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#3B82F6',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    successButton: {
        backgroundColor: '#10B981',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButtonText: {
        color: '#374151',
    },
    grid: {
        gap: 16,
    },
    gridItem: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    featureItem: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
    },
    complexExample: {
        backgroundColor: '#F9FAFB',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    bottomSpacing: {
        height: 40,
    },
})