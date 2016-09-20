import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editFirstName: function(){
      this.sendAction('editFirstName', this.get('profile'));
    },
  },
});
