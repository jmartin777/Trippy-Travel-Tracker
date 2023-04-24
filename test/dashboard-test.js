import chai from 'chai';
import Dashboard from '../src/dashBoard';
import { dashboardData } from './dashboard-test-data';

const expect = chai.expect;



describe('Dashboard', () => {

  describe('loadUser', () => {
    it('should load user data when given a valid user ID', () => {
      const dashboard = new Dashboard();
      const testData = {
        travelers: [
          { id: 1, name: 'Alice', travelerType: 'business' },
          { id: 2, name: 'Bob', travelerType: 'leisure' }
        ]
      };
      const result = dashboard.loadUserTest(1, testData);
      expect(result).to.have.lengthOf(1);
      expect(dashboard.userID).to.equal(1);
      expect(dashboard.userName).to.equal('Alice');
      expect(dashboard.userType).to.equal('business');
    });

  
    it('should not load user data when given an invalid user ID', () => {
      const dashboard = new Dashboard();
      const testData = {
        travelers: [
          { id: 1, name: 'Alice', travelerType: 'business' },
          { id: 2, name: 'Bob', travelerType: 'leisure' }
        ]
      };
      const result = dashboard.loadUserTest(3, testData);
      expect(result).to.have.lengthOf(0);
      expect(dashboard.userID).to.equal(0);
      expect(dashboard.userName).to.equal('');
      expect(dashboard.userType).to.equal('');
    });

  });
  describe('loadUserTrips', () => {
    const dashboard = new Dashboard();
    const testData = {
      trips: [
        {
          id: 1,
          userID: 1,
          destinationID: 2,
          travelers: 2,
          date: '2022/09/16',
          duration: 5,
          status: 'approved',
          suggestedActivities: [],
        },
        {
          id: 2,
          userID: 1,
          destinationID: 3,
          travelers: 1,
          date: '2022/10/04',
          duration: 3,
          status: 'approved',
          suggestedActivities: [],
        },
        {
          id: 3,
          userID: 2,
          destinationID: 1,
          travelers: 3,
          date: '2022/08/08',
          duration: 7,
          status: 'approved',
          suggestedActivities: [],
        },
      ],
    };

    beforeEach(() => {
      dashboard.loadUser(1, { travelers: [{ id: 1, name: 'Alice', travelerType: 'business' }] });
    });

    it('should load user trips when user has trips', () => {
      dashboard.loadUserTrips(testData);
      expect(dashboard.destinationID).to.eql([2, 3]);
      expect(dashboard.travelers).to.eql([2, 1]);
      expect(dashboard.date).to.eql(['2022/09/16', '2022/10/04']);
      expect(dashboard.duration).to.eql([5, 3]);
      expect(dashboard.status).to.eql(['approved', 'approved']);
      expect(dashboard.suggestedActivities).to.eql([[], []]);
    });

    it('should not load user trips when user has no trips', () => {
      dashboard.loadUserTripsTest({ trips: [] });
      expect(dashboard.destinationID).to.be.empty;
      expect(dashboard.travelers).to.be.empty;
      expect(dashboard.date).to.be.empty;
      expect(dashboard.duration).to.be.empty;
      expect(dashboard.status).to.be.empty;
      expect(dashboard.suggestedActivities).to.be.empty;
    });
describe('loadUserDestinations', () => {
    const testDashboard = new Dashboard();
    const testDestinations = [
        {
        id: 1,
        destination: 'Tokyo',
        estimatedLodgingCostPerDay: 150,
        estimatedFlightCostPerPerson: 1000,
        image: 'tokyo.jpg',
        alt: 'Tokyo skyline'
        },
        {
        id: 2,
        destination: 'Paris',
        estimatedLodgingCostPerDay: 200,
        estimatedFlightCostPerPerson: 800,
        image: 'paris.jpg',
        alt: 'Eiffel Tower'
        },
        {
        id: 3,
        destination: 'New York City',
        estimatedLodgingCostPerDay: 250,
        estimatedFlightCostPerPerson: 500,
        image: 'nyc.jpg',
        alt: 'New York City skyline'
        }
    ];

    it('should load user destinations when given valid data', () => {
        testDashboard.destinationID = [1, 3];
        testDashboard.loadUserDestinationsTest({ destinations: testDestinations });

        expect(testDashboard.destination).to.deep.equal(['Tokyo', 'New York City']);
        expect(testDashboard.estimatedLodgingCostPerDay).to.deep.equal([150, 250]);
        expect(testDashboard.estimatedFlightCostPerPerson).to.deep.equal([1000, 500]);
        expect(testDashboard.image).to.deep.equal(['tokyo.jpg', 'nyc.jpg']);
        expect(testDashboard.alt).to.deep.equal(['Tokyo skyline', 'New York City skyline']);
    });

    it('should not load user destinations when given invalid data', () => {
        testDashboard.destinationID = [4, 5];
        testDashboard.loadUserDestinationsTest({ destinations: testDestinations });

        expect(testDashboard.destination).to.deep.equal([]);
        expect(testDashboard.estimatedLodgingCostPerDay).to.deep.equal([]);
        expect(testDashboard.estimatedFlightCostPerPerson).to.deep.equal([]);
        expect(testDashboard.image).to.deep.equal([]);
        expect(testDashboard.alt).to.deep.equal([]);
    });
  });
});

describe('Dashboard', () => {
  describe('calculateTotalSpent', () => {
    it('should calculate the total cost and agent fees for approved trips', function() {
      const dashboard = new Dashboard();
      dashboard.travelers = [1, 5];
      dashboard.duration = [8, 18];
      dashboard.estimatedLodgingCostPerDay = [70, 100];
      dashboard.estimatedFlightCostPerPerson = [400, 780];
      dashboard.status = ['approved', 'approved'];
      dashboard.calculateTotalSpent(); 
    });

    it('should not include pending trips in the calculation', function() {
      const dashboard = new Dashboard();
      dashboard.travelers = [1, 5];
      dashboard.duration = [8, 18];
      dashboard.estimatedLodgingCostPerDay = [70, 100];
      dashboard.estimatedFlightCostPerPerson = [400, 780];
      dashboard.status = ['pending', 'approved'];
      dashboard.calculateTotalSpent();
    });
  });
});


});


