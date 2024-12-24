/**
 * NavigationUtils.ts
 *
 * This file provides utility functions for handling navigation and deep linking within the app.
 * It includes functionality for parsing deep links, managing navigation across web and mobile platforms,
 * and handling navigation parameters.
 *
 * Key Features:
 * - Parses deep link URLs to extract screen names and parameters.
 * - Handles navigation for both React Native Web and mobile platforms.
 * - Provides centralized navigation logic to simplify screen-level navigation calls.
 * - Allows passing explicit parameters during navigation.
 *
 * Functions:
 * 1. `setNavigationRef`: Sets a reference to the navigation container for global access.
 * 2. `handleDeepLinkNavigation`: Handles deep link navigation by parsing the URL and navigating to the correct screen.
 * 3. `parseDeepLink`: Parses a deep link URL to extract the screen name and parameters.
 * 4. `handleWebDeepLink`: Handles deep link navigation specifically for React Native Web.
 *
 * Usage:
 * - Set the navigation reference in `App.tsx` using `setNavigationRef`.
 * - Use `handleDeepLinkNavigation` to navigate to screens with deep links and optional parameters.
 * - For React Native Web, call `handleWebDeepLink` to handle browser-based deep links.
 */


/**
 * NavigationUtils.ts
 * Contains utility functions for handling navigation and deep linking.
 * Includes logic for parsing deep links, navigating to screens, and supporting both web and mobile platforms.
 */


/**
 * NavigationUtils.ts
 * Contains utility functions for handling navigation and deep linking.
 * Includes logic for parsing deep links, navigating to screens, and supporting both web and mobile platforms.
 */

/**
 * NavigationUtils.ts
 * Contains utility functions for handling navigation and deep linking.
 * Includes logic for parsing deep links, navigating to screens, and supporting both web and mobile platforms.
 */

/**
 * NavigationUtils.ts
 * Handles global navigation and deep linking logic.
 * Includes support for both mobile and web platforms.
 */

/**
 * NavigationUtils.ts
 * Handles global navigation and deep linking logic for both web and mobile.
 * Provides functions for parsing deep links and navigating screens with parameters.
 */

import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

// Global navigation reference
let navigationRef: NavigationContainerRef<any> | null = null;

/**
 * Sets the global navigation reference.
 * @param ref - The navigation reference from NavigationContainer.
 */
export const setNavigationRef = (ref: React.RefObject<NavigationContainerRef<any>>) => {
    navigationRef = ref.current;
};

/**
 * Gets the current navigation reference.
 * Ensures the reference is set before being used.
 */
export const getNavigationRef = (): NavigationContainerRef<any> | null => {
    if (!navigationRef) {
        console.warn('Navigation reference is not set. Ensure that setNavigationRef is called in App.tsx.');
    }
    return navigationRef;
};

/**
 * Handles navigation using a deep link.
 * Parses the URL and navigates to the corresponding screen with parameters.
 * @param url - The deep link URL.
 */
export const handleDeepLinkNavigation = (url: string) => {
    const navigation = getNavigationRef();
    if (!navigation) {
        console.error('Navigation reference is not available for deep link handling.');
        return;
    }

    const parsedData = parseDeepLink(url);
    if (parsedData) {
        const { screen, params } = parsedData;

        if (screen) {
            navigation.dispatch(
                CommonActions.navigate({
                    name: screen,
                    params,
                })
            );
        } else {
            console.error('Screen name is missing or undefined in the deep link:', url);
        }
    } else {
        console.error('Invalid deep link:', url);
    }
};

/**
 * Parses a deep link URL into screen name and parameters.
 * @param url - The deep link URL.
 * @returns An object with screen name and parameters.
 */
export const parseDeepLink = (url: string) => {
    try {
        const [screenPart, paramsPart] = url.split('&&Params=');
        const screenNameMatch = screenPart.match(/ScreenName=([a-zA-Z0-9_]+)/);

        const screen = screenNameMatch ? screenNameMatch[1] : undefined;
        let params = {};

        if (paramsPart) {
            params = JSON.parse(paramsPart.replace(/'/g, '"')); // Replace single quotes with double quotes
        }

        return { screen, params };
    } catch (error) {
        console.error('Error parsing deep link:', error);
        return null;
    }
};
