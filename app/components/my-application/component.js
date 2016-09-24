import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  store: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials'),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),
  // profile: Ember.computed(function(){
  //   return this.get('store').findRecord('profile', this.get('auth.credentials.profile_id'));
  // }),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    signOut () {
      this.sendAction('signOut');
    },
  },
});
