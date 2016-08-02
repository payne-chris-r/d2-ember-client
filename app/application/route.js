import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signOut () {
      this.get('auth').signOut()
      .then(() => this.transitionTo('sign-in'))
      .then(() => {
        this.get('flashMessages').warning('You have been signed out.');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Are you sure you\'re signed-in?');
      });
      this.store.unloadAll();
    },

    error (reason) {
      let unauthorized = reason.errors.some((error) =>
        error.status === '401'
      );
      let notFound = reason.errors.some((error) =>
        error.status === '404'
      );

      //probably need a switch here
      if(notFound){
        this.get('flashMessages')
        .danger('Page not found!!');
        // this.transitionTo('/users');
      } else {
        this.get('flashMessages')
        .danger('There was a problem with your request. Please try again.');
      }

      if (unauthorized) {
        this.get('flashMessages')
        .danger('You must be authenticated to access this page.');
        this.transitionTo('/sign-in');
      } else {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      }

      return false;
    },
  },
});
