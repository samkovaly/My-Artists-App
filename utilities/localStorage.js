
import * as SecureStore from 'expo-secure-store';

export const saveStorage = async (key, value) => {
    try{
      await SecureStore.setItemAsync(key, value);
      return true;
    }catch(e){
      console.log(`Error in localStorage.saveStorage while saving ${value} under key ${key}, ${e}`);
      return false;
    }
  }

export const deleteStorage = async (key) => {
    try{
        await SecureStore.deleteItemAsync(key);
        return true;
    }catch(e){
        console.log(`Error in localStorage.deleteStorage while deleting key ${key}, ${e}`);
        return false;
    }
  }

export const getStorage = async(key) => {
    try{
        return await SecureStore.getItemAsync(key);
    }catch(e){
        console.log(`Error in localStorage.getStorage while getting key ${key}, ${e}`);
        return null;
      }
}
