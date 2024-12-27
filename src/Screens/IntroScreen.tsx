import React from 'react';
import { View, Text } from 'react-native';
import { handleDeepLinkNavigation } from '../Utils/NavigationUtils';
import { Box, Button } from 'native-base';

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
            <Text>Hello, React Native and Web!</Text>
            <Button onPress={() => alert('Clicked!')}>Click Me</Button>

            <Button title="Go to Dashboard" onPress={navigateToDashboard} />
        </View>
    );
};

export default IntroScreen;
