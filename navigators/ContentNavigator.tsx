import * as React from "react";
import { type NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction from "@/component/home/Introduction";
import Examples from "@/screens/Examples";

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
                autoHideHomeIndicator: true
            }}
            initialRouteName="Introduction"
        >
            <Stack.Screen
                name="Introduction"
                component={Introduction}
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 150
                }}
            />

            <Stack.Screen
                name="Examples"
                component={Examples}
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 150
                }}
            />
            
        </Stack.Navigator>
    );
};

export default ContentNavigator;