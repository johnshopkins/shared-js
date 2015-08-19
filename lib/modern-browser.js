/**
 * Uses the given condition to determine if a browser
 * is considered modern.
 *
 * For example, you could utilize Modernizr and pass the
 * condition of `Modernizr.video`, which would add a class
 * of `modern-browser` to the HTML element of browsers that
 * support HTML5 and `not-modern-browsers` for all others.
 *
 * @param  {condition} condition Condition to evaluate
 * @return null
 */
module.exports = function (condition) {

  var html = document.getElementsByTagName("html")[0];

  if (Modernizr.video) {
    html.className = html.className + " modern-browser";
    window.modernBrowser = true;
  } else {
    html.className = html.className + " not-modern-browser";
    window.modernBrowser = false;
  }

};
