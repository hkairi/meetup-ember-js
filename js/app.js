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
    return "https://graph.facebook.com/"+ fb_id +"/picture?type=large&width=200&height=200" 
  }.property('fb_id')

});
// Weather Component
Meetup.WeatherEngineComponent = Ember.Component.extend({
  ville: '',
  res:'',
  temperature: 0,
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
Meetup.GaugeBarComponent = Em.Component.extend({
  classNames: ['gauge'],
  classNameBindings: ['isMaxValueExceeded:exceeded'],

  isMaxValueExceeded: function(){
    var value = parseInt(this.get('value'), 10);
    var maxValue = parseInt(this.get('maxValue'), 10);
    return (value > maxValue);
  }.property('value', 'maxValue'),

  computedAngle: function(){
    var value = this.get('value');
    var maxValue = this.get('maxValue');

    var percentValue = Math.floor( value/maxValue * 100 );
    var angle = Math.floor(180 * percentValue/100 - 90);
    var styles = ( this.get('isMaxValueExceeded') ) ? 
                  '-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);' : 
                  '-webkit-transform: rotate('+angle+'deg); -2moz-transform: rotate('+angle+'deg); -ms-transform: rotate('+angle+'deg); transform: rotate('+angle+'deg);';

    return styles;
  }.property('value', 'maxValue')
});
// Helper
Ember.Handlebars.helper('temperature', function(k){
  if (k) {
    res = new Handlebars.SafeString( parseInt( k - 272.15 )+'C' );
  }else{
    res = ""
  }
  return res;
});
