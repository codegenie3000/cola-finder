import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import restaurantReducers from './restaurantReducers';

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    restaurants: restaurantReducers
});