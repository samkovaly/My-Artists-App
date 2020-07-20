import { queryArtistsAtPage } from "./spotifyFetches";



// seatgeek performer -> correct spotify artist
export const performersToArtists = async (performers, accessToken, extractedArtistsSlugMap) => {
    let calls = [];
    for(var performer of performers){
      calls.push( new Promise( (resolve, reject) => {
        return resolve(performerToArtist(performer, accessToken, extractedArtistsSlugMap));
      }));
    }
  
    try {
        var artists = await Promise.all(calls);
    }
    catch(err) {
        console.log(err);
    };
  
    return artists;
  }


const performerToArtist = async(performer, accessToken, extractedArtistsSlugMap) => {

    var queriedArtists = await queryArtistsAtPage(performer.name, 1, 5, accessToken);
    
    let chosenArtist = null;
    if(queriedArtists.length > 0){
      // one of these artist returns (items) is the artist we want.
      // looking for an exact name match if possible.
      for(var spotifyArtist of queriedArtists){
        if(spotifyArtist.name == performer.name){
          chosenArtist = spotifyArtist;
          break;
        }
      }
      // take first if nothing else.
      if(chosenArtist == null){
        chosenArtist = queriedArtists[0];
      }
    }else{
        // performer does not exist on spotify
        return null;
    }

    const artist = spotifyArtistGetArtist(chosenArtist, extractedArtistsSlugMap);
    return artist;
}

export const spotifyArtistsGetArtists = (spotifyArtists, extractedArtistsSlugMap) => {
    const artists = spotifyArtists.map((spotifyArtist) => {
        return spotifyArtistGetArtist(spotifyArtist, extractedArtistsSlugMap);
    })
    return artists;
}

// used to init userExtracted artists
export const spotifyArtistsToArtists = (spotifyArtists, userExtracted) => {
    const artists = spotifyArtists.map((spotifyArtist) => {
        return spotifyArtistToArtist(spotifyArtist, userExtracted);
    })
    return artists;
}

const spotifyArtistGetArtist = (spotifyArtist, extractedArtistsSlugMap) => {
    let slug = getSlug(spotifyArtist);


    // if its null, there was a backend error
    if(extractedArtistsSlugMap != null && extractedArtistsSlugMap.has(slug)){
        // use extractedArtist object
        return extractedArtistsSlugMap.get(slug);
    }else{
        // create new object with required properties. extracted=false
        const what = spotifyArtistToArtist(spotifyArtist, false);
        return what;
    }
}

const spotifyArtistToArtist = (spotifyArtist, userExtracted) => {
    const slug = getSlug(spotifyArtist);

    let smallImage = null;
    let bigImage = null;
    if(userExtracted){
        // not your normal spotify artist, comes from the backend
        smallImage = spotifyArtist.smallImage;
        bigImage = spotifyArtist.bigImage;
    }else{
        if(spotifyArtist.images.length > 0){
            smallImage = spotifyArtist.images[spotifyArtist.images.length - 1].url;
            bigImage = spotifyArtist.images[0].url;
        }
    }

    return {
        ...spotifyArtist,
        slug: slug,
        smallImage: smallImage,
        bigImage: bigImage,
        userExtracted: userExtracted,
    }
}

const getSlug = (artist) => {
    let slug = artist.name.trim()
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // seatgeek specific slug convention
    // for example: W&W -> W-W
    slug = slug.replace(/&| & | /g,"-")
    slug = slug.toLowerCase();
    return slug;
}