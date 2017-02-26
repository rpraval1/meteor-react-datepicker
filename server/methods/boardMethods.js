import { Meteor } from 'meteor/meteor';
import {Boards} from '../../imports/collections/Boards';

if (Meteor.isServer) {
  Meteor.methods({
    'boards.insert': function(boardName) {

      Boards.insert({
        createdAt: new Date(),
        boardName: boardName,
        noteColors: ['pink', 'teal', 'olive', 'yellow'],
        notes: [],
        sharedWith: [],
        ownerId: this.userId
      });

    },

    'boards.remove': function(board) {
      return Boards.remove(board);
    },

    'boards.update': function(board, content) {
      return Boards.update(board._id, { $set: { notes } });
    },

    'boards.share': function(board, email) {
      return Boards.update(board._id, { $push: { sharedWith: email }});
    }
  });

}
