import React, {useReducer, useContext} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    GET_MENU,
    MENU_SUCCESS,
    MENU_ERROR,
    TOGGLE_LOADING
} from '../../types';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        menu: [],
        auth: null,
        user: null,
        msg: null,
        loading: false
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Return auth user
    const userAuth = async () => {
        dispatch({
            type: TOGGLE_LOADING
        })
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
            // token by header
            try {
                const resp = await clienteAxios.get('api/Usuarios/me');
                dispatch({
                    type:OBTENER_USUARIO,
                    payload: resp.data
                });
                getMenuData();

            } catch (error) {
                dispatch({
                    type:LOGIN_ERROR
                })
                
            }
        }
    }
    // Logout
    const logout = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    // Login
    const login = async (data) =>{
        try {
            const resp = await clienteAxios.post('api/Login/', data);
            if(resp.data.auth) {
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: resp.data
                });
            } else {
                console.log('no');
                dispatch({
                    type: LOGIN_ERROR,
                    payload: resp.message
                })
            }
            // userAuth();
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.message ? error.message : 'Error de servidor'
            })
        }
    }
     // Get data for Menu from Role
     const getMenuData = async () => {
        try {
            const resp = await clienteAxios.get('api/Menu');
            dispatch({
                type: MENU_SUCCESS,
                payload: resp.data
            })
        } catch (error) {
            dispatch({
                type: MENU_ERROR
            })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                msg: state.msg,
                menu: state.menu,
                loading: state.loading,
                login,
                userAuth,
                logout,
                getMenuData
            }}
        >{props.children}

        </AuthContext.Provider>
    );
}

export default AuthState;
