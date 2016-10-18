import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  tagName: '',

  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    unAuth(){
      this.sendAction('unAuth');
    },
    leaveGame(){
      this.sendAction('leaveGame', this.get('game'));
    },
    joinGame(){
      this.sendAction('joinGame', this.get('game'));
    },
  },
});
