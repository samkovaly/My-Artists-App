import React, { useEffect } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import { Colors, Screens} from '../../styles'
import BaseText from '../../components/BaseText'

import AnalyzeSpotifyBackgroundAnimation from '../../components/AnalyzeSpotifyBackgroundAnimation';

import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../../store/musicProfile/musicProfileActions'
import { setRefreshSpotifyError } from '../../store/musicProfile/musicProfileActions'

import { useNavigation } from '@react-navigation/native';



export default function AnalyzeSpotify({}) {

    const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

    const screenHeight = Dimensions.get('window').height - 133;
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
          <AnalyzeSpotifyBackgroundAnimation runAnimation = {analyzingSpotify} screenHeight = {screenHeight}/>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})