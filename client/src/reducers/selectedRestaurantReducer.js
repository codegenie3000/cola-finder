import { SET_USER_SELECTED_RESTAURANT} from '../actions/types';

export default function (state = false, action) {
    switch(action.type) {
        case SET_USER_SELECTED_RESTAURANT:
            return action.payload || false;
        default:
            return state;
    }
}