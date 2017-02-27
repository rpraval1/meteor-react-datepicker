import { Meteor } from 'meteor/meteor';
import {Boards} from '../../imports/collections/Boards';

if (Meteor.isServer) {
  Meteor.methods({
    'boards.insert': function(boardName) {

      Boards.insert({
        boardName: boardName,
        ownerId: this.userId
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });

    },

    'boards.remove': function(boardId) {
      //return Boards.remove(board);

      Boards.remove(
        {
          _id: boardId
        },function(error, result) {
          if(error){
            console.log(error);
          }
        }
      )

      return Meteor.call("boards-summary")

    },

    'boards.update': function(boardId, boardName) {
      //return Boards.update(board._id, { $set: { notes } });

      Boards.update(
        {
          _id: boardId
        },{
          $set: {
            boardName
          }
        },function(error, result) {
          if(error){
            console.log(error);
          }
        }
      )

      //return Boards.find({ownerId:this.userId}).fetch()
      return Meteor.call("boards-summary")

    },


    // 'boards.share': function(board, email) {
    //   return Boards.update(board._id, { $push: { sharedWith: email }});
    // }
  });


}
