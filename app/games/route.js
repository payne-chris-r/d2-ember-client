import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('game');
  },
  // profiles: this.get('store').findRecord('profile', by game id?)
  // add 'hasSpace'
  hasSpace: Ember.computed('game.players', function(){
    if(this.get('game.players') < 4){
      return true;
    }
    else{
      return false;
    }
  }),
});
