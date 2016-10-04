import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signIn (credentials) {
      return this.get('auth').signIn(credentials)
      .then((user) => {
        let profile_id = this.get('auth.credentials.profile_id');
        if(profile_id){
          this.transitionTo('profile', profile_id);
        }
        else{
          let newProfile = this.get('store').createRecord('profile')
                                            .set('user', user);
          newProfile.save()
            .then((profile)=>{
              this.transitionTo('profile/edit', profile.id);
            })
            .catch(console.error);
        }
      })
      .then(() => this.get('flashMessages').success('Thanks for signing in!'))
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
