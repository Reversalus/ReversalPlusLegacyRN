import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { navigateToScreen } from '../Utils/NavigationUtils';

const IntroScreen = ({ navigation }: { navigation: any }) => {
    const handleGoToLogin = () => {
        // Navigate to LoginScreen using its deep link
        navigateToScreen(navigation, 'Login');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to the Intro Screen!</Text>
            <Button title="Go to Login" onPress={handleGoToLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default IntroScreen;
