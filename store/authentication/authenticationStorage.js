import { saveStorage, deleteStorage, getStorage } from '../../utilities/localStorage.js'

const USER_SAVED_ON_LOCAL = 'USER_SAVED_ON_LOCAL';

const USER_ID = 'USER_ID';
const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
const BACKEND_USER_PASSWORD = 'BACKEND_USER_PASSWORD';
const BACKEND_USER_AUTH_TOKEN = 'BACKEND_USER_AUTH_TOKEN';




export const saveUserSavedOnLocal = async (userSavedOnLocal) => {
    console.log('saving user data to local')
    return await saveStorage(USER_SAVED_ON_LOCAL, userSavedOnLocal);
}
export const getUserSavedOnLocal = async() => {
    return await getStorage(USER_SAVED_ON_LOCAL);
}
export const removeUserSavedOnLocal = async() => {
    return await deleteStorage(USER_SAVED_ON_LOCAL);
}



// used as key to our backend database
// saved onto device for instant login
export const saveUserID = async (userID) => {
    console.log('saving user id')
    return await saveStorage(USER_ID, userID);
}
export const getUserID = async() => {
    return await getStorage(USER_ID);
}
export const removeUserID = async() => {
    return await deleteStorage(USER_ID);
}


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


export const saveBackendUserPassword = async (BackendUserPassword) => {
    console.log('saving user id')
    return await saveStorage(BACKEND_USER_PASSWORD, BackendUserPassword);
}
export const getBackendUserPassword = async() => {
    return await getStorage(BACKEND_USER_PASSWORD);
}
export const removeBackendUserPassword = async() => {
    return await deleteStorage(BACKEND_USER_PASSWORD);
}


export const saveBackendUserAuthToken = async (backendUserAuthToken) => {
    console.log('saving backend user auth token')
    return await saveStorage(BACKEND_USER_AUTH_TOKEN, backendUserAuthToken);
}
export const getBackendUserAuthToken = async() => {
    return await getStorage(BACKEND_USER_AUTH_TOKEN);
}
export const removeBackendUserAuthToken = async() => {
    return await deleteStorage(BACKEND_USER_AUTH_TOKEN);
}