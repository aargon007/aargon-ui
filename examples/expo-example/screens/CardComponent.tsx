import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Switch,
    Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnimatedCard } from '@aargon-ui/card';
import type { CardAnimationType, CardColorScheme, CardSize, CardVariant } from '@aargon-ui/card';

const CardPage = () => {
    // State for interactive examples
    const [selectedVariant, setSelectedVariant] = useState<CardVariant>('default');
    const [selectedSize, setSelectedSize] = useState<CardSize>('md');
    const [selectedColorScheme, setSelectedColorScheme] = useState<CardColorScheme>('default');
    const [selectedAnimation, setSelectedAnimation] = useState<CardAnimationType>('scale');
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showDivider, setShowDivider] = useState(false);
    const [counter, setCounter] = useState(0);

    // Available options
    const variants: CardVariant[] = ['default', 'elevated', 'outlined', 'filled'];
    const sizes: CardSize[] = ['sm', 'md', 'lg', 'xl'];
    const colorSchemes: CardColorScheme[] = ['default', 'primary', 'secondary', 'success', 'error'];
    const animations: CardAnimationType[] = ['none', 'scale', 'lift', 'bounce'];

    // Option selector component
    const OptionSelector = <T extends string>({
        title,
        options,
        selected,
        onSelect,
    }: {
        title: string;
        options: T[];
        selected: T;
        onSelect: (option: T) => void;
    }) => (
        <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                <View style={styles.optionsRow}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.optionButton,
                                selected === option && styles.optionButtonSelected,
                            ]}
                            onPress={() => onSelect(option)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selected === option && styles.optionTextSelected,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    // Toggle option component
    const ToggleOption = ({
        title,
        value,
        onValueChange,
    }: {
        title: string;
        value: boolean;
        onValueChange: (value: boolean) => void;
    }) => (
        <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>{title}</Text>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Animated Card Component</Text>
            <Text style={styles.subtitle}>
                A flexible and customizable card component with smooth animations
            </Text>

            {/* Interactive Card Example */}
            <View style={[styles.demoContainer, isFullWidth && styles.fullWidthContainer]}>
                <AnimatedCard
                    title="Interactive Card"
                    subtitle="Customize this card using the options below"
                    variant={selectedVariant}
                    size={selectedSize}
                    colorScheme={selectedColorScheme}
                    animationType={selectedAnimation}
                    disabled={isDisabled}
                    fullWidth={isFullWidth}
                    showDivider={showDivider}
                    onPress={() => setCounter(counter + 1)}
                    footer={
                        <View style={styles.footerContent}>
                            <Text>Pressed {counter} times</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Action</Text>
                            </TouchableOpacity>
                        </View>
                    }
                >
                    <Text style={styles.cardContent}>
                        This is an interactive card example. You can customize its appearance and behavior
                        using the controls below. Try pressing the card to increase the counter!
                    </Text>
                </AnimatedCard>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                <Text style={styles.sectionTitle}>Customize Card</Text>

                <OptionSelector
                    title="Variant"
                    options={variants}
                    selected={selectedVariant}
                    onSelect={setSelectedVariant}
                />

                <OptionSelector
                    title="Size"
                    options={sizes}
                    selected={selectedSize}
                    onSelect={setSelectedSize}
                />

                <OptionSelector
                    title="Color Scheme"
                    options={colorSchemes}
                    selected={selectedColorScheme}
                    onSelect={setSelectedColorScheme}
                />

                <OptionSelector
                    title="Animation"
                    options={animations}
                    selected={selectedAnimation}
                    onSelect={setSelectedAnimation}
                />

                <View style={styles.togglesContainer}>
                    <ToggleOption
                        title="Full Width"
                        value={isFullWidth}
                        onValueChange={setIsFullWidth}
                    />
                    <ToggleOption
                        title="Disabled"
                        value={isDisabled}
                        onValueChange={setIsDisabled}
                    />
                    <ToggleOption
                        title="Show Divider"
                        value={showDivider}
                        onValueChange={setShowDivider}
                    />
                </View>
            </View>

            {/* Card Examples */}
            <Text style={styles.sectionTitle}>Card Examples</Text>

            {/* Basic Card */}
            <AnimatedCard
                title="Basic Card"
                subtitle="Simple card with title and subtitle"
            >
                <Text style={styles.cardContent}>
                    This is a basic card with a title and subtitle. It uses the default variant and size.
                </Text>
            </AnimatedCard>

            {/* Elevated Card */}
            <AnimatedCard
                title="Elevated Card"
                subtitle="Card with shadow elevation"
                variant="elevated"
                colorScheme="primary"
            >
                <Text style={styles.cardContent}>
                    This card uses the elevated variant with a primary color scheme.
                    Notice the shadow effect that gives it depth.
                </Text>
            </AnimatedCard>

            {/* Outlined Card */}
            <AnimatedCard
                title="Outlined Card"
                subtitle="Card with border outline"
                variant="outlined"
                colorScheme="secondary"
                animationType="lift"
            >
                <Text style={styles.cardContent}>
                    This card uses the outlined variant with a secondary color scheme.
                    It has a lift animation when pressed.
                </Text>
            </AnimatedCard>

            {/* Filled Card */}
            <AnimatedCard
                title="Filled Card"
                subtitle="Card with background fill"
                variant="filled"
                colorScheme="success"
                animationType="bounce"
            >
                <Text style={styles.cardContent}>
                    This card uses the filled variant with a success color scheme.
                    It has a bounce animation when pressed.
                </Text>
            </AnimatedCard>

            {/* Glass Card */}
            <AnimatedCard
                title="Glass Card"
                subtitle="Card with elevated effect"
                variant="elevated"
                colorScheme="error"
                animationType="scale"
            >
                <Text style={styles.cardContent}>
                    This card uses the elevated variant with an error color scheme.
                    It has a scale animation when pressed.
                    {Platform.OS === 'ios' ? ' The backdrop blur works best on iOS.' : ''}
                </Text>
            </AnimatedCard>

            {/* Gradient Card */}
            <AnimatedCard
                title="Gradient Card"
                subtitle="Card with filled background"
                variant="filled"
                colorScheme="primary"
                animationType="lift"
            >
                <Text style={[styles.cardContent, { color: 'white' }]}>
                    This card uses the filled variant with a primary color scheme.
                    It has a lift animation when pressed.
                </Text>
            </AnimatedCard>

            {/* Card with Image */}
            <AnimatedCard
                variant="elevated"
                animationType="scale"
            >
                <Image
                    source={{ uri: 'https://picsum.photos/400/200' }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View style={styles.imageCardContent}>
                    <Text style={styles.imageCardTitle}>Card with Image</Text>
                    <Text style={styles.imageCardSubtitle}>
                        This card contains an image with custom content layout
                    </Text>
                </View>
            </AnimatedCard>

            {/* Card with Icons */}
            <AnimatedCard
                variant="outlined"
                animationType="bounce"
                showDivider
            >
                <View style={styles.iconCardHeader}>
                    <Feather name="star" size={24} color="#F59E0B" />
                    <Text style={styles.iconCardTitle}>Featured Content</Text>
                </View>
                <Text style={styles.cardContent}>
                    This card uses custom icons and layout. It also has a divider between sections.
                </Text>
                <View style={styles.iconCardFooter}>
                    <View style={styles.iconRow}>
                        <Feather name="heart" size={16} color="#EF4444" />
                        <Text style={styles.iconText}>24 likes</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Feather name="message-circle" size={16} color="#3B82F6" />
                        <Text style={styles.iconText}>8 comments</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Feather name="share-2" size={16} color="#10B981" />
                        <Text style={styles.iconText}>Share</Text>
                    </View>
                </View>
            </AnimatedCard>

            {/* Profile Card */}
            <AnimatedCard
                variant="elevated"
                animationType="lift"
                size="lg"
            >
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Sarah Johnson</Text>
                        <Text style={styles.profileRole}>Product Designer</Text>
                        <View style={styles.profileStats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>142</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>2.8k</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>284</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.profileButtons}>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.profileButtonText}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.profileButton, styles.messageButton]}>
                        <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </AnimatedCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 24,
    },
    demoContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    fullWidthContainer: {
        width: '100%',
    },
    optionsContainer: {
        marginBottom: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1E293B',
    },
    optionContainer: {
        marginBottom: 16,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#334155',
    },
    optionsScroll: {
        flexGrow: 0,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
        marginRight: 8,
    },
    optionButtonSelected: {
        backgroundColor: '#3B82F6',
    },
    optionText: {
        color: '#64748B',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: 'white',
    },
    togglesContainer: {
        marginTop: 8,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    toggleText: {
        fontSize: 16,
        color: '#334155',
    },
    cardContent: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    imageCardContent: {
        padding: 16,
    },
    imageCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#1E293B',
    },
    imageCardSubtitle: {
        fontSize: 14,
        color: '#64748B',
    },
    iconCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
        color: '#1E293B',
    },
    iconCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 4,
        color: '#64748B',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
    },
    profileRole: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 12,
    },
    profileStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
    },
    profileButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    profileButton: {
        flex: 1,
        backgroundColor: '#3B82F6',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
    },
    profileButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    messageButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3B82F6',
        marginRight: 0,
        marginLeft: 8,
    },
    messageButtonText: {
        color: '#3B82F6',
    },
});

export default CardPage;