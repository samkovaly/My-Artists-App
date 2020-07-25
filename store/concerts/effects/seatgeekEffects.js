
// https://seatgeek.com/account/develop
// http://platform.seatgeek.com/#performers

import { requestJSON, METHODS, makeParameter } from '../../../utilities/HTTPRequests'
import { getDisplayDate, getDisplayTime } from '../../../utilities/displayStrings'

const URL = "https://api.seatgeek.com/2"
const EVENTS_URL = URL + "/events?"
const PER_PAGE = 50;



export const queryConcertsAtPage = async (query, page, pageSize, clientId) => {

    if(query == null || query == ""){
        return [];
    }

    let url = EVENTS_URL;
    formattedQuery = formatQuery(query)
    url += makeParameter('q', formattedQuery);
    url += makeParameter("client_id", clientId);
    url += makeParameter('per_page', pageSize);
    url += makeParameter("sort", "datetime_utc.asc");
    url += makeParameter('type', 'concert')

    const concerts = await fetchEventsAtPage(url, page)
    return concerts;
}

/*
    user input is messy, needs to be cleaned before passed to seatgeek
*/
const formatQuery = (query) => {
    let queryArray = query.toLowerCase().split(' ');
    return queryArray.join("+");    
}

const fetchEventsAtPage = async(url, page) => {
    const pagedURL = url + makeParameter('page', page);
    const response = await getSeatgeek(pagedURL);
    const events = mapEvents(response.events);
    return events
}


/*
    fetches all concerts at this location within this range.
*/
export const fetchAllConcertsAtLocation = async (clientID, monthsAhead, lat, long, radius) => {

    let url = buildConcertsLocationURL(clientID, monthsAhead, lat, long, radius);
    // need initial call to get total pages
    const totalPages = await getTotalPages(url);
    
    let concertCalls = [];

    for(let page = 1; page <= totalPages; page += 1){
        concertCalls.push( new Promise( (resolve, reject) => {
            return resolve(fetchEventsAtPage(url, page));
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


/*
    Used to get the total pages that this URL fetch will produce.
*/
const getTotalPages = async (url) => {
    const response = await getSeatgeek(url);
    const totalPages = Math.ceil(response.meta.total / PER_PAGE);
    return totalPages
}


export const fetchConcertsByID = async(Ids, clientId) => {
    // gather promises
    let url = EVENTS_URL;
    url += makeParameter("client_id", clientId);
    url += makeParameter("sort", "datetime_utc.asc");
    url += makeParameter('type', 'concert')

    let concertCalls = [];
    for(id of Ids){
        concertCalls.push( new Promise( (resolve, reject) => {
            return resolve(fetchEventsAtID(url, id));
        } ));
    }

    // execute and wait
    try {
        var concerts = await Promise.all(concertCalls);
    }
    catch(err) {
        console.log(err);
    };

    return concerts;
}

export const fetchConcertByID = async(id, clientId) => {
    let url = EVENTS_URL;
    url += makeParameter("client_id", clientId);
    url += makeParameter('type', 'concert')
    const concert = await fetchEventsAtID(url, id);
    return concert;
}

const fetchEventsAtID = async(url, id) => {
    const urlID = url + makeParameter('id', id);
    const response = await getSeatgeek(urlID);
    const events = mapEvents(response.events);
    return events[0];
}



export const fetchNonLocalConcertsForArtist = async(artist, monthsAhead, clientId) => {
    let nonLocationURL = buildConcertsLocationURL(clientId, monthsAhead);
    const nonLocalConcerts = await fetchConcertsArtistSlug(nonLocationURL, artist.slug);
    return {
        localConcerts: [],
        nonLocalConcerts: nonLocalConcerts,
    }
}

/*
    Fetches local concerts (within radius) and non-local concerts (all) at this location
    and for only one artist. This is used by the artist's dtail screen and not the concerts screen.
*/
export const fetchAllConcertsForArtist = async(artist, monthsAhead, clientId, lat, lon, radius) => {

    let locationURL = buildConcertsLocationURL(clientId, monthsAhead, lat, lon, radius);
    let nonLocationURL = buildConcertsLocationURL(clientId, monthsAhead);

    // run location and non-location calls at the same time to save time.
    let concertCalls = [];
    concertCalls.push( new Promise( (resolve, reject) => {
        return resolve(fetchConcertsArtistSlug(locationURL, artist.slug))
    } ));
    concertCalls.push( new Promise( (resolve, reject) => {
        return resolve(fetchConcertsArtistSlug(nonLocationURL, artist.slug))
    } ));

    // execute and wait
    try {
        var concerts = await Promise.all(concertCalls);
    }
    catch(err) {
        console.log(err);
    };

    const localConcerts = concerts[0]
    // dont want duplicates
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

/*
    append artist name to this URL call so call only returns
    events by this artist
*/
const fetchConcertsArtistSlug = async(url, slug) => {
    url += makeParameter("performers.slug", slug);
    const response = await getSeatgeek(url);
    const events = mapEvents(response.events);
    return events;
}

/*
    fetches the seatgeek url with GET and checks for errors.
*/
export const getSeatgeek = async (url) => {
    const response = await requestJSON(url, METHODS.GET);
    if(response.status){
        console.log('ERROR with status:', response.status, "at url:", url, ":", response);
        return null;
    }
    return response;
}


/*
    Builds the URL fetch call for seatgeek.
    These are the basic parameters, more can be appended on after this URL is returned
*/
const buildConcertsLocationURL = (clientId, monthsAhead=1, lat=null, lon=null, radius=null) => {
    var now = new Date();
    var nowISO = now.toISOString().substring(0,10);
    
    now.setMonth(now.getMonth() + monthsAhead)
    var endISO = now.toISOString().substring(0,10);

    let url = EVENTS_URL;
    url += makeParameter("client_id", clientId);
    if(lat) url += makeParameter("lat", lat);
    if(lon) url += makeParameter("lon", lon);
    if(radius) url += makeParameter("range", radius + 'mi');

    url += makeParameter("datetime_utc.gte", nowISO);
    url += makeParameter('datetime_utc.lte', endISO)

    url += makeParameter("sort", "datetime_utc.asc");
    url += makeParameter('per_page', PER_PAGE);

    // hmmm
    url += makeParameter('type', 'concert')

    return url;
}
  
const mapEvents = (events) => {
    if(events){
        const mappedEvents = Object.values(events).map((event) => {
            return mapEvent(event)
        })
        return mappedEvents;
    }else{
        return []
    }
}

const mapEvent = (event) => {
    if(event){
        const venue = mapVenue(event.venue);
        const performers = mapPerformers(event.performers);
        
        return {
            name: event.title,
            status: event.status,
            id: event.id.toString(),
            description: event.description,
            datetime_local: event.datetime_local,
            datetime_utc: event.datetime_utc,
            displayDateShort: getDisplayDate(event.datetime_local, false),
            displayDateFull: getDisplayDate(event.datetime_local, true),
            displayTime: getDisplayTime(event.datetime_local),
            date_tbd: event.date_tbd,
            url: event.url,
            venue: venue,
            performers: performers,
        }
    }else{
        return null;
    }
}

const mapPerformers = (performers) => {
    if(performers){
        const mappedPerformers = Object.values(performers).map((performer) => {
            return mapPerformer(performer)
        })
        return mappedPerformers;
    }else{
        return []
    }
}

const mapPerformer = (performer) => {
    if(performer){
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
    }else{
        return null;
    }
}


const mapGenres = (genres) => {
    if(genres){
        const mappedGenres = Object.values(genres).map((genre) => {
            return mapGenre(genre)
        })
        return mappedGenres;
    }else{
        return []
    }
}

const mapGenre = (genre) => {
    if(genre){
        return {
            id: genre.id,
            name: genre.name,
            primary: genre.primary,
        }
    }else{
        return null;
    }
}

const mapVenues = (venues) => {
    if(venues){
        const mappedVenues = Object.values(venues).map((venue) => {
            return mapVenue(venue)
        })
        return mappedVenues;
    }else{
        return []
    }
}

const mapVenue = (venue) => {
    if(venue){
        return {
            name: venue.name,
            id: venue.id,
            address: venue.address,
            city: venue.city,
            state: venue.state,
            location: venue.location,
            url: venue.url,
        }
    }else{
        return null;
    }
}