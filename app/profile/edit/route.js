import Ember from 'ember';

export default Ember.Route.extend({
  tagName: '',

  model (params) {
    return this.get('store').findRecord('profile', params.id);
  },
  actions: {
    toggle (profile) {
      profile.save()
      .catch(console.error);
    },
    editFirstName: function(profile){
      if(profile.newFirstName){
        profile.set('first_name', profile.newFirstName);
      }
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
