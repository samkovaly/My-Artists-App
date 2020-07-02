/**
 * React Native Map Link
 */

import { Platform } from 'react-native'

export const isIOS = Platform.OS === 'ios'

export function generatePrefixes (options) {
  return {
    'apple-maps': isIOS ? 'http://maps.apple.com/' : 'applemaps://',
    'google-maps': prefixForGoogleMaps(options.alwaysIncludeGoogle),
    citymapper: 'citymapper://',
    uber: 'uber://',
    lyft: 'lyft://',
    transit: 'transit://',
    truckmap: 'truckmap://',
    waze: 'waze://',
    yandex: 'yandexnavi://',
    moovit: 'moovit://',
    'yandex-maps': 'yandexmaps://maps.yandex.ru/',
    'yandex-taxi': 'yandextaxi://',
    kakaomap: 'kakaomap://',
    'mapycz':  isIOS ? 'szn-mapy://' : 'mapycz://',
    'maps-me': 'mapsme://'
  }
}

export function prefixForGoogleMaps (alwaysIncludeGoogle) {
  return isIOS && !alwaysIncludeGoogle
    ? 'comgooglemaps://'
    : 'https://maps.google.com/'
}

export function generateTitles (titles) {
  return {
    'apple-maps': 'Apple Maps',
    'google-maps': 'Google Maps',
    citymapper: 'Citymapper',
    uber: 'Uber',
    lyft: 'Lyft',
    transit: 'The Transit App',
    truckmap: 'TruckMap',
    waze: 'Waze',
    yandex: 'Yandex.Navi',
    moovit: 'Moovit',
    'yandex-taxi': 'Yandex Taxi',
    'yandex-maps': 'Yandex Maps',
    kakaomap: 'Kakao Maps',
    mapycz: 'Mapy.cz',
    'maps-me': 'Maps Me',
    ...(titles || {})
  }
}

export const icons = {
  'apple-maps': require('./images/apple-maps.png'),
  'google-maps': require('./images/google-maps.png'),
  citymapper: require('./images/citymapper.png'),
  uber: require('./images/uber.png'),
  lyft: require('./images/lyft.png'),
  transit: require('./images/transit.png'),
  truckmap: require('./images/truckmap.png'),
  waze: require('./images/waze.png'),
  yandex: require('./images/yandex.png'),
  moovit: require('./images/moovit.png'),
  'yandex-taxi': require('./images/yandex-taxi.png'),
  'yandex-maps': require('./images/yandex-maps.png'),
  kakaomap: require('./images/kakao-map.png'),
  mapycz: require('./images/mapycz.png'),
  'maps-me': require('./images/maps-me.png')
}

export const appKeys = Object.keys(icons);
