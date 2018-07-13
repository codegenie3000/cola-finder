import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import restaurantReducer from './restaurantReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    auth: authReducer,
    filter: filterReducer,
    location: locationReducer,
    restaurants: restaurantReducer
});