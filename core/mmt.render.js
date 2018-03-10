
mmt = (function() {
 var query  = 'Deliver #QUANTITEM# %ITEM% to %HARBOUR% for #QUANTREWARD# %REWARD% [BR] '
     query += 'Free Cargo Space: #QUANTCARGO# Fee Per Employee: #QUANTSALARY#'
 var ssym   = '%'
 var qsym   = '#'
 var offset = 58
 var defaults = {
  'QUANTITEM'  : 4,
  'ITEM'       : 'good-type',
  'HARBOUR'    : "Ta'surke",
  'QUANTREWARD': 50000,
  'REWARD'     : 'sovereigns',
  'QUANTCARGO' : 100,
  'QUANTSALARY': 5000,
 }
 var options = {
  'QUANTITEM'   : [1,2,3,4,5,6,7,8,9,10],
  'ITEM'        : [
     'armaments','ceramics','fruits','fur','gems','glass', 'granite','hemp','honey','incense',
     'kahwe','marble','perfume','porcelain','silk','spices','sugar','tabac','tea','terracotta','wine',
   ],
  'HARBOUR'     : ["Ta'surke","Thraasi"],
  'QUANTREWARD' : [],
  'REWARD'      : ['credits','sovereigns'],
 }

 var render = function() {
   var div = ''
   var str = query

   var sregex   = new RegExp(ssym + '\\w+' + ssym, 'g')
   var smatches = []
   while (match = sregex.exec(str)) {
    var item = match[0]
    var ptem = item.replace(ssym,'')
    smatches.push({item: item, start: match.index, length: ptem.length})
   }
   var qregex   = new RegExp(qsym + '\\w+' + qsym, 'g')
   var qmatches = []
   while (match = qregex.exec(str)) {
    var item = match[0]
    var ptem = item.replace(qsym,'')
    qmatches.push({item: item, start: match.index, length: ptem.length})
   }

   var arr = str.split(' ')
   var out = ''
   for (var i=0; i<arr.length; i++) {
     var item = arr[i]
     var d    = ''
     // Dropdown Options
     for (var j=0; j < smatches.length; j++) {
      if (smatches[j].item == item) {
        var name = item.replace(new RegExp(ssym, 'g'),'')
        var val  = defaults[name] || ''
        d  = '<select name="' + name + '" id="' + name + '">'
        if (options[name]) {
         var t = options[name]
         for (var k=0; k < t.length; k++) {
           d += '<option value="' + t[k] + '"'
           if (t[k] == val) {
            d += ' selected="selected"'
           }
           d += '>' + t[k] + '</option>' } }
        d += '</select> '
        break } }
     // Quantifier Options
     for (var j=0; j < qmatches.length; j++) {
      if (qmatches[j].item == item) {
        var name = item.replace(new RegExp(qsym, 'g'),'')
        var val  = defaults[name] || ''
        d  = '<input id="' + name + '" value="' + val + '">'
        d += '</input> '
        break } }
     // Non-special
     if (d == '') {
      d = '<div id="query-' + i + '" class="query" style="inline-block">' + arr[i] + '</div> '
     }
     out += d
   }
   // some post-hoc
   out = '<div id="line-1" class="line">' + out + '</div>'
   out = out.replace('[BR]</div>','</div></div><div id="line-2" class="line">')
   out = out.replace('Fee','             Fee')
   // log(out)
   $('body').append(out)
   $('#QUANTITEM').spinner({
     min  :  1,
     max  : 25,
     step :  1,
     stop : function(e, ui){
       mmt.update()
     }
   })
   $('#QUANTCARGO').spinner({
     min  :   0,
     max  : 150,
     step :  10,
     stop : function(e, ui){
       mmt.update()
     }
   })
   $('#QUANTSALARY').spinner({
     min  :     0,
     max  : 15000,
     step :   500,
     stop : function(e, ui){
       mmt.update()
     }
   })
   rewardsteps()
   
   // Show Steps for selected Path
   var d  = ''
       d += '<div id="steps">Steps: '
       d += '<span class="steps-query">?</span>'
       d += '</div>'
   $('body').append(d)
   var p = $('#line-2').position()
   var t = p.top
   var h = $('#line-2').height()
       t = Math.floor(t + h) + (30 * 2) // padding
   $('#steps').css('position','absolute').css('top', t + 'px')

   // Potential Paths
       d  = ''
       d += '<div id="paths">Potential Paths: '
       d += '</div>'
   $('body').append(d)
   $('#paths').dialog({
    autoOpen: false,
    width: '72%',
    maxWidth: '768px',
   })
   // Access to Paths
   $('.steps-query').on('click', function() {
    $('#paths').dialog('open')
   })

   // Show Maximal & Optimal Cargos
   d  = ''
   d += '<div id="max-cargo">Maximal Cargo: '
   d += '</div>'
   d += '<div id="opt-cargo">Optimal Cargo: '
   d += '</div>'
   $('body').append(d)
   // We repeat this positioning on Update
   var w  = $('#steps').width()
       w += offset
   $('#max-cargo').css('position','absolute').css('left', w + 'px')
       w  = $('#max-cargo').position()
       w  = w.left + $('#max-cargo').width()
       w += offset
   $('#opt-cargo').css('position','absolute').css('left', w + 'px')
   $('#max-cargo').css('top', t + 'px')
   $('#opt-cargo').css('top', t + 'px')

   // Profit
   d  = ''
   d += '<div id="profit">Expected Profit: '
   d += '</div>'
   $('body').append(d)
   var h = $('#steps').height()
       h = h + t + offset
   $('#profit').css('position','absolute').css('top', t + 'px')

   // My eyes
   $("#ITEM").find("option").css("color", 'rgba(1,1,1,1)');
   $('#ITEM').selectmenu({
      change : function(e, ui){
       mmt.update()
      },
      width : '140px',
   })
   $('#HARBOUR').selectmenu({
      change : function(e, ui){
       mmt.update()
      },
      width : '140px',
   })
   $('#REWARD').selectmenu({
      change : function(e, ui){
       mmt.update()
      },
      width : '140px',
   })

   return div
 }

 var rewardsteps = function() {
   var rewardtype = $('#REWARD').val()
   if (rewardtype == 'sovereigns') {
    $('#QUANTREWARD').spinner({
      min  :  10000,
      max  : 250000,
      step :  10000,
      stop : function(e, ui){
       mmt.update()
      }
    })
    $('#QUANTREWARD').val(40000)
   } else {
    $('#QUANTREWARD').spinner({
      min  :  1,
      max  : 25,
      step :  1,
      stop : function(e, ui){
       mmt.update()
      }
    })
    $('#QUANTREWARD').val(5)
   }
 }

 return {
   render : render,
   offset : offset,
 }
})()