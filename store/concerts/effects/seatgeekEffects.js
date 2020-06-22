
// https://seatgeek.com/account/develop
// http://platform.seatgeek.com/#performers

import { requestJSON, METHODS, makeParameter } from '../../../utilities/HTTPRequests'


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
    
    console.log('PAGES', totalPages)
    concertCalls = [];

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


/*
    Fetches local concerts (within radius) and non-local concerts (all) at this location
    and for only one artist. This is used by the artist's dtail screen and not the concerts screen.
*/
export const fetchAllConcertsForArtist = async(artist, monthsAhead, clientId, lat, lon, radius) => {

    let locationURL = buildConcertsLocationURL(clientId, monthsAhead, lat, lon, radius);
    let nonLocationURL = buildConcertsLocationURL(clientId, monthsAhead);

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

/*
    append artist name to this URL call so call only returns
    events by this artist
*/
const fetchConcertsArtistName = async(url, artistName) => {

    name = artistName.trim()
    // seatgeek specific slug convention
    // for example: W&W -> W-W
    name = name.replace(/&| & | /g,"-")
    url += makeParameter("performers.slug", name);
    
    //console.log("attempting url=", url);

    const response = await getSeatgeek(url);
    const events = mapEvents(response.events);

    return events;
}

/*
    fetches the seatgeek url with GET and checks for errors.
*/
const getSeatgeek = async (url) => {
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


/*
    params:
        isoString: date as ISO string
    returns:
        (example) 'FRI, Mar 12, 8:30pm'
*/
const getDisplayDate = (isoString) => {
    const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();

    const hour24 = date.getHours();
    let hour = null;

    // 0 = 12am
    // 12 = 12pm
    let period = ''; 
    if(hour24 < 12){
      period = 'am';
      hour = hour24
    }else{
      period = 'pm';
      hour = hour24 - 12;
    }

    let minute = date.getMinutes();
    if(minute < 10){
      minute = '0' + minute;
    }

    const fullDisplayDate = dayOfWeek + ' ' + month + ' '+ dayOfMonth + ', ' + hour + ':' + minute + period;
    return fullDisplayDate;
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
            id: event.id,
            description: event.description,
            datetime_local: event.datetime_local,
            datetime_utc: event.datetime_utc,
            displayDate: getDisplayDate(event.datetime_utc),
            date_tbd: event.date_tbd,
            url: event.url,
            venue: venue,
            artists: performers,
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
            url: venue.url,
        }
    }else{
        return null;
    }
}


/*
  Maps event object from seatgeek database to an event object with only the fields MyArtists needs
  Calls:
    mapVenue(), mapPerformers() and getDisplayDate()
*/
/*
const mapEvents = (events) => {
    if(events){
        const mappedEvents = Object.values(events).map((event) => {
            return mapEvent(event)
        })
        return mappedEvents;
    }else{
        return [mapEvent(null)]
    }
}

const mapEvent = (event) => {
    if(event){
        const venue = mapVenue(event.venue);
        const performers = mapPerformers(event.performers);

        return {
            name: event.title,
            status: event.status,
            id: event.id,
            description: event.description,
            datetime_local: event.datetime_local,
            datetime_utc: event.datetime_utc,
            displayDate: getDisplayDate(event.datetime_utc),
            date_tbd: event.date_tbd,
            url: event.url,
            venue: venue,
            artists: performers,
        }
    }else{
        const venue = mapVenue(null);
        const performers = mapPerformers(null);

        return {
            name: null,
            status: null,
            id: null,
            description: null,
            datetime_local: null,
            datetime_utc: null,
            displayDate: null,
            date_tbd: null,
            url: null,
            venue: venue,
            artists: performers,
        }
    }
}

const mapPerformers = (performers) => {
    if(performers){
        const mappedPerformers = Object.values(performers).map((performer) => {
            return mapPerformer(performer)
        })
        return mappedPerformers;
    }else{
        return [mapPerformer(null)]
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
        const genres = mapGenres(null);
        return {
            id: null,
            name: null,
            url: null,
            image: null,
            primary: null,
            type: null,
            genres: genres
        }
    }
}


const mapGenres = (genres) => {
    if(genres){
        const mappedGenres = Object.values(genres).map((genre) => {
            return mapGenre(genre)
        })
        return mappedGenres;
    }else{
        return [mapGenre(null)]
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
        return {
            id: null,
            name: null,
            primary: null,
        }
    }
}

const mapVenues = (venues) => {
    if(venues){
        const mappedVenues = Object.values(venues).map((venue) => {
            return mapVenue(venue)
        })
        return mappedVenues;
    }else{
        return [mapVenue(null)]
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
            url: venue.url,
        }
    }else{
        return {
            name: null,
            id: null,
            address: null,
            city: null,
            state: null,
            url: null,
        }
    }
}
*/