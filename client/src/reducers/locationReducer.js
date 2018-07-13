import { SET_LOCATION } from '../actions/types';

export default function (state = null, action) {
// export default function (state = null, action) {
    switch (action.type) {
        case SET_LOCATION:
            return action.payload;
        default:
            return state;
    }
}