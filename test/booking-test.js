import chai from 'chai';
import Booking from '../src/booking';
import { bookingData } from './booking-test-data';

const expect = chai.expect;

describe('Booking', () => {
    let booking;
  
    beforeEach(() => {
      
        booking = new Booking();
      
      
    });
  
    describe('constructor', () => {
      it('should initialize the properties of a new booking', () => {
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

    });
  });
  describe('createBookingObj', () => {
    it('should return a new booking object', () => {
    });
  });
});