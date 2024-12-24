import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {handleDeepLinkNavigation} from '../Utils/NavigationUtils.ts';
import {DeepLinks} from "../Constants/Deeplinks.ts";

const IntroScreen = ({ navigation }: { navigation: any }) => {

    const navigateToLogin = () => {
        handleDeepLinkNavigation(`${DeepLinks.LOGIN}&Params={'key1':'value1','key2':'value2'}`);
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to the Intro Screen!</Text>
            <Button title="Go to Login" onPress={navigateToLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default IntroScreen;
