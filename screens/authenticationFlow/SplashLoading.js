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

import { Colors, Screens, Buttons, Font } from '../../styles'



import { getUserSavedOnStorage } from '../../store/authentication/authenticationStorage';
import { getSpotifyAppCredentials, getConcertsAPICredentials } from '../../store/authentication/authenticationActions';
import { loginWithUserAuthStorage } from '../../store/authentication/authenticationActions';
import { getMusicProfile } from '../../store/musicProfile/musicProfileActions';

import { printOutAllStorage } from '../../store/authentication/authenticationStorage';


export default function AuthLoadingScreen(props) {

    const dispatch = useDispatch();
    const appCredentials = useSelector(state => state.authentication.appCredentials);


    useEffect(() => {
        const loadAuthFromStorage = async() => {
            if(appCredentials.clientId == null){
                await dispatch(getSpotifyAppCredentials());
                await dispatch(getConcertsAPICredentials());

            }else{
                const userSavedOnStorage = await getUserSavedOnStorage();
                if(userSavedOnStorage){
                    console.log('automatic login..')
                    // set state to what's found on local storage
                    await dispatch(loginWithUserAuthStorage());
                    // retrive music profile from backend database
                    await dispatch(getMusicProfile());
                    props.navigation.navigate('App');
                }else{
                    console.log('need to register / login')
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
            <Text style = {styles.bigLoadingText}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingScreenContainer: {
        ...Screens.screenContainer,
    },
    bigLoadingText: {
        ...Font.largeWhiteText,
    },
});