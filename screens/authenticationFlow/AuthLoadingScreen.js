import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'

import BaseText from '../../components/BaseText'


import { getUserSavedOnStorage, getUsernameStorage, getBackendAuthTokenStorage, getRefreshTokenStorage } from '../../store/authentication/authenticationStorage';
import { getSpotifyAppCredentials, getAPICredentials } from '../../store/authentication/authenticationActions';
import { setAuthStateFromStorage, login } from '../../store/authentication/authenticationActions';
import { getMusicProfile } from '../../store/musicProfile/musicProfileActions';

import { setInterestedConcerts } from '../../store/concerts/concertsActions'

import { printOutAllStorage } from '../../store/authentication/authenticationStorage';

import { confirmUserBackend } from '../../store/authentication/authenticationActions';

import SplashArt from '../../components/SplashArt';



import { useNavigation } from '@react-navigation/native';

import { AppLoading } from 'expo';


    /*
        1. load credentials         [ AUTH SPLASH SCREEN / COMPONENT ]
        2. determine if user has auth saved to local
        3. Y:
                fetch auth obj from storage

                { LOAD AUTH STATE AND MUSIC PROFILE WITH THIS CREDENTIALS OBJECT}
                auth obj -> auth state
                fetch music profile into state
                LOGIN to trigger Auth Nav screen change
            N:
                direct user to login screen [ LOGIN SCREEN ]
                
                register and analyze on backend [ ANALYZING SPOTIFY SCREEN/COMPONENT ]
                get user auth from backend

                { LOAD AUTH STATE AND MUSIC PROFILE WITH THIS CREDENTIALS OBJECT}
                auth obj -> auth state
                fetch music profile into state
                LOGIN to trigger auth nav screen change
    */






export default function AuthLoadingScreen(props) {
   const dispatch = useDispatch();
   const nav = useNavigation();
   const [error, setError] = useState(false);

   const appCredentials = useSelector(state => state.authentication.appCredentials);

   const autoLogin = async () => {
        // 3. Y:
        console.log('automatic login..')
        // set state to what's found on local storage
        await dispatch(setAuthStateFromStorage());
        // retrive music profile from backend database
        await dispatch(getMusicProfile());
        await dispatch(setInterestedConcerts());
        // with user auth and music profile in state, the user is ready to use the app.
        // login to auto navigate to main app stack
        console.log('logging in')
        await dispatch(login());
        nav.navigate("MainApp");
    }

   useEffect(() => {
       const loginUserOrAskToRegister = async() => {
           
           if(appCredentials.tried == false){
               // 1. load credentials  [ AUTH SPLASH SCREEN / COMPONENT ]
               dispatch(getSpotifyAppCredentials());
               dispatch(getAPICredentials());
           } else if(appCredentials.tried == true && appCredentials.clientId == null){
               setError(true);
           }else{
               // 2. determine if user has auth saved to local
               const userSavedOnStorage = await getUserSavedOnStorage();

                let userInBackend = null;
                if(userSavedOnStorage){
                    const username = await getUsernameStorage();
                    const refreshToken = await getRefreshTokenStorage();
                    const backendAuthToken = await getBackendAuthTokenStorage();
                    userInBackend = await confirmUserBackend(username, refreshToken, backendAuthToken);
                }
               
               if(userSavedOnStorage && userInBackend){
                    await autoLogin();
               }else{
                   // 3. N:
                   console.log('need to register / login')
                   props.navigation.navigate('LoginWithSpotify');
               }
           }
       }
       loginUserOrAskToRegister();
   }, [appCredentials])

   if(error){
       console.log("error loading app credentials")
        return errorScreen();
   }else{
        return loadingScreen();
   }
}


const loadingScreen = () => {
    return (
        //<AppLoading/>
        <SplashArt/>
        /*
        <View style = {styles.loadingScreen}>
            <ActivityIndicator
                size = 'large'
                color = {Colors.THEME_BLUE}
            />
        </View>
        */
    )
}


const errorScreen = () => {
    return (
        <View style = {styles.errorScreen}>
            <BaseText style = {styles.errorText}>Error loading app credentials</BaseText>
        </View>
    )
}


const styles = StyleSheet.create({
    errorScreen: {
        ...Screens.screenContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 22,
        padding: 12,
    },
    loadingScreen: {
      ...Screens.screenContainer,
    },
});  