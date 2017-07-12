import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import { Scene, Router } from 'react-native-router-flux';
import Home from './screens/Home';
import Menu from './screens/Menu';

const RouterComponent = () => {
    return (
        <View style={ styles.container }>
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} hideNavBar={true}/>
                    <Scene key="menu" component={Menu} title="Menu" />
                </Scene>
            </Router>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        justifyContent: 'center',
        backgroundColor: '#A4842F'
    }
});

export default RouterComponent;
