import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    leave () {
      this.sendAction('leaveGame', this.get('game'));
    }
  }
});
