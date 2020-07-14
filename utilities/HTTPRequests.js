


export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
}




/* STANDARD JSON RETURN

*/

export const requestSpotify = async(URL, method, headers = null, body = null) => {
  console.log('requestSpotify')
  //console.log('attempting ', URL, ' with method', method, ', headrs', headers, 'body', body)
  
  const responseJson = await requestJSON(URL, method, headers, body);
  if(responseJson.error){
    console.log("ERROR while requesting spotify: " + URL + " with method " + method
      + " and headers " + headers + " and body " + body)
    if(responseJson.error.hasOwnProperty('status')){
      console.log("Status:", responseJson.error.status, ', message:', responseJson.error.message);
    }else{
      console.log(responseJson.error, 'error description:', responseJson.error_description);
    }
  }
  return responseJson;
}

export const requestBackend = async(URL, method, headers = null, body = null) => {
  const responseJson = await requestJSON(URL, method, headers, body);
  return responseJson;
}

export const requestJSON = async (URL, method, headers = null, body = null) => {
    let response = null;
    try{
      response = await fetch(URL, {
          method: method,
          headers: headers,
          body: body,
      })
    }catch(error){
      console.log("network error: ", error, " with URL:", URL, "method: ", method, "headers:", headers, "and body:", body)
    }

    let responseJson = null;
    try{
      responseJson = await response.json();
    }catch(error){
      console.log('response.json() error: ', error);
      console.log('for ', URL, method, headers, body)
      return null;
    }
    return responseJson;
}



export const requestXML = async (URL, method, headers = null, body = null) => {

  const response = await fetch(URL, {
      method: method,
      headers: headers,
      body: body,
  })
  const responseTxt = await response.text();


  if(responseTxt.error){
    console.log("ERROR: " + responseTxt.error + "\nwhile requesting " + URL + " with method " + method
      + " and headers " + headers + " and body " + body)
    return null;
  }

  const parseString = require('react-native-xml2js').parseString;
  let responseJson = null
  //console.log('respone XML:', responseTxt);
  parseString(responseTxt, function (err, result) {
      responseJson = result
  });
  //console.log('response', responseJson)
  return responseJson;
}




export const makeParameter = (key, value, andSymbol = true) => {
  let parameter = ""
  if(andSymbol){
      parameter += "&"
  }
  parameter += key + "=" + value;
  return parameter;
}

