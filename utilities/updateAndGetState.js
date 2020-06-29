
import store from '../store/store'
import { refreshAccessToken } from '../store/authentication/authenticationActions'
import { useDispatch } from 'react-redux'


export const updateAndGetAccessToken = async (dispatch) => {
    await dispatch(refreshAccessToken())
    const accessToken = store.getState().authentication.accessToken.token;
    return accessToken;
}