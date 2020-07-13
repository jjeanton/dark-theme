import {
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    MENU_SUCCESS,
    MENU_ERROR,
    TOGGLE_LOADING
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case CERRAR_SESION:
        case MENU_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: false,
                msg: action.payload,
                menu: [],
                loading: false
            };
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: false,
                msg: {msg:action.payload ? action.payload : 'Error al ingresar, intente nuevamente', type:'error'},
                menu: [],
                loading: false
            };
        case OBTENER_USUARIO: 
            return {
                ...state,
                user: action.payload,
                auth: true,
                loading: false
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: action.payload.auth,
                loading: false,
                msg:{msg:'Ingreso Exitoso', type:'success'}

            }
        case MENU_SUCCESS:
            return {
                ...state,
                menu: action.payload,
                loading: false
            }
    
        default:
            return state;
    }
}