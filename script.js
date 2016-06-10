/* global FLIP */
'use strict';
// todo: google analytics, smooth scroll to top, font awesome svg, button pressed effect.
// slide-share, photos, different margin for desktop, different link style for desktop.

// var WebFontConfig = {
//   google: { families: [ 'PT+Serif::latin' ] }
// };
// (function() {
//   var wf = document.createElement('script');
//   wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//   wf.type = 'text/javascript';
//   wf.async = 'true';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(wf, s);
// })();

var red = document.querySelector('.red');
var julia = document.querySelector('.julia');
var hi = document.querySelector('.hi');
var pith = document.querySelector('.pith');
var fullstop = document.querySelector('.fullstop');
var heading = document.querySelector('.heading');
// var container = document.querySelector('.container');
// var panel = document.querySelector('.panel');
// var coverIntro = document.querySelector('.cover-intro');
// var coverFullstop = document.querySelector('.cover-fullstop');
// var coverMsg = document.querySelector('.cover-msg');
//var details = document.querySelector('.details');

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
function timingFunctionExpand(t) {
  return --t * t * t * t * t + 1;
}

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
// function timingFunctionCollapse(t) {
//   if ((t *= 2) < 1) {
//     return 0.5 * t * t * t * t * t;
//   }
//   return 0.5 * ((t -= 2) * t * t * t * t + 2);
// }


function expand(){
	console.log("RED click.");

  // Only expand if the item is collapsed.
  if (red.classList.contains('last'))
    return;

  var options = {
    timing: timingFunctionExpand,
    duration: 4000
  };

  // FLIP = first, last, invert, play - for best frame rate. details under
  // https://aerotwist.com/blog/flip-your-animations/
  let flipGroup = FLIP.group([
    Object.assign({}, options, { element: red }),
    Object.assign({}, options, { element: julia }),
    //Object.assign({}, options, { element: heading }),
    //Object.assign({}, options, { element: hi }),
    Object.assign({}, options, { element: pith, duration: 1000, transform: false }),
    Object.assign({}, options, { element: hi, duration: 1000, transform: false }),
    Object.assign({}, options, { element: fullstop, duration: 1000, transform: false }),
    // Object.assign({}, options, { element: container }),
    // Object.assign({}, options, { element: panel }),
    // Object.assign({}, options, { element: coverIntro, duration: 10, transform: false }),
    // Object.assign({}, options, { element: coverMsg, duration: 10, transform: false }),
    // Object.assign({}, options, { element: coverFullstop, duration: 10, transform: false }),
    //Object.assign({}, options, { element: details }),
  ]);

  flipGroup.first();
  flipGroup.last('last');
  flipGroup.invert();
  flipGroup.play();

  // remove expand listener from red & julia
}

red.addEventListener('click', expand);
julia.addEventListener('click', expand);