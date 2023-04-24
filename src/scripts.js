// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

let destinations
let travelers
let trips 

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Dashboard from './dashBoard';
import Booking from './booking';
import Api from './apiCalls';
import './css/styles.css';
import './images/turing-logo.png';
import './images/AdobeStock_571093886.jpg';
import './images/login-button.png';
import './images/AdobeStock_wide.png';
import './images/AdobeStock_tall.png';
import './images/AdobeStock_430930840.png';

const api = new Api("http://localhost:3001/api/v1/");
const dashboard = new Dashboard();
const booking = new Booking();

window.addEventListener('load', () => {
    // Login Function
api.fetchAll(/* User ID on It.4 */).then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    parseDashboardData();
    writeDashboardDisplay();
    parseBookingPageData();
    
  })
})

function parseDashboardData(){
    const randomUser = Math.floor(Math.random() * travelers.travelers.length);
    dashboard.loadUser(randomUser,travelers);
    dashboard.loadUserTrips(trips);
    dashboard.loadUserDestinations(destinations);
    console.log(dashboard);
    dashboard.sortTripsByStatus();
    dashboard.sortTripsByDate();
    
}

function writeDashboardDisplay(){
    dashboard.makeDateTable();
    dashboard.calculateTotalSpent(); 
    document.getElementById('agentFees').innerHTML = `$${dashboard.agentFees}`;
    document.getElementById('totalSpent').innerHTML = `$${dashboard.totalCosts + dashboard.agentFees}`;

}

function parseBookingPageData(){
    booking.loadData(dashboard.userID,destinations)
    console.log(booking)
}









