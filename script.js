/* exported WebFontConfig */
'use strict';
// todo: google analytics, smooth scroll to top, font awesome, button pressed effect.
// slide-share, photos

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




var redPanel = document.querySelector('.btn');

if (redPanel) {
	redPanel.addEventListener('click', function(){
		console.log('CLICK!');
		if (redPanel.classList.contains('btn-panel')) {
			console.log('panel!');
			return;
		}
		redPanel.classList.add('btn-active');
		setTimeout(function(){
		   console.log('removign!');
			redPanel.classList.remove('btn-active');
		}, 400);

	});
}