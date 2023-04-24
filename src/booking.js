class Booking{
    constructor() {
        this.userID = 0;
        this.destinationID = [];
        this.destination = [];
        this.estimatedLodgingCostPerDay = [];
        this.estimatedFlightCostPerPerson = [];
        this.image = [];
        this.alt = [];
    }

    loadData(userID,inObj1,inObj2){
        this.userID = userID;
        inObj1.destinations.forEach(dest => {
            this.destinationID.push(dest.id); 
            this.destination.push(dest.destination);
            this.estimatedLodgingCostPerDay.push(dest.estimatedLodgingCostPerDay); 
            this.estimatedFlightCostPerPerson.push(dest.estimatedFlightCostPerPerson); 
            this.image.push(dest.image); 
            this.alt.push(dest.alt); 
        });
        
            this.numOfTrips = inObj2.trips.length
            // console.log(inObj2) 
    }


    createBookingObj(userID, destinationID, travelers, date, duration) {
        const bookingObj = {
            'id': this.numOfTrips + 1,
            'userID': userID,
            'destinationID': destinationID, 
            'travelers': travelers,
            'date': date,
            'duration': duration,
            'status': 'pending',
            'suggestedActivities': []
        }
        this.showAlert
        return bookingObj
        
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

//
/*
{
    id: <number>,
    userID: <number>,
    destinationID: <number>,
    travelers: <number>,
    date: <string 'YYYY/MM/DD'>,
    duration: <number>,
    status: <string 'approved' or 'pending'>,
    suggestedActivities: <array of strings>
}
*/
export default Booking