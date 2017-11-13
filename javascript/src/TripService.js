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
    if (result.isLeft()) {
      throw new Error(result.left());
    }
    return result.right();
  }

  _getTripsByUser(user) {
    return Monet.Maybe.fromNull(this.userSesssion.getLoggedUser())
      .toEither('User not logged in.')
      .map(e => {
        if(this._isFriend(e,user)){
          return this.tripDao.findTripsByUser(user)
        }else{
          return []
        }
      })
  }

  _isFriend(user1,user2){
    let isFriend = false;
    let friends = user2.getFriends();
    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i];
      if (friend == user1) {
        isFriend = true;
        break;
      }
    }
    return isFriend;
  }
}

module.exports = TripService
