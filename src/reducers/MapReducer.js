import { 
    MAP_REGION_CHANGE,
    PUSH_LOCATIONS,
    PUSH_LARGER_BOUNDS,
} from '../actions/types';
const INITIAL_STATE = {
    mapRegion: {
        latitude: 14.56091178,
        longitude: 121.02452788,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    },
    locations: [],
    excempt: []
};

export default ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
        case MAP_REGION_CHANGE:
            return { ...state, mapRegion: action.payload };

        case PUSH_LOCATIONS:
            let ids = state.locations.map( ( location, i ) => {
                return location.id;
            } );
            let filtered = action.payload.filter( ( location, i ) => {
                return ( ids.indexOf( location.id ) == -1 );
            } );
            return { ...state, locations: state.locations.concat( filtered ) };

        case PUSH_LARGER_BOUNDS:
            let excempt = state.excempt;
            excempt.unshift( action.payload );
            for( var i = 0; i < excempt.length; i++ ) {
                for( var j = 0; j < excempt.length; j++ ) {
                    if( excempt[i][0][0] > excempt[j][0][0] &&
                        excempt[i][0][1] > excempt[j][0][1] &&
                        excempt[i][1][0] < excempt[j][1][0] &&
                        excempt[i][1][1] < excempt[j][1][1] ) {
                        // remove smaller bounds
                        excempt.splice( i, 1);
                        i--;
                    }
                }
            }
            if( excempt.length > 30 ) {
                excempt.pop();
            }
            return { ...state, excempt: excempt };


        default:
            return state;
    }
}
