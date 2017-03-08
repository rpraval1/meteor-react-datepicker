import { Meteor } from 'meteor/meteor';
import { Dates } from '../../imports/collections/Dates'

if(Meteor.isServer) {
  Meteor.methods({

    'date.save': function(myDate){

      //console.log(formData);

      Dates.insert({
        myDate: myDate
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

    'date.update': function(dateId, myDate) {
      //return Notes.update(note._id, { $set: { notes } });

      Dates.update(
        {
          _id: dateId
        },{
          $set: {
            myDate: myDate
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
