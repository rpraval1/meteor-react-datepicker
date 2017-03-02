import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ExampleForm = new Mongo.Collection('exampleforms');

var Schemas = {};

Schemas.ExampleForm = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name"
    },
    lastName: {
        type: String,
        label: "Last Name"
    },
    gender: {
        type: String,
        label: "Gender"
    },
    homePhone: {
        type: String,
        label: "Home Phone"
    },
    companyName: {
        type: String,
        label: "Company Name"
    },
    companyAddress: {
        type: String,
        label: "Company Address"
    },
    workPhone: {
        type: String,
        label: "Work Phone"
    },
    aboutYou: {
        type: String,
        label: "About You"
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

ExampleForm.attachSchema(Schemas.ExampleForm);
