import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import BaseText from '../BaseText';
import ArtistCard from './ArtistCard';

export default function ArtistHorizontalCards({ title, artists }) {

    return(
        artists.length > 0 ?
        <View style = {styles.container}>
            <BaseText style = {styles.title}>{title}</BaseText>
            <FlatList
                //style = {style}
                data={artists}
                renderItem={({ item }) => <ArtistCard artist={item} />}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
            />
        </View>
        : null
    )
}


const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      marginHorizontal: 6,
      marginBottom: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    margin: 8,
  },
});