import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Screens } from '../../styles';

import { getRefreshToken, registerWithRefreshToken, login } from '../../store/authentication/authenticationActions';

import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../../store/musicProfile/musicProfileActions';
import { setInterestedConcerts } from '../../store/concerts/concertsActions'
import AnalyzeSpotifyBackgroundAnimation from '../../components/AnalyzeSpotifyBackgroundAnimation'


import BaseText from '../../components/BaseText'
import BasicButton from '../../components/BasicButton'


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

  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();


  // ask to sign in to spotify, which will return a refrsh token if successful,
  // and null if the user refused or an error occured

  const LoginUserButtonClicked = async () => {
    // user clicking login button
    const success = await dispatch(getRefreshToken());
    if(success){
      await registerAnalyzeAndGetMusicProfile();
    }else{
      console.log('user refused or error, no login')
    }
  }

  const registerAnalyzeAndGetMusicProfile = async () => {
    await dispatch(setAnalyzingSpotifyAction(true));
    // user has verified and refresh token is returned
    await dispatch(registerWithRefreshToken());
    // refreshAndGetMusicProfile sets analyzingSpotify state to on then off again
    await dispatch(refreshAndGetMusicProfile());
    await dispatch(setInterestedConcerts());
    
    await dispatch(setAnalyzingSpotifyAction(false));
    dispatch(login());
  }

  const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

  if(analyzingSpotify){
    return (
      <AnalyzeSpotifyBackgroundAnimation runAnimation = {analyzingSpotify} screenHeight = {screenHeight}/>
    )
  }else{
    return (
      <View style = {styles.container}>
        <View style = {styles.textContainer}>
          <BaseText style = {styles.header}>Welcome</BaseText>
          <BaseText style = {styles.subHeader}>Please connect your spotify account</BaseText>
        </View>

        <BasicButton text = "Login With Spotify" onPress={() => {LoginUserButtonClicked()}}
            containerStyle = {{
                  backgroundColor: Colors.SPOTIFY_GREEN,
                  marginBottom: 40,
                  borderRadius: 12,
                  padding: 15,
                }}
          />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    marginTop: 40,
    marginHorizontal: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: '400',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 26,
    fontWeight: '200',
    color: Colors.LIGHT_GREY,
  },
});