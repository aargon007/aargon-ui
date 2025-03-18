import * as React from 'react';
import Home from '@/screens/Home';
import { type NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ScreenNames = ['Home', 'Profile'];

export type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
}

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                autoHideHomeIndicator: true
            }}
            initialRouteName="Home"
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />

            {/* <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    animation: "slide_from_right",
                    animationDuration: 150,
                    gestureEnabled: false,
                    autoHideHomeIndicator: true
                }}
            /> */}
        </Stack.Navigator>
    );
};

export default RootNavigator;
