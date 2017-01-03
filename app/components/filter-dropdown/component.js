import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    topFilter: null,
    bottomFilter: null
  },

  actions: {
    filter () {
      console.log("Filter me.");
      console.log("options is ", this.get('options'));
    }
  }
});
