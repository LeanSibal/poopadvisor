import React, { Component } from 'react';
import {
    View,
    Text,
	Alert,
} from 'react-native';
import LocationRegion from '../components/LocationRegion';
import { Facebook } from 'expo';
import { Actions } from 'react-native-router-flux';

class LocationAdd extends Component {
    componentDidMount() {
        this._handleFacebookLogin();
    }

    _handleFacebookLogin = async() => {
		try {
			const { type, token } = await Facebook.logInWithReadPermissionsAsync(
				'1201211719949057', // Replace with your own app id in standalone app
				{ permissions: ['public_profile'] }
			);

			switch (type) {
				case 'success':
					// Get the user's name using Facebook's Graph API
					const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
					console.log( response );
					const profile = await response.json();
					break;

				case 'cancel': 
					Actions.pop();
					break;

				default: {
					Alert.alert(
					'Oops!',
					'Login failed!',
					);
				}
			}
		} catch (e) {
			Alert.alert(
				'Oops!',
				'Login failed!',
			);
		}
    }

    render() {
        return (
            <View>
                <LocationRegion />
            </View>
        );
    }
}

export default LocationAdd;
