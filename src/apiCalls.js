class Api {
    constructor(inUrl) {
        this.url = inUrl;
    }

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
