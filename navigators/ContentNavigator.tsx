import * as React from 'react';
import { type NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduction from '@/screens/Introduction';
import Installation from '@/screens/Installation';
import Usage from '@/screens/Usage';

import AccordionPage from '@/screens/AccordionPage';
import Switch from '@/screens/SwitchPage';
import ButtonPage from '@/screens/ButtonPage';
import BadgeComponent from '@/screens/BadgeComponent';
import CardComponent from '@/screens/CardComponent';
import CarouselComponent from '@/screens/CarouselComponent';
import CheckboxComponent from '@/screens/CheckboxComponent';
import InputComponent from '@/screens/InputComponent';
import ModalComponent from '@/screens/ModalComponent';
import ToastComponent from '@/screens/ToastComponent';
import ProgressPage from '@/screens/ProgressBar';
import RadioPage from '@/screens/RadioComponent';
import SnackbarPage from '@/screens/SnackbarComponent';
import SelectPage from '@/screens/SelectComponent';
import DropdownPage from '@/screens/DropdownPage';
import SkeletonPage from '@/screens/SkeletonPage';

export type CScreenNames = [
    'Introduction',
    'Installation',
    'Components',
    'Usage',
    'Examples',
    'Accordion',
    'Badge',
    'Button',
    'Card',
    'Carousel',
    'Checkbox',
    'Dropdown',
    'Input',
    'Modal',
    'Progressbar',
    'Radio',
    'Select',
    'Skeleton',
    "Switch",
    'Snackbar',
    'Toast',
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
                animation: 'none',
                animationDuration: 150,
            }}
            initialRouteName="Introduction"
        >
            <Stack.Screen name="Introduction" component={Introduction} />

            <Stack.Screen name="Installation" component={Installation} />

            <Stack.Screen name="Usage" component={Usage} />

            <Stack.Screen name="Accordion" component={AccordionPage} />

            <Stack.Screen name="Badge" component={BadgeComponent} />

            <Stack.Screen name="Button" component={ButtonPage} />

            <Stack.Screen name="Card" component={CardComponent} />

            <Stack.Screen name="Carousel" component={CarouselComponent} />

            <Stack.Screen name="Checkbox" component={CheckboxComponent} />

            <Stack.Screen name="Dropdown" component={DropdownPage} />

            <Stack.Screen name="Input" component={InputComponent} />

            <Stack.Screen name="Modal" component={ModalComponent} />

            <Stack.Screen name="Progressbar" component={ProgressPage} />

            <Stack.Screen name="Radio" component={RadioPage} />

            <Stack.Screen name="Select" component={SelectPage} />

            <Stack.Screen name="Skeleton" component={SkeletonPage} />

            <Stack.Screen name="Switch" component={Switch} />

            <Stack.Screen name="Snackbar" component={SnackbarPage} />

            <Stack.Screen name="Toast" component={ToastComponent} />
        </Stack.Navigator>
    );
};

export default ContentNavigator;
