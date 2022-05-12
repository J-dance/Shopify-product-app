
export const addURLParams = (endpointURL, paramsObject) => {
  // (A) URL SEARCH PARAMS OBJECT TO QUICKLY BUILD QUERY STRING
  let query = new URLSearchParams(paramsObject);
  
  // (B) CONVERT TO STRING, APPEND TO URL
  const url = endpointURL + query.toString();
  console.log(url);
  return url
}