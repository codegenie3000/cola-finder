export default function (state = {selectedCola: 'Coke'}, action) {
    switch(action.type) {
        case 'SELECT_COLA':
            return action.payload;
    }
    return state;
}