import React from 'react';
import { useState, useMemo } from 'react'

import { StyleSheet, View } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'

import SearchBar from '../../components/SearchBar';



import PagedFetchFlatlist from '../../components/PagedFetchFlatlist';


export default function ArtistSearch({ queryFunc, initialQuery, renderElementComponent, pageSize }) {

  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState([]);


  const fetchNewPage = async (page) => {
    const newData = await queryFunc(query, page)
    return newData;
  }


    return (
      <View style={styles.container}>
        <View style = {styles.searchBarContainer}>
          <SearchBar
            initialText = {initialQuery}
            searchCallback = {setQuery}
            placeholderText = ""
            autoCapitalize = 'none'
            autoCorrect = {false}
            autoFocus = {false}
          />
        </View>

        <View style = {styles.listContainer}>
            <PagedFetchFlatlist
            data = {data}
            setData = {(data) => setData(data)}
            query = {query}
            fetchData = {(page) => fetchNewPage(page)}
            pageSize = {pageSize}
            renderElementComponent = {renderElementComponent}
            />
        </View>

      </View>
  );
}


const styles = StyleSheet.create({

  container: {
    ...Screens.screenContainer,
    //padding: 4,
  },

  searchBarContainer: {
    //marginTop: 12,
    //marginHorizontal: 6,
  },

  listContainer: {
      marginHorizontal: 6,
      paddingBottom: 60,
  }

});
