
// loadingFile >> parsingFile >> 

fat = typeof fat !== 'undefined' ? fat : []
cat = typeof cat !== 'undefined' ? cat : []

listen = function() {
 $('body').on('dragover drop', function(e) { e.preventDefault() })
 $(document).on('draginit dragstart dragover dragend drag drop', function(e) {
  e.stopPropagation()
  e.preventDefault()
 })
 $('#file').on('change',  function(e) { loadingFile(e.target.files) })
 $('#screen').on('drop', function(e) { loadingFile(e.originalEvent.dataTransfer.files) })
}

loadingFile = function(file) {
 $('#notifier').remove()
 for (var i=0; i<file.length; i++) {
   var f = file[i]
   var s = f.size
   var r = new FileReader()
   var d = ''
   r.onloadstart = function(e) {
    d = 'Loading ' + f.name + ' ... '
    $('#updating').text(d)
   }
   r.onprogress = function(e) {
    if (e.lengthComputable) {
      var pct = Math.round((e.loaded / e.total) * 100)
      if (pct < 100) {
       log('(aeon.log js): Loaded ' + pct + '%')
      }
    }
   }
   r.onloadend = function(e) {
    log('(aeon.log js): Loading complete.')
    myXML = e.target.result
    // acknowledge(e.target.result)
    log('(aeon.log js): Acknowledge >> Process.')
    interpret(e.target.result)
   }
   r.onload = (function(y) {
    return function(e) {
      var u = e.target.result
      // acknowledge(u)
    }
   })(f)
   r.readAsText(f)
 }
}

interpret = function(data) {
 // log(data)
 log('Complete!')
 $('#updating').text('File read into memory - complete.')
 parsingFile(data)
}

parsingFile = function(data) {
 var out = []
 var matches = data.split('<aeon-packet>')
 var u  = $('#updating')
 var count = 0
 
 for (var i=0; i<matches.length; i++) {
  var packet = []
  var line = matches[i]
  var t = line.split('<aeon-line>')
  for (var j=1; j<t.length; j++) {
    count += 1
    u.text('Parsing data for LINE ' + count + '.')
    var n = t[j]
    var o = {}
    var raw      = n.match(/<aeon-raw>.*?<\/aeon-raw>/)
    var printed  = n.match(/<aeon-printed>.*?<\/aeon-printed>/)
    var status   = n.match(/<aeon-state>.*?<\/aeon-state>/)
        if (status) { status = status[0] || '' }
    var time     = status.match(/<aeon-time>.*?<\/aeon-time>/)
    var room     = status.match(/<aeon-room>.*?<\/aeon-room>/)
        if (room) { room = room[0] || '' }
    var roomnum  = room.match(/<aeon-roomnum>\d+<\/aeon-roomnum>/)
    var roomarea = room.match(/<aeon-roomarea>.*?<\/aeon-roomarea>/)
    var roomname = room.match(/<aeon-roomname>.*?<\/aeon-roomname>/)
    var self     = n.match(/<aeon-self>.*?<\/aeon-self>/)
        if (self) { self = self[0] || '' }
    var selfaffs = self.match(/<affs>.*?<\/affs>/)
    var selfvars = self.match(/<vars>.*?<\/vars>/)
    var target   = n.match(/<aeon-target>.*?<\/aeon-target>/)
        if (target) { target = target[0] || '' }
    var targaffs = target.match(/<affs>.*?<\/affs>/)
    var targvars = target.match(/<vars>.*?<\/vars>/)
        target   = target.match(/<name>.*?<\/name>/)
        if (raw)      { 
            raw = raw[0] || '' 
            raw = raw.replace('<aeon-raw>','')
            raw = raw.replace('</aeon-raw>','')
        }
        if (printed)  { 
            printed = printed[0] || '' 
            printed = printed.replace('<aeon-printed>','')
            printed = printed.replace('</aeon-printed>','')
        }
        if (time)     { 
            time = time[0] || '' 
            time = time.replace('<aeon-time>','')
            time = time.replace('</aeon-time>','')
            time = parseInt(time)
        }
        if (roomnum)  { 
            roomnum = roomnum[0] || 0
            roomnum = roomnum.replace('</aeon-roomnum>','')
            roomnum = roomnum.replace('</aeon-roomnum>','')
            roomnum = parseInt(roomnum)
        }
        if (roomarea) { 
            roomarea = roomarea[0] || ''
            roomarea = roomarea.replace('<aeon-roomarea>','')
            roomarea = roomarea.replace('</aeon-roomarea>','')
        }
        if (roomname) { 
            roomname = roomname[0] || ''
            roomname = roomname.replace('<aeon-roomname>','')
            roomname = roomname.replace('</aeon-roomname>','')
        }
        if (selfaffs) { 
            selfaffs = selfaffs[0] || ''
            selfaffs = selfaffs.replace('<affs>','')
            selfaffs = selfaffs.replace('</affs>','')
            selfaffs = selfaffs.match(/<.*?>.*?<\/.*?>/g)
        }
        if (selfvars) { 
            selfvars = selfvars[0] || ''
            selfvars = selfvars.replace('<vars>','')
            selfvars = selfvars.replace('</vars>','')
            selfvars = selfvars.match(/<.*?>.*?<\/.*?>/g)
        }
        if (targaffs) { 
            targaffs = targaffs[0] || ''
            targaffs = targaffs.replace('<affs>','')
            targaffs = targaffs.replace('</affs>','')
            targaffs = targaffs.match(/<.*?>.*?<\/.*?>/g)
            if (targaffs) {
            var pqt = {}
            for (var k=0; k<targaffs.length; k++) {
             var f = targaffs[k]
             var g = null
             if (f.length) {
             var a = f.match(/^\<(.*?)\>(.*)\</)
             if (a[1] != null) {
              f = a[1]
              g = a[2]
             }
             }
             pqt[f] = g
            }
            targaffs = pqt
            }
        }
        if (targvars) { 
            targvars = targvars[0] || ''
            targvars = targvars.replace('<vars>','')
            targvars = targvars.replace('</vars>','')
            targvars = targvars.match(/<.*?>.*?<\/.*?>/g)
        }
        if (target)   { 
            target   = target[0]   || ''
            target = target.replace('<name>','')
            target = target.replace('</name>','')
        }
    o.raw = raw || ''
    o.printed = printed  || ''
    o.status = {}
    o.status.time = time  || 0
    o.status.room = {}
    o.status.room.num = roomnum     || 0
    o.status.room.area = roomarea   || ''
    o.status.room.name = roomname   || ''
    o.status.self = {}
    o.status.self.affs = selfaffs   || {}
    o.status.self.vars = selfvars   || {}
    o.status.target = {}
    o.status.target.name = target   || ''
    o.status.target.affs = targaffs || {}
    o.status.target.vars = targvars || {}
    packet.push(o)
  }
  if (packet.length > 0) { out.push(packet) }
 }
 // log(out)
 // unpacket(out)
 aeonlog.playback( out )
}

unpacket = function(what) {
 var u  = $('#updating')
 var t = what
 var o = []
 var x = []
 for (var i=0; i<t.length; i++) {
  var p = t[i]
  for (var j=0; j<p.length; j++) {
   var q = p[j]
       q.packet = i
   if (q.printed != '') {
     o.push(q)
     x.push(q.printed) }
  }
 }
 fat = o
 cat = x
 u.text('Flattened file structure.')
 fileRender()
}

fileRender = function() {
 // $('#aeon-scroll').css('display','block')
 // $('#aeon-content').css('display','block')
 linedupe()
 
 var f = function() {
  return new Promise((resolve, reject) => {
    log('(aeonlog js): Render complete. Handing off for hashing.')
    resolve(renderStatic())
  })
 }
 var g = function() {
  return new Promise((resolve, reject) => {
    log('(aeonlog js): Hash & play back.')
    resolve(playback())
  })
 }
 f().then((dt) => {
   return g()
 }).then((dt) => {
   log('(aeonlog js): Playback running.')
 })
}

linedupe = function() {
 h = getline()
 // log(h)
 // log($('#content').height())
 var fromTop = $('#content').height()
 var blanks = Math.ceil( fromTop / h )
     blanks = blanks + 2
 var s = ''
 var earliest = fat[0]
     earliest = earliest.status
     earliest = earliest.time
 for (var i=0; i < blanks; i++) {
  fat.unshift({raw: '.', printed: '<span class="blank">.</span>', packet: 0,
    status: {
     time: earliest - 5,
     room: {num: 0, area: '', name: ''},
     self: {affs: {}, vars: {}},
     target: {affs: {}, vars: {}},
    },})
  cat.unshift('<span class="blank">.</span>')
 }
 // log(blanks)
 // log(dby)
}

getline = function() {
 var d = cat[0] || ''
     d = '<div id="dummy">' + d + '</div>'
 $('#screen').append(d)
 g = $('#dummy').height()
 $('#dummy').remove()
 return g
}

renderStatic = function() {
 var count = 0
 var u  = $('#updating')
 var t = []
 var s = ''
 for (var i=0; i<cat.length; i++) {
  count += 1
  t[i] = '<div class="line-'+i+' lisp">' + cat[i] + '</div>'
  s += t[i]
  u.text('Appending LINE ' + count + '.')
 }
 $('#screen').append(s)
 u.text('Appending lines completed.')
 return true
}

playback = function() {

}