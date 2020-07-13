import {
    SHOW_TOASTER
} from '../../types';


export default (state, action) => {
    switch (action.type) {
        case 'SHOW_TOASTER':
            return ({
                ...state,
                toaster: action.payload
            })
    
        default:
            break;
    }
}