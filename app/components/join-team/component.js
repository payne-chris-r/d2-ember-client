import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    join () {
      this.sendAction('joinGame', this.get('game'));
    }
  }
});
