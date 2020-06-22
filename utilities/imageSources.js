

export const getArtistImageSource = (artist) => {
    if(artist && artist.image){
        return {uri: artist.image}
    }
    if(artist && artist.images && artist.images[0] && artist.images[0].url){
        return {uri: artist.images[0].url}

    }
    return require('../graphics/blank-artist.jpg');
}



export const getConcertImageSource = (concert) => {
    if(concert && concert.artists && concert.artists[0] && concert.artists[0].image){
      return {uri: concert.artists[0].image}
    }else{
      return require('../graphics/blank-artist.jpg');
    }
}

export const getTrackImageSource = (track) => {
    return {uri: track.image_url}
}
