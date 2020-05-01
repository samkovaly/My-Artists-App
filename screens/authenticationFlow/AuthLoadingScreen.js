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
import { setAuthStateFromStorage, login } from '../../store/authentication/authenticationActions';
import { getMusicProfile } from '../../store/musicProfile/musicProfileActions';

import { printOutAllStorage } from '../../store/authentication/authenticationStorage';


import SplashArt from '../../components/SplashArt';




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

   const appCredentials = useSelector(state => state.authentication.appCredentials);

   useEffect(() => {
       const loginUserOrAskToRegister = async() => {
           
           if(appCredentials.clientId == null){
               // 1. load credentials  [ AUTH SPLASH SCREEN / COMPONENT ]
               dispatch(getSpotifyAppCredentials());
               dispatch(getConcertsAPICredentials());

           }else{
               // 2. determine if user has auth saved to local
               const userSavedOnStorage = await getUserSavedOnStorage();

               if(userSavedOnStorage){
                   // 3. Y:
                   console.log('automatic login..')
                   // set state to what's found on local storage
                   await dispatch(setAuthStateFromStorage());
                   // retrive music profile from backend database
                   await dispatch(getMusicProfile());

                    // with user auth and music profile in state, the user is ready to use the app.
                   await dispatch(login());

                   // login to auto navigate to main app stack

               }else{
                   // 3. N:
                   console.log('need to register / login')
                   props.navigation.navigate('LoginWithSpotify');
               }
           }
       }
       loginUserOrAskToRegister();
   }, [appCredentials])

    return loadingScreen();
}


const loadingScreen = () => {
    return (
        <SplashArt/>
    )
}