import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.get('store').findRecord('game', params.id);
  },

  actions: {
    leaveGame: function(game){
      console.log("your action stopped being handled in game route");
      console.log("YOU INSIDE Game route YO! Game is ", game);
    },
  },
});
