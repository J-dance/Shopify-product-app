
// example of a post function
const postData = async(firstName, lastName) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "firstName":firstName,
    "lastName":lastName
  });

  const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  // endpoint for post
  fetch("https://hpy5qebngg.execute-api.eu-west-2.amazonaws.com/dev", requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result)))
  .catch(error => console.log('error', error));

};

// example of get function
const fetchShopData = async(firstName, lastName) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: 'GET',
      headers: myHeaders
  };

  const params = {
    id: '1'
  };

  const url = addURLParams("https://hpy5qebngg.execute-api.eu-west-2.amazonaws.com/dev?", params); /* note: ? */

  fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result)))
  .catch(error => console.log('error', error));
};

// ------------------------
// example paramsObject: {
//   name : "John Doe", 
//   email : "john@doe.com",
//   colors : JSON.stringify(["Red", "Green", "Blue"])
// }

export const addURLParams = (endpointURL, paramsObject) => {
  // (A) URL SEARCH PARAMS OBJECT TO QUICKLY BUILD QUERY STRING
  let query = new URLSearchParams(paramsObject);
  
  // (B) CONVERT TO STRING, APPEND TO URL
  const url = endpointURL + query.toString();
  console.log(url);
  return url
}