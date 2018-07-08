import axios from 'axios';
import { FETCH_USER } from './types';
import { SELECT_COLA } from "./types";
import { GET_LOCATION } from "./types";
import { FETCH_RESTAURANTS } from "./types";

export const fetchUser = () => async dispatch => {
    const res = axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res });
};

export function selectCola(cola) {
    return {
        type: 'SELECT_COLA',
        payload: cola
    }
};

export const getLocation = () => async dispatch => {
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

    // return {type: GET_LOCATION, payload: location};

    const userLocation = await location;
    dispatch({ type: GET_LOCATION, payload: userLocation });
};

export const fetchRestaurants = (minLat, maxLat, minLon, maxLon, coke, pepsi, customMix, fountain, realSugar) => async dispatch => {
    const queryString = `?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}&coke=${coke}&pepsi=${pepsi}&customMix=${customMix}&fountain=${fountain}&realSugar=${realSugar}`;
    // const queryString = `?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}&coke=true&pepsi=false&customMix=false&fountain=false&realSugar=false`;
    const res = await axios.get(`/api/restaurants/advanced/${queryString}`);
    dispatch({ type: FETCH_RESTAURANTS, payload: res });
};