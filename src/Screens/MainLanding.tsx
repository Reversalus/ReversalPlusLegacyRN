import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { navigateToScreen } from '../Utils/NavigationUtils';

const MainLanding = ({ navigation }: { navigation: any }) => {
    const handleGoToDashboard = () => {
        // Navigate to DashboardScreen using its deep link
        navigateToScreen(navigation, 'Dashboard');
    };

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Go to Dashboard" onPress={handleGoToDashboard} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MainLanding;
