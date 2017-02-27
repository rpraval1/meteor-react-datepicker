import { Mongo } from 'meteor/mongo';


export const Boards = new Mongo.Collection('boards');


var Schemas = {};

Schemas.Boards = new SimpleSchema({
    boardName: {
        type: String,
        label: "Board Name",
        max: 20
    },
    sharedWith: {
        type: Array,
        label: "Email of Users",
        optional: true
    },
    'sharedWith.$': {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    ownerId: {
        type: String,
        label: "Current User"
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date()};
        } else {
          this.unset();  // Prevent user from supplying their own value
        }
      }
    },
    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },
});

Boards.attachSchema(Schemas.Boards);
