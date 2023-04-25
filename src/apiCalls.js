class Api {
    //Create a reference to the API class
    //Set the Base Url from the argument
    constructor(inUrl) {
        this.url = inUrl;
    }
    //Retrieve Data from a given endpoint
   
    fetchData = (url) => {
        return fetch(url)
        .then(response => response.json())
        };
     
    fetchAll = () => {
        return Promise.all([
        this.fetchData('http://localhost:3001/api/v1/travelers'),
        this.fetchData('http://localhost:3001/api/v1/trips'),
        this.fetchData('http://localhost:3001/api/v1/destinations'),
        ]);
    } 
  
    //Post an JSON Object to the Base URL using the given Endpoint and OBJ 
    /*  const data = { name: 'John Doe', email: 'johndoe@example.com' };
        postObj('travelers', data)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    */
    
    postObj(endpoint, data){
        console.log(this.url + endpoint)
        fetch(this.url + endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
            
            }).then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));

        };

    //Delete Trip By ID 
    deleteTrip(tripID){
        postResult = (endpoint, data) => {
            return fetch(this.url + trips, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
          };
        return postResult;
    }
    
}
export default Api;
