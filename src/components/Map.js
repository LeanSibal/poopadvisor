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
import { 
    onMapRegionChange,
    pushLocations,
    pushLargerBounds,
    setLocation,
} from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import API from '../utils/api';

class Map extends Component {

    state = {
        fetchingMarkers: false,
        first: true,
    };

    componentWillReceiveProps( props ) {
        const { location_id } = props;
        console.log({
            componentWillReceiveProps: location_id
        });
        if( location_id ) {
            setTimeout(() => {
                Actions.location_view();
            }, 2500 );
        }
    }

    componentDidMount() {
        const { location_id } = this.props;
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        const { mapRegion, onMapRegionChange } = this.props;
        let { status } = await Permissions.askAsync( Permissions.LOCATION );
        let location = await Location.getCurrentPositionAsync({});
        this._onRegionChange({
            ...mapRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });

    }

    _onRegionChange( mapRegion ) {
        const { 
            pushLocations,
            pushLargerBounds,
            onMapRegionChange, 
            excempt,
        } = this.props;
        onMapRegionChange( mapRegion );
        if( this.state.fetchingMarkers ) return;
        if( mapRegion.latitudeDelta > 5 ) {
            this.setState({ fetchingMarkers: false });
            return;
        }
        if( this.state.first ) {
            this.setState({ first: false });
            return;
        }
        let bounds = this._getBounds( mapRegion );
        this.setState({ fetchingMarkers: true });
        API.get( 'location', {
            center: {
                lat: mapRegion.latitude,
                lng: mapRegion.longitude
            },
            bounds: bounds,
            excempt: excempt
        }, response => {
            pushLocations( response );
            pushLargerBounds( bounds );
            setTimeout( () => {
                this.setState({ fetchingMarkers: false });
            }, 2000 );
        });
    }

    _getBounds( mapRegion ) {
        return [[
            (mapRegion.latitude - mapRegion.latitudeDelta),
            (mapRegion.longitude - mapRegion.longitudeDelta)
        ],[
            (mapRegion.latitude + mapRegion.latitudeDelta),
            (mapRegion.longitude + mapRegion.longitudeDelta)
        ]];
    }

    render(){
        const { filter, mapRegion, locations, setLocation } = this.props;
        return(
            <View style={ styles.container }>
                <MapView 
                    region={ mapRegion }
                    style={ styles.map } 
                    onRegionChange={ this._onRegionChange.bind(this) }
                    showsUserLocation={ true }
                >
                { locations.filter( location => {
                    return (
                        ( filter.gender == '' || location.gender == filter.gender ) &&
                        ( filter.type == '' || location.type == filter.type ) &&
                        ( filter.rating == '0' || parseFloat( location.rating ) >= parseFloat( filter.rating ) )
                    );
                }).map( ( location, i ) => (
                    <MapView.Marker
                        key={ i }
                        image={ require('../assets/images/pin.png') }
                        coordinate={{ 
                            id: location.id,
                            latitude: location.lat,
                            longitude: location.lng,
                        }}
                        onPress={ () => {
                            setLocation( location.id );
                            Actions.location_view();
                        } }
                    />
                ) ) }
                </MapView>
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

export default connect( state => {
    return {
        location_id: state.map.location_id,
        locations: state.map.locations,
        mapRegion: state.map.mapRegion,
        excempt: state.map.excempt,
        filter: state.filter
    }
},{
    onMapRegionChange,
    pushLocations,
    pushLargerBounds,
    setLocation,
})(Map);
