import React, { useEffect } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import { Colors, Screens, Constants} from '../../styles'
import BaseText from '../../components/BaseText'

import AnalyzeSpotifyBackgroundAnimation from '../../components/AnalyzeSpotifyBackgroundAnimation';

import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../../store/musicProfile/musicProfileActions'
import { setRefreshSpotifyError } from '../../store/musicProfile/musicProfileActions'

import { useNavigation } from '@react-navigation/native';

import { useHeaderHeight } from '@react-navigation/stack';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AnalyzeSpotify({}) {

    const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

    const headerHeight = useHeaderHeight();
    const screenHeight = Dimensions.get('window').height
    const insets = useSafeAreaInsets();
    const animationstart = 0;
    const animationEnd = (screenHeight - headerHeight) - (Constants.BOTTOM_NAV_HEIGHT + insets.bottom)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const startScan = async () => {
      dispatch(setRefreshSpotifyError(false));
      await dispatch(setAnalyzingSpotifyAction(true));
      await dispatch(refreshAndGetMusicProfile());
      await dispatch(setAnalyzingSpotifyAction(false));
      

      if(navigation.isFocused()){
        navigation.goBack();
      }
    }

    useEffect(() => {
        startScan();
    }, [])

    return (    
      <View style = {styles.container}>
        <AnalyzeSpotifyBackgroundAnimation
          runAnimation = {analyzingSpotify}
          animationstart = {animationstart}
          animationEnd = {animationEnd}
        />
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    flex: 1,
  },
})