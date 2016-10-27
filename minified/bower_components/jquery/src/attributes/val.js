define(["../core","./support","../core/init"],function(c,a){var b=/\r/g;c.fn.extend({val:function(g){var d,e,h,f=this[0];if(!arguments.length){if(f){d=c.valHooks[f.type]||c.valHooks[f.nodeName.toLowerCase()];if(d&&"get" in d&&(e=d.get(f,"value"))!==undefined){return e}e=f.value;return typeof e==="string"?e.replace(b,""):e==null?"":e}return}h=c.isFunction(g);return this.each(function(j){var k;if(this.nodeType!==1){return}if(h){k=g.call(this,j,c(this).val())}else{k=g}if(k==null){k=""}else{if(typeof k==="number"){k+=""}else{if(c.isArray(k)){k=c.map(k,function(i){return i==null?"":i+""})}}}d=c.valHooks[this.type]||c.valHooks[this.nodeName.toLowerCase()];if(!d||!("set" in d)||d.set(this,k,"value")===undefined){this.value=k}})}});c.extend({valHooks:{option:{get:function(d){var e=c.find.attr(d,"value");return e!=null?e:c.trim(c.text(d))}},select:{get:function(d){var k,f,m=d.options,h=d.selectedIndex,g=d.type==="select-one"||h<0,l=g?null:[],j=g?h+1:m.length,e=h<0?j:g?h:0;for(;e<j;e++){f=m[e];if((f.selected||e===h)&&(a.optDisabled?!f.disabled:f.getAttribute("disabled")===null)&&(!f.parentNode.disabled||!c.nodeName(f.parentNode,"optgroup"))){k=c(f).val();if(g){return k}l.push(k)}}return l},set:function(j,k){var l,h,f=j.options,d=c.makeArray(k),g=f.length;while(g--){h=f[g];if(c.inArray(c.valHooks.option.get(h),d)>=0){try{h.selected=l=true}catch(e){h.scrollHeight}}else{h.selected=false}}if(!l){j.selectedIndex=-1}return f}}}});c.each(["radio","checkbox"],function(){c.valHooks[this]={set:function(d,e){if(c.isArray(e)){return(d.checked=c.inArray(c(d).val(),e)>=0)}}};if(!a.checkOn){c.valHooks[this].get=function(d){return d.getAttribute("value")===null?"on":d.value}}})});