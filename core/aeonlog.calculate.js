
// Going hard verbose, for serviceable code
// Aeonlog will assume the display area has been fully loaded &
//   that the necessary fonts have been loaded

aeonlog = typeof aeonlog !== 'undefined' ? aeonlog : {}

aeonlog.playing     = aeonlog.playing     || false
aeonlog.flattened   = aeonlog.flattened   || []
aeonlog.lines       = aeonlog.lines       || []
aeonlog.screen      = aeonlog.screen      || 'screen'
aeonlog.lineheight  = aeonlog.lineheight  || 0
aeonlog.currentTime = aeonlog.currentTime || 0
aeonlog.cartesian   = aeonlog.cartesian   || []

aeonlog.update = function( str ) {
  $('#updating').text( str )
}

aeonlog.playback = function( referenceTable ) {
  aeonlog.referenceTable = clone(referenceTable)
  aeonlog.referenceList  = aeonlog.simplify( aeonlog.referenceTable )
  aeonlog.screenpad()
  aeonlog.screenFill()   // UI interaction
  aeonlog.timings()      // UI interaction
  aeonlog.coordinates()

  aeonlog.playbackBehaviours()
  aeonlog.behaviours()
  log(aeonlog)
}

aeonlog.recoordinate = function() {
  var count = 0
  var list  = []
  for (var i=0; i<aeonlog.cartesian.length; i++) {
   if (aeonlog.cartesian[i].raw == '&nsbp;' && aeonlog.cartesian[i].packetID == 0) {
     count += 1
     list.push(i)
   }
  }
  for (var i=0; i<list.length; i++) {
   delete aeonlog.cartesian[i]
   delete aeonlog.flattened[i]
   delete aeonlog.lines[i]
  }
  $('#' + aeonlog.screen).empty()
  aeonlog.screenpad()
  aeonlog.screenFill()   // UI interaction
  aeonlog.timings()      // UI interaction
  aeonlog.coordinates()
}

aeonlog.coordinates = function() {
  var screen = $('#' + aeonlog.screen)
  var screenHeight = screen.height()
  var packetNumber = false
  var packetTime   = false
  for (var i=(aeonlog.lines.length - 1); i>-1; i--) {
   var L = $('.line-' + i)
   var linePosition = L.position()
       linePosition = linePosition.top || false
   var lineHeight   = L.height()
   var timing       = aeonlog.flattened[i].status.time
   var packetID     = aeonlog.flattened[i].packetID
   var position;
   if (packetID != packetNumber || packetNumber == false) {
     packetNumber = packetID
     packetTime   = timing
     position     = linePosition + lineHeight - screenHeight
   }
   aeonlog.cartesian[i] = {
     position   : linePosition,
     time       : timing - aeonlog.anchor,
     packetTime : packetTime - aeonlog.anchor,
     packetPos  : position,
     packetID   : packetID,
     raw        : aeonlog.flattened[i].raw
   }
  }
}

aeonlog.timings = function() {
  var firstLine    = aeonlog.flattened[0]
  var lastLine     = aeonlog.flattened[(aeonlog.flattened.length - 1)]
  aeonlog.anchor   = firstLine.status.time
  aeonlog.duration = lastLine.status.time - aeonlog.anchor
  aeonlog.timing   = convertTiming( aeonlog.duration )
  var now          = convertTiming( aeonlog.currentTime )
  $('#pbclock').text(lpad( now.parsed + ' ║ ' + aeonlog.timing.parsed, 16, ' '))
}

aeonlog.screenFill = function() {
  var s = ''
  for (var i=0; i<aeonlog.lines.length; i++) {
   s += '<div class="line-' + i + ' lisp">' + aeonlog.lines[i] + '</div>'
  }
  $('#' + aeonlog.screen).append(s)
  aeonlog.update('Appended ' + aeonlog.lines.length + ' lines. Complete.')
}

aeonlog.screenpad = function() {
  var screen = $('#' + aeonlog.screen)
  var screenHeight = screen.height()
  screen.append('<div id="dummy">dummy</div>')
  var lineHeight = $('#dummy').height()
  $('#dummy').remove()
  var requiredPadding = Math.ceil( screenHeight / lineHeight )
  var firstLine = aeonlog.flattened[0]
  for (var i=0; i<requiredPadding; i++) {
   aeonlog.flattened.unshift({
     raw      : '&nbsp;',
     printed  : '<span class="blank">&nbsp;</span>',
     packetID : 0,
     status   : {
      time     : firstLine.status.time - 5,
      room     : { num: 0, area: '', name: '' },
      self     : { affs: {}, vars: {} },
      target   : { affs: {}, vars: {} },
     }
   })
   aeonlog.lines.unshift('<span class="blank">&nbsp;</span>')
  }
}

aeonlog.simplify = function( tablen ) {
  for (var i=0; i<tablen.length; i++) {
   var packet = tablen[i]
   for (var j=0; j<packet.length; j++) {
     var line = packet[j]
         line.packetID = i
     if (line.printed != '') {
      aeonlog.flattened.push( line )
      aeonlog.lines.push( line.printed )
     }
   }
  }
  aeonlog.update('Flattened file.')
  return true
}

aeonlog.play = function() {

}

aeonlog.pause = function() {

}

aeonlog.stepforward = function() {

}

aeonlog.stepbackward = function() {

}

aeonlog.stepto = function() {

}

aeonlog.scrollstop = function() {

}


aeonlog.afflictionsList = [
    'addiction',
    'aeon',
    'agoraphobia',
    'airdisrupt',
    'airfisted',
    'amnesia',
    'anorexia',
    'asthma',
    'blackout',
    'bound',
    'brokenleftarm',
    'brokenleftleg',
    'brokenrightarm',
    'brokenrightleg',
    'bruisedribs',
    'burning',
    'cadmuscurse',
    'claustrophobia',
    'clumsiness',
    'concussion',
    'conflagration',
    'confusion',
    'corruption',
    'crackedribs',
    'crushedthroat',
    'daeggerimpale',
    'damagedhead',
    'damagedleftarm',
    'damagedleftleg',
    'damagedrightarm',
    'damagedrightleg',
    'darkshade',
    'dazed',
    'dazzled',
    'deadening',
    'deepsleep',
    'degenerate',
    'dehydrated',
    'dementia',
    'demonstain',
    'depression',
    'deteriorate',
    'disloyalty',
    'disrupted',
    'dissonance',
    'dizziness',
    'earthdisrupt',
    'enlightenment',
    'enmesh',
    'entangled',
    'entropy',
    'epilepsy',
    'fear',
    'firedisrupt',
    'flamefisted',
    'frozen',
    'generosity',
    'haemophilia',
    'hallucinations',
    'hamstrung',
    'hatred',
    'healthleech',
    'heartseed',
    'hecatecurse',
    'hellsight',
    'hindered',
    'homunculusmercury',
    'hypersomnia',
    'hypochondria',
    'hypothermia',
    'icefisted',
    'impaled',
    'impatience',
    'indifference',
    'inquisition',
    'insomnia',
    'internalbleeding',
    'itching',
    'justice',
    'kaisurge',
    'laceratedthroat',
    'lethargy',
    'loneliness',
    'lovers',
    'manaleech',
    'masochism',
    'mildtrauma',
    'mindclamp',
    'nausea',
    'numbedleftarm',
    'numbedrightarm',
    'pacified',
    'palpatarfeed',
    'paralysis',
    'paranoia',
    'parasite',
    'peace',
    'penitence',
    'petrified',
    'phlogisticated',
    'pinshot',
    'prone',
    'recklessness',
    'retribution',
    'revealed',
    'scalded',
    'scrambledbrains',
    'scytherus',
    'selarnia',
    'sensitivity',
    'serioustrauma',
    'shadowmadness',
    'shivering',
    'shyness',
    'silver',
    'skullfractures',
    'slashedthroat',
    'sleeping',
    'slickness',
    'slimeobscure',
    'spiritdisrupt',
    'stupidity',
    'stuttering',
    'timeflux',
    'timeloop',
    'torntendons',
    'transfixation',
    'trueblind',
    'unconsciousness',
    'vertigo',
    'vinewreathed',
    'vitiated',
    'vitrified',
    'voidfisted',
    'voyria',
    'waterdisrupt',
    'weakenedmind',
    'weariness',
    'whisperingmadness',
    'wristfractures',
    'unblind',
    'undeaf',
  ]