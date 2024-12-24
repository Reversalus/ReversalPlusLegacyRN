import React from 'react';
import { View, Text, Button } from 'react-native';
import { handleDeepLinkNavigation } from '../Utils/NavigationUtils';

const IntroScreen = () => {
    const navigateToLogin = () => {
        handleDeepLinkNavigation.navigate(
            'reversalplus://ScreenName=login'
        );
    };

    const navigateToDashboard = () => {
        handleDeepLinkNavigation.replace(
            'reversalplus://ScreenName=dashboard&Params={"userId":123}'
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Intro Screen</Text>
            <Button title="Go to Login" onPress={navigateToLogin} />
            <Button title="Go to Dashboard" onPress={navigateToDashboard} />
        </View>
    );
};

export default IntroScreen;
