
mmt = (function(mmt) {
 var clone = function(obj) {
   var copy; if (null == obj || 'object' != typeof obj) { return obj }
   if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy }
   if (obj instanceof Array) { copy = []; for (var i=0; i<obj.length; i++) { copy[i] = clone(obj[i]) }; return copy }
   if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = clone(obj[attr]) } }; return copy }
   throw new Error('Unable to copy obj! Type not supported.') }
 
 var calculatePath = function(item) {
  var t = clone( mmt.data ) 
  var m = [] 
  expand(m, null, null, item)
  var n = shortest(m)
  var q = 100
  var r = []
  for (var i=0; i<n.length; i++) {
    if (q > n[i]) {
     q = n[i]
     r = m[i] }
  }
  return r
 }

 var calculatePaths = function() {
  var t = clone( mmt.data )
  log(t.byi)
  log(t.trades)
  var out = {}
  for (var item in t.byi) {
   out[item] = calculatePath(item)
  }
  for (var item in out) {
   var s = ''
       s += 'Purchasing ' + item + ' :'
   var p = out[item]
   for (var i=0; i<p.length; i++) {
     var x = t.trades[p[i]]
     s += ' ' + x.loss.type.toUpperCase() + ' >> ' + x.gain.type.toUpperCase() + ' @ ' + x.destination + '.'
   }
   // log(s)
  }
  mmt.optimals = clone(out)
 }

 // suboptimal, only finds some paths
 var expand = function exquisite (master, stack, itemstack, item) {
  // log(stack)
  var m = master || []
  var s = clone(stack) || []
  var u = itemstack || []
  var t = mmt.data.byi
  if (t[item] == null) { return s }; t = t[item]; // log(t)
  if (t.buyat == null) { return s }; t = t.buyat; // log(t)
  for (var ports in t) {
    var trades = t[ports]
    // log('Searching for ' + item + ' in ' + ports)
    for (var i=0; i < trades.length; i++) {
     var v = trades[i]
     if (v.for == 'gold') {
       s.push( v.tradeid )
       master.push( clone(s).reverse() )
       s.pop()
       s.pop()
       // s = []
       // log('Terminate search, reached gold.')
       return s
     }
     if (u.indexOf( v.for ) != -1) {
       // master.push( clone(s) )
       s.pop()
       // log('Terminating search at this point. We are looking for a similar item.')
       return s
     }
     if (s.indexOf( v.tradeid ) == -1) {
       s.push( v.tradeid )
       u.push( v.for )
       s = expand( m, s, u, v.for )
     }
    }
  }
  s.pop()
  return s
 }

 var shortest = function(paths) {
  var t = paths
  var L = mmt.ttime
  var r = mmt.data.trades
  var out = []
  for (var i=0; i<paths.length; i++) {
    var q = paths[i]
    var distance = 0
    var prevport = null
    for (var j=0; j<q.length; j++) {
      var p = r[q[j]]
      if (!prevport) { prevport = p.destination } // starting the journey
      else {
       for (var key in L[prevport]) {
         if (key == p.destination) {
          distance += L[prevport][key]
          break
         }
       }
      }
    }
    out.push(distance)
  }
  return out
 }

 mmt.calculatePath  = calculatePath
 mmt.calculatePaths = calculatePaths
 mmt.expand         = expand
 return mmt
})(mmt || {})