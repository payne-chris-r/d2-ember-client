import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('profile', params.id);
  },
  actions: {
    editFirstName: function(profile){
      console.log("inside editFirstName this.get.profile is ", this.get('profile'));
      console.log("inside editFirstName profile is ", profile);
      console.log("inside editFirstName profile.first_name is ", this.get('profile.first_name'));
      // profile.first_name = profile.newFirstName || profile.first_name;
      if(profile.newFirstName){
        profile.set('first_name', profile.newFirstName);
      }


      // profile.last_name = profile.newLastName || profile.last_name;
      if(profile.newLastName){
        profile.set('last_name', profile.newLastName);
      }
      profile.nationality = profile.newNationality || profile.nationality;
      if(profile.newNationality){
        profile.set('nationality', profile.newNationality);
      }
      profile.save()
        .then(() => {
          this.transitionTo('profile', profile);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
});
