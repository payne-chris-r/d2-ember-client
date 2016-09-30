import DS from 'ember-data';

export default DS.Model.extend({
  profile: DS.belongsTo('profile'),
  game: DS.belongsTo('game'),
  character_id: DS.attr('string'),
  kills: DS.attr('string')
});

// id":1,"profile_id":2,"game_id":1,"hero_picked":"PA","kills":14,"deaths":6,"assists":12,"side":"Dire","created_at":"2016-06-27T19:04:58.663Z","updated_at":"2016-06-27T19:04:58.663Z","character_id":1
