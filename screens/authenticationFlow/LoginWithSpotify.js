import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Screens } from '../../styles';

import { getRefreshToken, registerWithRefreshToken, login } from '../../store/authentication/authenticationActions';

import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../../store/musicProfile/musicProfileActions';
import { setInterestedConcerts } from '../../store/concerts/concertsActions'
import AnalyzeSpotifyBackgroundAnimation from '../../components/AnalyzeSpotifyBackgroundAnimation'


import BaseText from '../../components/BaseText'
import BasicButton from '../../components/BasicButton'

import { useNavigation } from '@react-navigation/native';



import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const nav = useNavigation();


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
    await dispatch(login());
    nav.navigate("MainApp");
  }

  const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

  if(analyzingSpotify){
    return (
      <AnalyzeSpotifyBackgroundAnimation runAnimation = {analyzingSpotify} screenHeight = {screenHeight}/>
    )
  }else{
    return (
      <View style = {styles.container}>
        <View style = {styles.topContainer}>
          <BaseText style = {styles.welcomeTo}>Welcome to</BaseText>
          <BaseText style = {styles.myArtists}>My Artists</BaseText>
          <View style = {styles.explanationCardsContainer}>
            <ExplanationCard
              header="Find concerts tailored for you"
              text = "Find upcoming concerts featuring your favorite artists in your city or any city."
              icon = {<FontAwesome5 name = 'music' style = {{marginBottom: -8, marginRight: 8}} size = {28} color = {Colors.THEME_BLUE} />
                }
            />
            <ExplanationCard
              header="View all your artists"
              text = "Find out what tracks you like from your artists and discover related artists."
              icon = {<MaterialCommunityIcon name = 'artist' style = {{marginBottom: -5, marginRight: -3}} size = {40} color = {Colors.THEME_BLUE} />
                }
            />
            <ExplanationCard
              header="Discover new talent"
              text = "Search for any artist ever to find out when and where they are playing next."
              icon = {<Feather name = 'globe' style = {{marginBottom: 0, marginRight: 1, marginLeft: 5}} size = {33} color = {Colors.THEME_BLUE} />
                }
            />
          </View>
          <BaseText style = {styles.connectAccount}>Connect your Spotify account to get started.</BaseText>
        </View>

        <BasicButton text = "Login With Spotify" onPress={() => {LoginUserButtonClicked()}}
            containerStyle = {styles.buttonContainer}
              underlayColor = {Colors.SPOTIFY_LIGHT_GREEN}
          />

      </View>
    )
  }
}




const ExplanationCard = ({ header, text, icon }) => {
  return (
    <View style={styles.explanationCardContainer}>
      {icon}
      <View style = {styles.explanationCardTextContainer}>
        <BaseText style = {styles.explanationCardHeader}>{header}</BaseText>
        <BaseText style = {styles.explanationCardText}>{text}</BaseText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 30,
    marginHorizontal: 25,
  },

  topContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  /*
  logo: {
    width: '75%',
    height: 60,
    marginTop: 0,
    marginBottom: 55,
  }, */
  welcomeTo: {
    fontSize: 30,
    marginBottom: -5,
  },
  myArtists: {
    fontSize: 52,
    color: Colors.THEME_BLUE,
    fontWeight: '600',
  },

  explanationCardsContainer: {
    flexDirection: 'column',
    marginRight: 10,
    marginTop: 30,
    marginLeft: 20,
  },

  explanationCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },

  explanationCardTextContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  explanationCardHeader: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 4,
  },
  explanationCardText: {
    fontSize: 15,
    color: Colors.SUB_TEXT_GREY,
  },
  connectAccount: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
  },

  buttonContainer: {
    backgroundColor: Colors.SPOTIFY_GREEN,
    borderRadius: 12,
    padding: 15,
    width: '100%'
  }
});