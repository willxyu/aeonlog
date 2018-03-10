
render = function() {
 ww = $(window).width()
 wh = $(window).height()
 if (ww > 720 && wh > 480) {
  renderDesktop()
 } else {
  log('Mobile display')
 }
}

renderDesktop = function() {
 var nheight = '43px'
 var cwidth  = 130
 var bwidth  = 80
 var fwidth  = 80
 var fiwidth = 120

 // size container
 var container = $('#container')
 container.css({
  position: 'absolute',
  width   : 0.84 * ww,
  height  : 0.96 * wh,
  left    : '14.5%',
  top     : '2%',
  borderRadius: '11px',
  border  : '1px solid rgba( 144, 144, 144, 1)',
 })

 $('#datum').css({
  position: 'absolute',
  width   : 0.145 * ww,
  height  : 0.96  * wh,
  left    : '0.5%',
  top     : '2%',
  background: 'rgba(1,1,1,0.87)',
  'border-top-left-radius': '11px',
  'border-bottom-left-radius': '11px',
  border  : '1px solid rgba( 144, 144, 144, 1)',
  'z-index': '-4',
 })

 // size pb-container
 var pbc = $('#pb-container')
 pbc.css({
  position: 'absolute',
  width   : '100%',
  height  : nheight,
  left    : '0px',
  bottom  : '0px',
  background: 'rgba(1,1,1,1)',
  'border-bottom-right-radius': '11px',
  'border-bottom-left-radius': '11px',
 })

 // size scrubber
 var scrubberdiv = $('#scrubber')
 scrubberdiv.css({
  position: 'absolute',
  width   : '100%',
  height  : '4px',
  left    : '0px',
  bottom  : nheight,
  background: 'rgba( 45, 45, 45, 1)',
  cursor  : 'pointer',
  transition: 'all 160ms',
 })
 scrubberdiv.on('mouseenter', function() { $(this).css('height', '12px') })
 scrubberdiv.on('mouseleave', function() { $(this).css('height', '4px') })
 var scrubberLight = $('#scrubber-light')
 scrubberLight.css({
  position: 'absolute',
  width   : '0%',
  height  : '100%',
  background: 'rgba( 244, 175, 65, 1 )',
 })

 // size screen
 var screen = $('#screen')
 screen.css({
  position: 'absolute',
  width   : '100%',
  height  : 0.96 * wh - clean(nheight) - 4,
  background: 'rgba( 1, 1, 1, 0.98)',
  'border-top-right-radius': '11px',
  overflowY: 'scroll',
  whiteSpace: 'pre-wrap',
  fontFamily: 'Overpass',
  fontSize  : '9pt',
 })

 // size pbclock
 var pbclock = $('#pbclock')
 pbclock.css({
  position: 'absolute',
  width   : cwidth + 'px',
  height  : nheight,
  left    : '0%',
  top     : '0%',
  background: 'rgba( 1, 1, 1, 1)',
  'border-bottom-left-radius': '11px',
  color   : 'rgba( 141, 141, 141, 1)',
  'line-height': nheight,
  'white-space': 'nowrap',
  'font-family': 'Lekton',
  'font-size'  : '9pt',
  'text-align' : 'center',
 })
 
 // pb-button
 var pbbutton = $('.pb-button')
 pbbutton.css({
  position: 'absolute',
  height  : nheight,
  width   : bwidth + 'px',
  background: 'rgba( 201, 201, 201, 0.11 )',
  cursor  : 'pointer',
  transition: 'all 100ms',
  'line-height': nheight,
  'white-space': 'pre-wrap',
  textAlign : 'center',
  color   : 'rgba( 201, 201, 201, 0.78 )',
 })
 pbbutton.on('mouseenter', function() { 
   $(this)
    .css('background', 'rgba( 201, 201, 201, 0.45)')
    .css('color', 'rgba( 1, 1, 1, 1)')
 })
 pbbutton.on('mouseleave', function() { 
   $(this)
    .css('background', 'rgba( 201, 201, 201, 0.11)')
    .css('color', 'rgba( 201, 201, 201, 0.78 )')
 })

 // move rewind
 $('#rewind').css({ 
  left : (cwidth + (bwidth * 0)) + 'px',
 })
 $('#step-back').css({ 
  left : (cwidth + (bwidth * 1)) + 'px',
 })
 $('#play-pause').css({ 
  left : (cwidth + (bwidth * 2)) + 'px',
 })
 $('#step-forward').css({ 
  left : (cwidth + (bwidth * 3)) + 'px',
 })
 $('#fast-forward').css({ 
  left : (cwidth + (bwidth * 4)) + 'px',
 })

 var fcbutton = $('.factor-button')
 fcbutton.css({
  position: 'absolute',
  height  : nheight,
  width   : fwidth + 'px',
  background: 'rgba( 201, 201, 201, 0.11 )',
  cursor  : 'pointer',
  transition: 'all 100ms',
  'line-height': nheight,
  'white-space': 'pre-wrap',
  textAlign : 'center',
  color   : 'rgba( 201, 201, 201, 0.78 )',
 })
 fcbutton.on('mouseenter', function() { 
   $(this)
    .css('background', 'rgba( 201, 201, 201, 0.45)')
    .css('color', 'rgba( 1, 1, 1, 1)')
 })
 fcbutton.on('mouseleave', function() { 
   $(this)
    .css('background', 'rgba( 201, 201, 201, 0.11)')
    .css('color', 'rgba( 201, 201, 201, 0.78 )')
 })

 $('#factor-back').css({
  left    : (cwidth + (bwidth * 5)) + 'px',
 })
 $('#factor-input').css({
  position: 'absolute',
  height  : nheight,
  width   : fiwidth + 'px',
  left    : (cwidth + (bwidth * 5) + (fwidth * 1)) + 'px',
  padding : '0em',
  margin  : '0em',
  border  : 'none',
  background: 'rgba( 1, 1, 1, 0 )',
  textAlign : 'center',
  color   : 'rgba( 201, 201, 201, 0.78 )',
 })
 $('#factor-forward').css({
  left : (cwidth + (bwidth * 5) + (fwidth * 1) + fiwidth) + 'px',
 })

 var tggbutton = $('.toggle-button')
 tggbutton.css({
  position: 'absolute',
  width   : fwidth + 'px',
  fontSize: '9pt',
  cursor  : 'pointer',
  textAlign : 'center',
  color   : 'rgba( 201, 201, 201, 0.38)',
 })
 $('#timestamp-toggle').css({
  left : (cwidth + (bwidth * 5) + (fwidth * 2) + fiwidth) + 'px',
  top  : '50%',
  transform: 'translate( 0, 25%)',
 })
 $('#afflictions-toggle').css({
  left : (cwidth + (bwidth * 5) + (fwidth * 2) + fiwidth) + 'px',
  top  : '50%',
  transform: 'translate( 0, -100%)',
 })
 $('.toggle-button.active').css({
  color   : 'rgba( 201, 201, 201, 0.88)',
 })
 
 $('#updating').css({
  position: 'absolute',
  left    : (cwidth + (bwidth * 5) + (fwidth * (2 + 1)) + fiwidth) + 'px',
  fontSize: '9pt',
  color   : 'rgba( 201, 201, 201, 0.38)',
 })

 behaviours()
}


behaviours = function() {
 // set some global properties
 scheight = $('#screen').height()
 scrubw   = $('#scrubber').width()

 // get duration
 duration = 0
 current  = 0
 var dx = lpad(duration, 3, '0')
 var cx = lpad(current,  3, '0')
 $('#pbclock').text(lpad(dx + ' / ' + cx, 16, ' '))
 $('#factor-input').val('1')

 $('.toggle-button').on('click', function(e, ui) {
  if ($(this).hasClass('active')) {
   $(this).removeClass('active')
   $(this).css({
     color   : 'rgba( 201, 201, 201, 0.38)' })
  } else {
   $(this).addClass('active')
   $(this).css({
     color   : 'rgba( 201, 201, 201, 0.88)' })
  }
 })
 
 // Behaviour for TIMESTAMP
 $('#timestamp-toggle').on('click', function(e, ui) {
   // this code depends on where it sits in relation to its class behaviours
   if ($(this).hasClass('active')) {
    // $('.timestamp').css('display','none')
    $('.timestamp').css('color','rgba(1,1,1,0)')
   } else {
    // $('.timestamp').css('display','inline')
    $('.timestamp').css('color','')
   }
 })
  // Behaviour for AFFLICTIONS
 $('#afflictions-toggle').on('click', function(e, ui) {
   // this code depends on where it sits in relation to its class behaviours
   if ($(this).hasClass('active')) {
    aeonlog.showAfflictions()
   } else {
    aeonlog.removeAfflictions()
   }
 })

 // provide linky
 var d  = '<div id="notifier">'
     d += '<label for="file" id="notifier-clickr">Choose a file</label>'
     d += '<span id="notifier-drag"> or drag it here.</span>'
     d += '</div>'
 $('#screen').append(d)
 $('#notifier').css({
  fontFamily: 'Raleway',
  fontSize: '14pt',
  position: 'absolute',
  left    : '50%',
  top     : '50%',
  transform: 'translate( -50%, -50%)',
 })
 $('#notifier-clickr').css({
  cursor: 'pointer',
  color   : 'rgba( 201, 201, 201, 0.28 )',
 })
 $('#notifier-clickr').on('mouseenter', function() { $(this).css('color','rgba( 201, 201, 201, 0.38)') })
 $('#notifier-clickr').on('mouseleave', function() { $(this).css('color','rgba( 201, 201, 201, 0.28)') })
 $('#notifier-drag').css({
  color   : 'rgba( 201, 201, 201, 0.48 )',
 })
}