import { SET_SIMPLE_FILTER_COLA } from '../actions/types';
import { SET_MAP_BOUNDS } from '../actions/types';
// import { SET_USER_SELECTED_RESTAURANT} from '../actions/types';

/*
state = {
    simpleFilter: bool,
    simpleFilterSettings: {coke: bool, pepsi: bool},
    mapBounds: {minLat, maxLat, minLon, maxLon}
}
*/

export default function (state = {simpleFilter: true, simpleFilterSettings: {coke: true, pepsi: false}}, action) {
    switch (action.type) {
        case SET_SIMPLE_FILTER_COLA:
            // return action.payload;
            return {
                ...state,
                simpleFilter: action.payload.simpleFilter,
                simpleFilterSettings: action.payload.simpleFilterSettings
            };
        case SET_MAP_BOUNDS:
            return { ...state, mapBounds: action.payload};
        /*case SET_USER_SELECTED_RESTAURANT:
            return {
                ...state, selectedRestaurant: action.payload
            };*/
        default:
            return state;
    }
}