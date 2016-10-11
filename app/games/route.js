import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  model () {
    return this.get('store').findAll('game');
  },
  hasSpace: Ember.computed.alias('game.full?'),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),
  profile: Ember.computed('auth.credentials.profile_id', function(){
      return this.get('store').findRecord('profile', this.get('profile_id'));
  }),


  actions: {
    joinGame: function(game){
      let newPlayer = this.get('store').createRecord('player', newPlayer);
      this.get('store').findRecord('profile', this.get('profile_id'))
        .then((profile)=>{
          this.get('store').findRecord('game', +game.id)
            .then((game)=>{
              console.log("game.players is ", game.players);
              newPlayer.set('game', game);
            })
            .then(()=>{
              newPlayer.set('character_id', 3);
              newPlayer.set('kills', 3);
            })
            .then(()=>{
              newPlayer.save()
              .catch((err)=>{
                console.error(err);
                /// WHAT? HOW? <-- database is checking uniqueness
                console.log("You can only join a game once!");
                this.transitionTo('game', game.id);
              });
            })
            .catch((err)=>{
              console.error(err);
            });
        })
        .catch((err)=>{
          console.error(err);
        });
    },
    leaveGame: function(game){
      console.log("Game is ", game.id);
      this.get('store')
        .queryRecord('player', { game_id: game.id,
                                 profile_id: this.get('profile_id') })
      .then((player)=>{
        let playerProfileId = parseInt(player.get('profile.id'));
        if(playerProfileId === this.get('profile_id')){
          player.destroyRecord()
            .then((what)=>{
              console.log("What is ", what);
            })
            .catch((err)=>{
              console.error(err);
            });
        }
        else{
          console.log("You don't have rights to remove that player");
        }
        // console.log("players 1st promise is", players);
        // console.log("players[0] 1st promise is", players.get('length'));
      })
      .catch((err)=>{
        console.error(err);
      });
    },
  },
});
