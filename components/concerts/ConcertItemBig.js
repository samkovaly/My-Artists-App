import React from 'react';

import ConcertItem from './ConcertItem'

const ConcertItemBig = ({ concert, displayConcertName, pressForDetail }) => {
  return (
    <ConcertItem elementHeight = {90}  titleFontSize = {18} subtextFontSize = {14} marginVertical = {12} concert = {concert} 
      displayConcertName = {displayConcertName} pressForDetail = {pressForDetail} />
  )
}

export default ConcertItemBig;