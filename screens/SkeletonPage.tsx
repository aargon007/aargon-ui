import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedSkeleton, {
    SkeletonRect,
    SkeletonCircle,
    type SkeletonAnimation,
    type SkeletonSpeed
} from '@/component/ui/skeleton/AnimatedSkeleton';
import ComponentPage from '@/component/common/ComponentPage';
import { globalStyles } from '@/styles/globalStyles';

const SkeletonPage = () => {
    // Animation types for demo
    const animationTypes: SkeletonAnimation[] = [
        'shimmer',
        'pulse',
        'wave',
        'blink',
        'spotlight',
        'gradient',
        'fade',
        'none'
    ];

    // Speed options for demo
    const speedOptions: SkeletonSpeed[] = ['slow', 'medium', 'fast'];

    // State for selected animation
    const [selectedAnimation, setSelectedAnimation] = useState<SkeletonAnimation>('shimmer');
    const [selectedSpeed, setSelectedSpeed] = useState<SkeletonSpeed>('medium');

    return (
        <ComponentPage>
            {/* UI Demo */}
            <View style={globalStyles.demoSection}>
                <Text style={globalStyles.title}>
                    Animated Skeleton Component
                </Text>
                <Text style={globalStyles.description}>
                    A performant and customizable skeleton component built with Reanimated for React Native.
                </Text>
            </View>

            <View style={globalStyles.previewContainer}>
                {/* Animation Type Selector */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Animation Types
                    </Text>
                    <View style={styles.animationSelector}>
                        {animationTypes.map((animType) => (
                            <TouchableOpacity
                                key={animType}
                                style={[
                                    styles.animationButton,
                                    selectedAnimation === animType && styles.selectedButton
                                ]}
                                onPress={() => setSelectedAnimation(animType)}
                            >
                                <Text
                                    style={[
                                        styles.animationButtonText,
                                        selectedAnimation === animType && styles.selectedButtonText
                                    ]}
                                >
                                    {animType}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Animation Speed Selector */}
                    <Text style={styles.subsectionTitle}>
                        Animation Speed
                    </Text>
                    <View style={styles.speedSelector}>
                        {speedOptions.map((speedOpt) => (
                            <TouchableOpacity
                                key={speedOpt}
                                style={[
                                    styles.speedButton,
                                    selectedSpeed === speedOpt && styles.selectedButton
                                ]}
                                onPress={() => setSelectedSpeed(speedOpt)}
                            >
                                <Text
                                    style={[
                                        styles.speedButtonText,
                                        selectedSpeed === speedOpt && styles.selectedButtonText
                                    ]}
                                >
                                    {speedOpt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Basic Shapes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Basic Shapes
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <SkeletonRect
                                width={120}
                                height={20}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>
                                Rectangle
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <SkeletonCircle
                                size="medium"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>
                                Circle
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <SkeletonRect
                                width={120}
                                height={20}
                                borderRadius={20}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>
                                Rounded
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Predefined Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Predefined Sizes
                    </Text>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <SkeletonRect
                                size="small"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.labelSmall}>Small</Text>
                        </View>
                        <View style={styles.row}>
                            <SkeletonRect
                                size="medium"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.labelSmall}>Medium</Text>
                        </View>
                        <View style={styles.row}>
                            <SkeletonRect
                                size="large"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.labelSmall}>Large</Text>
                        </View>
                        <View style={styles.row}>
                            <SkeletonRect
                                size="xlarge"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.labelSmall}>XLarge</Text>
                        </View>
                    </View>
                </View>

                {/* Custom Colors */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Colors</Text>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <SkeletonRect
                                width={100}
                                height={20}
                                color="#DBEAFE"
                                highlightColor="#93C5FD"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>Blue</Text>
                        </View>
                        <View style={styles.item}>
                            <SkeletonRect
                                width={100}
                                height={20}
                                color="#D1FAE5"
                                highlightColor="#6EE7B7"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>Green</Text>
                        </View>
                        <View style={styles.item}>
                            <SkeletonRect
                                width={100}
                                height={20}
                                color="#FEE2E2"
                                highlightColor="#FECACA"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <Text style={styles.label}>Red</Text>
                        </View>
                    </View>
                </View>

                {/* Complex Layouts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Complex Layouts</Text>

                    {/* Profile Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Profile Card</Text>
                        <View style={styles.profileCard}>
                            <SkeletonCircle
                                size="large"
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <View style={styles.profileInfo}>
                                <SkeletonRect
                                    width={150}
                                    height={20}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width={200}
                                    height={15}
                                    style={styles.smallGap}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width={100}
                                    height={15}
                                    style={styles.smallGap}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                            </View>
                        </View>
                    </View>

                    {/* List Item */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>List Items</Text>
                        {[1, 2, 3].map((item) => (
                            <View key={item} style={styles.listItem}>
                                <SkeletonCircle
                                    size="small"
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <View style={styles.listItemContent}>
                                    <SkeletonRect
                                        width="80%"
                                        height={16}
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                    <SkeletonRect
                                        width="60%"
                                        height={12}
                                        style={styles.smallGap}
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Content Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Content Card</Text>
                        <View style={styles.contentCard}>
                            <SkeletonRect
                                width="100%"
                                height={150}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <View style={styles.contentCardBody}>
                                <SkeletonRect
                                    width="90%"
                                    height={20}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width="100%"
                                    height={15}
                                    style={styles.smallGap}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width="100%"
                                    height={15}
                                    style={styles.smallGap}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width="80%"
                                    height={15}
                                    style={styles.smallGap}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <View style={styles.footer}>
                                    <SkeletonCircle
                                        size="small"
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                    <SkeletonRect
                                        width={100}
                                        height={15}
                                        style={styles.footerText}
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Social Media Post */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Social Media Post</Text>
                        <View style={styles.socialPost}>
                            <View style={styles.postHeader}>
                                <SkeletonCircle
                                    size="small"
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <View style={styles.postHeaderInfo}>
                                    <SkeletonRect
                                        width={100}
                                        height={14}
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                    <SkeletonRect
                                        width={80}
                                        height={10}
                                        style={styles.tinyGap}
                                        animation={selectedAnimation}
                                        speed={selectedSpeed}
                                    />
                                </View>
                            </View>
                            <SkeletonRect
                                width="100%"
                                height={200}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.smallGap}
                            />
                            <View style={styles.postActions}>
                                <SkeletonRect
                                    width={70}
                                    height={20}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width={70}
                                    height={20}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width={70}
                                    height={20}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                            </View>
                            <View style={styles.postComments}>
                                <SkeletonRect
                                    width="100%"
                                    height={12}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width="90%"
                                    height={12}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                    style={styles.tinyGap}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Article Preview */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Article Preview</Text>
                        <View style={styles.article}>
                            <SkeletonRect
                                width="100%"
                                height={30}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                            />
                            <View style={styles.articleMeta}>
                                <SkeletonCircle
                                    size="small"
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                />
                                <SkeletonRect
                                    width={100}
                                    height={12}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                    style={styles.metaText}
                                />
                                <SkeletonRect
                                    width={80}
                                    height={12}
                                    animation={selectedAnimation}
                                    speed={selectedSpeed}
                                    style={styles.metaText}
                                />
                            </View>
                            <SkeletonRect
                                width="100%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.tinyGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.tinyGap}
                            />
                            <SkeletonRect
                                width="90%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.tinyGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={150}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.smallGap}
                            />
                            <SkeletonRect
                                width="100%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.tinyGap}
                            />
                            <SkeletonRect
                                width="80%"
                                height={12}
                                animation={selectedAnimation}
                                speed={selectedSpeed}
                                style={styles.tinyGap}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ComponentPage>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#374151',
    },
    subsectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 12,
        color: '#4B5563',
    },
    animationSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    animationButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#F3F4F6',
        marginBottom: 8,
    },
    selectedButton: {
        backgroundColor: '#6366F1',
    },
    animationButtonText: {
        fontSize: 14,
        color: '#4B5563',
    },
    selectedButtonText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    speedSelector: {
        flexDirection: 'row',
        gap: 8,
    },
    speedButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#F3F4F6',
    },
    speedButtonText: {
        fontSize: 14,
        color: '#4B5563',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    column: {
        gap: 16,
    },
    item: {
        alignItems: 'center',
        minWidth: 100,
    },
    label: {
        marginTop: 8,
        fontSize: 14,
        color: '#6B7280',
    },
    labelSmall: {
        marginLeft: 12,
        fontSize: 14,
        color: '#6B7280',
    },
    card: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
        color: '#4B5563',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    profileInfo: {
        marginLeft: 16,
        gap: 8,
    },
    smallGap: {
        marginTop: 8,
    },
    tinyGap: {
        marginTop: 4,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    listItemContent: {
        marginLeft: 12,
        gap: 6,
        flex: 1,
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    contentCardBody: {
        padding: 16,
        gap: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        marginLeft: 8,
    },
    socialPost: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postHeaderInfo: {
        marginLeft: 8,
        gap: 4,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
    },
    postComments: {
        marginTop: 12,
        gap: 4,
    },
    article: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    articleMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    metaText: {
        marginLeft: 8,
    },
});

export default SkeletonPage;