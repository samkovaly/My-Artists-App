import React from 'react';

import ConcertItem from './ConcertItem'

const ConcertItemSmall = ({ concert, displayConcertName, pressForDetail }) => {
  return (
    <ConcertItem elementHeight = {75}  titleFontSize = {16} subtextFontSize = {12} marginVertical = {2} concert = {concert} 
      displayConcertName = {displayConcertName} pressForDetail = {pressForDetail} />
  )
}

export default ConcertItemSmall;