/*
 * Spiral [v1.2]
 * Distributed under the Do-wathever-the-hell-you-want-with-it License (with Attribution)
 * https://github.com/thugsb/jQuery.Spiral
 * Originally created by Twitter: @ClaudioBonifazi
 * Modified by stu åt t.apio.ca
 */

(function($){
	$.fn.spiral = function( Options, Callback ){
		/*-- Input filtering --*/
		Opt= {
			Radius:			150,		// numeric (pixels), horizontal distance between starting and final points
			Duration:		1000,		// number of milliseconds (as for animate)
			Easing:			2,			// the number of cicles - if it is higher than 2 it will make more turns and will assume a 'bouncing' deceleration effect
			Queue:			false,	// boolean (as for animate)
			Xdirection:	false,	// boolean. If true, the rotation starts going up instead of down.
			Ydirection:	false,	// boolean. If true the movement will be from left to the right, instead of right to left.
			InsideOut:	false,	// boolean. If true, the object will whirl out from the inside of the spiral. Note that setting it to true changes the sense of Xdirection
			Vertical:		false		// boolean. If true, the object spiral will be primarily vertical. Note this changes Xdirection, Ydirection and InsideOut
		}
		$.extend(Opt,Options)
		if(!Callback)
		Callback= function(){return};
		/*-- Animation starts --*/
		return this.each(function(){
			var elem=$(this),
			start_z=elem.css('z-index');
			if (Opt.Vertical) {
				var start_l=parseInt(elem.css('margin-top')),
				start_t=parseInt(elem.css('margin-left'));
			} else {
				var start_l=parseInt(elem.css('margin-left')),
				start_t=parseInt(elem.css('margin-top'));
			}
			elem
			.animate({'z-index':start_z},{
				duration: Opt.Duration,
				complete: Callback,
				step:function(now,fx){
					fgamma = Opt.InsideOut ? Opt.Radius*(1+fx.pos) : Opt.Radius*(1-fx.pos);
					gamma=fx.pos*Opt.Easing*Math.PI;
					gamma=(Opt.Ydirection) ? -gamma : gamma;
					x=(Opt.Xdirection) ? (start_l+Opt.Radius-fgamma*Math.cos(gamma))+'px' : (start_l-Opt.Radius+fgamma*Math.cos(gamma))+'px';
					y=(start_t+fgamma*Math.sin(gamma))+'px';
					if (Opt.Vertical) {
						$(fx.elem).css({'margin-top':x,'margin-left':y})
					} else {
						$(fx.elem).css({'margin-left':x,'margin-top':y})
					}
				},
				queue: Opt.Queue
			})
		})
	}
})(jQuery)