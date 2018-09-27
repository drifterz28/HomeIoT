const NodeHelper = require("node_helper");
const request = require('request');

const dateAdapter = upcoming_shows => upcoming_shows[0].date + ' - ' + upcoming_shows.pop().date;

const listingsAdapter = (listing) => ({
  title: listing.title_as_text,
  price: listing.our_price,
  dateRange: dateAdapter(listing._embedded.upcoming_shows)
});

module.exports = NodeHelper.create({
  settings: null,
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'GET_EVENTS') {
      this.settings = payload;
      this.getEvents();
    }
  },

  getEvents: function() {
    const url = `https://www.goldstar.com/${this.settings.location}.hal`;
    const max = this.settings.maxListings;
    request({url: url, json: true}, (error, response, json) => {
      if(!error) {
        const listings = json._embedded.listings.slice(0, max);
        const cleanListings = listings.map(listing => listingsAdapter(listing));
        this.sendSocketNotification('UPDATE_EVENTS', cleanListings);
      }
    });
  }
});
