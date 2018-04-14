import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
	Alert,
    TextInput,
    AsyncStorage,
    findNodeHandle,
    Platform,
} from 'react-native';
import {
    ImagePicker,
    Font,
    Facebook,
} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import API from '../utils/api';
import { Actions } from 'react-native-router-flux';
import { setLocation } from '../actions';

class LocationReview extends Component {
    state = {
        location_id: null,
        image: null,
        fontLoaded: false,
        name: '',
        address: '',
        gender: '',
        type: '',
        rating:0,
        review: '',
        fb_name: '',
        fb_id: null,
    }


    async componentWillMount() {
        this._handleFacebookLogin();
        this.setState({
            rating: 0,
        });
        const { location_id } = this.props;
        this.setState({ location_id: location_id });
        API.get( 'location/' + location_id, {}, location => {
            const { name, address, gender, type } = location;
            this.setState({ 
                name: name,
                address: address,
                gender: gender,
                type: type,
            });
        });
        console.log({
            ratelocation: location_id
        });
        await Font.loadAsync({
            'raleway': require('../assets/fonts/raleway.ttf'),
        });
        this.setState({ fontLoaded: true });
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
                    this._getFbDetails();
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

    _getFbDetails = async() => {
        const fb_name = await AsyncStorage.getItem('@PoopAdvisor:name');
        const fb_id = await AsyncStorage.getItem('@PoopAdvisor:fb_id');
        this.setState({
            fb_name: fb_name,
            fb_id: fb_id
        });
        console.log({
            fb_name: fb_name,
            fb_id: fb_id
        });
    }

    _selectImage = async()  => {
        let image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if( ! image.cancelled ) {
            this.setState({ image: image.uri  });
        }
    }

    _selectRating( num ) {
        this.setState({ rating: num });
    }

    _scrollToInput (reactNode: any) {
        this.refs.scroll.scrollToFocusedInput(reactNode)
    }

    _submit = async() => {
        const { location_id, rating, review, image } = this.state;
        const { setLocation } = this.props;
        if( rating && review ) {
            Actions.pop();
            Actions.pop();
            API.post('location/' + location_id + '/review', {
                rating: rating,
                review: review
            }, review => {
                setLocation( location_id );
            });
        } else {
            Alert.alert(
                'Oops!',
                'Please rate and review this location.'
            );
        }
        if( image ) {
            let formData = new FormData();
            formData.append( 'image', { uri: image, filename: 'test', type: 'jpg' } );
            const access_token = await AsyncStorage.getItem('@PoopAdvisor:access_token');
            fetch('http://35.196.82.215/api/location/' + location_id + '/photo', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            });
        }
    }

    render() {
        const { image, rating, fb_id, fb_name, review, gender, type } = this.state;
        return (
            <View style={ styles.container }>
                <KeyboardAwareScrollView
                    style={ styles.scrollViewContainer }
                    ref='scroll'
                >
                    <View style={ styles.imageContainer }>
                        <TouchableOpacity
                            onPress={ this._selectImage }
                            style={{ flex: 1 }}
                        >
                            { image ? (
                                <Image
                                    style={ styles.image }
                                    source={{ uri: image }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image 
                                    style={styles.image }
                                    source={ require('../assets/images/select-image.png') }
                                    resizeMode="cover"
                                />
                            ) }
                        </TouchableOpacity>
                    </View>
                    { this.state.fontLoaded ? (
                        <View>
                            <Text style={ styles.name }>{ this.state.name }</Text>
                            <View style={ styles.addressContainer }>
                                <Image source={ require( '../assets/images/pin-gray.png' )} />
                                <Text style={ styles.address }>{ this.state.address }</Text>
                            </View>
                        </View>
                    ) : null }
                    <View style={ styles.rateContainer }>
                        <View style={ styles.poopContainer }>
                            <TouchableOpacity
                                onPress={ () => { this._selectRating( 1 ) } }
                            >
                                { rating >= 1 ? 
                                    ( <Image source={ require('../assets/images/poop-full.png') } /> )
                                : (<Image source={ require('../assets/images/poop-empty.png') } /> ) }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ () => { this._selectRating( 2 ) } }
                            >
                                { rating >= 2 ? 
                                    ( <Image source={ require('../assets/images/poop-full.png') } /> )
                                : (<Image source={ require('../assets/images/poop-empty.png') } /> ) }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ () => { this._selectRating( 3 ) } }
                            >
                                { rating >= 3 ? 
                                    ( <Image source={ require('../assets/images/poop-full.png') } /> )
                                : (<Image source={ require('../assets/images/poop-empty.png') } /> ) }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ () => { this._selectRating( 4 ) } }
                            >
                                { rating >= 4 ? 
                                    ( <Image source={ require('../assets/images/poop-full.png') } /> )
                                : (<Image source={ require('../assets/images/poop-empty.png') } /> ) }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ () => { this._selectRating( 5 ) } }
                            >
                                { rating >= 5 ? 
                                    ( <Image source={ require('../assets/images/poop-full.png') } /> )
                                : (<Image source={ require('../assets/images/poop-empty.png') } /> ) }
                            </TouchableOpacity>
                        </View>
                        <Text style={ styles.rateText }>Rate Toilet!</Text>
                    </View>
                    <View style={ styles.propertiesContainer }>
                        <View style={ styles.propertyContainer }>
                            <Image 
                                style={ styles.smallIcon }
                                source={ require('../assets/images/sign-brown.png') } 
                            />
                            <Text>{ gender }</Text>
                        </View>
                        <View style={ styles.propertyContainer }>
                            <Image 
                                style={ styles.smallIcon }
                                source={ require('../assets/images/pin-brown.png') } 
                            />
                            <Text>{ type }</Text>
                        </View>
                    </View>
                    <View style={ styles.commentDetailsContainer }>
                        <View style={ styles.profileImageContainer }>
                            <Image 
                                style={{ borderRadius: 25, width:50, height:50 }}
                                source={{ uri: 'https://graph.facebook.com/' + fb_id + '/picture' }} />
                        </View>
                        <View style={ styles.commentContainer }>
                            <Text style={ styles.commenterName }>
                            { fb_name } 
                            </Text>
                            <TextInput 
                                style={ styles.commenterComment }
                                placeholder="Is it clean? Is it free? Does it have the necessary tools? Tell us how poopable this toilet is."
                                underlineColorAndroid="transparent"
                                multiline={ true }
                                onFocus={(event: Event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                                value={ review }
                                onChangeText={ value => this.setState({ review: value }) }
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <View style={ styles.footerContainer }>
                    <TouchableOpacity 
                        style={ styles.buttonContainer }
                        onPress={ () => Actions.pop() }
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.buttonContainer }
                        onPress={ () => this._submit() }
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
       );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewContainer: {
        width:'100%',
    },
    imageContainer: {
        flex:1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
    },
    image: {
        width: '100%',
        height: 230,
    },
    name: {
        fontFamily: 'raleway',
        fontSize: 30,
        textAlign: 'center',
        marginTop:5,
    },
    addressContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    address: {
        marginLeft: 5,
        marginTop:5,
        fontFamily: 'raleway',
        color: '#b9b9b9',
        fontSize: 14,
        textAlign: 'center',
    },
    rateContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
        marginTop: 10,
    },
    poopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    rateText: {
        marginTop:5,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom:10,
    },
    propertiesContainer: {
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
        borderTopColor: '#b9b9b9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    propertyContainer: {
        flexDirection: 'row',
    },
    smallIcon: {
        marginRight: 5,
    },
    propertyPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#b9b9b9',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    commentDetailsContainer: {
        flex:1,
        flexDirection: 'row',
    },
    profileImageContainer: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight:10,
    },
    commentContainer: {
        flex:1,
    },
    commenterName: {
        paddingTop:15,
        fontSize:22,
        fontWeight: 'bold',
    },
    commenterComment: {
        textAlignVertical: 'top',
        width:'100%',
        marginBottom:400,
        height:100,
        paddingRight:15,
    },
    footerContainer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#b9b9b9',
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
    },
});

export default connect( state => {
    return {
        location_id: state.map.rate_location_id
    };
}, {
    setLocation
})(LocationReview);
