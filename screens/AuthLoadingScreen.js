import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SPOTIFY_GREEN, SPOTIFY_BLACK } from '../styles/colors';


import { getUserSavedOnLocal, getUserRefreshToken, getUserID } from '../store/authentication/authenticationStorage';


import { getSpotifyAppCredentials, getConcertsAPICredentials, getAccessTokenInitial, registerUser } from '../store/authentication/authenticationActions';


export default function AuthLoadingScreen(props) {

    const dispatch = useDispatch();
    const appCredentials = useSelector(state => state.authentication.appCredentials);

    console.log('authloadingscreen | appcreds:', appCredentials)

    useEffect(() => {
        const loadAuthFromStorage = async() => {
            console.log('loadAuthFromStorage')
            if(appCredentials.clientId == null){
                dispatch(getSpotifyAppCredentials());
                print('after 1 dispatch')
                dispatch(getConcertsAPICredentials());
                print('after 2 dispatch')
            }else{
                console.log('clientID not null')
                const userSavedOnLocal = await getUserSavedOnLocal();


                if(userSavedOnLocal){
                    const userID = await getUserID();
                    const refreshToken = await getUserRefreshToken();
                    console.log('user ID from storage ', userID, ' refresh token from storage: ', refreshToken);
                    console.log('c')
                    await dispatch(getAccessTokenInitial(userID, refreshToken))
                    console.log('d')

                    // temporarily here for tests
                    await dispatch(registerUser());

                    props.navigation.navigate('App');
                }else{
                    props.navigation.navigate('Auth');
                }
            }
        }
        loadAuthFromStorage();
    })

    return loadingScreen();
}

const loadingScreen = () => {
    return (
        <View style = {styles.loadingScreenContainer}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingScreenContainer: {
        flex: 1,
        backgroundColor: SPOTIFY_BLACK,
    },
});