
mmt = (function(mmt) {
 var clone = function(obj) {
   var copy; if (null == obj || 'object' != typeof obj) { return obj }
   if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy }
   if (obj instanceof Array) { copy = []; for (var i=0; i<obj.length; i++) { copy[i] = clone(obj[i]) }; return copy }
   if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = clone(obj[attr]) } }; return copy }
   throw new Error('Unable to copy obj! Type not supported.') }
 
 var percolate = function(path, cargosize, packets) {
   var out = {}
   log(path)
   log(cargosize)
   
   var t  = mmt.data
   var tr = mmt.data.trades
   
   var cumulate = function(cargo) { var n = 0; for (var item in cargo) { n += cargo[item] }; return n }
   
   var sc = {}
   var n  = cargosize
   for (var i=0; i<path.length; i++) {
    var p = path[i]
    var q = tr[p]
    var L = q.loss.quantity
    if (q.loss.type == 'gold') { L = 1 }
    var r = n
    n = Math.floor( n / L ) * q.gain.quantity
    // log(q); log(n)
    if (sc[q.loss.type]) { sc[q.loss.type] = Math.floor( r % L ) }
    sc[q.gain.type] = n
   }
   
   var c  = {}
   var x = Math.floor( n / packets ) * packets
   var g = ''
   if (packets) {
    var o = 0
    for (var i=(path.length - 1); i > -1; i--) {
      var p = path[i]
      var q = tr[p]
      var G = q.gain.quantity
      var r = Math.ceil( x / G )
          r = r * q.loss.quantity
      if (i == (path.length-1)) { c[q.gain.type] = x } else { c[q.gain.type] = x % G }
      if (i == 0) { g = q.gain.type }
          x = r
      // log(r); log(q)
    }
   }
   // log(sc); log(c)
   
   if (x > 1000) { out.optinit = x / 1000 } else { out.optinit = x }
   // out.optinit   = x
   out.inittype  = g
   out.maximal   = sc
   out.optimized = c
   out.cargosize = cargosize
   out.path      = path
   return out
 }


 mmt.percolate = percolate
 return mmt
})(mmt || {})