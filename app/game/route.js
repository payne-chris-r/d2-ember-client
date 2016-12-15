import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),

  model(params){
    return this.get('store').findRecord('game', params.id);
    // you should try this
    // return Ember.RSVP.hash({
    //   game: this.get('store').findRecord('game', params.id),
    //   profile: this.get('store').findRecord('profile', this.get('auth.credentials.profile_id')),
    // });
  },

  actions: {
    unAuth: function(){
      this.get('flashMessages')
        .warning('You need to sign in to perform that action.');
      this.transitionTo('sign-in');
    },
    joinGame: function(game){
      let newPlayer = this.get('store').createRecord('player', newPlayer);
      newPlayer.set('game', game);
      this.get('store').findRecord('profile', this.get('profile_id'))
      // profile.get('players').pushObject?('players')
        // .then(()=>{
        //   console.log("game is ", game);
        //   console.log('game.id is', game.get('id'));
        //   debugger;
        //   return this.get('store').findRecord('game', +game.id);
        // })
        // .then((game)=>{
        //   console.log("game is ", game);
        //   console.log('game.id is', game.get('id'));
        //   debugger;
        //   newPlayer.set('game', game);
        // })
        .then(()=>{
          newPlayer.set('character_id', 3);
          newPlayer.set('kills', 3);
        })
        .then(()=> {
          newPlayer.save();
        })
        // force a refresh of the page <--probably better way to do this
        .then(()=> this.transitionTo('games'))
        .then(()=> this.transitionTo('game', game.id))
        .catch(()=>{
          // if err == user is already in that game
          // elsif err = game is full.
          this.get('flashMessages').warning('You are already in that game, or the game is currently full.');
          this.transitionTo('game', game.id);
        });
    },
    // joinGame: function(game){
    //   let newPlayer = this.get('store').createRecord('player');
    //   // ?????
    //   // because you (and I) don't know how ember is executing this method. What's the context?
    //   // I don't know and I don't care I just know that I have to return things from
    //   // methods because Ember.Observable and Ember.Object magic.
    //   // happy to research the actual reason with you at some point.
    //   // this is my pattern-learning here. I don't really know how the magic works
    //   // but I know when I do it this way it fits whatever (currently inscrutable)
    //   // mental model Ember wants me to conform to.
    //   this.get('store').findRecord('profile', this.get('profile_id'))
    //     .then((profile)=>{
    //       newPlayer.set('profile', profile);
    //       newPlayer.set('game', game);
    //       newPlayer.set('character_id', 3);
    //       newPlayer.set('kills', 3);
    //       return newPlayer.save();
    //       // is it that it doesn't persist until the .save is returned?
    //       // .save is async and I think this isn't returning before the transition
    //       // if I force transition to `games` then back to `game` I force GET
    //       // games/:id which grabs the newPlayer out of the db and puts him in
    //       // the game. It seems like this should automatically be happening
    //       // with Ember, but it doesn't. Model problem? Is it 'cause I'm creating
    //       // a player in the game route? I don't think so.
    //     })
    //     .then(()=>{
    //       this.transitionTo('games');
    //     })
    //     .then(()=>{
    //       this.transitionTo('game', game.id);
    //     })
    //     .catch((err)=>{
    //       // if err == user is already in that game
    //       // elsif err = game is full.
    //       console.error(err);
    //       this.get('flashMessages').warning('You are already in that game, or the game is currently full.');
    //       this.transitionTo('game', game.id);
    //     });
    // },
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
      .then((player)=> {
        return player.destroyRecord();
      })
      .then(()=>{
        this.transitionTo('games');
      })
      .catch(()=>{
        this.get('flashMessages').warning('You are not in that game.');
      });
    },
  },
});
