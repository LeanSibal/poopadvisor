import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import { Scene, Router } from 'react-native-router-flux';
import Home from './screens/Home';
import Menu from './screens/Menu';
import Filters from './screens/Filters';
import FilterGender from './screens/FilterGender';
import FilterLocation from './screens/FilterLocation';
import FilterTime from './screens/FilterTime';
import FilterRating from './screens/FilterRating';
import LocationView from './screens/LocationView';

const RouterComponent = () => {
    return (
        <View style={ styles.container }>
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} hideNavBar={true}/>
                    <Scene key="menu" component={Menu} title="Menu" />
                    <Scene key="filters" component={Filters} title="Filters" />
                    <Scene key="filter_gender" component={FilterGender} title="Gender" />
                    <Scene key="filter_location" component={FilterLocation} title="Location" />
                    <Scene key="filter_time" component={FilterTime} title="Time" />
                    <Scene key="filter_rating" component={FilterRating} title="Rating" />
                    <Scene key="location_view" component={LocationView} title="" />
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
