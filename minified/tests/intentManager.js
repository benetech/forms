define(["tests/utils","chai","underscore","jquery","vellum/intentManager","vellum/widgets","text!static/intentManager/intent-with-unknown-attrs.xml","text!static/intentManager/intent-with-no-mug.xml","text!static/intentManager/printing-intent.xml"],function(e,d,j,c,g,h,f,b,i){var a=d.assert,k=e.call;describe("The intent manager plugin",function(){before(function(l){e.init({javaRosa:{langs:["en"]},core:{onReady:l}})});it("should preserve unknown attributes of intent tag",function(){e.loadXML(f);e.assertXmlEqual(e.call("createXML"),f)});it("should preserve intent tags with no mug",function(){e.loadXML(b);e.assertXmlEqual(e.call("createXML"),b)});describe("with multiple response pairs with matching keys",function(){var l,m,n;before(function(){e.loadXML("");l=e.addQuestion("AndroidIntent","intent");l.p.androidIntentResponse={name:["/data/node1","/data/node2"]};m=e.call("createXML");n=c(m)});it("should show all pairs in UI",function(){e.clickQuestion("intent");a.equal(c(".fd-kv-key[value=name]").length,2);a.deepEqual(c(".fd-kv-key[value=name]").map(function(o,p){return c(p).parent().parent().find(".fd-kv-val").val()}).toArray(),["/data/node1","/data/node2"])});it("should write multiple response nodes in XML",function(){var o=n.find("response[key=name]");a.equal(o.length,2,m);a.deepEqual(o.map(function(p,q){return c(q).attr("ref")}).toArray(),["/data/node1","/data/node2"],m)});it("should load generated XML",function(){e.loadXML(m);a.deepEqual(e.getMug("intent").p.androidIntentResponse,{name:["/data/node1","/data/node2"]})})});describe("printing mug",function(){before(function(){e.loadXML(i)});it("should parse as a printing question",function(){a.strictEqual(e.getMug("/data/print_data").__className,"PrintIntent")});it("should write the same as parse",function(){e.assertXmlEqual(k("createXML"),i)});it("should correctly parse filename",function(){a.strictEqual(e.getMug("/data/print_data").p.docTemplate,"jr://file/commcare/doc/data/print_data.doc")})});describe("template selector",function(){var l,m,n=[{icon:"icon-map-marker",name:"Area Mapper",id:"com.richard.lu.areamapper",extra:{ext:"value"},response:{r1:"x",r2:"y",r3:"z",r4:"",},},{icon:"icon-barcode",name:"Barcode Scanner",id:"com.google.zxing.client.android.SCAN",extra:{},response:{},},{icon:"icon-vellum-android-intent",name:"Breath Counter",id:"org.commcare.respiratory.BREATHCOUNT",},];before(function(o){e.init({intents:{templates:n},core:{onReady:function(){l=this;m=e.addQuestion("AndroidIntent","intent");e.clickQuestion("intent");o()}}})});it("should not select a template by default",function(){a.equal(c("[name=property-androidIntentAppId]").val(),"")});j.each(n,function(o){it("should have "+o.name+" template",function(){c("a[data-id='"+o.id+"']").click();a.equal(c("[name=property-androidIntentAppId]").val(),o.id);var p=h.util.getWidget(c("[name=property-androidIntentExtra]"),l),q=h.util.getWidget(c("[name=property-androidIntentResponse]"),l);a.deepEqual(p.getValue(),o.extra||{});a.deepEqual(q.getValue(),o.response||{})})})});describe("field parsing",function(){var l=[["{{ } }}",{}],["{{field1}}",{field1:"field1"}],["{{ field1 }}",{field1:"field1"}],["field1 }}",{}],["{{ field1",{}],["field1",{}],["{{ field1 }} {{ field2 }}",{field1:"field1",field2:"field2",}],["{{ field1 }}\n{{ field2 }}",{field1:"field1",field2:"field2",}],["{{ field1 }}\n{{ field2 }} {{ field3 }}",{field1:"field1",field2:"field2",field3:"field3",}],];j.each(l,function(m){it(m[0]+" should be parsed as "+JSON.stringify(m[1]),function(){a.deepEqual(g.test.parseFields(m[0]),m[1])})})})})});