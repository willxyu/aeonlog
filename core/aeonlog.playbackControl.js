
// Going hard verbose, for serviceable code
// Aeonlog will assume the display area has been fully loaded &
//   that the necessary fonts have been loaded

aeonlog = typeof aeonlog !== 'undefined' ? aeonlog : {}

// Residuals
aeonlog.playing     = aeonlog.playing     || false
aeonlog.lineheight  = aeonlog.lineheight  || 0

// Critical Residual
aeonlog.currentTime = aeonlog.currentTime || 0
aeonlog.cartesian   = aeonlog.cartesian   || []
// Less Critical Residual
aeonlog.flattened   = aeonlog.flattened   || []
aeonlog.lines       = aeonlog.lines       || []
aeonlog.screen      = aeonlog.screen      || 'screen'

// New Variables
aeonlog.currentPacket = aeonlog.currentPacket || 0
aeonlog.currentLine   = aeonlog.currentLine   || 0
aeonlog.intervals     = aeonlog.intervals     || []

aeonlog.play = function() {

}

aeonlog.pause = function() {

}

aeonlog.stepforward = function() {
  for (var i=(aeonlog.cartesian.length - 1); i>-1; i--) {
   if (aeonlog.cartesian[i].packetID <= aeonlog.currentPacket) {
     aeonlog.stepto( i + 1 )
     break
   }
  }
}

aeonlog.stepbackward = function() {
  for (var i=0; i<aeonlog.cartesian.length; i++) {
   if (aeonlog.cartesian[i].packetID >= aeonlog.currentPacket) {
     aeonlog.stepto( Math.max(i - 1,0) )
     break
   }
  }
}

aeonlog.stepto = function( index ) {
  aeonlog.currentPacket = aeonlog.cartesian[index].packetID
  aeonlog.currentLine   = index
  // Update Display
  document.getElementById( aeonlog.screen ).scrollTop = aeonlog.cartesian[index].packetPos
  aeonlog.currentTime   = aeonlog.cartesian[index].packetTime
  aeonlog.updateScrubber()
  var now = convertTiming( aeonlog.currentTime )
  $('#pbclock').text(lpad( now.parsed + ' ║ ' + aeonlog.timing.parsed, 16, ' '))
  aeonlog.updateAfflictions()
}

aeonlog.stepToTime = function( time ) {
  var ratio = time / aeonlog.duration
  var packetPos = false
  var packetTo  = false
  var lineTo    = false
  for (var i=0; i<aeonlog.cartesian.length; i++) {
   packetPos = aeonlog.cartesian[i].packetPos
   packetTo  = aeonlog.cartesian[i].packetID
   lineTo    = i
   if (aeonlog.cartesian[i].packetTime > time) {
     break
   }
  }
  aeonlog.currentPacket = packetTo
  aeonlog.currentLine   = lineTo
  document.getElementById( aeonlog.screen ).scrollTop = packetPos
  aeonlog.updateAfflictions()
}

aeonlog.scrollstop = function() {

}

aeonlog.updateScrubber = function() {
  var ratio = aeonlog.currentTime / aeonlog.duration * 100
  aeonlog.scrublight.css({
   width: ratio + '%',
  })
}

aeonlog.interactScrubber = function(x, offset) {
  var w = aeonlog.scrubline.width()
  var n = x - offset
  var position = n / w
  aeonlog.scrublight.css({
    width: (100 * Math.max(0,Math.min(position,1))) + '%',
  })
  var newTime = position * aeonlog.duration
  aeonlog.stepToTime( newTime )
}

aeonlog.playbackBehaviours = function() {
  aeonlog.scrublight = $('#scrubber-light')
  aeonlog.scrubline  = $('#scrubber')
  $('#step-forward').on('click', aeonlog.stepforward)
  $('#step-back').on('click', aeonlog.stepbackward)
  $('#step-forward').bind('mouseheld', function(e) {
    aeonlog.intervals.push(setInterval( aeonlog.stepforward, 100 ))
  })
  $('#step-forward').on('mouseup', function() {
    for (var i=0; i<aeonlog.intervals.length; i++) {
     clearInterval( aeonlog.intervals[i] )
    }
  })
  $('#step-back').bind('mouseheld', function(e) {
    aeonlog.intervals.push(setInterval( aeonlog.stepbackward, 100 ))
  })
  $('#step-back').on('mouseup', function() {
    for (var i=0; i<aeonlog.intervals.length; i++) {
     clearInterval( aeonlog.intervals[i] )
    }
  })
  $('#fast-forward').on('click', function(e) {
    aeonlog.stepto( aeonlog.cartesian.length - 1 )
  })
  $('#rewind').on('click', function(e) {
    aeonlog.stepto( 0 )
  })
  $('#scrubber').on('click', function(e, ui) {
    aeonlog.interactScrubber( e.clientX, this.getClientRects()[0].left )
  })
  $('#scrubber').bind('mouseheld', function(e) {
    aeonlog.mousedownScrubber = true
    /*
    aeonlog.intervals.push(setInterval( function() { 
      var x = e.clientX
      var g = document.getElementById( aeonlog.screen ).getClientRects()
          g = g[0].left
      log(x)
      aeonlog.interactScrubber(x, g) }, 20 )) */
  })
  $(document).on('mouseup', function() {
    if (aeonlog.mousedownScrubber) {
     aeonlog.mousedownScrubber = false
     for (var i=0; i<aeonlog.intervals.length; i++) {
       clearInterval( aeonlog.intervals[i] )
     }
    }
  })
  $(document).on('mousemove', function (e) {
    if (! aeonlog.mousedownScrubber) return
    e.preventDefault()
    var x = e.clientX
    var g = document.getElementById( aeonlog.screen ).getClientRects()
        g = g[0].left
    aeonlog.interactScrubber(x, g)
  });


}

aeonlog.updateAfflictions = function() {
  if (aeonlog.flattened[aeonlog.currentLine]) {
   var n = aeonlog.flattened[aeonlog.currentLine]
   n = n.status || {}
   n = n.target || {}
   if (n.name) {
   $('#affliction-name').text( n.name )
    $('#affliction-name').css({
     paddingTop: '2em',
     paddingBottom: '0.4em',
     textAlign: 'right',
     fontFamily: 'Raleway',
     fontSize: '15pt',
     color: 'rgba(244,134,66,1)',
    }) }
  }
  var afflictions = clone( aeonlog.afflictionsList )
  var locks = ['asthma','paralysis','impatience','slickness','anorexia']
  var classLocks = ['weariness','stupidity','haemophilia','selarnia','recklessness']
  for (var i=0; i<locks.length; i++) {
   if ($('.affliction-' + locks[i]).length) {
     if (aeonlog.flattened[aeonlog.currentLine]) {
      var n = aeonlog.flattened[aeonlog.currentLine]
      n = n.status || {}
      n = n.target || {}
      n = n.affs   || {}
      if (n[locks[i]]) {
        $('.affliction-' + locks[i]).addClass('green')
      } else {
        $('.affliction-' + locks[i]).removeClass('green')
      }
     }
   }
  }
  for (var i=0; i<classLocks.length; i++) {
   if ($('.affliction-' + classLocks[i]).length) {
     if (aeonlog.flattened[aeonlog.currentLine]) {
      var n = aeonlog.flattened[aeonlog.currentLine]
      n = n.status || {}
      n = n.target || {}
      n = n.affs   || {}
      if (n[classLocks[i]] == 'true') {
        $('.affliction-' + classLocks[i]).addClass('green')
      } else {
        $('.affliction-' + classLocks[i]).removeClass('green')
      }
     }
   }
  }
  $('#affliction-list').empty()
  var d = ''
  var n = aeonlog.flattened[aeonlog.currentLine]
      n = n.status || {}
      n = n.target || {}
      n = n.affs   || {}
  for (var k in n) {
   if (locks.indexOf(k) == -1 && classLocks.indexOf(k) == -1) {
     d += '<span class="affliction-' + k + ' green">' + rpad(k,15,' ') + '</span>'
   }
  }
  $('#affliction-list').append(d)
}

aeonlog.removeAfflictions = function() {
  $('#datum').empty()
}

aeonlog.showAfflictions = function() {
  var afflictions = clone( aeonlog.afflictionsList )
  var locks = ['asthma','paralysis','impatience','slickness','anorexia']
  var classLocks = ['weariness','stupidity','haemophilia','selarnia','recklessness']
  $('#datum').empty()
  var d = ''
      d += '<div id="affliction-window">'
      d += '<div id="affliction-toggle">'
      d += '<div id="affliction-target"></div>'
      d += '<div id="affliction-self"></div>'
      d += '</div>'
      d += '<div id="affliction-name"></div>'
      d += '<div id="affliction-locks"></div>'
      d += '<div id="affliction-list"></div>'
      d += '</div>'
  $('#datum').append(d)
  $('#affliction-window').css({
   position: 'absolute',
   top     : '0%',
   width   : '88%',
   height  : '100%',
   borderRadius: '11px',
   background: 'rgba( 1, 1, 1, 0 )',
   fontFamily: 'Lekton',
   fontSize  : '9pt',
   color     : 'grey',
  })
  var template = {
   status: {
     self: { vars: {}, affs: {} },
     target: { vars: {}, affs: {} }, }}
  var info = aeonlog.flattened[ aeonlog.currentLine ] || template
  var target = info.status.target
  var self   = info.status.self
  // log(target)
  // log(self)
  $('#affliction-name').text( target.name )
  var d = ''
  var o = 0
  for (var i=0; i<locks.length; i++) {
   o += 1
   d += '<span class="affliction-' + locks[i] + '">' + rpad(locks[i],15,' ') + '</span>'
   if (o % 2 == 0) {
     d += '<br/>'
   }
  }
  $('#affliction-locks').append(d)
  $('#affliction-locks').append('<br/><br/>')
  var d = ''
  var o = 0
  for (var i=0; i<classLocks.length; i++) {
   o += 1
   d += '<span class="affliction-' + classLocks[i] + '">' + rpad(classLocks[i],15,' ') + '</span>'
   if (o % 2 == 0) {
     d += '<br/>'
   }
  }
  $('#affliction-locks').append(d)
  $('#affliction-locks').append('<br/><br/>')

  // styling
  $('#affliction-name').css({
    paddingTop: '2em',
    paddingBottom: '0.4em',
    textAlign: 'right',
    fontFamily: 'Raleway',
    fontSize: '15pt',
    color: 'rgba(244,134,66,1)',
  })
  $('#affliction-locks').css({
    whiteSpace: 'pre-wrap',
    paddingLeft: '0.4em',
    fontSize: '10pt',
    color: 'rgba(123,123,123,1)',
  })
  $('#affliction-list').css({
    whiteSpace: 'pre-wrap',
    paddingLeft: '0.6em',
    fontSize: '8pt',
    color: 'rgba(113,113,113,1)',
  })
}