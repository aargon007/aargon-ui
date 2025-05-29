"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { MotiView } from "moti"
import { Feather } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Alert, AlertDialog, Toast, AlertProvider, useToast, useAlertDialog } from "@/components/ui/alert"

const AlertDemoContent = () => {
    const inset = useSafeAreaInsets()
    const [activeTab, setActiveTab] = useState("basic")

    // Alert dialog state
    const [alertVisible, setAlertVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)

    // Toast state
    const [toastVisible, setToastVisible] = useState(false)
    const [toastPosition, setToastPosition] = useState<"top" | "bottom">("bottom")

    // Hooks for programmatic alerts
    const toast = useToast()
    const alertDialog = useAlertDialog()

    return (
        <ScrollView style={[styles.container, { paddingTop: inset.top }]} contentContainerStyle={styles.contentContainer}>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 18 }}
            >
                <Text style={styles.title}>Alert Components</Text>
                <Text style={styles.description}>
                    Explore different alert components for notifications, confirmations, and feedback.
                </Text>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <Pressable
                        style={[styles.tab, activeTab === "basic" && styles.activeTab]}
                        onPress={() => setActiveTab("basic")}
                    >
                        <Text style={[styles.tabText, activeTab === "basic" && styles.activeTabText]}>Basic Alerts</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, activeTab === "dialogs" && styles.activeTab]}
                        onPress={() => setActiveTab("dialogs")}
                    >
                        <Text style={[styles.tabText, activeTab === "dialogs" && styles.activeTabText]}>Alert Dialogs</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, activeTab === "toasts" && styles.activeTab]}
                        onPress={() => setActiveTab("toasts")}
                    >
                        <Text style={[styles.tabText, activeTab === "toasts" && styles.activeTabText]}>Toasts</Text>
                    </Pressable>
                </View>

                {/* Basic Alerts */}
                {activeTab === "basic" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Basic Alert Variants</Text>
                            <Text style={styles.sectionDescription}>Different alert styles for various types of messages.</Text>

                            <View style={styles.demoContainer}>
                                <Alert
                                    variant="default"
                                    title="Default Alert"
                                    description="This is a default alert with neutral styling."
                                    dismissible
                                    onDismiss={() => console.log("Default alert dismissed")}
                                />

                                <Alert
                                    variant="success"
                                    title="Success Alert"
                                    description="Operation completed successfully."
                                    dismissible
                                    onDismiss={() => console.log("Success alert dismissed")}
                                />

                                <Alert
                                    variant="warning"
                                    title="Warning Alert"
                                    description="This action might have consequences."
                                    dismissible
                                    onDismiss={() => console.log("Warning alert dismissed")}
                                />

                                <Alert
                                    variant="error"
                                    title="Error Alert"
                                    description="Something went wrong. Please try again."
                                    dismissible
                                    onDismiss={() => console.log("Error alert dismissed")}
                                />

                                <Alert
                                    variant="info"
                                    title="Info Alert"
                                    description="Here's some information you might find useful."
                                    dismissible
                                    onDismiss={() => console.log("Info alert dismissed")}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Alert Customization</Text>
                            <Text style={styles.sectionDescription}>Alerts can be customized with different options.</Text>

                            <View style={styles.demoContainer}>
                                <Alert
                                    variant="info"
                                    title="Alert without icon"
                                    description="This alert doesn't display an icon."
                                    showIcon={false}
                                    dismissible
                                    onDismiss={() => console.log("Alert dismissed")}
                                />

                                <Alert
                                    variant="success"
                                    title="Custom icon alert"
                                    description="This alert uses a custom icon."
                                    icon={<Feather name="thumbs-up" size={18} color="#059669" />}
                                    dismissible
                                    onDismiss={() => console.log("Alert dismissed")}
                                />

                                <Alert
                                    variant="warning"
                                    description="This alert has no title, only a description."
                                    dismissible
                                    onDismiss={() => console.log("Alert dismissed")}
                                />

                                <Alert
                                    variant="error"
                                    title="Alert with custom content"
                                    dismissible
                                    onDismiss={() => console.log("Alert dismissed")}
                                >
                                    <View style={styles.customAlertContent}>
                                        <Text style={styles.customAlertText}>
                                            This alert contains custom content instead of a simple description.
                                        </Text>
                                        <Pressable style={styles.customAlertButton}>
                                            <Text style={styles.customAlertButtonText}>Take Action</Text>
                                        </Pressable>
                                    </View>
                                </Alert>
                            </View>
                        </View>
                    </MotiView>
                )}

                {/* Alert Dialogs */}
                {activeTab === "dialogs" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Alert Dialogs</Text>
                            <Text style={styles.sectionDescription}>
                                Modal dialogs for important messages that require attention or action.
                            </Text>

                            <View style={styles.demoContainer}>
                                <View style={styles.buttonGroup}>
                                    <Pressable style={styles.button} onPress={() => setAlertVisible(true)}>
                                        <Text style={styles.buttonText}>Show Basic Dialog</Text>
                                    </Pressable>

                                    <Pressable style={[styles.button, styles.warningButton]} onPress={() => setConfirmVisible(true)}>
                                        <Text style={styles.buttonText}>Show Confirmation Dialog</Text>
                                    </Pressable>
                                </View>

                                <View style={styles.buttonGroup}>
                                    <Pressable
                                        style={[styles.button, styles.successButton]}
                                        onPress={() =>
                                            alertDialog.success("Success", {
                                                description: "Operation completed successfully.",
                                                actions: [
                                                    {
                                                        label: "OK",
                                                        primary: true,
                                                        onPress: () => console.log("OK pressed"),
                                                    },
                                                ],
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Success Dialog</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.errorButton]}
                                        onPress={() =>
                                            alertDialog.error("Error", {
                                                description: "Something went wrong. Please try again.",
                                                actions: [
                                                    {
                                                        label: "Retry",
                                                        primary: true,
                                                        onPress: () => console.log("Retry pressed"),
                                                    },
                                                ],
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Error Dialog</Text>
                                    </Pressable>
                                </View>

                                <Pressable
                                    style={[styles.button, styles.infoButton, styles.fullWidthButton]}
                                    onPress={() =>
                                        alertDialog.confirm("Confirm Action", {
                                            description: "Are you sure you want to proceed with this action?",
                                            actions: [
                                                {
                                                    label: "Yes, proceed",
                                                    onPress: () => console.log("Confirmed"),
                                                },
                                            ],
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Show Confirm Dialog (Hook)</Text>
                                </Pressable>
                            </View>
                        </View>
                    </MotiView>
                )}

                {/* Toasts */}
                {activeTab === "toasts" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "timing", duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Toast Notifications</Text>
                            <Text style={styles.sectionDescription}>
                                Temporary notifications that appear and disappear automatically.
                            </Text>

                            <View style={styles.demoContainer}>
                                <View style={styles.positionSelector}>
                                    <Text style={styles.positionSelectorLabel}>Position:</Text>
                                    <Pressable
                                        style={[styles.positionButton, toastPosition === "top" && styles.positionButtonActive]}
                                        onPress={() => setToastPosition("top")}
                                    >
                                        <Text
                                            style={[styles.positionButtonText, toastPosition === "top" && styles.positionButtonTextActive]}
                                        >
                                            Top
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.positionButton, toastPosition === "bottom" && styles.positionButtonActive]}
                                        onPress={() => setToastPosition("bottom")}
                                    >
                                        <Text
                                            style={[styles.positionButtonText, toastPosition === "bottom" && styles.positionButtonTextActive]}
                                        >
                                            Bottom
                                        </Text>
                                    </Pressable>
                                </View>

                                <Pressable style={styles.button} onPress={() => setToastVisible(true)}>
                                    <Text style={styles.buttonText}>Show Basic Toast</Text>
                                </Pressable>

                                <View style={styles.buttonGroup}>
                                    <Pressable
                                        style={[styles.button, styles.successButton]}
                                        onPress={() =>
                                            toast.success("Operation completed successfully!", {
                                                position: toastPosition,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Success Toast</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.errorButton]}
                                        onPress={() =>
                                            toast.error("Something went wrong!", {
                                                position: toastPosition,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Error Toast</Text>
                                    </Pressable>
                                </View>

                                <View style={styles.buttonGroup}>
                                    <Pressable
                                        style={[styles.button, styles.warningButton]}
                                        onPress={() =>
                                            toast.warning("Be careful with this action.", {
                                                position: toastPosition,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Warning Toast</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.infoButton]}
                                        onPress={() =>
                                            toast.info("Here is some information.", {
                                                position: toastPosition,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Info Toast</Text>
                                    </Pressable>
                                </View>

                                <Pressable
                                    style={[styles.button, styles.fullWidthButton]}
                                    onPress={() =>
                                        toast.show({
                                            message: "Custom toast with action",
                                            position: toastPosition,
                                            variant: "info",
                                            duration: 5000,
                                            action: {
                                                label: "Undo",
                                                onPress: () => console.log("Undo pressed"),
                                            },
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Toast with Action</Text>
                                </Pressable>
                            </View>
                        </View>
                    </MotiView>
                )}
            </MotiView>

            {/* Alert Dialog Examples */}
            <AlertDialog
                visible={alertVisible}
                title="Information"
                description="This is a basic alert dialog with a simple message."
                onDismiss={() => setAlertVisible(false)}
                actions={[
                    {
                        label: "OK",
                        primary: true,
                        onPress: () => console.log("OK pressed"),
                    },
                ]}
            />

            <AlertDialog
                visible={confirmVisible}
                title="Confirm Deletion"
                description="Are you sure you want to delete this item? This action cannot be undone."
                variant="warning"
                onDismiss={() => setConfirmVisible(false)}
                actions={[
                    {
                        label: "Cancel",
                        variant: "outline",
                        onPress: () => setConfirmVisible(false),
                    },
                    {
                        label: "Delete",
                        variant: "destructive",
                        onPress: () => {
                            console.log("Delete confirmed")
                            setConfirmVisible(false)
                        },
                    },
                ]}
            />

            {/* Toast Example */}
            <Toast
                visible={toastVisible}
                message="This is a basic toast notification."
                position={toastPosition}
                onDismiss={() => setToastVisible(false)}
            />
        </ScrollView>
    )
}

export default function AlertDemoPage() {
    return (
        <AlertProvider>
            <AlertDemoContent />
        </AlertProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#4B5563",
        marginBottom: 24,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
    },
    activeTabText: {
        color: "#111827",
        fontWeight: "600",
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: "#6B7280",
        marginBottom: 16,
    },
    demoContainer: {
        marginTop: 8,
    },
    customAlertContent: {
        marginTop: 8,
    },
    customAlertText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#B91C1C",
        marginBottom: 12,
    },
    customAlertButton: {
        backgroundColor: "#FEE2E2",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    customAlertButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#B91C1C",
    },
    buttonGroup: {
        flexDirection: "row",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#6366F1",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginRight: 8,
        marginBottom: 8,
    },
    successButton: {
        backgroundColor: "#10B981",
    },
    warningButton: {
        backgroundColor: "#F59E0B",
    },
    errorButton: {
        backgroundColor: "#EF4444",
    },
    infoButton: {
        backgroundColor: "#3B82F6",
    },
    fullWidthButton: {
        marginRight: 0,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    positionSelector: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    positionSelectorLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
        marginRight: 12,
    },
    positionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: "#F3F4F6",
        marginRight: 8,
    },
    positionButtonActive: {
        backgroundColor: "#6366F1",
    },
    positionButtonText: {
        fontSize: 14,
        color: "#6B7280",
    },
    positionButtonTextActive: {
        color: "#FFFFFF",
        fontWeight: "500",
    },
})

