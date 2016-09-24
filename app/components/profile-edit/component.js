import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editFirstName: function(){
      console.log("Inside profile-edit editFirstName");
      console.log("Profile is ", this.get('profile'));
      this.sendAction('editFirstName', this.get('profile'));
    },
  },
});
