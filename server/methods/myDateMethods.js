import { Meteor } from 'meteor/meteor';
import { Dates } from '../../imports/collections/Dates'

if(Meteor.isServer) {
  Meteor.methods({

    'date.save': function(formData){

      console.log(formData.myDate);

      Dates.insert({
        myDate: formData.myDate
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });
    },

    'date.remove': function(dateId) {
      //return Boards.remove(board);
      Dates.remove({
        _id: dateId
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });

    },

    'date.update': function(dateId, formData) {
      //return Notes.update(note._id, { $set: { notes } });

      Dates.update(
        {
          _id: dateId
        },{
          $set: {
            myDate: formData.myDate
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
