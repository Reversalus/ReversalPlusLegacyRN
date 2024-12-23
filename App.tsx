import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Welcome to My App!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Change to match your branding
    },
    splashImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    splashText: {
        fontSize: 24,
        color: '#fff',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
