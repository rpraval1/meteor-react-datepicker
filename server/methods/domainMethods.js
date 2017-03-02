import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check'
import { Domains } from '../../imports/collections/Domains'

if(Meteor.isServer) {
  Meteor.methods({

    'domains.save': function(formData){

      console.log(formData);

      Domains.insert({
        domainUrl: formData.domainUrl,
        isActve: formData.isActive,
        docName: formData.docName,
        document: formData.document,
        adminLink: formData.adminLink,
        renewLink: formData.renewLink,
        ownerId: this.userId
      },function(error, result) {
        if(error){
          console.log(error);
        }
      });
    }
  });
}
