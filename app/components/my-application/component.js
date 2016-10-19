import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: '',

  user: Ember.computed.alias('auth.credentials'),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    signOut () {
      this.sendAction('signOut');
    },
  },
});
