import { Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';

// Mapping screen names to their deep links with the new scheme "reversalplus"
const screenLinks = {
    Intro: 'reversalplus://intro', // Deep link for Intro screen
    Login: 'reversalplus://login', // Deep link for Login screen
    Dashboard: 'reversalplus://dashboard', // Deep link for Dashboard screen
};

// Function to navigate to a screen based on deep link
export const navigateToScreen = (navigation: any, screenName: string, params?: any) => {
    if (Platform.OS !== 'web') {
        navigation.navigate(screenName, params); // Native navigation
    } else {
        // On web, use window.location.href for deep linking
        window.location.href = `${window.location.origin}${getWebLinkForScreen(screenName)}`;
    }
};

// Function to handle external deep link (when the app is opened from a deep link)
export const handleDeepLink = (url: string, navigation: any) => {
    const route = getRouteFromUrl(url);
    if (route) {
        if (Platform.OS === 'web') {
            // Web navigation using window.location
            window.location.href = `${window.location.origin}${route.path}`;
        } else {
            // Native navigation using React Navigation
            navigation.dispatch(
                CommonActions.navigate({
                    name: route.screen,
                    params: route.params,
                })
            );
        }
    }
};

// Helper to map the URL to a screen
const getRouteFromUrl = (url: string) => {
    const path = url.replace('reversalplus://', '').replace('https://reversalplus.com', ''); // Handling both mobile and web URL schemes
    const routeConfig = {
        '/intro': { screen: 'Intro', path: '/intro', params: {} },
        '/login': { screen: 'Login', path: '/login', params: {} },
        '/dashboard': { screen: 'Dashboard', path: '/dashboard', params: {} },
    };
    return routeConfig[path] || null; // Return matching route if found
};

// Get the link for a screen, based on the platform
export const getLinkForScreen = (screenName: string, params?: any): string => {
    if (Platform.OS === 'web') {
        return `${window.location.origin}${getWebLinkForScreen(screenName)}`;
    }

    return screenLinks[screenName] || ''; // Return the deep link for mobile
};

// Generate the web deep link for a screen
const getWebLinkForScreen = (screenName: string) => {
    const webRoutes = {
        Intro: '/intro',
        Login: '/login',
        Dashboard: '/dashboard',
    };

    return webRoutes[screenName] || ''; // Return the web route for the screen
};
