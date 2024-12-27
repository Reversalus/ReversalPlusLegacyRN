import React from 'react';
import { View, Text } from 'react-native';

const LoginScreen = ({ route }: any) => {
    const { username } = route.params || {};

    return (
        <View>
            <Text>Login Screen</Text>
            {username && <Text>Welcome, {username}!</Text>}
        </View>
    );
};

export default LoginScreen;
