import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    MapView,
    Location,
    Permissions
} from 'expo';
import { onMapRegionChange } from '../actions';
import { connect } from 'react-redux';

class Map extends Component {
    state = {
        mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    };
    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    render(){
        const { mapRegion, onMapRegionChange } = this.props;
        return(
            <View style={ styles.container }>
                <MapView 
                    region={ mapRegion }
                    style={ styles.map } 
                    onRegionChange={ onMapRegionChange }
                    showUserLocation={ true }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
        height: 200
    }
});

export default connect(state => {
    return {
        locations: state.map.locations,
        mapRegion: state.map.mapRegion
    }
},{
    onMapRegionChange
})(Map);
