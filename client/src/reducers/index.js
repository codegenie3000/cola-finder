import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colaReducer from './colaReducer';
import locationReducer from './locationReducer';
import restaurantReducers from './restaurantReducers';

export default combineReducers({
    auth: authReducer,
    colaType: colaReducer,
    location: locationReducer,
    restaurants: restaurantReducers
});