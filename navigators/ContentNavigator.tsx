import * as React from "react";
import { type NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction from "@/screens/Introduction";
import Examples from "@/screens/Examples";
import Installation from "@/screens/Installation";
import Usage from "@/screens/Usage";

export type CScreenNames = [
    "Introduction",
    "Installation",
    "Components",
    "Usage",
    "Examples"
];

export type ContentStackParamList = Record<CScreenNames[number], undefined>;

export type ContentStackNavigation = NavigationProp<ContentStackParamList>;

const Stack = createNativeStackNavigator<ContentStackParamList>();

const ContentNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                autoHideHomeIndicator: true,
                animation:"fade",
                animationDuration: 150
            }}
            initialRouteName="Introduction"
        >
            <Stack.Screen
                name="Introduction"
                component={Introduction}
            />

            <Stack.Screen
                name="Examples"
                component={Examples}
            />

            <Stack.Screen
                name="Installation"
                component={Installation}
            />

            <Stack.Screen
                name="Usage"
                component={Usage}
            />
            
        </Stack.Navigator>
    );
};

export default ContentNavigator;