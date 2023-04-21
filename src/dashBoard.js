//http://localhost:3001/api/v1/travelers/<id>

class Dashboard {
    constructor() {
        this.userID = 0;
        this.userName = "";
        this.userType = "";
        this.destinationID = "";
        this.travelers = 0;
        this.date  = "";
        this.duration = 0;
        this.status = "";
        this.suggestedActivities = []; 
        this.destination = "";
        this.estimatedLodgingCostPerDay = 0;
        this.estimatedFlightCostPerPerson = 0;
        this.image = "";
        this.alt = "";
    }

    getUserByID(data){
        return data;
    }
}
export default Dashboard;