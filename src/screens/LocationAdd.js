import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import LocationRegion from '../components/LocationRegion';
import { Actions } from 'react-native-router-flux';

class LocationAdd extends Component {
    render() {
        return (
            <View>
                <LocationRegion />
            </View>
        );
    }
}

export default LocationAdd;
