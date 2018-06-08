import _ from 'lodash';
import { FETCH_RESTAURANTS } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_RESTAURANTS:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'name');
        default:
            return state;
    }
}