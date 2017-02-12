import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check'

if (Meteor.isServer) {

  // Server code
  Meteor.methods({

    /**
    * Check if the user is in a role
    */
    'userIsInRole': function(role){
      var user = Meteor.users.findOne({_id:this.userId});

      console.log(role);

      if (Roles.userIsInRole(user, role))
        return true;
      console.log('not allowAccess');

      return false;
    },
    /**
    * Check if the user is in a role and group
    */
    'userIsInRoleWithGroup': function(role,group){
      var user = Meteor.users.findOne({_id:this.userId});

      console.log(role);

      if (Roles.userIsInRole(user, role, group))
        return true;
      console.log('not allowAccess');

      return false;
    },
    /**
    * Check if the user is in a role of super admin
    */
    'userIsInAdminRole': function(role){
      var user = Meteor.users.findOne({_id:this.userId});
      //
      if (Roles.userIsInRole(user,role,"super-admin"))
        return true;

      return false;
    },
    /**
    *
    */
    'role.create': function(formData){
      const {role} = formData
      var user = Meteor.users.findOne({_id:this.userId});
      //
      if (Roles.userIsInRole(user,['manage-roles'],"super-admin")){
        Roles.createRole(role)
      } else {
        //throw error
      }

    }

  });



}
