
import { SET_DEVICE_TYPE } from './deviceActions'

const initialState = {
  deviceType: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_TYPE:
      return {
        ...state,
        deviceType: action.payload,
      }
    default:
      return state;
  }
}