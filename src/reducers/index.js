import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
    map: MapReducer,
    filter: FilterReducer
});
