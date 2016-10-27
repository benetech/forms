define(["vellum/form","jquery","underscore","vellum/datasources","vellum/mugs","vellum/parser","vellum/tree","vellum/util","vellum/core"],function(p,i,o,h,e,b,g,j){var c=e.baseMugTypes.normal.Repeat,d=[{key:"ids",event:"xforms-ready",path:"",query:"join(' ', {})"},{key:"count",event:"xforms-ready",path:"",query:"count-selected({}/@ids)"},{key:"index",event:"jr-insert",path:"/item",query:"int({}/@current_index)"},{key:"id",event:"jr-insert",path:"/item",query:"selected-at({}/@ids,../@index)"}],m=/^ *join\(['"] ['"], *(.*)\) *$/i,l={supportsDataNodeRole:true,getPathName:function(r,s){if(r.p.dataSource.idsQuery){s+="/item"}return s},parseDataNode:function(s,r){s.p.dataSource={idsQuery:"value for getPathName"};return r.children("item").children()},dataChildFilter:function(s,r){if(!r.p.dataSource.idsQuery){return s}return[new g.Node(s,{getNodeID:function(){return"item"},p:{rawDataAttributes:null},options:{getExtraDataAttributes:function(t){return{id:"",index:""}}}})]},controlChildFilter:function(u,s){var r=s.form.getAbsolutePath(s),t=s.p.repeat_count;u=c.controlChildFilter(u,s);u[0].getValue().options.writeCustomXML=function(v,w){if(t){v.writeAttributeString("jr:count",String(t));v.writeAttributeString("jr:noAddRemove","true()")}v.writeAttributeString("nodeset",r)};return u},getExtraDataAttributes:function(r){k(r);if(!r.p.dataSource.idsQuery){return c.getExtraDataAttributes(r)}return{ids:"",count:"",current_index:"","vellum:role":"Repeat"}},getBindList:function(r){var t=r.form.getAbsolutePath(r),s=c.getBindList(r);if(r.p.dataSource.idsQuery){s.splice(0,0,{nodeset:t.replace(/\/item$/,"/@current_index"),calculate:"count("+t+")"})}return s},init:function(r,s){c.init(r,s);r.p.repeat_count="";r.p.setvalues={};r.p.originalPath=null;r.p.dataSource={};r.p.dataSourceChanged=false},spec:{nodeID:{deserialize:function(u,t,s){var r=e.baseSpecs.databind.nodeID.deserialize;if(u.dataSource){var w=u.id.slice(0,u.id.lastIndexOf("/"))||u.id,v=o.extend({},u,{id:w});return r(v,t,s)}return r(u,t,s)}},repeat_count:o.extend({},c.spec.repeat_count,{visibility:function(r){return !r.p.dataSource.idsQuery}}),dataSource:{lstring:"Data Source",visibility:"visible_if_present",presence:"optional",widget:f,validationFunc:function(r){if(r.p.dataSource.idsQuery){r.form.updateLogicReferences(r,"dataSource",r.p.dataSource.idsQuery)}},serialize:function(u,s,r,t){if(u&&u.idsQuery){return{idsQuery:e.serializeXPath(u.idsQuery,s,r,t)}}},deserialize:function(u,s,r){var t=e.deserializeXPath(u,s,r)||{};if(t&&t.instance&&t.instance.id&&t.instance.src){var v={};v[t.instance.id]=t.instance.src;r.form.updateKnownInstances(v)}return{idsQuery:t.idsQuery}}}},ignoreReferenceWarning:function(r){return n(r)}};i.vellum.plugin("modeliteration",{},{getMugTypes:function(){var r=this.__callOld();r.normal.Repeat=j.extend(c,l);return r},updateControlNodeAdaptorMap:function(r){this.__callOld();var s=r.group;r.group=function(w,v,y,u){var t=s(w,v,y,u);if(t.repeat){var z=t.repeat,A=t.path,x;if(/\/item$/.test(A)){x=y.getMugByPath(A.substring(0,A.length-5));if(x&&x.__className==="Repeat"){t=function(C,B){x.p.nodeset=A;x.p.repeat_count=z.popAttr("jr:count")||null;x.p.rawRepeatAttributes=b.getAttributes(z);return x};t.type="Repeat";t.path=A;t.repeat=z;t.ignoreDataNode=true}}}return t}},parseBindElement:function(u,t,v){var r=u.getMugByPath(v);if(!r){var s=v.replace(/\/@current_index$/,"/item");if(v!==s){r=u.getMugByPath(s);if(n(r)){return}}}this.__callOld()},handleMugParseFinish:function(t){this.__callOld();if(t.__className!=="Repeat"){return}var u=t.form.getAbsolutePath(t),r=null;if(t.p.dataSource.idsQuery){r=u.replace(/\/item$/,"")}t.p.originalPath=u;t.p.dataSource={};t.p.dataSourceChanged=false;t.p.setvalues={};if(r===null){return}var s=o.object(o.map(t.form.getSetValues(),function(v){return[v.event+" "+v.ref,v]}));o.each(d,function(x){var w=s[x.event+" "+r+x.path+"/@"+x.key];if(w){t.p.setvalues[x.key]=w;if(x.key==="ids"){w=w.value;var v=w&&w.match(m);if(v){t.p.dataSource.idsQuery=v[1]}else{t.p.dataSource.idsQuery=w}}}});if(t.p.dataSource.idsQuery){t.p.dataSource.instance=t.form.parseInstance(t.p.dataSource.idsQuery,t,"dataSource")}else{t.p.dataSource.idsQuery="''"}t.p.rawDataAttributes=o.omit(t.p.rawDataAttributes,["ids","count","current_index"])},loadXML:function(){this.__callOld();this.data.core.form.on("mug-property-change",function(s){var r=s.mug;if(r.__className==="Repeat"&&s.property==="dataSource"){r.p.dataSourceChanged=true;a(r,s.val,s.previous)}}).on("question-remove",function(r){q(r.mug)})}});function n(r){return r&&r.__className==="Repeat"&&r.p.dataSource.idsQuery}function f(r,s){var u=h.advancedDataSourceWidget(r,s,"Model Iteration ID Query"),v=u.getValue,t=u.setValue;u.input.attr({readonly:"readonly"});u.getValue=function(){var w=v();return{instance:(i.trim(w.src)?{id:w.id,src:w.src}:null),idsQuery:w.query}};u.setValue=function(w){w=w||{};t({id:(w.instance?w.instance.id:""),src:(w.instance?w.instance.src:""),query:w.idsQuery||""})};return u}function a(r,w,v){if(v&&v.instance&&v.instance.src){r.form.dropInstanceReference(v.instance.src,r,"dataSource.instance")}if(w&&w.instance&&w.instance.src){var u=r.form.addInstanceIfNotExists(w.instance,r,"dataSource.instance");if(u!==w.instance.id){w.instance.id=u;w.idsQuery=r.form.updateInstanceQuery(w.idsQuery,u)}}if(Boolean(w&&w.idsQuery)!==Boolean(v&&v.idsQuery)){var x=r.p.nodeID,t=r.form.getAbsolutePath(r),s=r.parentMug,y;if(w&&w.idsQuery){y=t.replace(/\/item$/,"")}else{y=t+"/item";if(/\/@count$/.test(r.p.repeat_count)){r.p.repeat_count=""}}r.form.vellum.handleMugRename(r.form,r,x,x,t,y,s)}}function k(s){var v=s.form.getAbsolutePath(s);if(!s.p.dataSourceChanged&&s.p.originalPath===v){return}var u=s.p.dataSource.idsQuery;if(u){v=v.replace(/\/item$/,"");s.p.repeat_count=v+"/@count";var t=s.p.setvalues,r=o.groupBy(s.form.getSetValues(),"_id");o.each(d,function(y){var x=t[y.key],w=null;if(x){w=r[x._id]||{}}else{x={}}x.ref=v+y.path+"/@"+y.key;x.value=y.query.replace("{}",y.key==="ids"?u:v);if(!x.event){t[y.key]=s.form.addSetValue(y.event,x.ref,x.value)}})}else{q(s)}}function q(r){if(r.p.setvalues){var s=o.groupBy(r.p.setvalues,"_id");r.form.dropSetValues(function(t){return s.hasOwnProperty(t._id)})}}});