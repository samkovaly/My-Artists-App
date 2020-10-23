

import AppLink from 'react-native-app-link';

export const openURI = async(uri) => {
    const spotifyInfo = {
        appName: 'spotify',
        appStoreId: '324684580',
        appStoreLocale: 'us',
        playStoreId: 'com.spotify.music'
    }

    try {
        await AppLink.maybeOpenURL(uri, spotifyInfo);
        return;
    }catch(error){
        console.log(error)
    }
    
    // if not
    try{
        await AppLink.openInStore(spotifyInfo);
        return;
    }catch(error){
        console.log(error)
    }
}