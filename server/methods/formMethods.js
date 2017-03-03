import { Meteor } from 'meteor/meteor';
import { ExampleForm } from '../../imports/collections/ExampleForm'

if(Meteor.isServer) {
  Meteor.methods({

    'exampleforms.save': function(formData){

      //console.log(formData);

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
    },

    'exampleforms.remove': function(formId) {
      //return Boards.remove(board);
      ExampleForm.remove({
        _id: formId
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });

    },

    'exampleforms.update': function(formId, formData) {
      //return Notes.update(note._id, { $set: { notes } });

      ExampleForm.update(
        {
          _id: formId
        },{
          $set: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            homePhone: formData.homePhone,
            companyName: formData.companyName,
            companyAddress: formData.companyAddress,
            workPhone: formData.workPhone,
            aboutYou: formData.aboutYou
          }
        },function(error, result) {
          if(error){
            console.log(error);
          }
        }
      )
    },

  });
}
