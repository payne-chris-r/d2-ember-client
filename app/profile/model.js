import DS from 'ember-data';

export default DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nationality: DS.attr('string'),
  user: DS.belongsTo('user')
});
