

// https://seatgeek.com/account/develop
// http://platform.seatgeek.com/#performers

import { requestJSON, METHODS, makeParameter } from '../../../utilities/HTTPRequests'



const URL = "https://api.seatgeek.com/2/events?"


export const fetchConcertsForManyArtists = async(artists, clientId, lat, lon, radius) => {

    let url = buildBaseURL(clientId, lat, lon, radius);
    
    //const testArtists = ['andrey pushkarev', 'chet porter', 'heerhorst', 'nicola cruz']
    
    concertCalls = [];

    for(let i = 0; i < artists.length; i += 1){
        concertCalls.push( new Promise( (resolve, reject) => {
            return resolve(fetchConcertsArtistName(url, artists[i].name_ascii));
        } ));
    }

    // execute and wait
    try {
        var concerts = await Promise.all(concertCalls);
    }
    catch(err) {
        console.log(err);
    };

    // join arrays
    let allConcerts = [];
    for(let i = 0; i < concerts.length; i += 1){
        allConcerts.push(...concerts[i]);
    }
    return allConcerts;
}



// get concerts for this artist within the range, and all other ones outside the range.
export const fetchAllConcertsForArtist = async(artist, clientId, lat, lon, radius) => {

    let locationURL = buildBaseURL(clientId, lat, lon, radius);
    let nonLocationURL = buildBaseURL(clientId);


    // run location and non-location calls at the same time to save time.
    concertCalls = [];
    concertCalls.push( new Promise( (resolve, reject) => {
        return resolve(fetchConcertsArtistName(locationURL, artist.name_ascii))
    } ));
    concertCalls.push( new Promise( (resolve, reject) => {
        return resolve(fetchConcertsArtistName(nonLocationURL, artist.name_ascii))
    } ));


    // execute and wait
    try {
        var concerts = await Promise.all(concertCalls);
    }
    catch(err) {
        console.log(err);
    };


    const localConcerts = concerts[0]

    const nonLocalConcerts = concerts[1].filter(nonLocalConcert => {
        for(localConcert of localConcerts){
            if(nonLocalConcert.id == localConcert.id){
                // leave out
                return false
            }
        }
        return true;
    })

    return {
        localConcerts,
        nonLocalConcerts,
    }
}


const fetchConcertsArtistName= async(url, artistName) => {

    name = artistName.trim()
    name = name.replace(/&| & | /g,"-")
    url += makeParameter("performers.slug", name);
    
    //console.log("attempting url=", url);

    const response = await requestJSON(url, METHODS.GET);

    if(response.status){
        console.log('ERROR with status:', response.status, "at url:", url, 'arist:', artist, ":", response);
        return [];
    }

    try {
        const events = mapEvents(response.events);
        return events
    } catch (error) {
        console.log(error, '\n', response)
        return []
    }
}



const buildBaseURL = (clientId, lat=null, lon=null, radius=null) => {
    var now = new Date();
    var nowISO = now.toISOString().substring(0,10);

    // pre-build URL
    let url = URL;
    url += makeParameter("client_id", clientId);
    if(lat) url += makeParameter("lat", lat);
    if(lon) url += makeParameter("lon", lon);
    if(radius) url += makeParameter("range", radius + 'mi');
    url += makeParameter("datetime_utc.gte", nowISO);
    url += makeParameter("sort", "datetime_utc.asc");
    return url;
}





const mapEvents = (events) => {
    if(events){
        const mappedEvents = Object.values(events).map((event) => {

            const venue = mapVenue(event.venue);
            const performers = mapPerformers(event.performers);

            return {
                name: event.title,
                type: event.type, 
                status: event.status,
                id: event.id,
                description: event.description,
                datetime_local: event.datetime_local,
                datetime_utc: event.datetime_utc,

                date_tbd: event.date_tbd,

                url: event.url,

                venue: venue,
                artists: performers,
            }
        })
        return mappedEvents;
    }else{
        return [];
    }

}


const mapPerformers = (performers) => {
    if(performers){
        const mappedPerformers = Object.values(performers).map((performer) => {
            const genres = mapGenres(performer.genres);
            return {
                id: performer.id,
                name: performer.name,
                slug: performer.slug,
                url: performer.url,
                image: performer.image,
                primary: performer.primary,
                type: performer.type,
                genres: genres,
            }
        })
        return mappedPerformers;
    }else{
        //return null;
        // to keep same structure
        const genres = mapGenres(null);
        return [{
            id: null,
            name: null,
            url: null,
            image: null,
            primary: null,
            type: null,
            genres: genres
        }]
    }

}

const mapGenres = (genres) => {
    if(genres){
        const mappedGenres = Object.values(genres).map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
                primary: genre.primary,
            }
        })
        return mappedGenres;
    }else{
        //return null;
        return [{
            id: null,
            name: null,
            primary: null,
        }]
    }
}

const mapVenue = (venue) => {
    if(venue){
        return {
            name: venue.name,
            id: venue.id,
            city: venue.city,
            url: venue.url,
        }
    }else{
        return {
            name: null,
            id: null,
            city: null,
            url: null,
        }
    }
}