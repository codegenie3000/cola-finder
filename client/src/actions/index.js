import axios from 'axios';
import { FETCH_USER } from './types';
import { GET_LOCATION } from "./types";

export const fetchUser = () => async dispatch => {
    const res = axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res });
};

/*
export const getLocation = () => dispatch => {
    navigator.geolocation.getCurrentPosition((position) => {
        dispatch({ type: GET_LOCATION, payload: position });
    });
};*/

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
    dispatch({type: GET_LOCATION, payload: userLocation});
};