import {
    UPDATE_FILTER
} from './types';

export const updateFilter = ({ prop, value }) => {
    return {
        type: UPDATE_FILTER,
        payload: { prop, value }
    }
}
