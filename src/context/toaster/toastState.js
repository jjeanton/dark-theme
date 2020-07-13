import React, {useReducer} from 'react';
import toastContext from './toastContext';
import toastReducer from './toastReducer';

import { SHOW_TOASTER } from '../../types';
//import { toast } from 'react-toastify';

const ToasterState = props => {
    const initialState = {
        toaster: null,
        show: false,
    }

    const [state, dispatch] = useReducer(toastReducer, initialState);

    const showToaster = (info) => {
        const config = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className:'info'
        }
        
        dispatch({
            type: SHOW_TOASTER,
            payload: {msg: info.msg, type:info.type, config}
        })
    }

    return (
        <toastContext.Provider
            value={{
                toaster: state.toaster,
                showToaster
            }}
        >
            {props.children}
        </toastContext.Provider>
    )

}

export default ToasterState;