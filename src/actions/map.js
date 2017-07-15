import { 
    MAP_REGION_CHANGE,
    PUSH_LOCATIONS,
    PUSH_LARGER_BOUNDS
} from './types';

export const onMapRegionChange = ( mapRegion ) => {
    return {
        type: MAP_REGION_CHANGE,
        payload: mapRegion
    }
}

export const pushLocations = ( locations ) => {
    return {
        type: PUSH_LOCATIONS,
        payload: locations
    }
}

export const pushLargerBounds = bounds => {
    return {
        type: PUSH_LARGER_BOUNDS,
        payload: bounds
    }
}
