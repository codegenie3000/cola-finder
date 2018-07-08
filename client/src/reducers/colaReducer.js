export default function (state = {selectedCola: 'Coca-Cola'}, action) {
    switch(action.type) {
        case 'SELECT_COLA':
            return action.payload;
    }
    return state;
}