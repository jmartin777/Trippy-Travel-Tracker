class Booking{
    constructor() {
        this.userID ='';
        this.destinationID = '';
        this.destination = '';
        this.estimatedLodgingCostPerDay = 0;
        this.estimatedFlightCostPerPerson = 0;
        this.image = '';
        this.alt = '';
    }
}

//date, duration, number of travelers and choose from a list of destinations
//User Input :date , duration, travelers,Destination
//User Sees:
//3 Input Selection Boxes to input the desired trip schedule with a selectable list of Destinations and a submit button  

// test for all for selection items to contain data with .contains  

//After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.

// upon clicking book button you will see a Popup message alert to signify the booking was processed only if the server responds according if not it will say try again later

//Once I submit the trip request, it will show on my dashboard as “pending” so that the travel agency can approve or deny it.

//{id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings>}

export default Booking