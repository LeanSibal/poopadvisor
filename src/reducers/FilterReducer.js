import {
    UPDATE_FILTER 
} from '../actions/types';

const INITIAL_STATE = {
    gender: '',
    time: '',
    type: '',
    rating: '0',
}

export default( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
        case UPDATE_FILTER: 
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
}
