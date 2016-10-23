import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.get('store').findRecord('game', params.id);
  },
  
  // players: this.get('store').findAll('players', { game: this.get('game.id')}),
  // hasSpace: Ember.computed('players', function(){
  //   if('players'){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }),
});
