import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Dates = new Mongo.Collection('date');

var Schemas = {};

Schemas.Dates = new SimpleSchema({
    myDate: {
        type: Date,
        label: "My Date"
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

Dates.attachSchema(Schemas.Dates);
