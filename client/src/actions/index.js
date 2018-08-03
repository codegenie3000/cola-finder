import axios from 'axios';
import { FETCH_USER } from './types';
import { SET_LOCATION } from './types';
import { FETCH_RESTAURANTS } from './types';
import { FETCH_RESTAURANTS_SIMPLE } from './types';
import { SET_MAP_BOUNDS } from './types';
import { SET_SIMPLE_FILTER_COLA } from './types';
import { SET_USER_SELECTED_RESTAURANT} from './types';

export const fetchUser = () => async dispatch => {
    const res = axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res });
};

/*export function selectCola(cola, history) {
    // history.push('/map');
    return {
        type: SELECT_COLA,
        payload: cola
    }
}*/

export function setSimpleFilterCola(simpleFilter, simpleFilterSettings, history) {
    // export function setSimpleFilterCola(cola) {
    history.push('/map');
    return {
        type: SET_SIMPLE_FILTER_COLA,
        payload: {
            simpleFilter: simpleFilter,
            simpleFilterSettings: simpleFilterSettings
        }
    }
}

export function setUserSelectedRestaurant(restaurantId) {
    return {
        type: SET_USER_SELECTED_RESTAURANT,
        payload: restaurantId
    }
}

export const setLocation = () => async dispatch => {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('not supported'));
        }

        geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject(new Error('Permission denied'));
        });
    });

    const browserLocation = await location;
    const reducerLocation = {
        latitude: browserLocation.coords.latitude,
        longitude: browserLocation.coords.longitude
    };

    dispatch({ type: SET_LOCATION, payload: reducerLocation });
};

export const setLocationByZip = (zipCode) => async dispatch => {
    const urlQuery = '/api/location/lookup';
    const queryString = `?zip=${zipCode}`;
    const assembledString = `${urlQuery}${queryString}`;
    console.log(assembledString);
    const res = await axios.get(assembledString);
    const resData = res.data;
    console.log(resData);

    dispatch({type: SET_LOCATION, payload: resData});
};

export const fetchRestaurants = (minLat, maxLat, minLon, maxLon, coke, pepsi, customMix, fountain, realSugar) => async dispatch => {
    const queryString = `?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}&coke=${coke}&pepsi=${pepsi}&customMix=${customMix}&fountain=${fountain}&realSugar=${realSugar}`;
    // const queryString = `?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}&coke=true&pepsi=false&customMix=false&fountain=false&realSugar=false`;
    const res = await axios.get(`/api/restaurants/advanced/${queryString}`);
    dispatch({ type: FETCH_RESTAURANTS, payload: res });
};

export const fetchRestaurantsSimple = (minLat, maxLat, minLon, maxLon, coke, pepsi) => async dispatch => {
    const urlQuery = '/api/restaurants/lookup?';
    const coordQuery = `minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}&`;
    const colaQuery = `coke=${coke}&pepsi=${pepsi}`;
    const query = `${urlQuery}${coordQuery}${colaQuery}`;
    const res = await axios.get(query);
    dispatch({ type: FETCH_RESTAURANTS_SIMPLE, payload: res });
};

export function setMapBounds(mapBounds) {
    return {
        type: SET_MAP_BOUNDS,
        payload: mapBounds
    }
}