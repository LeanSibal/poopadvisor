import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Picker,
    ReactNative,
    findNodeHandle,
    Alert,
    AsyncStorage,
} from 'react-native';
import {
    ImagePicker,
} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { connect } from 'react-redux';
import { pushLocations, setLocation } from '../actions';
import { Actions } from 'react-native-router-flux';
import API from '../utils/api';

class LocationCreate extends Component {
    state = {
        image: null,
        name: '',
        address: '',
        rating: 0,
        gender: 'Gender',
        type: 'Location',
        review: '',
        fb_name: '',
        fb_id: null,
    }

    componentDidMount() {
        this.setState({
            image:null,
            name: '',
            address: '',
            rating:0,
            gender: 'Gender',
            type: 'Location',
            review: '',
            fb_name: '',
            fb_id: null,
        });
        this._getFbDetails();
    }

    _getFbDetails = async() => {
        const fb_name = await AsyncStorage.getItem('@PoopAdvisor:name');
        const fb_id = await AsyncStorage.getItem('@PoopAdvisor:fb_id');
        this.setState({
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
    _scrollToInput (reactNode: any) {
        this.refs.scroll.scrollToFocusedInput(reactNode)
    }

    _selectRating( num ) {
        this.setState({ rating: num });
    }

    _submit() {
        const { setLocation, pushLocations } = this.props;
        const { latitude, longitude } = this.props.mapRegion;
        const { name, address, gender, type, rating, review, image } = this.state;
        const data = {
            lat: latitude,
            lng: longitude,
            name: name,
            address: address,
            gender: gender,
            type: type,
            time_open: '0000',
            time_close: '0000',
        };
        if( name && address && gender && type ) { 
            API.post( 'location', data, async ( location ) => {
                setLocation( location.id );
                pushLocations([ location ]);
                const { id } = location;
                if( rating && review ) {
                    API.post('location/' + id + '/review', {
                        rating: rating,
                        review: review
                    }, review => {
                    });
                }
                if( image ) { 
                    let formData = new FormData();
                    formData.append( 'image', { uri: image, filename: 'test', type: 'jpg' } );
                    const access_token = await AsyncStorage.getItem('@PoopAdvisor:access_token');
                    fetch('http://www.shittableba.com/api/location/' + id + '/photo', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                    });
                }
                Actions.pop();
                Actions.pop();
            });
        } else {
            Alert.alert(
                'Oops',
                'Please complete all location details.'
            );
        }
    }

    render() {
        const { image, name, address, rating, gender, type, review, fb_name, fb_id } = this.state;
        return(
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
                    <View style={ styles.detailsContainer }>
                        <TextInput
                            placeholder="Location Name"
                            textAlign="center"
                            underlineColorAndroid="transparent"
                            style={ styles.name }
                            value={ name }
                            onChangeText={ value => this.setState({ name: value }) }
                        />
                        <TextInput
                            placeholder="Address"
                            textAlign="center"
                            underlineColorAndroid="transparent"
                            style={ styles.address }
                            value={ address }
                            onChangeText={ value => this.setState({ address: value }) }
                        />
                    </View>
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
                        <Text style={ styles.rateText }>Rate Poopability!</Text>
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
                    <View style={ styles.propertyPickerContainer }>
                        <View style={ styles.propertyPicker }>
                            <Picker
                                selectedValue={ gender }
                                onValueChange={ ( itemValue, itemIndex ) => this.setState({ gender: itemValue }) }
                            >
                                <Picker.Item value="" label="Gender" />
                                <Picker.Item value="Male" label="Male" />
                                <Picker.Item value="Female" label="Female" />
                                <Picker.Item value="Common" label="Common" />
                            </Picker>
                        </View>
                        <View style={ styles.propertyPicker }>
                            <Picker
                                selectedValue={ type }
                                onValueChange={ ( itemValue, itemIndex ) => this.setState({ type: itemValue }) }
                            >
                                <Picker.Item value="" label="Location" />
                                <Picker.Item value="Restaurant" label="Restaurant" />
                                <Picker.Item value="Mall" label="Mall" />
                                <Picker.Item value="Bar" label="Bar" />
                                <Picker.Item value="Gas Station" label="Gas Station" />
                                <Picker.Item value="Shop" label="Shop" />
                                <Picker.Item value="Hotel/Casino" label="Hotel/Casino" />
                                <Picker.Item value="Public Toilet" label="Public Toilet" />
                                <Picker.Item value="Private Toilet" label="Private Toilet" />
                            </Picker>
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
        flex:1,
        backgroundColor:'#fff',
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
    detailsContainer: {
        flex:1,
        marginTop:10,
    },
    name: {
        height:40,
        fontSize:30,
        fontWeight: 'bold'
    },
    address: {
        height:30,
        fontSize:16,
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
    },
    rateContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#b9b9b9',
    },
    extraDetailsContainer: {
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
        flex:1,
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
    propertyPicker: {
        flex:1,
    },
    detailContainer: {
        flexDirection: 'row',
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
    }

});

export default connect( state => {
    return {
        mapRegion: state.map.mapRegion
    };
}, {
    pushLocations,
    setLocation
})(LocationCreate);
