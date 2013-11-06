// Create the Ember Meetuplication
window.Meetup = Ember.Application.create();
// Meetuplication Router
Meetup.Router.map(function(){});
// Choix de l'adapter 
Meetup.LSAdapter = DS.LSAdapter.extend({
  namespace: 'meetup'
});
// Utilisation de l'adapteur
Meetup.ApplicationAdapter = Meetup.LSAdapter;
// Facebook Component
Meetup.FacebookImageComponent = Ember.Component.extend({
  fb_id: '',

  facebook_image: function(){
    var fb_id = this.get('fb_id');
    return "https://graph.facebook.com/"+ fb_id +"/picture?type=large" 
  }.property('fb_id')

});
// Weather Component
Meetup.WeatherEngineComponent = Ember.Component.extend({
  ville: '',
  res:'',
  url: 'http://api.openweathermap.org/data/2.5/weather?lang=fr&q=',

  resultat: function(){
    var self = this;
    $.ajax({
      type: 'GET',
      url: this.get('url') + this.get('ville') +'&callback=?',
      async: false, 
      jsonpCallback: 'jsonCallback',
      contentType: "application/json", dataType: 'jsonp',
      success: function(json) {
        self.set('res', json);
      }
    });
    return this.get('res');
  }.property('ville')
});
