import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import restaurantReducer from './restaurantReducer';
import filterReducer from './filterReducer';
import selectedRestaurantReducer from './selectedRestaurantReducer';
import restaurantDetailReducer from './restaurantDetailReducer';

export default combineReducers({
    auth: authReducer,
    filter: filterReducer,
    location: locationReducer,
    restaurants: restaurantReducer,
    form: formReducer,
    selectedRestaurant: selectedRestaurantReducer,
    restaurantDetail: restaurantDetailReducer
});