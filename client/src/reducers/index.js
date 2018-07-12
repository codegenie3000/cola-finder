import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colaReducer from './colaReducer';
import locationReducer from './locationReducer';
import restaurantReducers from './restaurantReducers';
import mapBoundsReducer from './mapBoundsReducer';

export default combineReducers({
    auth: authReducer,
    colaType: colaReducer,
    location: locationReducer,
    restaurants: restaurantReducers,
    mapBounds: mapBoundsReducer
});