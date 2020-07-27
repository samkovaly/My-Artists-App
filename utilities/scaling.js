

import { Dimensions, PixelRatio } from 'react-native';


const fontScale = PixelRatio.getFontScale();

const pixelRatio = PixelRatio.get();

let screenHeight = Dimensions.get('window').height;

const smallerAdjustRatio = 0.90;
const smaller = screenHeight < 650; //667 is iphone
const bigger = screenHeight > 680;

export const adjustSize = (size) => {
  size = size / fontScale;
  if(smaller){
    size = size * smallerAdjustRatio;
  }
  return size;
}