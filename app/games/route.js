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
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    unAuth: function(){
      this.transitionTo('sign-in');
    },
    joinGame: function(game){
      let newPlayer = this.get('store').createRecord('player', newPlayer);
      this.get('store').findRecord('profile', this.get('profile_id'))
        .then((profile)=>{
          this.get('store').findRecord('game', +game.id)
            .then((game)=>{
              newPlayer.set('game', game);
            })
            .then(()=>{
              newPlayer.set('character_id', 3);
              newPlayer.set('kills', 3);
            })
            .then(()=> newPlayer.save())
            .then(()=> this.transitionTo('game', game.id))
            .catch((err)=>{
              // if err == user is already in that game
              // elsif err = game is full.
              this.get('flashMessages').warning('You are already in that game, or the game is currently full.');
              this.transitionTo('game', game.id);
            });
        })
        .catch((err)=>{
          console.error(err);
        });
    },
    leaveGame: function(game){
      if(!(this.get('profile_id'))){
        this.transitionTo('sign-in');
        throw new Error("User needs to sign in.");
      }

      this.get('store')
        .queryRecord('player', { game_id: game.id,
                                 profile_id: this.get('profile_id') })
      // this doesn't work if user isn't IN that game.
      // queryRecord returns `null`, but doesn't trigger `catch`


      .then((player)=> player.destroyRecord())
      // .then((player)=>{
      //   console.log("Player is null? ", player);
      //   let playerProfileId = parseInt(player.get('profile.id'));
      //
      //   if(playerProfileId === this.get('profile_id')){
      //     player.destroyRecord()
      //       .then((what)=>{
      //         console.log("What is ", what);
      //       })
      //       .catch((err)=>{
      //         console.error(err);
      //       });
      //   }
      //   else{
      //     console.log("You don't have rights to remove that player");
      //   }
        // console.log("players 1st promise is", players);
        // console.log("players[0] 1st promise is", players.get('length'));
      // })
      .catch(()=>{
        this.get('flashMessages').warning('You are not in that game.');
      })
      .then(() => {
        this.transitionTo('game', game.id);
      });
    },
  },
});
