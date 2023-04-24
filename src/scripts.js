// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

let destinations
let travelers
let trips 
// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Dashboard from './dashBoard';
import './css/styles.css';
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
    dashboard.loadUser(24,travelers);
    dashboard.loadUserTrips(trips);
    dashboard.loadUserDestinations(destinations);
    console.log(dashboard)
    dashboard.sortTripsByStatus();
    dashboard.sortTripsByDate();
    console.log(dashboard.pastDates)
    console.log(dashboard.presentDates)
    console.log(dashboard.futureDates)
}

function writeDashboard(){
    dashboard.makeDateTable();
    dashboard.calculateTotalSpent(); 
    document.getElementById('agentFees').innerHTML = `$${dashboard.agentFees}`;
    document.getElementById('totalSpent').innerHTML = `$${dashboard.totalCosts + dashboard.agentFees}`;

}









