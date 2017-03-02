import { Mongo } from 'meteor/mongo';


export const Domains = new Mongo.Collection('domains');


var Schemas = {};

Schemas.Domains = new SimpleSchema({
    domainUrl: {
        type: String,
        label: "Url to the Domain",
        regEx: SimpleSchema.RegEx.Url
    },
    isActve: {
        type: String,
        label: "State of the Domain"
    },
    docName: {
        type: String,
        label: "Name of the Document to refer"
    },
    document: {
        type: String,
        label: "Document link of the Domain",
        regEx: SimpleSchema.RegEx.Url
    },
    adminLink: {
        type: String,
        label: "Admin Link of the Domain",
        regEx: SimpleSchema.RegEx.Url
    },
    renewLink: {
        type: String,
        label: "Link to renew the Domain",
        regEx: SimpleSchema.RegEx.Url
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

Domains.attachSchema(Schemas.Domains);
