let jasmine = require('jasmine');
let assert = require('assert');
let TripService = require('../src/TripService');
let userSession = require('../src/UserSession');

let User = require('../src/User');

describe('TripService', () => {
  let tripService = null;
  let tripDaoMock = {};

  beforeEach(() => {
    tripService = new TripService(userSession, tripDaoMock);

  });

  it('should throw an error is the user is not logged in', () => {
    userSession.getLoggedUser = () => null;

    assert.throws(
      () => tripService.getTripsByUser(null), /User not logged in\./);

    // assert.equal()

  });

  it('should return a empty trip list if no friends', () => {

    userSession.getLoggedUser = () => 'A';

    const user = new User();
    user.getFriends = () => [];

    const tripList = tripService.getTripsByUser(user);

    assert.deepEqual(tripList, []);
  });

  it('should return a trip list if no friends', () => {

    userSession.getLoggedUser = () => 'Bar';

    const user = new User();
    user.getFriends = () => ['Foo', 'Blu'];

    const tripList = tripService.getTripsByUser(user);

    assert.deepEqual(tripList, []);
  });

  it('should return a trip list if no friends', () => {

    const expectedList = ['Paris'];
    tripDaoMock.findTripsByUser = () => expectedList;

    userSession.getLoggedUser = () => 'Bar';

    const user = new User();
    user.getFriends = () => ['Foo', 'Bar'];

    const tripList = tripService.getTripsByUser(user);

    assert.deepEqual(tripList, expectedList);
  });

});
