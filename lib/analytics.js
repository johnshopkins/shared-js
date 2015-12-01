/* global module: false */
/* global gs: false */
/* global env: false */

var Analytics = function () {

  this.env = env ? env : "production";

};

/**
 * Set the environment
 * @param {string} env local, staging, or production
 */
Analytics.prototype.setEnvironment = function (env) {
  this.env = env;
};


/**
 * Track an event in Google Analytics.
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 *
 * @param  {object obj Object containing details of the event to track.
 *                     Required keys:  eventCategory, eventAction
 *                     Optionlal keys: eventLabel, eventValue, hitCallback
 * @return null
 */
Analytics.prototype.trackEvent = function (obj) {

  obj.hitType = "event";

  // console.log(obj);

  if (this.env !== "production") return;

  ga("send", obj);

};

/**
 * Track a pageview in Google Analytics.
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 *
 * @param  {object obj Object containing details of the page to track.
 *                     Optionlal keys: page, title
 * @return null
 */
Analytics.prototype.trackPageview = function (obj) {

  obj.hitType = "pageview";

  if (this.env !== "production") return;

  ga("send", obj);

};

/**
 * Function that can be used as the 'hitCallback'
 * to send the user to the destination URL after
 * the info has been sent to Google
 * @param {string} href URL
 * @param  {event} e   jQuery event object
 */
Analytics.prototype.sendTo = function (href, e) {

  var newTab = e.ctrlKey || e.metaKey ? true : false;

  if (newTab) {
    window.open(href);
  } else {
    window.location.href = href;
  }

};

module.exports = new Analytics();
