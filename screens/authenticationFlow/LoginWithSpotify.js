import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Screens, Buttons} from '../../styles';

import { getRefreshToken, registerWithRefreshToken, login } from '../../store/authentication/authenticationActions';

import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../../store/musicProfile/musicProfileActions';
import AnalyzingSpotifyArt from '../../components/AnalyzingSpotifyArt';


/*
N:
direct user to login screen [ LOGIN SCREEN ]

register and analyze on backend [ ANALYZING SPOTIFY SCREEN/COMPONENT ]
get user auth from backend

{ LOAD AUTH STATE AND MUSIC PROFILE WITH THIS CREDENTIALS OBJECT}
auth obj -> auth state
fetch music profile into state
LOGIN to trigger auth nav screen change
*/



export default function LoginWithSpotify(props) {

  const dispatch = useDispatch();





  // ask to sign in to spotify, which will return a refrsh token if successful,
  // and null if the user refused or an error occured

  const LoginUserButtonClicked = async () => {
    // user clicking login button
    await dispatch(getRefreshToken());
    await registerAnalyzeAndGetMusicProfile();
  }

  const registerAnalyzeAndGetMusicProfile = async () => {
    await dispatch(setAnalyzingSpotifyAction(true));
    // user has verified and refresh token is returned
    await dispatch(registerWithRefreshToken());
    // refreshAndGetMusicProfile sets analyzingSpotify state to on then off again
    await dispatch(refreshAndGetMusicProfile());
    await dispatch(setAnalyzingSpotifyAction(false));
    
    await dispatch(login());
  }
  
  //const refreshToken = useSelector(state => state.authentication.refreshToken);

  //if(refreshToken){
  //  registerAnalyzeAndGetMusicProfile();
  //}

  const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

  if(analyzingSpotify){
    return (
      <AnalyzingSpotifyArt/>
    )
  }else{
    return (
      <View style = {styles.loginContainer}>
          <TouchableHighlight
            style = {styles.loginButton}
            onPress={() => {LoginUserButtonClicked()}}>
            <Text style = {styles.loginButtonText}>Login with spotify</Text>
          </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  loginContainer: {
    ...Screens.screenContainerFlexEnd,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: Colors.SPOTIFY_GREEN,
    marginBottom: 40,
    padding: 15,
    borderRadius: 12,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    ...Buttons.largeButtonWhiteText,
  }
});