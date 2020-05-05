import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import GenreBubble from '../../components/artistDetail/GenreBubble'

export default function GenreBubleCards({ genres, style }) {

    return(
        <FlatList
            style = {style}
            data={genres}
            renderItem={({ item }) => <GenreBubble genre={item} />}
            keyExtractor={item => item}
            horizontal={true}
        />
    )
}


const styles = StyleSheet.create({
  container: {
      
  }
});