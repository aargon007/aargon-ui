import { View, Text, StyleSheet, ScrollView } from "react-native"
import ComponentPage from "@/component/common/ComponentPage"
import { globalStyles } from "@/styles/globalStyles"
import { AnimatedBadge } from "@aargon-ui/badge"

export default function BadgeComponent() {
    const customTheme = {
        colors: {
            primary: {
                bg: "#F0F9FF",
                text: "#0369A1",
                border: "#7DD3FC"
            },
        },
        borderRadius: {
            md: 16,
        },
    }

    return (
        <ComponentPage>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* UI Demo */}
                <View style={globalStyles.demoSection}>
                    <Text style={globalStyles.title}>
                        Animated Badge Component
                    </Text>
                    <Text style={globalStyles.description}>
                        Highly customizable badge component with smooth animations and various styles
                    </Text>

                    <View style={[globalStyles.previewContainer, { gap: 20 }]}>
                        {/* Basic Variants */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Variants
                            </Text>
                            <View style={styles.row}>
                                <AnimatedBadge variant="default">Default</AnimatedBadge>
                                <AnimatedBadge variant="primary">Primary</AnimatedBadge>
                                <AnimatedBadge variant="secondary">Secondary</AnimatedBadge>
                                <AnimatedBadge variant="success">Success</AnimatedBadge>
                                <AnimatedBadge variant="warning">Warning</AnimatedBadge>
                                <AnimatedBadge variant="error">Error</AnimatedBadge>
                                <AnimatedBadge variant="info">Info</AnimatedBadge>
                                <AnimatedBadge variant="outline">Outline</AnimatedBadge>
                            </View>
                        </View>

                        {/* Sizes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sizes</Text>
                            <View style={styles.row}>
                                <AnimatedBadge size="xs" variant="primary">XS</AnimatedBadge>
                                <AnimatedBadge size="sm" variant="primary">Small</AnimatedBadge>
                                <AnimatedBadge size="md" variant="primary">Medium</AnimatedBadge>
                                <AnimatedBadge size="lg" variant="primary">Large</AnimatedBadge>
                            </View>
                        </View>

                        {/* With Icons */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>With Icons</Text>
                            <View style={styles.row}>
                                <AnimatedBadge
                                    variant="success"
                                    leftIcon="check"
                                >
                                    Verified
                                </AnimatedBadge>
                                <AnimatedBadge
                                    variant="warning"
                                    rightIcon="alert-triangle"
                                >
                                    Warning
                                </AnimatedBadge>
                                <AnimatedBadge
                                    variant="info"
                                    leftIcon="info"
                                    rightIcon="external-link"
                                >
                                    Info
                                </AnimatedBadge>
                            </View>
                        </View>

                        {/* With Dots */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>With Status Dots</Text>
                            <View style={styles.row}>
                                <AnimatedBadge variant="success" dot>Online</AnimatedBadge>
                                <AnimatedBadge variant="warning" dot dotColor="#F59E0B">Away</AnimatedBadge>
                                <AnimatedBadge variant="error" dot>Offline</AnimatedBadge>
                            </View>
                        </View>

                        {/* Removable */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Removable</Text>
                            <View style={styles.row}>
                                <AnimatedBadge
                                    variant="primary"
                                    removable
                                    onRemove={() => console.log("Badge removed")}
                                >
                                    React Native
                                </AnimatedBadge>
                                <AnimatedBadge
                                    variant="secondary"
                                    removable
                                    leftIcon="tag"
                                    onRemove={() => console.log("Tag removed")}
                                >
                                    TypeScript
                                </AnimatedBadge>
                            </View>
                        </View>

                        {/* Clickable */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Clickable</Text>
                            <View style={styles.row}>
                                <AnimatedBadge
                                    variant="primary"
                                    clickable
                                    onPress={() => console.log("Badge clicked")}
                                >
                                    Click me
                                </AnimatedBadge>
                                <AnimatedBadge
                                    variant="outline"
                                    clickable
                                    rightIcon="arrow-right"
                                    onPress={() => console.log("Navigate clicked")}
                                >
                                    Navigate
                                </AnimatedBadge>
                            </View>
                        </View>

                        {/* Animations */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Animations</Text>
                            <View style={styles.column}>
                                <View style={styles.row}>
                                    <AnimatedBadge
                                        variant="primary"
                                        animation="pulse"
                                        repeatAnimation
                                    >
                                        Pulse
                                    </AnimatedBadge>
                                    <AnimatedBadge
                                        variant="success"
                                        animation="bounce"
                                        repeatAnimation
                                    >
                                        Bounce
                                    </AnimatedBadge>
                                    <AnimatedBadge
                                        variant="warning"
                                        animation="shake"
                                        repeatAnimation
                                    >
                                        Shake
                                    </AnimatedBadge>
                                </View>
                                <View style={styles.row}>
                                    <AnimatedBadge
                                        variant="info"
                                        animation="glow"
                                        repeatAnimation
                                    >
                                        Glow
                                    </AnimatedBadge>
                                    <AnimatedBadge
                                        variant="error"
                                        animation="heartbeat"
                                        repeatAnimation
                                    >
                                        Heartbeat
                                    </AnimatedBadge>
                                    <AnimatedBadge
                                        variant="secondary"
                                        animation="wiggle"
                                        repeatAnimation
                                    >
                                        Wiggle
                                    </AnimatedBadge>
                                </View>
                            </View>
                        </View>

                        {/* Rounded & Custom Styling */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Custom Styling</Text>
                            <View style={styles.column}>
                                <View style={styles.row}>
                                    <AnimatedBadge variant="primary" rounded>
                                        Rounded
                                    </AnimatedBadge>
                                    <AnimatedBadge
                                        variant="success"
                                        shadow
                                        animation="scale"
                                        repeatAnimation
                                    >
                                        With Shadow
                                    </AnimatedBadge>
                                </View>
                                {/* <View style={styles.row}>
                                    <AnimatedBadge
                                        variant="primary"
                                        theme={customTheme}
                                        borderRadius={20}
                                    >
                                        Custom Theme
                                    </AnimatedBadge>
                                </View> */}
                            </View>
                        </View>

                        {/* Notification Badges */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Notification Style</Text>
                            <View style={styles.row}>
                                <View style={styles.notificationContainer}>
                                    <Text style={styles.notificationText}>Messages</Text>
                                    <AnimatedBadge
                                        variant="error"
                                        size="xs"
                                        rounded
                                        animation="pulse"
                                        repeatAnimation
                                        style={styles.notificationBadge}
                                    >
                                        3
                                    </AnimatedBadge>
                                </View>
                                <View style={styles.notificationContainer}>
                                    <Text style={styles.notificationText}>Notifications</Text>
                                    <AnimatedBadge
                                        variant="primary"
                                        size="xs"
                                        rounded
                                        animation="bounce"
                                        repeatAnimation
                                        style={styles.notificationBadge}
                                    >
                                        12
                                    </AnimatedBadge>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ComponentPage>
    )
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#374151",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 8,
    },
    column: {
        gap: 8,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
        position: 'relative',
    },
    notificationText: {
        fontSize: 14,
        color: '#374151',
        marginRight: 8,
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
})