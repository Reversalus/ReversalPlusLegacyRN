import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {handleDeepLinkNavigation} from "../../Utils/NavigationUtils.ts";
import {DeepLinks} from "../../Constants/Deeplinks.ts";

const { width } = Dimensions.get('window');

const IntroScreenApp = () => {
    const [activePage, setActivePage] = useState(0);

    const pages = [
        { title: 'Welcome!', description: 'Discover amazing features with us.' },
        { title: 'Stay Connected', description: 'Keep in touch with your loved ones.' },
        { title: 'Get Started', description: 'Let’s dive into the experience!' },
    ];

    const onSkip = () => {
        handleDeepLinkNavigation.replace(DeepLinks.LOGIN); // Replace 'Login' with the actual screen name
    };

    const onGetStarted = () => {
        handleDeepLinkNavigation.replace(DeepLinks.LOGIN); // Replace 'Login' with the actual screen name
    };

    const renderPagination = () => (
        <View style={styles.pagination}>
            <TouchableOpacity
                disabled={activePage === 0}
                onPress={() => setActivePage(Math.max(activePage - 1, 0))}
                style={[styles.button, activePage === 0 && styles.disabledButton]}
            >
                <Text style={[styles.buttonText, activePage === 0 && styles.disabledText]}>
                    Previous
                </Text>
            </TouchableOpacity>
            {activePage === pages.length - 1 ? (
                <TouchableOpacity onPress={onGetStarted} style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => setActivePage(Math.min(activePage + 1, pages.length - 1))}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Swiper
                loop={false}
                showsPagination={true}
                onIndexChanged={(index) => setActivePage(index)}
                index={activePage}
                style={styles.swiper}
            >
                {pages.map((page, index) => (
                    <View key={index} style={styles.slide}>
                        <Text style={styles.title}>{page.title}</Text>
                        <Text style={styles.description}>{page.description}</Text>
                    </View>
                ))}
            </Swiper>
            {renderPagination()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        fontSize: 16,
        color: '#007BFF',
    },
    swiper: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    disabledText: {
        color: '#666',
    },
});

export default IntroScreenApp;