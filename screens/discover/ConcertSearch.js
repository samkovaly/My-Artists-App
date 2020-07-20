import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { queryConcertsAtPage } from '../../store/concerts/effects/seatgeekEffects';
import ResourceResults from '../../components/discover/ResourceResults';
import ConcertItemSmall from '../../components/concerts/ConcertItemSmall';

const PAGE_SIZE = 12;

export default function ConcertSearch({ route }) {
  
  const { initialQuery } = route.params;

  const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);

  return (
    <ResourceResults
      queryFunc = {async (query, page) => {return await queryConcertsAtPage(query, page, PAGE_SIZE, seatgeekClientId)}}
      initialQuery = {initialQuery}
      renderElementComponent = {(item) => <ConcertItemSmall concert = {item} pressForDetail = {true} />}
      pageSize = {PAGE_SIZE}
      placeholderText = "Find concerts"
    />
  );
}