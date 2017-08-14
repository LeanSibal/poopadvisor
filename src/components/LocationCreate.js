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
} from 'react-native';
import {
    ImagePicker,
} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

class LocationCreate extends Component {
    state = {
        image: null,
        rating: 0,
        gender: 'Gender',
        type: 'Location',
    }

    componentDidMount() {
        this.setState({
            image:null,
            rating:0,
            gender: 'Gender',
            type: 'Location',
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

    render() {
        let { image, rating, gender, type } = this.state;
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
                        />
                        <TextInput
                            placeholder="Address"
                            textAlign="center"
                            underlineColorAndroid="transparent"
                            style={ styles.address }
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
                        <Text style={ styles.rateText }>Rate Shittability!</Text>
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
                                <Picker.Item value="Gender" label="Gender" />
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
                                <Picker.Item value="Location" label="Location" />
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
                            <Image source={ require('../assets/images/icon-profile.png') } />
                        </View>
                        <View style={ styles.commentContainer }>
                            <Text style={ styles.commenterName }>
                                Lean Sibal
                            </Text>
                            <TextInput 
                                style={ styles.commenterComment }
                                placeholder="Is it clean? Is it free? Does it have the necessary tools? Tell us how shittable this toilet is."
                                underlineColorAndroid="transparent"
                                multiline={ true }
                                onFocus={(event: Event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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

    }

});

export default LocationCreate;
