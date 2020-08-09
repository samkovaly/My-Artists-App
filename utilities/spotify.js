
import * as Linking from 'expo-linking'

export const openURI = async(uri) => {
    // canOpenURL does not work on ios (even with LSApplicationQueriesSchemes defined)
    try {
        await Linking.openURL(uri);
    } catch (e){
        console.log("can't open URI: ", uri)
    }
}