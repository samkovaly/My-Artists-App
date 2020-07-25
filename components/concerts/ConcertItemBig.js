import React from 'react';

import ConcertItem from './ConcertItem'
import {PixelRatio } from 'react-native';

const ConcertItemBig = ({ concert, displayConcertName, pressForDetail }) => {
  const fontScale = PixelRatio.getFontScale();
  return (
    <ConcertItem elementHeight = {90}  titleFontSize = {18/fontScale} subtextFontSize = {14/fontScale} marginVertical = {2} concert = {concert} 
      displayConcertName = {displayConcertName} pressForDetail = {pressForDetail} />
  )
}

export default ConcertItemBig;