export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';

import { makeAction } from '../../utilities/actions';
import { fetchDeviceType } from './deviceRequests'

export const getDeviceType = () => {
    return async (dispatch, getState) => {
        const type = await fetchDeviceType();
        await dispatch(makeAction(SET_DEVICE_TYPE, type))
    }
}