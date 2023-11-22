//Create URL for send requests with fake api
const requestURL = 'https://jsonplaceholder.typicode.com/users';

//Function for sending HTTP-request
function sendRequest(method, url, body = null) {
    //return new obj Promise, which will be allowed or rejected
    return new Promise((resolve, reject) => {
        //Create new obj XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //configure a request: which method (GET or POST), and URL-adress
        xhr.open(method, url);
        
        //Setup an expected type of response (in this case: json);
        xhr.responseType = 'json';

        //Setup header of request, in order to server know, that data in body in JSON format
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        //Setup an eventlistener for success loading
        xhr.onload = () => {

            //If status more or equal than 400, consider it as error
            if (xhr.status >= 400) {
                //reject Promise with data of response
                reject(xhr.response)
            } else {
                //Allow Promise with data of response
                resolve(xhr.response);
            }
        }
        //Setup an eventlistener for errors with network or impossibility to run a request
        xhr.onerror = () => {

            //Reject Promise with data of response (in this case: with error)
            reject(xhr.response);
        }
        //Send a request to server, transforming a body of request in JSON-string, if it provided
        xhr.send(JSON.stringify(body));

    })
}

// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.log(err));

//Example, which will send in POST-request
const body = { 
    name: 'Mark', age: 26 
}

//Use a function sendRequest for sending POST-request
sendRequest('POST', requestURL, body)

.then(data => {
    //If Promise allowed, display data
    console.log(data)
})

.catch(err => {
    //If Promise rejected, display a message about error
    console.log(err)
});