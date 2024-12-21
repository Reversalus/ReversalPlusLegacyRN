import React from 'react';
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';

const App = () => {

    const returnView = ()=>{
        if(Platform.OS == 'web'){
           return (<Text style={ { fontSize: 24 }}>React Native Web</Text>);
        }
        else {
            return (<Text style={ { fontSize: 24 }}>React Native App</Text>);
        }
    };
    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" />
            <View style={{ alignItems: 'center' }}>
                { returnView() }
            </View>
        </SafeAreaView>
    );
};

export default App;
