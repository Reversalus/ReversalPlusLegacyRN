/**
 * App.tsx
 *
 * The main entry point for the application. This file initializes the navigation container,
 * configures deep linking, and sets up the screens and navigation utilities.
 *
 * Key Features:
 * - Configures deep linking for both React Native Web and mobile platforms.
 * - Uses `NavigationUtils` to handle deep link navigation.
 * - Defines the stack navigator and manages screen transitions.
 *
 * Usage:
 * - Place your app screens inside the `Stack.Navigator`.
 * - Add additional deep linking prefixes or screens in the `linking` configuration as needed.
 */

/**
 * App.tsx
 * Entry point of the application. Configures navigation, deep linking, and handles both web and mobile platforms.
 * Uses NavigationUtils for deep link parsing and navigation handling.
 */


/**
 * App.tsx
 * Entry point of the application. Configures navigation, deep linking, and handles both web and mobile platforms.
 * Uses NavigationUtils for deep link parsing and navigation handling.
 */
/**
 * App.tsx
 * Entry point of the application. Configures navigation, deep linking, and handles both web and mobile platforms.
 * Uses NavigationUtils for deep link parsing and navigation handling.
 */

/**
 * App.tsx
 * Entry point for the application.
 * Configures navigation, deep linking, and initializes navigation utilities.
 */

/**
 * App.tsx
 * Entry point of the application.
 * Configures navigation, deep linking, and initializes navigation utilities.
 */

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, Platform } from 'react-native';
import { setNavigationRef, handleDeepLinkNavigation } from './src/Utils/NavigationUtils';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MainLanding from './src/Screens/MainLanding';

const Stack = createStackNavigator();

const App = () => {
    const navigationRef = useRef(null);

    useEffect(() => {
        // Set navigation ref globally
        setNavigationRef(navigationRef);

        const handleInitialURL = async () => {
            const url = Platform.OS === 'web' ? window.location.href : await Linking.getInitialURL();
            if (url) {
                handleDeepLinkNavigation(url); // Handle deep link navigation
            }
        };

        handleInitialURL();

        const subscription = Linking.addEventListener('url', (event) => {
            handleDeepLinkNavigation(event.url);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={MainLanding} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
