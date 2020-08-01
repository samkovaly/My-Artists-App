import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Dimensions, PixelRatio } from 'react-native';
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

import { adjustSize } from '../../utilities/scaling'

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginWithSpotify(props) {
 
  const insets = useSafeAreaInsets();
  let screenHeight = Dimensions.get('window').height;
  let animationstart = insets.top;
  let animationEnd = screenHeight;

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
    await dispatch(registerWithRefreshToken());
    await dispatch(refreshAndGetMusicProfile());
    await dispatch(setInterestedConcerts());
    
    console.log('logging in')
    await dispatch(login());
    await dispatch(setAnalyzingSpotifyAction(false));
    nav.navigate("MainApp");
  }

  const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

  if(analyzingSpotify){
    return (
      <AnalyzeSpotifyBackgroundAnimation
        runAnimation = {analyzingSpotify}
        animationstart = {animationstart}
        animationEnd = {animationEnd}
      />
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
            textStyle = {styles.buttonText}
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
    marginTop: adjustSize(45),
    marginBottom: adjustSize(30),
    marginHorizontal: adjustSize(25),
  },

  topContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeTo: {
    fontSize: adjustSize(30),
    marginBottom: adjustSize(-10),
  },
  myArtists: {
    fontSize: adjustSize(52),
    color: Colors.THEME_BLUE,
    fontWeight: '600',
  },

  explanationCardsContainer: {
    flexDirection: 'column',
    marginRight: adjustSize(10),
    marginTop: adjustSize(30),
    marginLeft: adjustSize(20),
  },

  explanationCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: adjustSize(10),
    alignItems: 'center',
  },

  explanationCardTextContainer: {
    flexDirection: 'column',
    marginLeft: adjustSize(20),
  },
  explanationCardHeader: {
    fontSize: adjustSize(20),
    fontWeight: '400',
    marginBottom: adjustSize(4),
  },
  explanationCardText: {
    fontSize: adjustSize(15),
    color: Colors.SUB_TEXT_GREY,
  },
  connectAccount: {
    fontSize: adjustSize(20),
    textAlign: 'center',
    marginTop: adjustSize(30),
  },

  buttonContainer: {
    backgroundColor: Colors.SPOTIFY_GREEN,
    borderRadius: 12,
    padding: adjustSize(15),
    width: '100%'
  },
  buttonText: {
    fontSize: adjustSize(18),
  }
});
