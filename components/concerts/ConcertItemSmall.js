import React from 'react';

import ConcertItem from './ConcertItem'
import {PixelRatio } from 'react-native';

const ConcertItemSmall = ({ concert, displayConcertName, pressForDetail }) => {
  const fontScale = PixelRatio.getFontScale();
  return (
    <ConcertItem elementHeight = {75}  titleFontSize = {16/fontScale} subtextFontSize = {12/fontScale} marginVertical = {2} concert = {concert} 
      displayConcertName = {displayConcertName} pressForDetail = {pressForDetail} />
  )
}

export default ConcertItemSmall;