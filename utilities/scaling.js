

import { Dimensions, PixelRatio } from 'react-native';


const fontScale = PixelRatio.getFontScale();
console.log('fontScale: ', fontScale)

const pixelRatio = PixelRatio.get();
console.log('pixele ratio:', pixelRatio);

let screenHeight = Dimensions.get('window').height;
console.log('height:', screenHeight);

const smallerAdjustRatio = 0.90;
const smaller = screenHeight < 650; //667 is iphone
const bigger = screenHeight > 680;

console.log('smaller', smaller)
console.log('bigger', bigger)

export const adjustSize = (size) => {
  size = size / fontScale;
  if(smaller){
    size = size * smallerAdjustRatio;
  }
  return size;
}