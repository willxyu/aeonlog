
mmt = (function(mmt) {
 var data = {}
 var ttime = {
  ['Ageiro']       : { Colchis: 1.4, Karbaz: 0.6, Minos: 1.5, Mysia: 0.9, Orilla: 1, ['Shala-Khulia']: 0.4, Shastaan: 0.9, Suliel: 3, ["Ta'surke"]: 1.2, Thraasi: 0.4, Umbrin: 1.4, Zanzibaar: 0.9, Zaphar: 0.9 },
  ['Colchis']      : { Ageiro: 1.4, Karbaz: 2, Minos: 0.2, Mysia: 0.3, Orilla: 1, ['Shala-Khulia']: 0.5, Shastaan: 0.3, Suliel: 2, ["Ta'surke"]: 0.3, Thraasi: 0.7, Umbrin: 0.2, Zanzibaar: 0.4, Zaphar: 0.6 },
  ['Karbaz']       : { Ageiro: 0.4, Colchis: 1.5, Minos: 1.5, Mysia: 0.7, Orilla: 1, ['Shala-Khulia']: 0.4, Shastaan: 0.7, Suliel: 1.2, ["Ta'surke"]: 1, Thraasi: 0.4, Umbrin: 1.5, Zanzibaar: 0.7, Zaphar: 0.8 },
  ['Minos']        : { Ageiro: 1.4, Colchis: 0.2, Karbaz: 2, Mysia: 0.3, Orilla: 1, ['Shala-Khulia']: 0.5, Shastaan: 0.3, Suliel: 2, ["Ta'surke"]: 0.3, Thraasi: 0.7, Umbrin: 0.2, Zanzibaar: 0.4, Zaphar: 0.6 },
  ['Mysia']        : { Ageiro: 0.5, Colchis: 0.3, Karbaz: 0.7, Minos: 0.4, Orilla: 1, ['Shala-Khulia']: 0.4, Shastaan: 0.1, Suliel: 3, ["Ta'surke"]: 0.2, Thraasi: 0.4, Umbrin: 0.4, Zanzibaar: 0.1, Zaphar: 0.2 },
  ['Orilla']       : { Ageiro: 1, Colchis: 1, Karbaz: 1, Minos: 1, Mysia: 1, ['Shala-Khulia']: 1, Shastaan: 1, Suliel: 1, ["Ta'surke"]: 1, Thraasi: 1, Umbrin: 1, Zanzibaar: 1, Zaphar: 1 },
  ['Shala-Khulia'] : { Ageiro: 0.2, Colchis: 0.6, Karbaz: 0.5, Minos: 0.65, Mysia: 0.24, Orilla: 1, Shastaan: 0.23, Suliel: 3, ["Ta'surke"]: 0.4, Thraasi: 0.1, Umbrin: 0.64, Zanzibaar: 0.14, Zaphar: 0.2 },
  ['Shastaan']     : { Ageiro: 0.7, Colchis: 0.5, Karbaz: 0.9, Minos: 0.62, Mysia: 0.1, Orilla: 1, ['Shala-Khulia']: 0.14, Suliel: 3, ["Ta'surke"]: 0.14, Thraasi: 0.3, Umbrin: 0.5, Zanzibaar: 0.2, Zaphar: 0.24 },
  ['Suliel']       : { Ageiro: 3, Colchis: 3, Karbaz: 3, Minos: 3, Mysia: 3, Orilla: 3, ['Shala-Khulia']: 3, Shastaan: 3, ["Ta'surke"]: 3, Thraasi: 3, Umbrin: 3, Zanzibaar: 3, Zaphar: 3 },
  ["Ta'surke"]     : { Ageiro: 1, Colchis: 0.25, Karbaz: 1.4, Minos: 0.3, Mysia: 0.2, Orilla: 1, ['Shala-Khulia']: 0.4, Shastaan: 0.3, Suliel: 1.8, Thraasi: 0.7, Umbrin: 0.3, Zanzibaar: 0.2, Zaphar: 0.24 },
  ['Thraasi']      : { Ageiro: 0.3, Colchis: 0.8, Karbaz: 0.5, Minos: 0.85, Mysia: 0.5, Orilla: 1, ['Shala-Khulia']: 0.23, Shastaan: 0.4, Suliel: 1.8, ["Ta'surke"]: 0.7, Umbrin: 0.9, Zanzibaar: 0.67, Zaphar: 0.7 },
  ['Umbrin']       : { Ageiro: 1.4, Colchis: 0.2, Karbaz: 2, Minos: 0.2, Mysia: 0.3, Orilla: 1, ['Shala-Khulia']: 0.5, Shastaan: 0.3, Suliel: 2, ["Ta'surke"]: 0.3, Thraasi: 0.7, Zanzibaar: 0.4, Zaphar: 0.6 },
  ['Zanzibaar']    : { Ageiro: 0.6, Colchis: 0.4, Karbaz: 0.7, Minos: 0.4, Mysia: 0.1, Orilla: 1, ['Shala-Khulia']: 0.15, Shastaan: 0.15, Suliel: 2, ["Ta'surke"]: 0.25, Thraasi: 0.45, Umbrin: 0.4, Zaphar: 0.1 },
  ['Zaphar']       : { Ageiro: 0.7, Colchis: 0.5, Karbaz: 0.8, Minos: 0.5, Mysia: 0.2, Orilla: 1, ['Shala-Khulia']: 0.25, Shastaan: 0.25, Suliel: 2.1, ["Ta'surke"]: 0.35, Thraasi: 0.55, Umbrin: 0.5, Zanzibaar: 0.1 },
 }
 var trades = [
  '1000 gold for 1 salt at Zaphar',
  "1000 gold for 1 wool at Ta'surke",
  '1000 gold for 1 sandstone at Shastaan',
  '1000 gold for 1 cotton at Shastaan',
  '1000 gold for 1 grain at Thraasi',
  '1000 gold for 1 ore at Thraasi',
  '4 salt for 3 honey at Minos',
  '1 wool for 1 fur at Suliel',
  "4 sandstone for 3 granite at Ta'surke",
  '4 cotton for 3 terracotta at Orilla',
  '4 grain for 3 sugar at Zaphar',
  '4 ore for 3 fruit at Zanzibaar',
  '3 honey for 2 ceramics at Karbaz',
  '4 fur for 3 hemp at Shastaan',
  '3 granite for 2 marble at Karbaz',
  '3 terracotta for 2 tea at Zanzibaar',
  "3 sugar for 2 kahwe at Ta'surke",
  '3 fruit for 2 glass at Thraasi',
  '3 hemp for 2 ceramics at Karbaz',
  '3 hemp for 2 marble at Karbaz',
  '3 ceramics for 2 porcelain at Umbrin',
  '3 marble for 2 silk at Colchis',
  '3 marble for 2 wine at Minos',
  '3 tea for 2 wine at Minos',
  '3 kahwe for 2 incense at Suliel',
  '3 glass for 2 incense at Shala-Khulia',
  '3 porcelain for 2 ceramics at Mysia',
  '3 silk for 2 ceramics at Mysia',
  '3 wine for 2 kahwe at Umbrin',
  '3 incense for 2 glass at Colchis',
  '3 porcelain for 2 tabac at Mysia',
  '3 silk for 2 tabac at Mysia',
  '3 wine for 2 armaments at Umbrin',
  '3 incense for 2 perfume at Colchis',
  '3 tabac for 2 silk at Ageiro',
  '3 armaments for 2 incense at Zanzibaar',
  '3 perfume for 2 wine at Shastaan',
  '2 tabac for 1 gems at Ageiro',
  '2 armaments for 1 spices at Zanzibaar',
  '2 perfume for 1 gems at Shastaan',
  '2 spices for 1 armaments at Thraasi',
  '2 gems for 1 perfume at Zanzibaar',
 ]

 var construct = function(arg) {
  var out = []
  var t = arg || trades
  for (var i=0; i < t.length; i++) {
    var r = parse(t[i])
    out.push(r)
  }
  t = ledger(out)
  mmt.data = t
 }

 var ledger = function(data) {
  var out        = {}
      out.trades = data
  var bydest     = {}
  var byitem     = {}
  var t          = out.trades
  for (var i=0; i < t.length; i++) {
   var id = i
   var d  = t[i].destination
   var g  = t[i].gain
   var l  = t[i].loss
   // By Destination
   if (bydest[d] == null) { 
     bydest[d] = {}
     bydest[d].sells = {}
     bydest[d].buys  = {} 
   }
   if (bydest[d].sells[g.type] == null) { bydest[d].sells[g.type] = [] }
   bydest[d].sells[g.type].push({tradeid: id, quant: g.quantity, for: l.type, fquant: l.quantity})
   if (bydest[d].buys[l.type] == null) { bydest[d].buys[l.type] = [] }
   bydest[d].buys[l.type].push({tradeid: id, quant: l.quantity, sells: g.type, squant: g.quantity})
   // By Item
   if (byitem[g.type] == null) {
     byitem[g.type] = {}
     byitem[g.type].buyat = {}
     byitem[g.type].sellat = {}
   }
   if (byitem[g.type].buyat[d] == null) { byitem[g.type].buyat[d] = [] }
   byitem[g.type].buyat[d].push({tradeid: id, quant: g.quantity, for: l.type, fquant: l.quantity})
   if (byitem[l.type] == null) {
     byitem[l.type] = {}
     byitem[l.type].buyat = {}
     byitem[l.type].sellat = {}
   }
   if (byitem[l.type].sellat[d] == null) { byitem[l.type].sellat[d] = [] }
   byitem[l.type].sellat[d].push({tradeid: id, quant: l.quantity, for: g.type, fquant: g.quantity})

  }
  out.byd = bydest
  out.byi = byitem
  return out 
 }

 var parse = function(line) {
  var out = {}
  var destination;
  var r = line.split('at')
  
  out.destination = r[1].trim()
  var s = r[0]
  r = s.split('for')
  var w = r[1].trim()
      w = w.split(' ')
  var q = parseInt( w[0] )
  var t = w[1]
  out.gain = {quantity: q, type: t}
  s = r[0].trim()
  s = s.split(' ')
  out.loss = {quantity: parseInt(s[0]), type: s[1]}
  return out
 }

 mmt.construct = construct
 mmt.data      = data
 mmt.ttime     = ttime
 return mmt
})(mmt || {})