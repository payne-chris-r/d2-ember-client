import Ember from 'ember';

export default Ember.Route.extend({
  tagName: '',
  model (params) {
    return this.get('store').findRecord('profile', params.id);
  },
});
