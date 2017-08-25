import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
	Alert,
    AsyncStorage,
    Platform,
} from 'react-native';
import {
    MapView,
    Facebook,
} from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    onMapRegionChange,
} from '../actions';
import API from '../utils/api';
class LocationRegion extends Component {


    componentDidMount() {
        const { mapRegion, onMapRegionChange }  = this.props;
        setTimeout( () => onMapRegionChange( mapRegion ), 100 );
        this._handleFacebookLogin();
    }

    _onRegionChange( mapRegion ) {
        const { onMapRegionChange } = this.props;
        onMapRegionChange( mapRegion );
    }

    _handleFacebookLogin = async() => {
		try {
            const app_id = Platform.OS === 'android' ? '1201211719949057' : '872887976186490';
			const { type, token } = await Facebook.logInWithReadPermissionsAsync(
				app_id, // Replace with your own app id in standalone app
				{ permissions: ['public_profile'] }
			);

			switch (type) {
				case 'success':
					// Get the user's name using Facebook's Graph API
					const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
					const profile = await response.json();
					console.log( profile );
                    AsyncStorage.setItem('@PoopAdvisor:name', profile.name );
                    AsyncStorage.setItem('@PoopAdvisor:fb_id', profile.id );
                    API.post( 'user/loginorregister', {
                        name: profile.name,
                        id: profile.id
                    }, response => {
                        API.access_token( response.email, response.fb_id );
                    });
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
        const { mapRegion } = this.props;
        return(
            <View style={ styles.container }>
                <View style={ styles.mapContainer }>
                    <MapView
                        style={ styles.map }
                        region={ mapRegion }
                        onRegionChange={ this._onRegionChange.bind( this ) }
                        showsUserLocation={ true }
                    >
                        <MapView.Marker
                            image={ require('../assets/images/pin.png') }
                            coordinate={{
                                latitude: mapRegion.latitude,
                                longitude: mapRegion.longitude
                            }}
                        />
                    </MapView>
                </View>
                <View style={ styles.footerContainer }>
                    <TouchableOpacity 
                        style={ styles.buttonContainer }
                        onPress={ () => Actions.pop() }
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.buttonContainer }
                        onPress={ () => Actions.location_form() }
                    >
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flexDirection: 'column',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
    footerContainer: {
        height: 65,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 65,
    }

});

export default connect( state => {
    return {
        mapRegion: state.map.mapRegion,
        location_id: state.map.location_id
    };
},{
    onMapRegionChange
})(LocationRegion);
