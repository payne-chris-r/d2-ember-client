import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    leave () {
      this.sendAction('leaveGame', this.get('game'));
    }
  }
});
