import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import LocationCreate from '../components/LocationCreate';

class LocationForm extends Component {
    render() {
        return (
            <View>
                <LocationCreate/>
            </View>
        );
    }
}

export default LocationForm;
