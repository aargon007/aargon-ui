import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
    // common styles for component screen
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    contentContainer: {
        padding: width < 768 ? 16 : 64,
        paddingBottom: 40,
    },
    demoSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        textAlign: "center",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4B5563',
        textAlign: "center",
        marginBottom: 24,
    },
    previewContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    
});
