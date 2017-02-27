
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check'
import {Boards} from '../../imports/collections/Boards';
import {Notes} from '../../imports/collections/Notes';

if (Meteor.isServer) {

  // Meteor.publish(null, function (){
  //   return Meteor.roles.find({})
  // })

  Meteor.publish("super-admin", function () {
    var user = Meteor.users.findOne({_id:this.userId});

    if (Roles.userIsInRole(user, ["super-admin"])) {
      return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
    }
    this.stop();
    return;
  });

  Meteor.publish("get-all-users", function () {
    //Get logged in user first ..
    var user = Meteor.users.findOne({_id:this.userId});
    //console.log('subscribing: get-all-users');

    if (Roles.userIsInRole(user, ["view-all"],"super-admin")) {
      var allUsers = Meteor.users.find({})

      return allUsers;
    }
    this.stop();
    return;
  });

  Meteor.publish("get-all-roles", function () {
    //Get logged in user first ..
    var user = Meteor.users.findOne({_id:this.userId});
    //console.log('subscribing: get-all-users');

    if (Roles.userIsInRole(user, ["view-all"],"super-admin")) {
      var allRoles = Roles.getAllRoles()

      return allRoles;
    }
    this.stop();
    return;
  });

  Meteor.publish('boards', function() {
    return Boards.find({ownerId: this.userId});
  });

  Meteor.publish('notes', function() {
    return Notes.find({ownerId: this.userId});
  });

  Meteor.publish('board-notes', function(boardId) {
    return Notes.find({ownerId: this.userId, boardId});
  });



}
