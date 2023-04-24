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
// import './css/styles.css';
import './images/turing-logo.png';
import './images/AdobeStock_571093886.jpg';
import './images/login-button.png';
import './images/AdobeStock_wide.png';
import './images/AdobeStock_tall.png';
import './images/AdobeStock_430930840.png';

const api = new Api("http://localhost:3001/api/v1/");
const dashboard = new Dashboard();
const booking = new Booking();


const destinationInput = document.getElementById('destination')
const submitButton = document.getElementById("submit");




window.addEventListener('load', () => {
    // Login Function
api.fetchAll(/* User ID on It.4 */).then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    parseDashboardData();
    writeDashboardDisplay();
    parseBookingPageData();
    loadDestinationsDropBar();
    
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
    booking.loadData(dashboard.userID,destinations,trips)
    
    console.log(booking)
}

function loadDestinationsDropBar() {
    const option = document.createElement('option');
    destinations.destinations.forEach(element => {
    const option = document.createElement('option');
        option.value = element.destination;
        option.text = element.destination;
        destinationInput.appendChild(option);
   });

   submitButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    const destinationSelection = document.getElementById('destination').value
    const dateInput = document.getElementById('date').value;
    const durationInput = document.getElementById('duration').value;
    const travelersInput = document.getElementById('travelers').value;
    let destinationIDSelection = 0;
    destinations.destinations.filter((destination) => {
        if(destination.destination == destinationSelection){
            destinationIDSelection = destination.id;
        }
    })


    
    //post Booking with userID, destinationID, travelers, date, duration
    console.log(booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))
     api.postObj("trips", booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))
  });
        
}









