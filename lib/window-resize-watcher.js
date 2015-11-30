/* global vent: false */

var _ = require("../shims/underscore");

var WindowResizeWatcher = function () { };

WindowResizeWatcher.prototype.handleResize = _.throttle(function (e) {

  if (this.resizeId) clearTimeout(this.resizeId);

  this.resizeId = setTimeout(function () {
    vent.trigger("winresize:done");
  }, 300);

}, 300);

module.exports = new WindowResizeWatcher();

/**
 * Place the following inside $(function() { });
 * to run when jQuery is ready to go.
 */
// $(window).on("resize", WindowResizeWatcher.handleResize.bind(WindowResizeWatcher));
