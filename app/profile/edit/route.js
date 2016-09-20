import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('profile', params.id);
  },
  actions: {
    editFirstName: function(profile){
      profile.first_name = profile.newFirstName;
      profile.save()
        .then(() => {
          this.transitionTo('profiles');
        })
        .catch(() => {
          console.error("YOU DONE FUCKED UP NOW!");
        });
    }
  }
});
