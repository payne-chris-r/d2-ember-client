import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    join () {
      console.log("this is ", this);
      console.log("this.game is ", this.game);
      console.log("this.game.id is ", this.game.id);
      console.log("this.get('game.id') is ", this.get('game.id'));
      this.sendAction('join', this.get('game.id'));
      // this is where you left off. You're sending the game ID back up the
      // chain now, but you need to figure out how to make the ajax request
      // to POST to the join table to assign the current_user to the game
      // that was clicked...
    }
  }
});
