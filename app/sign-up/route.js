import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      this.get('auth').signUp(credentials)
      .then(() => this.get('auth').signIn(credentials))



      //You have the user object here, dude
      
      .then((user) =>{
        console.log("USER is ", user);
        this.transitionTo('application');
      })
      .then(() => {
        this.get('flashMessages')
        .success('Successfully signed-up! You have also been signed-in.');
      })
      .then(() => {
        this.get('store').findRecord('user', this.get('auth.credentials.id'))
          .then((user)=>{
            console.log("What the hell is user ", user);
            return this.get('store').createRecord('profile', { user });
          })
          .then((profile)=>{
            console.log("What the hell is profile ", profile);
            profile.save()
              .then((profile)=>{
                console.log("inside promise profile was not defined? It is ", profile.id);
                this.transitionTo('profile/edit', profile);
              })
              .catch(console.error);
        })
        .catch(console.error);
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
