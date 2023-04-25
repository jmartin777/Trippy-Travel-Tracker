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
    
export default Booking