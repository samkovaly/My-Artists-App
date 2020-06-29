


export const getArtistImageSourceSmall = (artist) => {
    if(artist && artist.smallImage){
        return {uri: artist.smallImage}
    }
    return require('../graphics/blank-artist.jpg');
}
export const getArtistImageSourceBig = (artist) => {
    if(artist && artist.bigImage){
        return {uri: artist.bigImage}
    }
    return require('../graphics/blank-artist.jpg');
}

export const getConcertImageSource = (concert) => {
    if(concert && concert.performers && concert.performers[0] && concert.performers[0].image){
      return {uri: concert.performers[0].image}
    }else{
      return require('../graphics/blank-artist.jpg');
    }
}

export const getTrackImageSource = (track) => {
    return {uri: track.image_url}
}