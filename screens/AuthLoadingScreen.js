import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SPOTIFY_GREEN, SPOTIFY_BLACK } from '../styles/colors';


import { getUserRefreshToken, getUserID } from '../store/authentication/authenticationStorage';



import { getSpotifyAppCredentials, getAccessTokenInitial } from '../store/authentication/authenticationActions'

export default function AuthLoadingScreen(props) {

    const dispatch = useDispatch();
    const appCredentials = useSelector(state => state.authentication.appCredentials);

    useEffect(() => {
        console.log('a')
        if(appCredentials.clientId == null){
            dispatch(getSpotifyAppCredentials());
        }else{
            console.log('b')
            const userID = await getUserID();
            const refreshToken = await getUserRefreshToken();
            console.log('user ID from storage ', userID, ' refresh token from storage: ', refreshToken);
            if(userID && refreshToken){
                console.log('c')
                dispatch(getAccessTokenInitial(userID, refreshToken))
                console.log('d')

                props.navigation.navigate('App');
            }else{
                props.navigation.navigate('Auth');
            }
        }
    }, [])

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