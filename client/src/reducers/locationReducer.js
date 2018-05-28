import { GET_LOCATION } from "../actions/types";

export default function (state = {coords: {latitude: 0, longitude: 0}}, action) {
// export default function (state = null, action) {
    switch (action.type) {
        case GET_LOCATION:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}