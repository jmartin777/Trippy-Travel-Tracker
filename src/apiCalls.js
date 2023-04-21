class Api {

    //Create a reference to the API class
    //Set the Base Url from the argument
    constructor(inUrl) {
        this.url = inUrl;
    }

    //Retrieve Data from a given endpoint
    //Retrieve Data from a given endpoint
  async getObj(endpoint) {
    try {
      const response = await fetch(this.url + endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
        
    

    //Post an JSON Object to the Base URL using the given Endpoint and OBJ 
    /*  const data = { name: 'John Doe', email: 'johndoe@example.com' };
        postObj('travelers', data)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    */
    postObj(endpoint, data){
        postResult = (endpoint, data) => {
            return fetch(this.url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .catch(error => console.error(error));
        };
      return postResult;
    }

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

/*
Get all travelers	http://localhost:3001/api/v1/travelers	GET	none	object with travelers property containing an array of all travelers
Get single traveler	http://localhost:3001/api/v1/travelers/<id> where<id> will be a number of a traveler’s id	GET	none	object of single traveler’s info
Get all trips	http://localhost:3001/api/v1/trips	GET	none	object with trips property containing an array of all trips
Get all destinations	http://localhost:3001/api/v1/destinations	GET	none	object with destinations property containing an array of all destinations
Add new trip	http://localhost:3001/api/v1/trips	POST	{id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings>}	{message: 'Trip with id <id> successfully posted', newTrip: <Object with trip info just posted>}
Add new destination	http://localhost:3001/api/v1/destinations	POST	{id: <number>, destination: <string>, estimatedLodgingCostPerDay: <number>, estimatedFlightCostPerPerson: <number>, image: <string>, alt: <string>}	{message: 'Destination with id <id> successfully posted', newDestination: <Object with destination info just posted>}
Modify single trip	http://localhost:3001/api/v1/updateTrip	POST	{id: <number>, status:<String of 'approved' or 'pending', suggestedActivities: <Array of strings>} Only a status or a suggestedActivities property is required for a successful request	{message: 'Trip #<id> has been modified', updatedTrip: <Object with newly updated data>}
Delete single trip	http://localhost:3001/api/v1/trips/<id> where<id> will be a number of a trip’s id	DELETE	none	Trip # has been deleted
*/