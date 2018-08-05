import { FETCH_RESTAURANT_DETAIL } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_RESTAURANT_DETAIL:
            return action.payload.data;
        default:
            return state;
    }
}