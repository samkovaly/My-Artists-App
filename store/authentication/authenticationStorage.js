import { saveStorage, deleteStorage, getStorage } from '../../utilities/localStorage.js'

const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
const USER_ID = 'USER_ID';

// used as a sort of password along with ther user name for our backend
// saved onto device for instant login
export const saveUserRefreshToken = async (refreshToken) => {
    return await saveStorage(USER_REFRESH_TOKEN, refreshToken);
}
export const getUserRefreshToken = async() => {
    return await getStorage(USER_REFRESH_TOKEN);
}
export const removeUserRefreshToken = async() => {
    return await deleteStorage(USER_REFRESH_TOKEN);
}

// used as key to our backend database
// saved onto device for instant login
export const saveUserID = async (userID) => {
    return await saveStorage(USER_ID, userID);
}
export const getUserID = async() => {
    return await getStorage(USER_ID);
}
export const removeUserID = async() => {
    return await deleteStorage(USER_ID);
}