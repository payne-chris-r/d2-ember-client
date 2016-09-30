import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  model () {
    return this.get('store').findAll('game');
  },

  player: {
    profile_id: null,
    game_id: null,
  },
  hasSpace: Ember.computed.alias('game.full?'),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),
  profile: Ember.computed('auth.credentials.profile_id', function(){
      return this.get('store').findRecord('profile', this.get('profile_id'));
  }),
  actions: {
    // joinGame: 'something',
    joinGame: function(game){
      let profile_id = this.get('profile_id');
      let newPlayer = this.get('store').createRecord('player', newPlayer);
      this.get('store').findRecord('profile', profile_id)
        .then((profile)=>{
          console.log("1. profile is ", profile);
          this.get('store').findRecord('game', +game.id)
            .then((game)=>{
              newPlayer.set('game', game);
            })
            .then(()=>{
              newPlayer.set('character_id', 3);
            })
            .then(()=>{
              newPlayer.save();
            })
            .catch((err)=>{
              console.error(err);
            });
        })
        .catch((err)=>{
          console.error(err);
        });
    },
  },
  // profiles: this.get('store').findRecord('profile', by game id?)
  // add 'hasSpace'
  // hasSpace: Ember.computed('game.players', function(){
  //   if(this.get('game.players') < 4){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }),
});
