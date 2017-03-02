
import { Meteor } from 'meteor/meteor';
import { ExampleForm } from '../../imports/collections/ExampleForm'

if (Meteor.isServer) {
  Meteor.publish('get-all-data', function() {
      return ExampleForm.find({});
  });


}
