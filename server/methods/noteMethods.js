import { Meteor } from 'meteor/meteor';
import {Notes} from '../../imports/collections/Notes';

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

    // 'boards.share': function(board, email) {
    //   return Boards.update(board._id, { $push: { sharedWith: email }});
    // }
  });

}
