"use strict";

const Monet = require('monet');
// let UserSession = require('./UserSession');
// let TripDAO = require('./TripDAO');

class TripService {

  constructor(userSession, tripDao) {
    this.userSesssion = userSession;
    this.tripDao = tripDao;
  }

  getTripsByUser(user) {

    const result = this._getTripsByUser(user);
    if (result.isLeft()){
      throw new Error(result.left());
    }
    return result.right();
  }

  _getTripsByUser(user) {
    let tripList = [];
    // let loggedUser = this.userSesssion.getLoggedUser();

    let result = Monet.Maybe.fromNull(this.userSesssion.getLoggedUser());

    result = result.toEither('User not logged in.')

    let isFriend = false;
    if (result.isRight()) {
      let friends = user.getFriends();
      // const e = Either.of(user.getFriends());
      for (let i = 0; i < friends.length; i++) {
        let friend = friends[i];
        if (friend == result.right()) {
          isFriend = true;
          break;
        }
      }
      if (isFriend) {
        tripList = this.tripDao.findTripsByUser(user);
      }
      return Monet.Either.Right(tripList);
    }
    return result;
  }
}

module.exports = TripService
