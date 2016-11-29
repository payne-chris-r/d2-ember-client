import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signIn (credentials) {
      this.get('auth').signIn(credentials)
        .then((user) => {
          let profile_id = this.get('auth.credentials.profile_id');

          if(profile_id){
            this.transitionTo('profile', profile_id);
          }
          else{
            let profile = this.get('store').createRecord('profile', { user });
            profile.save()
              .then((profile)=> {
                this.get('auth.credentials').set('profile_id', profile);
                // I don't think that profile_id should be set to profile
                // shouldn't it be set to profile.get('id')??

                // Next step:
                // this.transitionTo('profile/edit', profile.get('id'));
              })
              .catch(() => {
                this.get('flashMessages')
                  .danger('There was a problem. Please try again.');
              });
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
