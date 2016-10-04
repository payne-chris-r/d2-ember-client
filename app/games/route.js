import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  model () {
    // WHY DO I NEED THIS?
    // this.get('store').findAll('profile');
    return this.get('store').findAll('game');
  },
  hasSpace: Ember.computed.alias('game.full?'),
  profile_id: Ember.computed.alias('auth.credentials.profile_id'),
  profile: Ember.computed('auth.credentials.profile_id', function(){
      return this.get('store').findRecord('profile', this.get('profile_id'));
  }),
  actions: {
    joinGame: function(game){
      let profile_id = this.get('profile_id');
      let newPlayer = this.get('store').createRecord('player', newPlayer);
      this.get('store').findRecord('profile', profile_id)
        .then((profile)=>{
          this.get('store').findRecord('game', +game.id)
            .then((game)=>{
              console.log("game.players is ", game.players);
              newPlayer.set('game', game);
            })
            .then(()=>{
              newPlayer.set('character_id', 3);
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
