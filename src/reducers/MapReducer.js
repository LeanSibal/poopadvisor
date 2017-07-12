import { MAP_REGION_CHANGE } from '../actions/types';
const INITIAL_STATE = {
    mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
};

export default ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
        case MAP_REGION_CHANGE:
            return { ...state, mapRegion: action.payload };
        default:
            return state;
    }
}
