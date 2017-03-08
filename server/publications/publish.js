
import { Meteor } from 'meteor/meteor';
import { Dates } from '../../imports/collections/Dates'

if (Meteor.isServer) {
  Meteor.publish('getDates', function() {
      return Dates.find({});
  });


}
