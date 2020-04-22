


import { requestJSON, requestXML, METHODS } from '../../../utilities/HTTPRequests'


const URL = "http://api.eventful.com/rest/events/search?"


export const fetchConcertsAtLocation = async(artists, lat, long, radius, apiKey) => {


    // date to implement later
    var now = new Date();
    var dateISO = now.toISOString().split('.')[0]+"Z";
    console.log(dateISO)

    // prepare base URL
    const artistNames = Object.values(artists).map((artist) => {return artist.name})

    const query = makePerformersQuery(artistNames);
    let url = URL + query;
    //url += "&location=" + lat + "," + long;
    url += "&app_key=" + apiKey;
    url += "&page_size=30";

    //url += "&location=London";
    //url += "&when=Today";
    //url += "&within=" + radius;
    //url += "&sort_order=date";
    //url += "&units=mi";

    // get pages from initial request
    const response = await requestXML(url, METHODS.GET);
    let pageCount = response.search.page_count[0]
    pageCount = 1

    // prepare all calls with for all pages
    callsArray = [];
    for(let page = 1; page <= pageCount; page += 1){
        callsArray.push( new Promise( (resolve, reject) => { resolve(fetchConcertsAtLocationPage(url, page)) } ));
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


    // return
    return allEvents;
}



const fetchConcertsAtLocationPage = async(url, page) => {
    url += "&page_number=" + page;
    console.log('fethcing artists with page ', page, '...');
    const response = await requestXML(url, METHODS.GET);
    console.log('respose received for page ', page);
    const events =  processEvents(response);
    console.log('events processed for page ', page)
    return events
}


const makePerformersQuery = (performerNames) => {
    // "q=performer:\"Tame+Impala\"+||+performer:\"Phish\"+||+performer:\"Alicia Keys\""
    let query = "q=";
    for(let i = 0; i < performerNames.length; i++){
        let artistQuery = "performer:\"" + performerNames[i] + "\"";
        if(i != performerNames.length-1){
            artistQuery += "+||+";
        }
        query += artistQuery;
    }
    return query;
}



const processEvents = (response) => {

    const events = Object.values(response.search.events[0].event).map((event) => {
        const performer = event.performers[0] != "" ? event.performers[0].performer[0] : null;
        let image = null

        if(event.image[0] == ""){
            image = {
                url: null,
                width: null,
                height: null,
            }
        }else if(event.image[0].url){
            image = {
                url: event.image[0].url[0],
                width: event.image[0].width[0],
                height: event.image[0].height[0],
            }
        }else if(event.image[0].medium[0]){
            image = {
                url: event.image[0].medium[0].url[0],
                width: event.image[0].medium[0].width[0],
                height: event.image[0].medium[0].height[0],
            }
        }

        return {
            name: event.title[0],
            id: event.$.id,
            url: event.url[0],
            description: event.description[0],
            status: null,
            image:image,
            start:{
                localDate: event.start_time[0],
                dateTBD: null,
                dateTBA: null,
            },
            venue:{
                name: event.venue_name[0],
                id: event.venue_id[0],
                city: null,
                postalCode: null,
                url: event.venue_url[0],
            },
            artist: performer ? {
                name: performer.name[0],
                id: performer.id[0],
                url: performer.url[0],
                short_bio: performer.short_bio[0],
                image:{
                    ratio: null,
                    url: null,
                    width: null,
                    height: null,
                },
                genre: {
                    name: null,
                    id: null,
                },
                subGenre: {
                    name: null,
                    id: null,
                },
            } : null,
        }
    })

    return events;
}