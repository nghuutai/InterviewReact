import * as types from '../common/action.type';
import URL from '../common/config';
import Axios from 'axios';

export const login = (user) => {
    return function(dispatch) {
        Axios.post(URL, user)
            .then(function (response) {
                localStorage.setItem('token', response.data.token)
                dispatch({ type: types.LOGIN, payload: true})
            })
            .catch(function(error) {
                dispatch({ type: types.LOGIN, payload: true})
            })
    }
}

export const exitNotification = () => {
    return function(dispatch) {
        dispatch({ type: types.EXIT_NOTIFICATION, payload: false})
    }
}