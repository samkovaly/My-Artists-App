export const SET_CONCERTS = "SET_CONCERTS";




export const getConcerts = () => {
    return async (dispatch, getState) => {
        // fetch concerts data using our auth state
        const concertsAPICredentials = getState().concertsCredentials;
        const eventfulKey = concertsAPICredentials.eventful.key;
        // fetch...


        // await dispatch the result
    }
}