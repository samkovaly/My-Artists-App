import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

import BasicArtist from '../../components/DisplayArtists/BasicArtist'
import BasicButton from '../../components/BasicButton'

import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function MyArtists(props) {
  const navigation = useNavigation();

  const gotoAllArtists = () => {
    navigation.navigate('AllArtists');
  }
  
  return (
    <View style={styles.container}>
      <BasicButton text = "all artists" onPress = {gotoAllArtists} />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
  },
});