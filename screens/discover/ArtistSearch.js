import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { queryArtistsAtPage } from '../../utilities/spotifyFetches';
import ResourceResults from '../../components/discover/ResourceResults';
import BasicArtist from '../../components/artists/BasicArtist';

const PAGE_SIZE = 12;

export default function ArtistSearch({ route }) {

  console.log('artist search')

  const { initialQuery } = route.params;

  const accessToken = useSelector(state => state.authentication.accessToken.token);

  return (
    <ResourceResults
      queryFunc = {async (query, page) => {return await queryArtistsAtPage(query, page, PAGE_SIZE, accessToken)}}
      initialQuery = {initialQuery}
      renderElementComponent = {(item) => <BasicArtist userArtist = {false} artist = {item} pressForDetail = {true} />}
      pageSize = {PAGE_SIZE}
    />
  );
}