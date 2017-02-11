import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check'

if (Meteor.isServer) {
  Accounts.config({
    forbidClientAccountCreation : true,
    sendVerificationEmail: true
  });



  Accounts.emailTemplates.siteName = "StoryOfMY";
  Accounts.emailTemplates.from = "StoryOfMY Registration <accounts@example.com>";


  Accounts.emailTemplates.enrollAccount.subject = function (user) {
      return "Welcome to StoryOf.MY, " + user.profile.name;
  };
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
     return "Thank you for creating the account, now lets get the ball rolling!"
       + " To activate your account, simply click the link below:\n\n"
       + url;
  };


  Accounts.emailTemplates.resetPassword.from = function () {
     // Overrides value set in Accounts.emailTemplates.from when resetting passwords
     return "StoryOfMY Password Reset <no-reply@example.com>";
  };


  Accounts.emailTemplates.verifyEmail.subject = function (user) {
      return  user.profile.name + ", you are just one step away!";
  };

  Accounts.emailTemplates.verifyEmail.html = function(user, url) {
      var prettyEmail = "<a href="+Meteor.absoluteUrl("signin?token="+url)+">Click Here to Activate your account!</a>";

      return "Thank you for creating the account, now lets get the ball rolling!"
        + " To activate your account, simply click the link below:\n\n"
        + prettyEmail;
  };

  // Accounts.urls.verifyEmail = (token) => {
  //   return Meteor.absoluteUrl("signin?token="+token);
  // };

  Accounts.onEmailVerificationLink = function(token, done) {
    Accounts.urls.verifyEmail = (token) => {
      return Meteor.absoluteUrl("signin?token="+token);
    };
  };


  Meteor.methods({
    'users.create': function(user){
      //Account create on server...
      const { username, email, password, name } = user
      //Create account
      const userId = Accounts.createUser({
        username, email, password, profile:{name, pname:name}
      });

      //Send Account Verification....
      Accounts.sendVerificationEmail(userId);

    }
  })

}
