import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Image } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    // Animated values
    const logoPosition = new Animated.Value(0); // Controls logo movement (upwards)
    const formOpacity = new Animated.Value(0);  // Controls form fade

    useEffect(() => {
        // Start the animation when the screen loads
        Animated.sequence([
            // Animate logo sliding up (without fading out completely)
            Animated.timing(logoPosition, {
                toValue: -180,  // Move the logo up by 100
                duration: 1000,
                useNativeDriver: true,
            }),
            // After the logo animation, show the login form
            Animated.timing(formOpacity, {
                toValue: 1,  // Fade in the form
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        // Handle login logic here (e.g., API call)
        // For demonstration, just show an alert
        Alert.alert('Login Success', `Welcome, ${username}!`);
    };

    const handleSignup = () => {
        // Navigate to Signup screen
        navigation.navigate('Signup');
    };

    const handleForgotPassword = () => {
        // Navigate to Forgot Password screen
        navigation.navigate('ForgotPassword');
    };

    return (
        <View style={styles.container}>
            {/* Animated logo */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    { transform: [{ translateY: logoPosition }] }, // Logo slides up, but stays visible
                ]}
            >
                <Image
                    source={require('../assets/reversal_logo.png')} // Replace with the correct path to your logo image
                    style={styles.logo}
                />
            </Animated.View>

            {/* Animated login form */}
            <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
                <Text style={styles.header}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Text>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.footerText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '30%',  // Position logo at the center of the screen initially
    },
    logo: {
        width: 150,  // Adjust the size of the logo as needed
        height: 150,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,  // Adds shadow for Android
        paddingTop: 60, // To give space for the logo above the form
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 15,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 12,
        zIndex: 1,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: '#007BFF',
        fontSize: 16,
        marginVertical: 5,
    },
});

export default LoginScreen;
