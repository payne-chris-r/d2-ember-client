import DS from 'ember-data';

export default DS.Model.extend({
  players: DS.hasMany('player'),
});
