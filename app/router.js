import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('profile', { path: '/profiles/:id'});
  this.route('profiles');
  this.route('user', { path: '/users/:id' });
  this.route('games');
  this.route('game', { path: '/games/:id' });
});

export default Router;
