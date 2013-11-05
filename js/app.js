// Create the Ember Meetuplication
window.Meetup = Ember.Application.create();
// Meetuplication Router
Meetup.Router.map(function(){});

Meetup.LSAdapter = DS.LSAdapter.extend({
  namespace: 'meetup'
});

Meetup.ApplicationAdapter = Meetup.LSAdapter;

Meetup.FacebookImageComponent = Ember.Component.extend({
  fb_id: '',

  facebook_image: function(){
    var fb_id = this.get('fb_id');
    console.log('..');
    return "https://graph.facebook.com/"+ fb_id +"/picture?type=large" 
  }.property('fb_id')

});
