
clean = function(n) {
  var x = Number(n.replace(/[^-\d\.]/g, ''))
  return x }

clone = function(obj) {
  var copy
  if (null == obj || 'object' != typeof obj) { return obj }
  if (obj instanceof Date) { 
   copy = new Date()
   copy.setTime(obj.getTime())
   return copy }
  if (obj instanceof Array) {
   copy = []
   for (var i=0; i<obj.length; i++) {
     copy[i] = clone(obj[i]) }
   return copy }
  if (obj instanceof Object) {
   copy = {}
   for (var attr in obj) {
     if (obj.hasOwnProperty(attr)) {
      copy[attr] = clone(obj[attr]) } }
   return copy }
  throw new Error('Unable to copy obj! Type not supported.') }

commaThis = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

convertTiming = function( duration ) {
  var msecs = duration
  var  secs = Math.floor(msecs / 1000) 
      msecs = msecs % 1000
  var  mins = Math.floor( secs / 60)
       secs = secs  % 60
  var hours = Math.floor( mins / 60 )
       mins = mins  % 60
  var t = {}
      t.hours = hours
      t.mins  = mins
      t.secs  = secs
      t.msecs = msecs
      t.parsed = lpad(hours,2,'0') + ':' + lpad(mins,2,'0') + ':' + lpad(secs,2,'0')
  return t }

lpad = function(str, len, char) {
  if (typeof str == "number") { str = str.toString() }
  if (char == null) { char = ' ' }
  var r = len - str.length
  if (r < 0) { r = 0 }
  return char.repeat(r) + str }

rpad = function(str,len,char) {
  if (typeof str == "number") { str = str.toString() }
  if (char == null) { char = ' ' }
  var r = len - str.length
  if (r < 0) { r = 0 }
  return str + char.repeat(r) }