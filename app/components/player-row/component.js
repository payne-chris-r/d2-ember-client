import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),

  tagName: '',
  actions: {
    joinGame (game){
      if(this.get('profile_id')){
        this.sendAction('joinGame', game);
      }
      else{
        this.sendAction('unAuth');
      }
    },
    leaveGame(game) {
      if(this.get('profile_id')){
        this.sendAction('leaveGame', game);
      }
      else{
        this.sendAction('unAuth');
      }
    }
  }
});
