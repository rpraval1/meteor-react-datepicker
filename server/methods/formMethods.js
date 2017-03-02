import { Meteor } from 'meteor/meteor';
import { ExampleForm } from '../../imports/collections/ExampleForm'

if(Meteor.isServer) {
  Meteor.methods({

    'exampleforms.save': function(formData){

      console.log(formData);

      ExampleForm.insert({
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        homePhone: formData.homePhone,
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        workPhone: formData.workPhone,
        aboutYou: formData.aboutYou
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });
    }
  });
}
