/* global vent: false */

var Backbone = require("../shims/Backbone");
var $ = require("../shims/jquery");
var _ = require("../shims/underscore");


// Utility functions

function doResizeToWindow (selector, parent, width, height) {

  width = typeof width === "undefined" ? 1 : width;
  height = typeof height === "undefined" ? 1 : height;

  var offset = parent.offset().top;
  var w = 100 * width;
  var h = ($(window).height() - offset) * height;

  selector.css({
    width: w + "%",
    height: h + "px"
  });
}

function doRelativeResize (selector, container, ratio, center) {

  var containerWidth = container.width();
  var containerHeight = container.height();
  var containerRatio = containerWidth / containerHeight;

  var elemWidth;
  var elemHeight;

  // change height/width depending on ratio
  if (containerRatio > ratio) {

    elemWidth = containerWidth;
    elemHeight = (containerWidth / ratio);

    // center element within parent
    if (center) {

      var marginTop = (elemHeight - containerHeight) / 2;

      selector.css({
        marginLeft: "0px",
        marginTop: "-" + marginTop + "px"
      });


    }

  } else {

    elemWidth = (containerHeight * ratio);
    elemHeight = containerHeight;

    // center element within parent
    if (center) {

      var marginLeft = (elemWidth - containerWidth) / 2;

      selector.css({
        marginLeft: "-" + marginLeft + "px",
        marginTop: "0px"
      });

    }

  }

  // set element's height/width
  selector.height(elemHeight);
  selector.width(elemWidth);
}


// ElemenetResizer object

var ElementResizer = function (eventsObject) {

  this.vent = eventsObject;

};


/**
 * Make the selector's height and width a certain
 * percentage of the window. Subtract any offset
 * from the parent element to account for things
 * like alerts and identity bars.
 *
 * @param  {jQuery selector} selector  Item to resize
 * @param  {jQuery selector} container Item to fill
 * @param  {number}          width     Percentage of window width (ex: .5 for 50%)
 * @param  {boolean}         height    Percentage of window height (ex: .5 for 50%)
 * @return null
 */
ElementResizer.prototype.resizeToWindow = function (selector, parent, width, height) {

  doResizeToWindow(selector, parent, width, height);

  this.vent.on("winresize:done", function () {
    doResizeToWindow(selector, parent, width, height);
  }, this);

};


/**
 * Make the selector's height and width fill the container
 * element's height and width, but keep the selector at
 * the given ratio.
 *
 * @param  {jQuery selector} selector  Item to resize
 * @param  {jQuery selector} container Item to fill
 * @param  {number}          ratio
 * @param  {boolean}         should the element be centered in its parent element?
 * @return null
 */
ElementResizer.prototype.relativeResize = function (selector, container, ratio, center) {

  doRelativeResize(selector, container, ratio, center);

  this.vent.on("winresize:done", function () {
    doRelativeResize(selector, container, ratio, center);
  });

};

module.exports = ElementResizer;
