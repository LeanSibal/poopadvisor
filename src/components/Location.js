import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import LocationDetails from './LocationDetails';
import Poops from './Poops';
import Comments from './Comments';
import {
    Font 
} from 'expo';
import Gallery from 'react-native-image-gallery';
import { setLocation, rateLocation } from '../actions';
import { connect } from 'react-redux';
import API from '../utils/api';
import { Actions } from 'react-native-router-flux';

class Location extends Component {

    state = {
        location_id: null,
        fontLoaded: false,
        name: '',
        address: '',
        gender: '',
        type: '',
        time_open: '',
        time_close: '',
        photos: null,
        comments: null,
        rating: null,
    }


    async componentWillMount() {
        const { location_id, setLocation } = this.props;
        this.setState({ location_id: location_id });
        setLocation( null );
        API.get( 'location/' + location_id, {}, location => {
            const { name, address, gender, type, time_open, time_close } = location;
            this.setState({ 
                name: name,
                address: address,
                gender: gender,
                type: type,
                time_open: time_open,
                time_close: time_close,
            });
        });
        API.get( 'location/' + location_id + '/review', {}, reviews => {
            var rating = 0;
            for( let comment of reviews ) {
                rating += comment.rating;
            }
            rating /= reviews.length;
            this.setState({ rating: rating });
            this.setState({ comments: reviews });
        });
        API.get( 'location/' + location_id + '/photo', {}, photos => {
            if( photos.length > 0 ) {
                this.setState({ photos: photos.map(( photo, i ) => {
                    return {
                        source:{
                            uri: photo.image_url
                        }
                    };
                }) });
            }
        });
        await Font.loadAsync({
            'raleway': require('../assets/fonts/raleway.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    _rate() {
        const { location_id } = this.state;
        const { rateLocation } = this.props;
        rateLocation( location_id );
        Actions.location_rate();
    }
    
    render() {
        return (
            <View style={ styles.container }>
                <ScrollView
                    style={ styles.detailsContainer }
                >

                    { this.state.photos ? ( 
                        <View style={ styles.galleryContainer }>
                            <Gallery
                                style={styles.gallery}
                                images={ this.state.photos }
                            />
                        </View>
                    ) : null }

                    { this.state.fontLoaded ? (
                        <View>
                            <Text style={ styles.name }>{ this.state.name }</Text>
                            <View style={ styles.addressContainer }>
                                <Image source={ require( '../assets/images/pin-gray.png' )} />
                                <Text style={ styles.address }>{ this.state.address }</Text>
                            </View>
                        </View>
                    ) : null }

                    <TouchableOpacity 
                        style={ styles.rateButton }
                        onPress={ () => this._rate() }
                    >
                        { this.state.rating ? (
                            <Poops poops={ this.state.rating }/>
                        ) : null }
                        {this.state.fontLoaded ? ( 
                            <Text style={ styles.rateText }>Rate Sh*ttability!</Text>
                        ) : null }
                    </TouchableOpacity>

                    { this.state.type ? ( 
                        <LocationDetails
                            type={ this.state.type }
                            gender={ this.state.gender }
                            time_open={ this.state.time_open }
                            time_close={ this.state.time_close }
                        />
                    ) : null }

                    { this.state.comments ? ( 
                        <Comments comments={this.state.comments}/>
                    ) : null }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailsContainer: {
        flex: 1,
    },
    galleryContainer: {
        flex: 1,
        height:230,
        borderBottomColor: '#b9b9b9',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    gallery: {
        flex: 1,
        height:230,
        backgroundColor:'white'
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

    rateButton: {
        marginTop:10,
        marginBottom:10,
    },
    rateText: {
        marginTop:5,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});

export default connect( state => {
    return {
        location_id: state.map.location_id
    };
},{
    setLocation,
    rateLocation
})(Location);
