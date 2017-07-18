import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from 'react-native';
import {
    MapView,
} from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    onMapRegionChange,
} from '../actions';
class LocationRegion extends Component {

    componentDidMount() {
        const { mapRegion, onMapRegionChange }  = this.props;
        setTimeout( () => onMapRegionChange( mapRegion ), 100 );
    }

    _onRegionChange( mapRegion ) {
        const { onMapRegionChange } = this.props;
        onMapRegionChange( mapRegion );
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
        mapRegion: state.map.mapRegion
    };
},{
    onMapRegionChange
})(LocationRegion);
