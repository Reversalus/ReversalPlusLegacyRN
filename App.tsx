import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking } from 'react-native';
import { handleDeepLink } from './src/Utils/NavigationUtils'; // Import deep link handler
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MainLanding from './src/Screens/MainLanding';

const Stack = createStackNavigator();

const App = () => {
    // Create a ref to hold the navigation container
    const navigationRef = useRef(null);

    useEffect(() => {
        // On app launch, check for the initial deep link
        const getInitialURL = async () => {
            const url = await Linking.getInitialURL();
            if (url) {
                handleDeepLink(url, navigationRef.current);
            }
        };

        getInitialURL();

        // Listen for deep links while the app is running
        const handleLink = (event: any) => {
            const { url } = event;
            handleDeepLink(url, navigationRef.current);
        };

        Linking.addEventListener('url', handleLink);

        // No need to remove the event listener, as React Native manages it internally.
        // So, we can leave the cleanup empty for now if it's unnecessary.

        return () => {
            // No need to remove the event listener for deep links explicitly.
        };
    }, []);

    // Set up deep linking configuration
    const linking = {
        prefixes: ['reversalplus://', 'https://reversalplus.com'],
        config: {
            screens: {
                Intro: 'intro',
                Login: 'login',
                Dashboard: 'dashboard',
            },
        },
    };

    return (
        <NavigationContainer
            ref={navigationRef} // Reference the navigation container
            linking={linking}
        >
            <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={MainLanding} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
