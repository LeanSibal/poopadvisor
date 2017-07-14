import { MAP_REGION_CHANGE } from '../actions/types';
const INITIAL_STATE = {
    mapRegion: {
        latitude: 14.56091178,
        longitude: 121.02452788,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    },
    locations: []
};

export default ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
        case MAP_REGION_CHANGE:
            return { ...state, mapRegion: action.payload };
        default:
            return state;
    }
}
