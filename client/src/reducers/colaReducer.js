export default function (state = {selectedCola: 'coke'}, action) {
    switch(action.type) {
        case 'SELECT_COLA':
            return action.payload;
    }
    return state;
}