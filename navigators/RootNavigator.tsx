import * as React from 'react';
import Home from '@/screens/Home';
import { type NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ScreenNames = ['Home', 'Content'];

export type RootStackParamList = {
    Home: {
        screen:
            | 'Introduction'
            | 'Examples'
            | 'Installation'
            | 'Usage'
            | 'Accordion'
            | 'Alert'
            | 'Badge'
            | 'Button'
            | 'Card'
            | 'Carousel'
            | 'Checkbox'
            | 'Input'
            | 'Modal'
            | 'Toast';
        params?: undefined;
    };
    Content: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                autoHideHomeIndicator: true,
            }}
            initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
