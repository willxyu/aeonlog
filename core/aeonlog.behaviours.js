
// https://stackoverflow.com/a/4081293
(function($) {
    function startTrigger(e) {
        var $elem = $(this);
        $elem.data('mouseheld_timeout', setTimeout(function() {
            $elem.trigger('mouseheld');
        }, e.data));
    }

    function stopTrigger() {
        var $elem = $(this);
        clearTimeout($elem.data('mouseheld_timeout'));
    }

    var mouseheld = $.event.special.mouseheld = {
        setup: function(data) {
            // the first binding of a mouseheld event on an element will trigger this
            // lets bind our event handlers
            var $this = $(this);
            $this.bind('mousedown', +data || mouseheld.time, startTrigger);
            $this.bind('mouseleave mouseup', stopTrigger);
        },
        teardown: function() {
            var $this = $(this);
            $this.unbind('mousedown', startTrigger);
            $this.unbind('mouseleave mouseup', stopTrigger);
        },
        time: 320 // default to 750ms
    };
})(jQuery)

aeonlog = typeof aeonlog !== 'undefined' ? aeonlog : {}

aeonlog.behaviours = function() {
 $('#screen').scroll(function() {
   var t = document.getElementById('screen').scrollTop
   for (var i=(aeonlog.cartesian.length - 1); i>-1; i--) {
    if (t > aeonlog.cartesian[i].packetPos) {
      // aeonlog.stepto( i )
      break
    } }
 })
 /*
 $('#screen').scroll( $.debounce( 210, function() {
   var t = document.getElementById('screen').scrollTop
   log(t)
   // snap down
   for (var i=(aeonlog.cartesian.length - 1); i>-1; i--) {
    if (t < aeonlog.cartesian[i].packetPos) {
      setTimeout( function() { aeonlog.stepto( i ) }, 100 )
      break
    }
   }
 }))*/
}