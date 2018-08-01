import { SET_LOCATION } from '../actions/types';

// using default state for development purposes
export default function (state = {
    latitude: 34.0560974,
    longitude: -118.3822082
}, action) {
// export default function (state = null, action) {
    switch (action.type) {
        case SET_LOCATION:
            return action.payload;
        default:
            return state;
    }
}