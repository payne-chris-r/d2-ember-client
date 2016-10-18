import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),

  tagName: '',
  actions: {
    joinGame (game) {
      this.sendAction('joinGame', this.get('game'));
    },
    leaveGame (game) {
      this.sendAction('leaveGame', game);
    }
  }
});
