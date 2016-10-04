import DS from 'ember-data';
// import {belongsTo} from 'ember-data/relationships';

export default DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nationality: DS.attr('string'),
  user: DS.belongsTo('user'),
  players: DS.hasMany('player'),
  games: DS.hasMany('game')
});
