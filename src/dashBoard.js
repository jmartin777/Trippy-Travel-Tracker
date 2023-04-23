//http://localhost:3001/api/v1/travelers/<id>
import Api from './apiCalls';

class Dashboard {
  constructor() {
    this.api = new Api("http://localhost:3001/api/v1/");
    this.travelerOBJ = {};
    this.userID = 0;
    this.userName = "";
    this.userType = "";
    this.destinationID = [];
    this.travelers = [];
    this.date = [];
    this.duration = [];
    this.status = [];
    this.suggestedActivities = [];
    this.destination = [];
    this.estimatedLodgingCostPerDay = [];
    this.estimatedFlightCostPerPerson = [];
    this.image = [];
    this.alt = [];
  }

  loadUser(inUserID, inObj) {
    const result = inObj.travelers.filter((traveler) => {
      if (traveler.id == inUserID) {
        this.userID = inUserID;
        this.userName = traveler.name;
        this.userType = traveler.travelerType;
      }
    });
    return result;
  }

  loadUserTest(inUserID, inObj) {
    const result = inObj.travelers.filter((traveler) => {
      return traveler.id == inUserID;
    });

    if (result.length > 0) {
      this.userID = inUserID;
      this.userName = result[0].name;
      this.userType = result[0].travelerType;
    }

    return result;
  }

  sortTrips() {
    const today = new Date().toISOString().split('T')[0].replace("-","/").replace("-","/");
    this.pastDates = this.date.filter(date => date < today)
    .sort((a,b) => new Date(b) - new Date(a))
    this.presentDates = this.date.filter(date => date === today)
    .sort((a,b) => new Date(b) - new Date(a))
    this.futureDates =this.date.filter(date => date > today)
    .sort((a,b) => new Date(a) - new Date(b))
    console.log(today)
  }
    calculateTotalSpent(trips, destinations) {
        return trips.reduce((acc, trip) => {
        const { travelers, destinationID } = trip;
        const destination = destinations.find(d => d.id === destinationID);
        const lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration * travelers;
        const flightCost = destination.estimatedFlightCostPerPerson * travelers;
        const totalCost = lodgingCost + flightCost;
        return acc + totalCost;
    }, 0);
  }

  loadUserTrips(inObj) {
    const result = inObj.trips.forEach((trip) => {
      //console.log(trip.userID === this.userID)
      if (trip.userID === this.userID) {
        this.destinationID.push(trip.destinationID);
        this.travelers.push(trip.travelers);
        this.date.push(trip.date);
        this.duration.push(trip.duration);
        this.status.push(trip.status);
        this.suggestedActivities.push(trip.suggestedActivities);
      }
    });
    return result;
  }


  
  loadUserTripsTest(tripsData) {
    const userTrips = tripsData.trips.filter((trip) => trip.userID === this.userId);

    this.destinationID = userTrips.map((trip) => trip.destinationID);
    this.travelers = userTrips.map((trip) => trip.travelers);
    this.date = userTrips.map((trip) => trip.date);
    this.duration = userTrips.map((trip) => trip.duration);
    this.status = userTrips.map((trip) => trip.status);
    this.suggestedActivities = userTrips.map((trip) => trip.suggestedActivities);
  }

  loadUserDestinations(inObj) {
    const result0 = this.destinationID.forEach((destinationID) => {
      const result1 = inObj.destinations.forEach((destination) => {
        //console.log(destination.id === destinationID)
        if (destination.id === destinationID) {
          this.destination.push(destination.destination);
          this.estimatedLodgingCostPerDay.push(destination.estimatedLodgingCostPerDay);
          this.estimatedFlightCostPerPerson.push(destination.estimatedFlightCostPerPerson);
          this.image.push(destination.image);
          this.alt.push(destination.alt);
        }
      });
    });
  }
  loadUserDestinationsTest(inObj) {
    this.destination = [];
    this.estimatedLodgingCostPerDay = [];
    this.estimatedFlightCostPerPerson = [];
    this.image = [];
    this.alt = [];
  
    this.destinationID.forEach((destinationID) => {
      const destination = inObj.destinations.find(dest => dest.id === destinationID);
      if (destination) {
        this.destination.push(destination.destination);
        this.estimatedLodgingCostPerDay.push(destination.estimatedLodgingCostPerDay);
        this.estimatedFlightCostPerPerson.push(destination.estimatedFlightCostPerPerson);
        this.image.push(destination.image);
        this.alt.push(destination.alt);
      }
    });
  }
  
  makeDateTable() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Destination|</th><th>Past Dates|</th><th>Present Dates|</th><th>Future Dates|</th>';
    table.appendChild(headerRow);
    // Loop through each date and create a row with the corresponding name
    this.date.forEach((date, i) => {
        const name = this.destination[i].split(",")[0] ? this.destination[i].split(",")[0]  : '';
        const pastDate = this.pastDates.includes(date) ? date : '';
        const presentDate = this.presentDates.includes(date) ? date : '';
        const futureDate = this.futureDates.includes(date) ? date : '';

        const row = document.createElement('tr');
        row.innerHTML = `<td>${name}</td><td>${pastDate}</td><td>${presentDate}</td><td>${futureDate}</td>`;
        table.appendChild(row);
    });

    document.getElementById('date-table').appendChild(table);
    }
}

export default Dashboard;