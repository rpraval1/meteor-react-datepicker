import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check'

if (Meteor.isServer) {

  // Server code
  Meteor.methods({
    /**
    * Check if the user is admin 
    */
    'isAdmin': function() {

    var user = Meteor.users.findOne({_id:this.userId});


    if (Roles.userIsInRole(user, ["view-all"],"super-admin"))
      return true;

    return false;

    },

  })

}
