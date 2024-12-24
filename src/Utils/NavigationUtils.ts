
import { CommonActions, StackActions, NavigationContainerRef } from '@react-navigation/native';

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

/**
 * Handles navigation actions like push and replace using deep links.
 */
export const handleDeepLinkNavigation = {
    /**
     * Pushes a new screen onto the navigation stack using a deep link.
     * @param url - The deep link URL.
     */
    push: (url: string) => {
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
    },

    /**
     * Replaces the current screen with a new one using a deep link.
     * @param url - The deep link URL.
     */
    replace: (url: string) => {
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
                    StackActions.replace(screen, params)
                );
            } else {
                console.error('Screen name is missing or undefined in the deep link:', url);
            }
        } else {
            console.error('Invalid deep link:', url);
        }
    },
};
