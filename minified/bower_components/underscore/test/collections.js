$(document).ready(function(){module("Collections");test("each",function(){_.each([1,2,3],function(d,e){equal(d,e+1,"each iterators provide value and iteration count")});var c=[];_.each([1,2,3],function(d){c.push(d*this.multiplier)},{multiplier:5});equal(c.join(", "),"5, 10, 15","context object property accessed");c=[];_.forEach([1,2,3],function(d){c.push(d)});equal(c.join(", "),"1, 2, 3",'aliased as "forEach"');c=[];var b={one:1,two:2,three:3};b.constructor.prototype.four=4;_.each(b,function(e,d){c.push(d)});equal(c.join(", "),"one, two, three","iterating over objects works, and ignores the object prototype.");delete b.constructor.prototype.four;var a=null;_.each([1,2,3],function(f,e,d){if(_.include(d,f)){a=true}});ok(a,"can reference the original collection from inside the iterator");c=0;_.each(null,function(){++c});equal(c,0,"handles a null properly")});test("map",function(){var d=_.map([1,2,3],function(e){return e*2});equal(d.join(", "),"2, 4, 6","doubled numbers");d=_.collect([1,2,3],function(e){return e*2});equal(d.join(", "),"2, 4, 6",'aliased as "collect"');var a=_.map([1,2,3],function(e){return e*this.multiplier},{multiplier:3});equal(a.join(", "),"3, 6, 9","tripled numbers with context");var d=_([1,2,3]).map(function(e){return e*2});equal(d.join(", "),"2, 4, 6","OO-style doubled numbers");if(document.querySelectorAll){var c=_.map(document.querySelectorAll("#map-test *"),function(e){return e.id});deepEqual(c,["id1","id2"],"Can use collection methods on NodeLists.")}var c=_.map($("#map-test").children(),function(e){return e.id});deepEqual(c,["id1","id2"],"Can use collection methods on jQuery Array-likes.");var c=_.map(document.images,function(e){return e.id});ok(c[0]=="chart_image","can use collection methods on HTMLCollections");var b=_.map(null,function(){});ok(_.isArray(b)&&b.length===0,"handles a null properly")});test("reduce",function(){var d=_.reduce([1,2,3],function(f,e){return f+e},0);equal(d,6,"can sum up an array");var b={multiplier:3};d=_.reduce([1,2,3],function(f,e){return f+e*this.multiplier},0,b);equal(d,18,"can reduce with a context object");d=_.inject([1,2,3],function(f,e){return f+e},0);equal(d,6,'aliased as "inject"');d=_([1,2,3]).reduce(function(f,e){return f+e},0);equal(d,6,"OO-style reduce");var d=_.reduce([1,2,3],function(f,e){return f+e});equal(d,6,"default initial value");var c;try{_.reduce(null,function(){})}catch(a){c=a}ok(c instanceof TypeError,"handles a null (without inital value) properly");ok(_.reduce(null,function(){},138)===138,"handles a null (with initial value) properly");equal(_.reduce([],function(){},undefined),undefined,"undefined can be passed as a special case");raises(function(){_.reduce([],function(){})},TypeError,"throws an error for empty arrays with no initial value")});test("reduceRight",function(){var d=_.reduceRight(["foo","bar","baz"],function(j,k){return j+k},"");equal(d,"bazbarfoo","can perform right folds");var d=_.foldr(["foo","bar","baz"],function(j,k){return j+k},"");equal(d,"bazbarfoo",'aliased as "foldr"');var d=_.foldr(["foo","bar","baz"],function(j,k){return j+k});equal(d,"bazbarfoo","default initial value");var h;try{_.reduceRight(null,function(){})}catch(e){h=e}ok(h instanceof TypeError,"handles a null (without inital value) properly");var c=_.reduceRight({a:1,b:2,c:3},function(k,j){return k+j});equal(c,6,"default initial value on object");ok(_.reduceRight(null,function(){},138)===138,"handles a null (with initial value) properly");equal(_.reduceRight([],function(){},undefined),undefined,"undefined can be passed as a special case");raises(function(){_.reduceRight([],function(){})},TypeError,"throws an error for empty arrays with no initial value");var f,g={},a={a:1,b:2},i=_.keys(a).pop();var b=i=="a"?[g,1,"a",a]:[g,2,"b",a];_.reduceRight(a,function(){f||(f=_.toArray(arguments))},g);deepEqual(f,b);a={"2":"a","1":"b"};i=_.keys(a).pop();f=null;b=i=="2"?[g,"a","2",a]:[g,"b","1",a];_.reduceRight(a,function(){f||(f=_.toArray(arguments))},g);deepEqual(f,b)});test("find",function(){var a=[1,2,3,4];strictEqual(_.find(a,function(b){return b>2}),3,"should return first found `value`");strictEqual(_.find(a,function(){return false}),void 0,"should return `undefined` if `value` is not found")});test("detect",function(){var a=_.detect([1,2,3],function(b){return b*2==4});equal(a,2,'found the first "2" and broke the loop')});test("select",function(){var a=_.select([1,2,3,4,5,6],function(b){return b%2==0});equal(a.join(", "),"2, 4, 6","selected each even number");a=_.filter([1,2,3,4,5,6],function(b){return b%2==0});equal(a.join(", "),"2, 4, 6",'aliased as "filter"')});test("reject",function(){var a=_.reject([1,2,3,4,5,6],function(d){return d%2==0});equal(a.join(", "),"1, 3, 5","rejected each even number");var b="obj";var c=_.reject([1,2,3,4,5,6],function(d){equal(b,"obj");return d%2!=0},b);equal(c.join(", "),"2, 4, 6","rejected each odd number")});test("all",function(){ok(_.all([],_.identity),"the empty set");ok(_.all([true,true,true],_.identity),"all true values");ok(!_.all([true,false,true],_.identity),"one false value");ok(_.all([0,10,28],function(a){return a%2==0}),"even numbers");ok(!_.all([0,11,28],function(a){return a%2==0}),"an odd number");ok(_.all([1],_.identity)===true,"cast to boolean - true");ok(_.all([0],_.identity)===false,"cast to boolean - false");ok(_.every([true,true,true],_.identity),'aliased as "every"');ok(!_.all([undefined,undefined,undefined],_.identity),"works with arrays of undefined")});test("any",function(){var a=Array.prototype.some;Array.prototype.some=null;ok(!_.any([]),"the empty set");ok(!_.any([false,false,false]),"all false values");ok(_.any([false,false,true]),"one true value");ok(_.any([null,0,"yes",false]),"a string");ok(!_.any([null,0,"",false]),"falsy values");ok(!_.any([1,11,29],function(b){return b%2==0}),"all odd numbers");ok(_.any([1,10,29],function(b){return b%2==0}),"an even number");ok(_.any([1],_.identity)===true,"cast to boolean - true");ok(_.any([0],_.identity)===false,"cast to boolean - false");ok(_.some([false,false,true]),'aliased as "some"');Array.prototype.some=a});test("include",function(){ok(_.include([1,2,3],2),"two is in the array");ok(!_.include([1,3,9],2),"two is not in the array");ok(_.contains({moe:1,larry:3,curly:9},3)===true,"_.include on objects checks their values");ok(_([1,2,3]).include(2),"OO-style include")});test("invoke",function(){var b=[[5,1,7],[3,2,1]];var a=_.invoke(b,"sort");equal(a[0].join(", "),"1, 5, 7","first array sorted");equal(a[1].join(", "),"1, 2, 3","second array sorted")});test("invoke w/ function reference",function(){var b=[[5,1,7],[3,2,1]];var a=_.invoke(b,Array.prototype.sort);equal(a[0].join(", "),"1, 5, 7","first array sorted");equal(a[1].join(", "),"1, 2, 3","second array sorted")});test("invoke when strings have a call method",function(){String.prototype.call=function(){return 42};var c=[[5,1,7],[3,2,1]];var b="foo";equal(b.call(),42,"call function exists");var a=_.invoke(c,"sort");equal(a[0].join(", "),"1, 5, 7","first array sorted");equal(a[1].join(", "),"1, 2, 3","second array sorted");delete String.prototype.call;equal(b.call,undefined,"call function removed")});test("pluck",function(){var a=[{name:"moe",age:30},{name:"curly",age:50}];equal(_.pluck(a,"name").join(", "),"moe, curly","pulls names out of objects")});test("where",function(){var b=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}];var a=_.where(b,{a:1});equal(a.length,3);equal(a[a.length-1].b,4);a=_.where(b,{b:2});equal(a.length,2);equal(a[0].a,1)});test("findWhere",function(){var b=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4},{a:2,b:4}];var a=_.findWhere(b,{a:1});deepEqual(a,{a:1,b:2});a=_.findWhere(b,{b:4});deepEqual(a,{a:1,b:4})});test("max",function(){equal(3,_.max([1,2,3]),"can perform a regular Math.max");var a=_.max([1,2,3],function(b){return -b});equal(a,1,"can perform a computation-based max");equal(-Infinity,_.max({}),"Maximum value of an empty object");equal(-Infinity,_.max([]),"Maximum value of an empty array");equal(_.max({a:"a"}),-Infinity,"Maximum value of a non-numeric collection");equal(299999,_.max(_.range(1,300000)),"Maximum value of a too-big array")});test("min",function(){equal(1,_.min([1,2,3]),"can perform a regular Math.min");var c=_.min([1,2,3],function(d){return -d});equal(c,3,"can perform a computation-based min");equal(Infinity,_.min({}),"Minimum value of an empty object");equal(Infinity,_.min([]),"Minimum value of an empty array");equal(_.min({a:"a"}),Infinity,"Minimum value of a non-numeric collection");var a=new Date(9999999999);var b=new Date(0);equal(_.min([a,b]),b);equal(1,_.min(_.range(1,300000)),"Minimum value of a too-big array")});test("sortBy",function(){var b=[{name:"curly",age:50},{name:"moe",age:30}];b=_.sortBy(b,function(g){return g.age});equal(_.pluck(b,"name").join(", "),"moe, curly","stooges sorted by age");var d=[undefined,4,1,undefined,3,2];equal(_.sortBy(d,_.identity).join(","),"1,2,3,4,,","sortBy with undefined values");var d=["one","two","three","four","five"];var a=_.sortBy(d,"length");equal(a.join(" "),"one two four five three","sorted by length");function c(g,h){this.x=g;this.y=h}var e=[new c(1,1),new c(1,2),new c(1,3),new c(1,4),new c(1,5),new c(1,6),new c(2,1),new c(2,2),new c(2,3),new c(2,4),new c(2,5),new c(2,6),new c(undefined,1),new c(undefined,2),new c(undefined,3),new c(undefined,4),new c(undefined,5),new c(undefined,6)];var f=_.sortBy(e,function(g){return g.x});deepEqual(f,e,"sortBy should be stable")});test("groupBy",function(){var d=_.groupBy([1,2,3,4,5,6],function(f){return f%2});ok("0" in d&&"1" in d,"created a group for each value");equal(d[0].join(", "),"2, 4, 6","put each even number in the right group");var c=["one","two","three","four","five","six","seven","eight","nine","ten"];var b=_.groupBy(c,"length");equal(b["3"].join(" "),"one two six ten");equal(b["4"].join(" "),"four five nine");equal(b["5"].join(" "),"three seven eight");var a={};_.groupBy([{}],function(){ok(this===a)},a);b=_.groupBy([4.2,6.1,6.4],function(f){return Math.floor(f)>4?"hasOwnProperty":"constructor"});equal(b.constructor.length,1);equal(b.hasOwnProperty.length,2);var e=[{}];_.groupBy(e,function(g,f,h){ok(h===e)});var e=[1,2,1,2,3];var b=_.groupBy(e);equal(b["1"].length,2);equal(b["3"].length,1)});test("countBy",function(){var d=_.countBy([1,2,3,4,5],function(f){return f%2==0});equal(d["true"],2);equal(d["false"],3);var c=["one","two","three","four","five","six","seven","eight","nine","ten"];var b=_.countBy(c,"length");equal(b["3"],4);equal(b["4"],3);equal(b["5"],3);var a={};_.countBy([{}],function(){ok(this===a)},a);b=_.countBy([4.2,6.1,6.4],function(f){return Math.floor(f)>4?"hasOwnProperty":"constructor"});equal(b.constructor,1);equal(b.hasOwnProperty,2);var e=[{}];_.countBy(e,function(g,f,h){ok(h===e)});var e=[1,2,1,2,3];var b=_.countBy(e);equal(b["1"],2);equal(b["3"],1)});test("sortedIndex",function(){var b=[10,20,30,40,50],d=35;var c=_.sortedIndex(b,d);equal(c,3,"35 should be inserted at index 3");var a=_.sortedIndex(b,30);equal(a,2,"30 should be inserted at index 2");var g=[{x:10},{x:20},{x:30},{x:40}];var f=function(h){return h.x};strictEqual(_.sortedIndex(g,{x:25},f),2);strictEqual(_.sortedIndex(g,{x:35},"x"),3);var e={1:2,2:3,3:4};f=function(h){return this[h]};strictEqual(_.sortedIndex([1,3],2,f,e),1)});test("shuffle",function(){var b=_.range(10);var a=_.shuffle(b).sort();notStrictEqual(b,a,"original object is unmodified");equal(a.join(","),b.join(","),"contains the same members before and after shuffle")});test("toArray",function(){ok(!_.isArray(arguments),"arguments object is not an array");ok(_.isArray(_.toArray(arguments)),"arguments object converted into array");var c=[1,2,3];ok(_.toArray(c)!==c,"array is cloned");equal(_.toArray(c).join(", "),"1, 2, 3","cloned array contains same elements");var b=_.toArray({one:1,two:2,three:3});equal(b.join(", "),"1, 2, 3","object flattened into array");try{var e=_.toArray(document.childNodes)}catch(d){}ok(_.isArray(e),"should not throw converting a node list")});test("size",function(){equal(_.size({one:1,two:2,three:3}),3,"can compute the size of an object");equal(_.size([1,2,3]),3,"can compute the size of an array");var a=function(){return _.size(arguments)};equal(a(1,2,3,4),4,"can test the size of the arguments object");equal(_.size("hello"),5,"can compute the size of a string");equal(_.size(null),0,"handles nulls")})});