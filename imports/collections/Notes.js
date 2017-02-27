import { Mongo } from 'meteor/mongo';


export const Notes = new Mongo.Collection('notes');


var Schemas = {};

Schemas.Notes = new SimpleSchema({
    boardId: {
        type: String,
        label: "Boards Id"
    },
    color: {
        type: String,
        label: "Color of a Note"
    },
    content: {
        type: String,
        label: "Note Content",
        optional: true
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

Notes.attachSchema(Schemas.Notes);
