import chai from 'chai';
import Booking from '../src/booking';
import { destinations, trips } from './booking-test-data';

const expect = chai.expect;

describe('Booking', () => {
    let booking;
    let bookingObj = {};
    beforeEach(() => {
      booking = new Booking();
      booking.loadData(50,destinations,trips)
      bookingObj = booking.createBookingObj(50, 1, 2, '2029/09/16', 14)
    });

    describe('constructor', () => {
      it('should initialize the properties of a new booking', () => {
        booking = new Booking();
        expect(booking.userID).to.equal(0);
        expect(booking.destinationID).to.deep.equal([]);
        expect(booking.destination).to.deep.equal([]);
        expect(booking.estimatedLodgingCostPerDay).to.deep.equal([]);
        expect(booking.estimatedFlightCostPerPerson).to.deep.equal([]);
        expect(booking.image).to.deep.equal([]);
        expect(booking.alt).to.deep.equal([]);
      });
   });

   describe('loadData', () => {
    it('should load data into the booking object', () => {
        expect(booking.userID).to.equal(50);
        expect(booking.destinationID).to.deep.equal([1,2,3]);
        expect(booking.destination).to.deep.equal(['Lima, Peru','Stockholm, Sweden', 'Sydney, Austrailia']);
        expect(booking.estimatedLodgingCostPerDay).to.deep.equal([70, 100, 130]);
        expect(booking.estimatedFlightCostPerPerson).to.deep.equal([400,780,950]);
        expect(booking.image).to.deep.equal(["https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"]);
        expect(booking.alt).to.deep.equal(["overview of city buildings with a clear sky","city with boats on the water during the day time","opera house and city buildings on the water with boats"]);
    });
  });

  describe('createBookingObj', () => {
    it('should return a new booking object', () => {
      expect(bookingObj).to.deep.equal({
      'id':4,
      'userID': 50,
      'destinationID': 1, 
      'travelers': 2,
      'date':'2029/09/16',
      'duration': 14,
      'status': 'pending',
      'suggestedActivities': []
     });
    });
  });
});