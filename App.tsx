import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        // Simulate a loading process
        const timeout = setTimeout(() => {
            onFinish(); // Notify parent to switch from the splash screen
        }, 3000); // Duration of splash screen (3 seconds)

        return () => clearTimeout(timeout);
    }, [onFinish]);

    return (
        <View style={styles.splashContainer}>
            <Image
                source={require('./src/assets/reversal_logo.png')} // Corrected image reference
                style={styles.splashImage}
            />
            <Text style={styles.splashText}>My App</Text>
        </View>
    );
};

const App = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    if (isSplashVisible) {
        return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
    }

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
