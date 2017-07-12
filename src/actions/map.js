import { MAP_REGION_CHANGE } from './types';

export const onMapRegionChange = ( mapRegion ) => {
    return {
        type: MAP_REGION_CHANGE,
        payload: mapRegion
    }
}
