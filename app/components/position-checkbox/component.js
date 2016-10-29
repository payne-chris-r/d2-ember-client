import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggle () {
      this.sendAction('toggle', this.get('value'), this.get('label'));
    },
  }
});
