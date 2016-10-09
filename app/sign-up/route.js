import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      this.get('auth').signUp(credentials)
      .then(() => this.get('auth').signIn(credentials))
      .then((/*user*/)=>{
        return this.get('store').createRecord('profile', { user: null });
      })
      .then((profile)=>{
        profile.set('user', this.get('auth.credentials.id'));
        profile.save()
          .then((profile)=>{
            this.set('auth.credentials.profile_id', profile.id);
            this.transitionTo('profile/edit', profile);
          })
          .catch(console.error);
        })
      .then(() => {
        this.get('flashMessages')
        .success('Successfully signed-up! You have also been signed-in.');
      })
      .catch((err) => {
        console.error(err);
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
