import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import {
    ImagePicker,
} from 'expo';
import { connect } from 'react-redux';

class LocationCreate extends Component {
    state = {
        image: null
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
    /*
     *
                    */

    render() {
        let { image } = this.state;
        return(
            <View style={ styles.container }>
                <ScrollView
                    style={ styles.scrollViewContainer }
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
                            style={ styles.name }
                        />
                        <TextInput
                            placeholder="Address"
                            textAlign="center"
                            style={ styles.address }
                        />
                    </View>
                    <View style={ styles.rateContainer }>
                        <View style={ styles.poopContainer }>
                            <Image source={ require('../assets/images/poop-full.png') } />
                            <Image source={ require('../assets/images/poop-full.png') } />
                            <Image source={ require('../assets/images/poop-full.png') } />
                            <Image source={ require('../assets/images/poop-full.png') } />
                            <Image source={ require('../assets/images/poop-empty.png') } />
                        </View>
                        <Text style={ styles.rateText }>Rate Shittability!</Text>
                    </View>
                </ScrollView>
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
    }

});

export default LocationCreate;
