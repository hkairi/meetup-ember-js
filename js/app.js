// Create the Ember Meetuplication
window.Meetup = Ember.Application.create();
// Meetuplication Router
Meetup.Router.map(function(){});

Meetup.LSAdapter = DS.LSAdapter.extend({
  namespace: 'meetup'
});

Meetup.ApplicationAdapter = Meetup.LSAdapter;
