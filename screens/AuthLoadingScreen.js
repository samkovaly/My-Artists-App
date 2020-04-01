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



import { getUserSavedOnLocal } from '../store/authentication/authenticationStorage';
import { getSpotifyAppCredentials, getConcertsAPICredentials } from '../store/authentication/authenticationActions';
import { loginWithUserAuthStorage } from '../store/authentication/authenticationActions';
import { getMusicProfile } from '../store/musicProfile/musicProfileActions';



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
                console.log('userSavedOnLocal: ', userSavedOnLocal);
                if(userSavedOnLocal){
                    // set state to what's found on local storage
                    dispatch(loginWithUserAuthStorage());
                    // retrive music profile from backend database
                    dispatch(getMusicProfile());
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