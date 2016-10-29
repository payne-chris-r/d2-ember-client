import DS from 'ember-data';
// import {belongsTo} from 'ember-data/relationships';

export default DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nationality: DS.attr('string'),
  ranking: DS.attr('number'),
  carry: DS.attr('boolean'),
  support: DS.attr('boolean'),
  offlaner: DS.attr('boolean'),
  jungler: DS.attr('boolean'),
  mid: DS.attr('boolean'),
  roamer: DS.attr('boolean'),

  user: DS.belongsTo('user'),
  games: DS.hasMany('game')
});
