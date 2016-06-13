/* global FLIP */
'use strict';
// todo: font awesome svg,  pointer


var red = document.querySelector('.red');
var julia = document.querySelector('.julia');
var hi = document.querySelector('.hi');
var pith = document.querySelector('.pith');
var fullstop = document.querySelector('.fullstop');
var ogris = document.querySelector('.ogris');
var details = document.querySelector('.details');
var container = document.querySelector('.container');
var closeBtn = document.querySelector('.close');

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
function timingExpand(t) {
  return --t * t * t * t * t + 1;
}

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
function timingCollapse(t) {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}


function expand(){
  // Only expand if the item is collapsed.
  if (red.classList.contains('last'))
    return;

  // FLIP = first, last, invert, play - for best frame rate. details under
  // https://aerotwist.com/blog/flip-your-animations/
  var flipGroup = FLIP.group([
    { timing: timingExpand, duration: 500, element: red },
    { timing: timingExpand, duration: 500, element: julia },
    { timing: timingExpand, duration: 500, element: ogris, transform: false },
    { timing: timingExpand, duration: 150, element: pith,  transform: false },
    { timing: timingExpand, duration: 150, element: hi, transform: false },
    { timing: timingExpand, duration: 200, element: fullstop, transform: false },
    { timing: timingExpand, duration: 500, element: details, opacity: false, delay: 150},
    { timing: timingExpand, duration: 700, element: details, transform: false, delay: 250},
    { timing: timingExpand, duration: 500, element: closeBtn, transform: false, delay:450},
  ]);

  flipGroup.first();
  container.classList.add('last');
  flipGroup.last('last');
  flipGroup.invert();
  flipGroup.play();
}

function collapse() {
  var flipGroup = FLIP.group([
    { timing: timingCollapse, delay: 100, duration: 600, element: closeBtn, transform: false},
    { timing: timingCollapse, delay: 0, duration: 600, element: red },
    { timing: timingCollapse, delay: 0, duration: 600, element: julia },
    { timing: timingCollapse, delay: 100, duration: 500, element: ogris, transform: false },
    { timing: timingCollapse, delay: 0, duration: 300, element: details},
    { timing: timingCollapse, delay: 450, duration: 700, element: pith,  transform: false },
    { timing: timingCollapse, delay: 300, duration: 600, element: hi, transform: false },
    { timing: timingCollapse, delay: 300, duration: 600, element: fullstop, transform: false }
  ]);

  flipGroup.first();
  red.classList.remove('rounded');
  flipGroup.removeClass('last');
  flipGroup.last();
  flipGroup.invert();
  flipGroup.play();
}

red.addEventListener('click', expand);
julia.addEventListener('click', expand);
closeBtn.addEventListener('click', collapse);

function onFlipComplete(){
	if (red.classList.contains("last")) {
		return;
	}
  red.classList.add("rounded");
  container.classList.remove('last');
}

red.addEventListener('flipComplete', onFlipComplete);
