import { saveStorage, deleteStorage, getStorage } from '../../utilities/localStorage.js'

const USER_SAVED_ON_LOCAL = 'USER_SAVED_ON_LOCAL';

const USERNAME = 'USERNAME';
const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
const BACKEND_USER_PASSWORD = 'BACKEND_USER_PASSWORD';
const BACKEND_USER_AUTH_TOKEN = 'BACKEND_USER_AUTH_TOKEN';




// for debugging
export const printOutAllStorage = async() => {
    console.log('print out all current storage:')
    console.log('user saved on local:', await getUserSavedOnStorage());
    console.log('username:', await getUsernameStorage());
    console.log('refresh token:', await getRefreshTokenStorage());
}


export const removeAllStorage = async() => {
    console.log('removing all local storage...')
    await removeUserSavedOnStorage();
    await removeUsernameStorage();
    await removeRefreshTokenStorage();
    await removeBackendAuthTokenStorage();
}


export const saveUserSavedOnStorage = async (userSavedOnLocal) => {
    return await saveStorage(USER_SAVED_ON_LOCAL, JSON.stringify(userSavedOnLocal));
}
export const getUserSavedOnStorage = async() => {
    return await JSON.parse(await getStorage(USER_SAVED_ON_LOCAL));
}
export const removeUserSavedOnStorage = async() => {
    return await deleteStorage(USER_SAVED_ON_LOCAL);
}



// used as key to our backend database
// saved onto device for instant login
export const saveUsernameStorage = async (username) => {
    return await saveStorage(USERNAME, username);
}
export const getUsernameStorage = async() => {
    return await getStorage(USERNAME);
}
export const removeUsernameStorage = async() => {
    return await deleteStorage(USERNAME);
}


// used as a sort of password along with ther user name for our backend
// saved onto device for instant login
export const saveRefreshTokenStorage = async (refreshToken) => {
    return await saveStorage(USER_REFRESH_TOKEN, refreshToken);
}
export const getRefreshTokenStorage = async() => {
    return await getStorage(USER_REFRESH_TOKEN);
}
export const removeRefreshTokenStorage = async() => {
    return await deleteStorage(USER_REFRESH_TOKEN);
}


export const saveBackendAuthTokenStorage = async (backendUserAuthToken) => {
    return await saveStorage(BACKEND_USER_AUTH_TOKEN, backendUserAuthToken);
}
export const getBackendAuthTokenStorage = async() => {
    return await getStorage(BACKEND_USER_AUTH_TOKEN);
}
export const removeBackendAuthTokenStorage = async() => {
    return await deleteStorage(BACKEND_USER_AUTH_TOKEN);
}