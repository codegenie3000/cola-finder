import { SET_MAP_BOUNDS } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case SET_MAP_BOUNDS:
            return action.payload || false;
        default:
            return state;
    }
}