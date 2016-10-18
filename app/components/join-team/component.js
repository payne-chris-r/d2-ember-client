import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    join () {
      this.sendAction('joinGame', this.get('game'));
    }
  }
});
