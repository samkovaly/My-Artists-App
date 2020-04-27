

//Search for music events in the Los Angeles area
// https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=TK7XqVLoPjAveaxyqpBugA3UA9cw07PQ


// /discovery/v2/attractions
// Find attractions (artists, sports, packages, plays and so on) and filter your search by name, and much more.


/* EXAMPLES */
// https://github.com/ticketmaster-api/ticketoffice-app/blob/master/src/common/components/AttractionDetails.js
// https://github.com/ticketmaster-api/ticketoffice-app/blob/master/src/common/actions/eventOffers.js
// https://github.com/ticketmaster-api/tm-api/blob/master/src/index.js

import { requestJSON, METHODS } from '../../../utilities/HTTPRequests'



const URL = "https://app.ticketmaster.com/discovery/v2/"
const URL2 = "https://app.ticketmaster.eu/mfxapi/v2/"
const eventsURL = URL + "events.json?"
const eventsURL2 = URL2 + "events.json?"



export const fetchConcertsAtLocation = async(artists, lat, long, radius, apiKey) => {

    var now = new Date();
    var dateISO = now.toISOString().split('.')[0]+"Z";
    console.log(dateISO)



    // call defaults
    let url = eventsURL + "segmentName=music" + "&includeTBA=yes" + "&includeTBD=yes" + "&sort=date,name,asc"

    url += "&unit=miles" + "&startDateTime=" + dateISO;

    // parameters of the call
    url += "&latlong=" + lat + "," + long + "&radius=" + radius + "&apikey=" + apiKey;

        
    callsArray = [];

    for(let artist_index = 0; artist_index <= 20; artist_index += 1){
    //for(let artist_index = 0; artist_index <= artists.length; artist_index += 1){
        callsArray.push( new Promise( (resolve, reject) => {
            return resolve(fetchConcertAtLocation(url, artists[artist_index].name, lat, long, radius, apiKey))
        } ));
    }

    // execute and wait
    try {
        var callReturns = await Promise.all(callsArray);
    }
    catch(err) {
        console.log(err);
    };


    // join arrays
    let allEvents = []
    for(let i = 0; i < callReturns.length; i += 1){
        allEvents.push(...callReturns[i]);
    }


    console.log(allEvents);
    let concerts = [];

    //for(let i = 0; i < artists.length; i++){
    //    concerts.push(...await fetchConcertAtLocation(artists[i].name, lat, long, radius, apiKey));
    //}

    //const fakeArtists = ['MIKA', 'Disclosure']
    //for(let i = 0; i < fakeArtists.length; i++){
    //    concerts.push(...await fetchConcertAtLocation(fakeArtists[i], lat, long, radius, apiKey));
    //}
    return allEvents;
}


const fetchConcertAtLocation = async(url, artistName, lat, long, radius, apiKey) => {

    url += "&keyword=" + artistName;
    console.log("attempting url=", url);
    const response = await requestJSON(url, METHODS.GET);

    if(!response.page){
        console.log('ERROR', url, response, response.page);
    }
    if(response.page.totalElements == 0){
        return [];
    }
    const events = Object.values(response._embedded.events).map((event) => {

        console.log('\n', event.name, '\n')
        //console.log(event)
        const embedded = event._embedded;

        const start = event.dates ? event.dates.start : null;

        const attractions = embedded.attractions ? embedded.attractions[0] : null;
        const classifications = embedded.classifications ? attractions.classifications[0] : null;
        
        return {
            name: event.name,
            id: event.id,
            url: event.url,
            status: event.dates.status.code,
            image: event.images? {
                ratio: event.images[0].ratio,
                url: event.images[0].url,
                width: event.images[0].width,
                height: event.images[0].height,
            } : null,
            start: start?{
                localDate: start.localDate,
                dateTBD: start.dateTBD,
                dateTBA: start.dateTBA,
            } : null,
            venue: embedded.venues? {
                name: embedded.venues[0].name,
                id: embedded.venues[0].id,
                city: embedded.venues[0].city.name,
                postalCode: embedded.venues[0].postalCode,
            } : null,
            artist: attractions ? {
                name: attractions.name,
                id: attractions.id,
                image: attractions.images? {
                    ratio: attractions.images[0].ratio,
                    url: attractions.images[0].url,
                    width: attractions.images[0].width,
                    height: attractions.images[0].height,
                } : null,
                genre: classifications && classifications.genre? {
                    name: classifications.genre.name,
                    id: classifications.genre.id,
                } : null,
                subGenre: classifications && classifications.subGenre? {
                    name: classifications.subGenre.name,
                    id: classifications.subGenre.id,
                } : null,
            } : null,
        }
    })
    return events
}



export const TESTfetchConcertsAtLocation = async(artistName, lat, long, radius, apiKey) => {
    
    var now = new Date();
    var dateISO = now.toISOString().split('.')[0]+"Z";
    console.log(dateISO)

    // call defaults
    let url = eventsURL + "segmentName=music" + "&includeTBA=yes" + "&includeTBD=yes" + "&sort=date,name,asc"

    url += "&unit=miles" + "&startDateTime=" + dateISO;

    // parameters of the call
    url += "&latlong=" + lat + "," + long + "&radius=" + radius + "&apikey=" + apiKey;

    console.log("attempting url=", url);
    const response = await requestJSON(url, METHODS.GET);

    console.log('page', response.page)


    const events = Object.values(response._embedded.events).map((event) => {

        //console.log('\n', event.name, '\n')
        //console.log(event)
        const embedded = event._embedded;

        const start = event.dates ? event.dates.start : null;

        const attractions = embedded.attractions ? embedded.attractions[0] : null;
        const classifications = embedded.classifications ? attractions.classifications[0] : null;
        
        return {
            name: event.name,
            id: event.id,
            url: event.url,
            description: null,
            status: event.dates.status.code,
            image: event.images? {
                ratio: event.images[0].ratio,
                url: event.images[0].url,
                width: event.images[0].width,
                height: event.images[0].height,
            } : null,
            start: start?{
                localDate: start.localDate,
                dateTBD: start.dateTBD,
                dateTBA: start.dateTBA,
            } : null,
            venue: embedded.venues? {
                name: embedded.venues[0].name,
                id: embedded.venues[0].id,
                city: embedded.venues[0].city.name,
                postalCode: embedded.venues[0].postalCode,
                url: null,
            } : null,
            artist: attractions ? {
                name: attractions.name,
                id: attractions.id,
                url: null,
                short_bio: null,
                image: attractions.images? {
                    ratio: attractions.images[0].ratio,
                    url: attractions.images[0].url,
                    width: attractions.images[0].width,
                    height: attractions.images[0].height,
                } : null,
                genre: classifications && classifications.genre? {
                    name: classifications.genre.name,
                    id: classifications.genre.id,
                } : null,
                subGenre: classifications && classifications.subGenre? {
                    name: classifications.subGenre.name,
                    id: classifications.subGenre.id,
                } : null,
            } : null,
        }
    })
    return events
}