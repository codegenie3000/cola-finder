export default function (state = {coke: true, pepsi: false}, action) {
    switch(action.type) {
        case 'SELECT_COLA':
            return action.payload;
    }
    return state;
}