
mmt = (function(mmt) {
 var clone = function(obj) {
   var copy; if (null == obj || 'object' != typeof obj) { return obj }
   if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy }
   if (obj instanceof Array) { copy = []; for (var i=0; i<obj.length; i++) { copy[i] = clone(obj[i]) }; return copy }
   if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = clone(obj[attr]) } }; return copy }
   throw new Error('Unable to copy obj! Type not supported.') }
 
 var update = function() {
    $('.step').remove();  $('#steps br').remove()
   $('.cargo').remove();  $('#max-cargo br').remove(); $('#opt-cargo br').remove()
  $('.profit').remove();  $('#profit br').remove()
  $('.possible-path').remove()
  var item      = 'gems'
  var cargosize = 150
  var packets   = 5
  var payout    = 200000
  var employ    = 5000
  
  // Grab our data
  packets   = $('#QUANTITEM').val()
  item      = $('#ITEM').val()
  cargosize = $('#QUANTCARGO').val()
  payout    = $('#QUANTREWARD').val()
  employ    = $('#QUANTSALARY').val()
  
  var m = []
  mmt.expand(m, null, null, item)
  var shortest  = mmt.calculatePath(item)
  var y = mmt.percolate(shortest, cargosize, packets)

  // Update Potential Paths
  var paths = []
  for (var i=0; i<m.length; i++) {
    var p = m[i]
    var q = ''
    for (var j=0; j < p.length; j++) {
     var t = p[j]
     var r = mmt.data.trades[t]
     q  += r.loss.quantity + ' ' + r.loss.type + ' &Rarr; '
     q  += r.gain.quantity + ' ' + r.gain.type + ' at ' + r.destination + '; '
    }
    paths.push(q)
  }
  for (var i=0; i<paths.length; i++) {
   var d = ''
   d += '<p class="possible-path">' + paths[i] + '</p>'
   $('#paths').append(d)
  }

  // Show Shortest
  var s = '<br/>'
  var u = ''
  var v = y.optinit
  for (var i=0; i < shortest.length; i++) {
   var p = mmt.data.trades[shortest[i]]
   // Do we want to display the quota changes?
   if (p.loss.type != 'gold') {
    var w = v
    v = Math.floor(v * p.gain.quantity / p.loss.quantity)
    u = '(' + lpad(w,3) + ' > ' + lpad(v,3) + ') '
    u = p.loss.quantity + ':' + p.gain.quantity + ' ' + u
   } else { u = '    (         ) ' }
   // prepend for easy calculation
   
   s += '<span class="steps-' + i + ' step">  ' + u 
   s += p.loss.type + ' &Rarr; ' + p.gain.type + ' at ' + p.destination + ' </span><br/>'
  }
  $('#steps').append(s)

  // Update Maximal
  var w  = $('#steps').width()
      w += mmt.offset + mmt.offset + 25
  $('#max-cargo').css('position','absolute').css('left', w + 'px')
  var s = '<br/>'
  var q = {}
  Object.keys(y.maximal).sort().forEach(function(key) { q[key] = y.maximal[key] })
  for (var k in q) { 
    s += '<span class="cargo"> ' + lpad(q[k],3) + ' ' + k + '</span><br/>'
  }
  $('#max-cargo').append(s)

  // Update Optimal
  var w  = $('#max-cargo').position()
      w  = w.left + $('#max-cargo').width()
      w += mmt.offset
  $('#opt-cargo').css('position','absolute').css('left', w + 'px')
  var s = '<br/>'
  var q = {}
  Object.keys(y.optimized).sort().forEach(function(key) { q[key] = y.optimized[key] })
  for (var k in q) { 
    s += '<span class="cargo"> ' + lpad(q[k],3) + ' ' + k + '</span><br/>' }
  // Add in Optinit
  s += '<br/>'
  s += '<span class="cargo">Start with: ' + y.optinit + ' ' + y.inittype + '</span>'
  $('#opt-cargo').append(s)

  // Update Profit
  var t = $('#steps').position()
      t = t.top
  var h = $('#steps').height()
      h = h + t + 30
  $('#profit').css('top', t + 'px')
  $('#profit').css('position','absolute').css('top', t + 'px') // not sure why this doesn't work
  $('#profit').offset({top: h})
  
  // Calculate Profit
  var x = y.optimized
  var u = x[item]
  var i = y.optinit * 1000
  var p = u / packets * payout
  var q = (packets - 1) * employ
  var n = p - q
  
  if (q < 0) { q = 0 }
  var g  = 18
  var h  = 11
  var d  = '<br/>'
      d += '<span class="profit expected-payout">  '
      d +=     rpad('Expected Payout: ', g) + lpad(commaThis(p), h) + '</span><br/>'
      d += '<span class="profit initial-cost">  '
      d +=     rpad('Initial Cost: ', g) + lpad(commaThis(i), h) + '</span><br/>'
      d += '<span class="profit docking-fees">  '
      d +=     rpad('Docking Fees: ', g) + lpad(commaThis(0), h) + '</span><br/>'
      d += '<span class="profit employee-fees">  '
      d +=     rpad('Employee Fees: ', g) + lpad(commaThis(q), h) + '</span><br/>'
      d += '<br/>'
      d += '<span class="profit nett-profit">  '
      d +=     rpad('Nett Profit: ', g) + lpad(commaThis(n), h) + '</span>'
  $('#profit').append(d)
 }
 
 mmt.update = update
 return mmt
})(mmt || {})