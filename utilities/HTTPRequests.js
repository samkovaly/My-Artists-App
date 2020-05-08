


export const METHODS = {
  GET: 'GET',
  POST: 'POST',
}



export const requestJSON = async (URL, method, headers = null, body = null) => {
    const response = await fetch(URL, {
        method: method,
        headers: headers,
        body: body,
    })
    let responseJson = null;
    try{
      responseJson = await response.json();
    }catch(error){
      console.log('response.json() error: ', error);
      return null;
    }
    
    if(responseJson.error){
      console.log("ERROR while requesting " + URL + " with method " + method
        + " and headers " + headers + " and body " + body)

      if(responseJson.error.hasOwnProperty('status')){
        console.log("Status:", responseJson.error.status, ', message:', responseJson.error.message);
      }else{
        console.log(responseJson.error, 'error description:', responseJson.error_description);
      }

      return responseJson;
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