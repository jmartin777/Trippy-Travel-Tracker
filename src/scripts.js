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


const destinationInput = document.getElementById('destination')
const submitButton = document.getElementById("submit");

document.querySelector("#login-form form").addEventListener("submit", function(event) {
    event.preventDefault();
    login();
  });

  function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "myusername" && password === "mypassword") {
      
      document.getElementById("login-form").style.display = "none";
      document.getElementById("content").style.display = "block";
    } else {

      alert("Invalid username or password");
    }
  }

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
    checkInput();
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
    console.log(booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))

    api.postObj("trips", booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))

    location.href = location.href;
    
    alert("Trip Submitted");
  });
}

function checkInput(){
    let inputSum = [0,0,0]; 
    let calculateReady = false;
    const destinationInCheck = document.getElementById('destination')
    destinationInCheck.addEventListener('input', function() {
     if (destinationInCheck.value.length > 0){
         inputSum[0]=1;
         calculateReady= inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[0]=0;
     }});

     const travelersInCheck = document.getElementById('travelers')
     travelersInCheck.addEventListener('input', function() {
     if (travelersInCheck.value.length > 0){
         inputSum[1]=1;
         calculateReady = inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[1]=0;
     }});

    const durationInCheck = document.getElementById('duration')
    durationInCheck.addEventListener('input', function() {
     if (durationInCheck.value.length > 0){
         inputSum[2]=1;
         calculateReady = inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[2]=0;
     }});

     
    function calculateBooking(){
        let estimatedLodgingCostPerDay = 0
        let estimatedFlightCostPerPerson = 0
        destinations.destinations.filter((destination) => {
        if(destination.destination == destinationInCheck.value){
            estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson
            estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay
          }
        })
        const tripTotal = (estimatedLodgingCostPerDay * durationInCheck.value) + (estimatedFlightCostPerPerson * travelersInCheck.value)
        tripTotal + (tripTotal * 0.10) 
        document.getElementById('tripTotal').innerHTML = `$${tripTotal}`
    
     }
     
    
      
 }
 







