/* global FLIP */
'use strict';
// todo: font awesome svg,  pointer/hover
// trocci & open sans

var red = document.querySelector('.red');
var julia = document.querySelector('.julia');
var hi = document.querySelector('.hi');
var pith = document.querySelector('.pith');
var fullstop = document.querySelector('.fullstop');
var ogris = document.querySelector('.ogris');
var details = document.querySelector('.details');
var container = document.querySelector('.container');
var closeBtn = document.querySelector('.close');

var redLastCSSRule = getCSSRule('.red.last');
var containerLastCSSRule = getCSSRule('.container.last');
var detailsLastCSSRule = getCSSRule('.details.last');

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
    { timing: timingExpand, delay: 100, duration: 500, element: red },
    { timing: timingExpand, delay: 100, duration: 500, element: julia },
    { timing: timingExpand, delay: 100, duration: 500, element: ogris, transform: false },
    { timing: timingExpand, delay: 0, duration: 150, element: pith,  transform: false },
    { timing: timingExpand, delay: 0, duration: 150, element: hi, transform: false },
    { timing: timingExpand, delay: 0, duration: 150, element: fullstop, transform: false },
    { timing: timingExpand, delay: 600, duration: 600, element: details},//, opacity: false},
   // { timing: timingExpand, delay: 500, duration: 400, element: details, transform: false},
    { timing: timingExpand, delay: 600, duration: 600, element: closeBtn, transform: false},
  ]);

  flipGroup.first();
  updateContainerHeight();
  container.classList.add('last');
  flipGroup.last('last');
  flipGroup.invert();
  flipGroup.play();
}

function updateContainerHeight() {
  if (document.body.clientWidth > 800) {
    redLastCSSRule.style.height = "calc(" + details.clientHeight + "px + 24vmin)";
    containerLastCSSRule.style.height = "calc(" + details.clientHeight + "px + 35vmin)";
    detailsLastCSSRule.style.top = "calc(-" + details.clientHeight + "px - 8vmin)";
  }
  else {
    redLastCSSRule.style.height = "calc(" + details.clientHeight + "px + 24vmin)";
    containerLastCSSRule.style.height = "calc(" + details.clientHeight + "px + 30vmin)";
    detailsLastCSSRule.style.top = "calc(-" + details.clientHeight + "px - 8vmin)";
  }
}

function collapse() {
  var flipGroup = FLIP.group([
    { timing: timingCollapse, delay: 0, duration: 100, element: closeBtn, transform: false},
    { timing: timingCollapse, delay: 100, duration: 500, element: red },
    { timing: timingCollapse, delay: 100, duration: 500, element: julia },
    { timing: timingCollapse, delay: 0, duration: 400, element: ogris, transform: false },
    { timing: timingCollapse, delay: 0, duration: 100, element: details},
    { timing: timingCollapse, delay: 600, duration: 400, element: pith,  transform: false },
    { timing: timingCollapse, delay: 500, duration: 200, element: hi, transform: false },
    { timing: timingCollapse, delay: 500, duration: 200, element: fullstop, transform: false }
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

window.addEventListener('resize', function(){
  if (!red.classList.contains('last')) {
    return;
  }
  updateContainerHeight();
});


function getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    var i, j, cssRule;

    for (i = 0; i < document.styleSheets.length; i++) {
      for (j=0; j < document.styleSheets[i].cssRules.length; j++) {
        cssRule = document.styleSheets[i].cssRules[j];
        if (cssRule instanceof CSSStyleRule &&
            cssRule.selectorText.toLowerCase() == ruleName) {
          return cssRule;
        }
      }
    }
}