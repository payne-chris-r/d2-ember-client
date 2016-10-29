import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-div', 'container'],

  actions: {
    editFirstName: function(){
      this.sendAction('editFirstName', this.get('profile'));
    },
    toggleProp: function(prop, key){
      let profile = this.get('profile');
      key = key.toLowerCase();
      profile.set(key, !prop);
      this.sendAction('toggle', profile);
    },
  },
});
