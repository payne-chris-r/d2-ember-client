import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    noRights () {
      this.get('flashMessages').warning('That spot is taken.');
      this.sendAction('noRights');
    },
  },
});
