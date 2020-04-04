


export const METHODS = {
  GET: 'GET',
  POST: 'POST',
}



export const requestJSON = async (URL, method, headers = null, body = null) => {
    // setTimeout(function(){ alert("Hello"); }, 3000);
    //console.log(`requestJSON(URL=${URL}, method=${method}, headers=${headers}, body=${body}`);
    const response = await fetch(URL, {
        method: method,
        headers: headers,
        body: body,
    })
    const responseJson = await response.json();
    if(responseJson.error){
      console.log("ERROR: " + responseJson.error + "\nwhile requesting " + URL + " with method " + method
        + " and headers " + headers + " and body " + body)
      return null;
    }
    return responseJson;
}