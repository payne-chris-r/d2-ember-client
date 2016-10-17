import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    unAuth () {
      this.get('flashMessages').warning('You must sign in to use the app.');
      this.sendAction('unAuth');
    },
  },
});
