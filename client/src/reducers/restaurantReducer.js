import _ from 'lodash';
import { FETCH_RESTAURANTS } from '../actions/types';
import { FETCH_RESTAURANTS_SIMPLE } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_RESTAURANTS:
            return _.mapKeys(action.payload.data, 'name');
        case FETCH_RESTAURANTS_SIMPLE:
            return _.mapKeys(action.payload.data, 'name');
        default:
            return state;
    }
}