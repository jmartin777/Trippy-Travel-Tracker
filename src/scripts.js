// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


import Dashboard from './dashBoard';

let destinations
let travelers
let trips 
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/AdobeStock_571093886.jpg'
import './images/login-button.png'
import './images/AdobeStock_wide.png'
import './images/AdobeStock_tall.png'
import './images/AdobeStock_430930840.png'


const dashboard = new Dashboard();
window.addEventListener('load', () => {
dashboard.api.fetchAll().then(data => {
    travelers = data[0]
    trips = data[1]
    destinations = data[2]
    parseData()
    writeDashboard()
  })
})

function parseData(){
    const randomUser = Math.floor(Math.random() * travelers.travelers.length);
    dashboard.loadUser(randomUser,travelers);
    dashboard.loadUserTrips(trips);
    dashboard.loadUserDestinations(destinations);
    console.log(dashboard)

}

function writeDashboard(){

}









