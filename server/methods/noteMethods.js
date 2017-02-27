import { Meteor } from 'meteor/meteor';
import {Notes} from '../../imports/collections/Notes';
import { Boards } from '../../imports/collections/Boards'

if (Meteor.isServer) {
  Meteor.methods({
    'notes.insert': function(boardId,color) {

      Notes.insert({
        boardId: boardId,
        color: color,
        ownerId: this.userId
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });

    },

    'notes.remove': function(noteId) {
      //return Notes.remove(noteId);

      Notes.remove(
        {
          _id: noteId
        },function(error, result) {
          if(error){
            console.log(error);
          }
        }
      )

    },

    'notes.update': function(noteId, content) {
      //return Notes.update(note._id, { $set: { notes } });

      Notes.update(
        {
          _id: noteId
        },{
          $set: {
            content
          }
        },function(error, result) {
          if(error){
            console.log(error);
          }
        }
      )
    },

    'boards-summary': function(){
      var user = Meteor.users.findOne({_id:this.userId});
      if(user){
        var rawBoards = Boards.rawCollection();
         var aggregateQuery = Meteor.wrapAsync(rawBoards.aggregate, rawBoards);
         var pipeline = [
            {
              $match: {
                ownerId: this.userId
              }
            },
             {$lookup:
               {
                 from: "notes",
                 localField: "_id",
                 foreignField: "boardId",
                 as: "boardNotes"
               }
             }
         ];
         var results = aggregateQuery(pipeline);

        //console.log(results);

        return results
    }
  }

    // 'boards.share': function(board, email) {
    //   return Boards.update(board._id, { $push: { sharedWith: email }});
    // }
  });

}
