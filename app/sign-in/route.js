import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signIn (credentials) {
      return this.get('auth').signIn(credentials)
      .then(() => {
        console.log("inside promise ");
        let profile_id = this.get('auth.credentials.profile_id');
        if(profile_id){
          this.transitionTo('profile', profile_id);
          console.log("inside promise profile id is ", profile_id);
        }
        else{
          let newProfile = {
            user: this.get('auth.credentials.id')
          };
          // IS CREATE RECORD ASYNC?
          newProfile = this.get('store').createRecord('profile', newProfile);
          console.log("inside new profile is ", newProfile);
          newProfile.save()
            .then((profile)=>{
              console.log("inside promise profile was not defined? It is ", profile.id);
              this.transitionTo('profile-edit', profile.id);
            })
            .catch(console.error);
        }
      })
      // .then((user) => this.transitionTo('profile', user.profile_id))
      .then(() => this.get('flashMessages').success('Thanks for signing in!'))
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
