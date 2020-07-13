import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, Screens, Buttons, Font } from '../../styles'

import { useDispatch } from 'react-redux'

import { queryArtistsAtPage } from '../../utilities/spotifyFetches';
import ResourceResults from '../../components/discover/ResourceResults';
import ArtistItem from '../../components/artists/ArtistItem';

import { spotifyArtistsGetArtists } from '../../utilities/artists'

import { updateAndGetAccessToken } from '../../utilities/updateAndGetState';

const PAGE_SIZE = 12;

export default function ArtistSearch({ route }) {
  const dispatch = useDispatch();

  console.log('artist search')

  const { initialQuery } = route.params;

  const extractedArtistsSlugMap = useSelector(state => state.musicProfile.artistSlugMap)

  return (
    <ResourceResults
      queryFunc = {async (query, page) => {
        const accessToken = await updateAndGetAccessToken(dispatch);
        let artists = await queryArtistsAtPage(query, page, PAGE_SIZE, accessToken);
        artists = spotifyArtistsGetArtists(artists, extractedArtistsSlugMap);
        return artists;
      }}
      initialQuery = {initialQuery}
      renderElementComponent = {(item) => <ArtistItem artist = {item} pressForDetail = {true} />}
      pageSize = {PAGE_SIZE}
      placeholderText = "Find artists"
    />
  );
}