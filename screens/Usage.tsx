import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView, AnimatePresence } from '@alloc/moti';
import { Feather } from '@expo/vector-icons';

const Usage = () => {
    const inset = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('basic');
    const [showCard, setShowCard] = useState(true);
    const [expandedExample, setExpandedExample] = useState('fadeIn');

    // Toggle animation for demo
    const toggleCard = () => {
        setShowCard(!showCard);
    };

    return (
        <ScrollView style={[styles.contentScroll, { paddingTop: inset.top }]} contentContainerStyle={styles.contentContainer}>
            <MotiView
                from={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 18 }}>
                <Text style={styles.contentTitle}>Usage</Text>
                <Text style={styles.contentText}>
                    Learn how to use our UI library components to create beautiful, animated interfaces in your React Native applications.
                </Text>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <Pressable style={[styles.tab, activeTab === 'basic' && styles.activeTab]} onPress={() => setActiveTab('basic')}>
                        <Text style={[styles.tabText, activeTab === 'basic' && styles.activeTabText]}>Basic Usage</Text>
                    </Pressable>
                    <Pressable style={[styles.tab, activeTab === 'advanced' && styles.activeTab]} onPress={() => setActiveTab('advanced')}>
                        <Text style={[styles.tabText, activeTab === 'advanced' && styles.activeTabText]}>Advanced</Text>
                    </Pressable>
                    <Pressable style={[styles.tab, activeTab === 'patterns' && styles.activeTab]} onPress={() => setActiveTab('patterns')}>
                        <Text style={[styles.tabText, activeTab === 'patterns' && styles.activeTabText]}>Patterns</Text>
                    </Pressable>
                </View>

                {/* Basic Usage Tab Content */}
                {activeTab === 'basic' && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Getting Started</Text>
                            <Text style={styles.contentText}>
                                After installing the required dependencies, you can import and use our components in your React Native
                                application. Here are some basic examples to get you started:
                            </Text>

                            {/* Example 1: Fade In */}
                            <Pressable
                                style={[styles.exampleCard, expandedExample === 'fadeIn' && styles.expandedCard]}
                                onPress={() => setExpandedExample(expandedExample === 'fadeIn' ? '' : 'fadeIn')}>
                                <View style={styles.exampleHeader}>
                                    <View style={styles.exampleIconContainer}>
                                        <Feather name="eye" size={18} color="#6366F1" />
                                    </View>
                                    <Text style={styles.exampleTitle}>Fade In Animation</Text>
                                    <Feather
                                        name={expandedExample === 'fadeIn' ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#6B7280"
                                    />
                                </View>

                                {expandedExample === 'fadeIn' && (
                                    <MotiView
                                        from={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ type: 'timing', duration: 300 }}>
                                        <View style={styles.exampleContent}>
                                            <Text style={styles.exampleDescription}>
                                                The FadeIn component makes elements appear with a smooth fade-in animation. It's perfect for
                                                revealing content as users scroll or when a screen loads.
                                            </Text>

                                            <View style={styles.codeBlock}>
                                                <Text style={styles.codeText}>
                                                    {`import React from 'react';
import { View, Text } from 'react-native';
import { FadeIn } from '@your-org/motion-ui';

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FadeIn 
        delay={300}      // Wait 300ms before starting
        duration={800}   // Animation lasts 800ms
        from={0}         // Start fully transparent
        to={1}           // End fully opaque
      >
        <Text style={{ fontSize: 24 }}>
          Welcome to My App
        </Text>
      </FadeIn>
    </View>
  );
}`}
                                                </Text>
                                            </View>

                                            <View style={styles.demoContainer}>
                                                <Text style={styles.demoTitle}>Live Demo:</Text>
                                                <Pressable style={styles.demoButton} onPress={toggleCard}>
                                                    <Text style={styles.demoButtonText}>{showCard ? 'Hide' : 'Show'} Element</Text>
                                                </Pressable>

                                                <View style={styles.demoPreview}>
                                                    <AnimatePresence>
                                                        {showCard && (
                                                            <MotiView
                                                                from={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ type: 'timing', duration: 800 }}
                                                                style={styles.demoCard}>
                                                                <Text style={styles.demoCardText}>Hello, Animation!</Text>
                                                            </MotiView>
                                                        )}
                                                    </AnimatePresence>
                                                </View>
                                            </View>

                                            <View style={styles.propsList}>
                                                <Text style={styles.propsTitle}>Available Props:</Text>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>delay</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>
                                                        Milliseconds to wait before starting the animation
                                                    </Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>duration</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>Duration of the animation in milliseconds</Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>from</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>Starting opacity value (0-1)</Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>to</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>Ending opacity value (0-1)</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </MotiView>
                                )}
                            </Pressable>

                            {/* Example 2: Slide In */}
                            <Pressable
                                style={[styles.exampleCard, expandedExample === 'slideIn' && styles.expandedCard]}
                                onPress={() => setExpandedExample(expandedExample === 'slideIn' ? '' : 'slideIn')}>
                                <View style={styles.exampleHeader}>
                                    <View style={styles.exampleIconContainer}>
                                        <Feather name="arrow-right" size={18} color="#6366F1" />
                                    </View>
                                    <Text style={styles.exampleTitle}>Slide In Animation</Text>
                                    <Feather
                                        name={expandedExample === 'slideIn' ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#6B7280"
                                    />
                                </View>

                                {expandedExample === 'slideIn' && (
                                    <MotiView
                                        from={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ type: 'timing', duration: 300 }}>
                                        <View style={styles.exampleContent}>
                                            <Text style={styles.exampleDescription}>
                                                The SlideIn component makes elements enter the screen from a specified direction. It's great
                                                for sequential animations or revealing new content.
                                            </Text>

                                            <View style={styles.codeBlock}>
                                                <Text style={styles.codeText}>
                                                    {`import React from 'react';
import { View, Text } from 'react-native';
import { SlideIn } from '@your-org/motion-ui';

export default function FeaturesList() {
  return (
    <View style={{ padding: 20 }}>
      <SlideIn 
        from="left"      // Start from left side
        distance={100}   // Slide in from 100px away
        duration={500}   // Animation lasts 500ms
        delay={200}      // Wait 200ms before starting
      >
        <Text style={{ fontSize: 18 }}>
          Feature 1: Amazing UI
        </Text>
      </SlideIn>
      
      <SlideIn 
        from="left"
        distance={100}
        duration={500}
        delay={400}      // Staggered delay
      >
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          Feature 2: Smooth Animations
        </Text>
      </SlideIn>
    </View>
  );
}`}
                                                </Text>
                                            </View>

                                            <View style={styles.propsList}>
                                                <Text style={styles.propsTitle}>Available Props:</Text>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>from</Text>
                                                    <Text style={styles.propType}>string</Text>
                                                    <Text style={styles.propDescription}>
                                                        Direction to slide from ('left', 'right', 'top', 'bottom')
                                                    </Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>distance</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>Distance in pixels to slide from</Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>duration</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>Duration of the animation in milliseconds</Text>
                                                </View>
                                                <View style={styles.propItem}>
                                                    <Text style={styles.propName}>delay</Text>
                                                    <Text style={styles.propType}>number</Text>
                                                    <Text style={styles.propDescription}>
                                                        Milliseconds to wait before starting the animation
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </MotiView>
                                )}
                            </Pressable>

                            {/* Example 3: Scale */}
                            <Pressable
                                style={[styles.exampleCard, expandedExample === 'scale' && styles.expandedCard]}
                                onPress={() => setExpandedExample(expandedExample === 'scale' ? '' : 'scale')}>
                                <View style={styles.exampleHeader}>
                                    <View style={styles.exampleIconContainer}>
                                        <Feather name="maximize" size={18} color="#6366F1" />
                                    </View>
                                    <Text style={styles.exampleTitle}>Scale Animation</Text>
                                    <Feather name={expandedExample === 'scale' ? 'chevron-up' : 'chevron-down'} size={20} color="#6B7280" />
                                </View>

                                {expandedExample === 'scale' && (
                                    <MotiView
                                        from={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ type: 'timing', duration: 300 }}>
                                        <View style={styles.exampleContent}>
                                            <Text style={styles.exampleDescription}>
                                                The Scale component allows elements to grow or shrink with a smooth animation. It's perfect
                                                for buttons, cards, and other interactive elements.
                                            </Text>

                                            <View style={styles.codeBlock}>
                                                <Text style={styles.codeText}>
                                                    {`import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Scale } from '@your-org/motion-ui';

export default function InteractiveButton() {
  const [pressed, setPressed] = useState(false);
  
  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Scale 
        scale={pressed ? 1.1 : 1}    // Scale up when pressed
        duration={300}               // Animation lasts 300ms
      >
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={{
            backgroundColor: '#6366F1',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Press Me
          </Text>
        </Pressable>
      </Scale>
    </View>
  );
}`}
                                                </Text>
                                            </View>

                                            <View style={styles.demoContainer}>
                                                <Text style={styles.demoTitle}>Live Demo:</Text>
                                                <View style={styles.demoPreview}>
                                                    <MotiView
                                                        animate={{ scale: showCard ? 1 : 0.8 }}
                                                        transition={{ type: 'spring', damping: 15 }}>
                                                        <Pressable
                                                            onPressIn={() => setShowCard(true)}
                                                            onPressOut={() => setShowCard(false)}
                                                            style={styles.scaleButton}>
                                                            <Text style={styles.scaleButtonText}>Press and Hold</Text>
                                                        </Pressable>
                                                    </MotiView>
                                                </View>
                                            </View>
                                        </View>
                                    </MotiView>
                                )}
                            </Pressable>
                        </View>

                        <View style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <Feather name="info" size={20} color="#6366F1" />
                                <Text style={styles.tipTitle}>Pro Tip</Text>
                            </View>
                            <Text style={styles.tipText}>
                                You can combine multiple animation components to create complex animations. For example, use FadeIn and
                                SlideIn together to have elements fade in while sliding.
                            </Text>
                        </View>
                    </MotiView>
                )}

                {/* Advanced Usage Tab Content */}
                {activeTab === 'advanced' && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Advanced Animations</Text>
                            <Text style={styles.contentText}>
                                Our library provides advanced animation capabilities for more complex interactions and effects. Here are
                                some advanced examples:
                            </Text>

                            <View style={styles.advancedCard}>
                                <Text style={styles.advancedTitle}>Custom Animation Transitions</Text>
                                <Text style={styles.advancedDescription}>
                                    You can customize the animation physics by specifying different transition types:
                                </Text>

                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`import { MotiView } from '@your-org/motion-ui';

// Spring animation with custom physics
<MotiView
  from={{ opacity: 0, translateY: 50 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{
    type: 'spring',
    damping: 15,     // Lower = more bouncy
    stiffness: 120,  // Higher = faster animation
    mass: 1.2,       // Higher = more inertia
  }}
>
  {/* Your content */}
</MotiView>

// Timing animation with easing
<MotiView
  from={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    type: 'timing',
    duration: 800,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  }}
>
  {/* Your content */}
</MotiView>`}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.advancedCard}>
                                <Text style={styles.advancedTitle}>Gesture-Based Animations</Text>
                                <Text style={styles.advancedDescription}>
                                    Combine our animations with React Native Gesture Handler for interactive animations:
                                </Text>

                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`import { MotiView } from '@your-org/motion-ui';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';

export default function DraggableCard() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX: x },
              { translateY: y },
            ],
          },
        ]}
      >
        <Text>Drag me!</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}`}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.advancedCard}>
                                <Text style={styles.advancedTitle}>Animated Lists</Text>
                                <Text style={styles.advancedDescription}>Create staggered animations for list items:</Text>

                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { MotiView } from '@your-org/motion-ui';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  // ...more items
];

export default function AnimatedList() {
  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 100, // Staggered delay
      }}
      style={styles.item}
    >
      <Text>{item.title}</Text>
    </MotiView>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </MotiView>
                )}

                {/* Patterns Tab Content */}
                {activeTab === 'patterns' && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Common Animation Patterns
                            </Text>
                            <Text style={styles.contentText}>
                                Here are some common animation patterns and how to implement them with our library:
                            </Text>

                            <View style={styles.patternCard}>
                                <View style={styles.patternHeader}>
                                    <Text style={styles.patternTitle}>
                                        Pull to Refresh
                                    </Text>
                                    <View style={styles.patternTag}>
                                        <Text style={styles.patternTagText}>
                                            Gesture
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.patternDescription}>
                                    Create a custom pull-to-refresh animation:
                                </Text>

                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { PullToRefreshSpinner } from '@your-org/motion-ui';

export default function RefreshableList() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          // Custom refresh control component
          tintColor="transparent"
          colors={["transparent"]}
          progressBackgroundColor="transparent"
          progressViewOffset={20}
        />
      }
    >
      {/* Your custom spinner that appears during refresh */}
      {refreshing && <PullToRefreshSpinner />}
      
      {/* Your list content */}
    </ScrollView>
  );
}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </MotiView>
                )}
            </MotiView>
        </ScrollView>
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    activeTabText: {
        color: '#111827',
        fontWeight: '600',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    exampleCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    expandedCard: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    exampleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    exampleIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    exampleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
    },
    exampleContent: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    exampleDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
        marginBottom: 16,
    },
    codeBlock: {
        backgroundColor: '#1F2937',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    codeText: {
        fontSize: 13,
        fontFamily: 'monospace',
        color: '#E5E7EB',
        lineHeight: 20,
    },
    demoContainer: {
        marginBottom: 16,
    },
    demoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    demoButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    demoButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    demoPreview: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        minHeight: 100,
    },
    demoCard: {
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
        padding: 16,
        width: 200,
        alignItems: 'center',
    },
    demoCardText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6366F1',
    },
    scaleButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    scaleButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    propsList: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 16,
    },
    propsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    propItem: {
        marginBottom: 12,
    },
    propName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    propType: {
        fontSize: 12,
        color: '#6366F1',
        fontFamily: 'monospace',
        marginBottom: 4,
    },
    propDescription: {
        fontSize: 14,
        color: '#4B5563',
    },
    tipCard: {
        backgroundColor: '#EEF2FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginLeft: 8,
    },
    tipText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
    },
    advancedCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    advancedTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    advancedDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
        marginBottom: 16,
    },
    patternCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    patternHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    patternTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
    },
    patternTag: {
        backgroundColor: '#EEF2FF',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    patternTagText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6366F1',
    },
    patternDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
        marginBottom: 16,
    },
});

export default Usage;
