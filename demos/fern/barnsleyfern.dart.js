(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isc)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="l"){processStatics(init.statics[b1]=b2.l,b3)
delete b2.l}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.b7"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.b7"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.b7(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.cr=function(){}
var dart=[["","",,H,{"^":"",fK:{"^":"a;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
aC:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aA:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bb==null){H.eV()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.c3("Return interceptor for "+H.b(y(a,z))))}w=H.f3(a)
if(w==null){if(typeof a=="function")return C.v
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.w
else return C.x}return w},
c:{"^":"a;",
m:function(a,b){return a===b},
gp:function(a){return H.E(a)},
i:["bC",function(a){return H.ap(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedNumberList|SVGAnimatedString|WebGLRenderingContext"},
d7:{"^":"c;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$iseM:1},
d8:{"^":"c;",
m:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
aL:{"^":"c;",
gp:function(a){return 0},
i:["bD",function(a){return String(a)}],
$isd9:1},
dl:{"^":"aL;"},
au:{"^":"aL;"},
ac:{"^":"aL;",
i:function(a){var z=a[$.$get$bk()]
return z==null?this.bD(a):J.I(z)}},
aa:{"^":"c;",
b6:function(a,b){if(!!a.immutable$list)throw H.d(new P.G(b))},
ca:function(a,b){if(!!a.fixed$length)throw H.d(new P.G(b))},
v:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.v(a))}},
N:function(a,b){return H.h(new H.aQ(a,b),[null,null])},
H:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gck:function(a){if(a.length>0)return a[0]
throw H.d(H.bv())},
aF:function(a,b,c,d,e){var z,y,x
this.b6(a,"set range")
P.bM(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.d(H.d5())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
i:function(a){return P.am(a,"[","]")},
gq:function(a){return new J.cL(a,a.length,0,null)},
gp:function(a){return H.E(a)},
gj:function(a){return a.length},
sj:function(a,b){this.ca(a,"set length")
if(b<0)throw H.d(P.aq(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
return a[b]},
t:function(a,b,c){this.b6(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
a[b]=c},
$isaJ:1,
$isi:1,
$asi:null,
$isn:1},
fJ:{"^":"aa;"},
cL:{"^":"a;a,b,c,d",
gn:function(){return this.d},
k:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.f9(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ab:{"^":"c;",
ay:function(a,b){return a%b},
aB:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.G(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
a0:function(a,b){if(typeof b!=="number")throw H.d(H.T(b))
return a+b},
S:function(a,b){return(a|0)===a?a/b|0:this.aB(a/b)},
b1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a6:function(a,b){if(typeof b!=="number")throw H.d(H.T(b))
return a<b},
$isah:1},
bx:{"^":"ab;",$isah:1,$isl:1},
bw:{"^":"ab;",$isah:1},
an:{"^":"c;",
a0:function(a,b){if(typeof b!=="string")throw H.d(P.bg(b,null,null))
return a+b},
bB:function(a,b,c){H.co(b)
if(c==null)c=a.length
H.co(c)
if(b<0)throw H.d(P.ar(b,null,null))
if(typeof c!=="number")return H.a5(c)
if(b>c)throw H.d(P.ar(b,null,null))
if(c>a.length)throw H.d(P.ar(c,null,null))
return a.substring(b,c)},
bA:function(a,b){return this.bB(a,b,null)},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
return a[b]},
$isaJ:1,
$isN:1}}],["","",,H,{"^":"",
ae:function(a,b){var z=a.V(b)
if(!init.globalState.d.cy)init.globalState.f.Z()
return z},
cy:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isi)throw H.d(P.bf("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.ek(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bt()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.dZ(P.aO(null,H.ad),0)
y.z=H.h(new H.M(0,null,null,null,null,null,0),[P.l,H.b1])
y.ch=H.h(new H.M(0,null,null,null,null,null,0),[P.l,null])
if(y.x===!0){x=new H.ej()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.cZ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.el)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.h(new H.M(0,null,null,null,null,null,0),[P.l,H.as])
w=P.X(null,null,null,P.l)
v=new H.as(0,null,!1)
u=new H.b1(y,x,w,init.createNewIsolate(),v,new H.K(H.aD()),new H.K(H.aD()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
w.K(0,0)
u.aH(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.ag()
x=H.U(y,[y]).F(a)
if(x)u.V(new H.f7(z,a))
else{y=H.U(y,[y,y]).F(a)
if(y)u.V(new H.f8(z,a))
else u.V(a)}init.globalState.f.Z()},
d2:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.d3()
return},
d3:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.G("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.G('Cannot extract URI from "'+H.b(z)+'"'))},
cZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.av(!0,[]).G(b.data)
y=J.B(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.av(!0,[]).G(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.av(!0,[]).G(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.h(new H.M(0,null,null,null,null,null,0),[P.l,H.as])
p=P.X(null,null,null,P.l)
o=new H.as(0,null,!1)
n=new H.b1(y,q,p,init.createNewIsolate(),o,new H.K(H.aD()),new H.K(H.aD()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
p.K(0,0)
n.aH(0,o)
init.globalState.f.a.B(new H.ad(n,new H.d_(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.Z()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").D(y.h(z,"msg"))
init.globalState.f.Z()
break
case"close":init.globalState.ch.Y(0,$.$get$bu().h(0,a))
a.terminate()
init.globalState.f.Z()
break
case"log":H.cY(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.W(["command","print","msg",z])
q=new H.Q(!0,P.Z(null,P.l)).u(q)
y.toString
self.postMessage(q)}else P.bd(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
cY:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.W(["command","log","msg",a])
x=new H.Q(!0,P.Z(null,P.l)).u(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.u(w)
z=H.r(w)
throw H.d(P.al(z))}},
d0:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.bI=$.bI+("_"+y)
$.bJ=$.bJ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.aw(y,x),w,z.r])
x=new H.d1(a,b,c,d,z)
if(e===!0){z.b4(w,w)
init.globalState.f.a.B(new H.ad(z,x,"start isolate"))}else x.$0()},
eA:function(a){return new H.av(!0,[]).G(new H.Q(!1,P.Z(null,P.l)).u(a))},
f7:{"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
f8:{"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ek:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",l:{
el:function(a){var z=P.W(["command","print","msg",a])
return new H.Q(!0,P.Z(null,P.l)).u(z)}}},
b1:{"^":"a;a,b,c,ct:d<,cc:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
b4:function(a,b){if(!this.f.m(0,a))return
if(this.Q.K(0,b)&&!this.y)this.y=!0
this.ar()},
cA:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Y(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.f(v,w)
v[w]=x
if(w===y.c)y.aN();++y.d}this.y=!1}this.ar()},
c8:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
cz:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.G("removeRange"))
P.bM(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
by:function(a,b){if(!this.r.m(0,a))return
this.db=b},
cm:function(a,b,c){var z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.aO(null,null)
this.cx=z}z.B(new H.ee(a,c))},
cl:function(a,b){var z
if(!this.r.m(0,a))return
z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){this.au()
return}z=this.cx
if(z==null){z=P.aO(null,null)
this.cx=z}z.B(this.gcu())},
cn:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bd(a)
if(b!=null)P.bd(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.I(a)
y[1]=b==null?null:J.I(b)
for(x=new P.b2(z,z.r,null,null),x.c=z.e;x.k();)x.d.D(y)},
V:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.u(u)
w=t
v=H.r(u)
this.cn(w,v)
if(this.db===!0){this.au()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gct()
if(this.cx!=null)for(;t=this.cx,!t.gC(t);)this.cx.bg().$0()}return y},
bd:function(a){return this.b.h(0,a)},
aH:function(a,b){var z=this.b
if(z.b7(a))throw H.d(P.al("Registry: ports must be registered only once."))
z.t(0,a,b)},
ar:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.au()},
au:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.L(0)
for(z=this.b,y=z.gbn(z),y=y.gq(y);y.k();)y.gn().bN()
z.L(0)
this.c.L(0)
init.globalState.z.Y(0,this.a)
this.dx.L(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.D(z[v])}this.ch=null}},"$0","gcu",0,0,1]},
ee:{"^":"e:1;a,b",
$0:function(){this.a.D(this.b)}},
dZ:{"^":"a;a,b",
cd:function(){var z=this.a
if(z.b===z.c)return
return z.bg()},
bk:function(){var z,y,x
z=this.cd()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b7(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gC(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.al("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gC(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.W(["command","close"])
x=new H.Q(!0,H.h(new P.cc(0,null,null,null,null,null,0),[null,P.l])).u(x)
y.toString
self.postMessage(x)}return!1}z.cw()
return!0},
aY:function(){if(self.window!=null)new H.e_(this).$0()
else for(;this.bk(););},
Z:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.aY()
else try{this.aY()}catch(x){w=H.u(x)
z=w
y=H.r(x)
w=init.globalState.Q
v=P.W(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.Q(!0,P.Z(null,P.l)).u(v)
w.toString
self.postMessage(v)}}},
e_:{"^":"e:1;a",
$0:function(){if(!this.a.bk())return
P.dK(C.f,this)}},
ad:{"^":"a;a,b,c",
cw:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.V(this.b)}},
ej:{"^":"a;"},
d_:{"^":"e:0;a,b,c,d,e,f",
$0:function(){H.d0(this.a,this.b,this.c,this.d,this.e,this.f)}},
d1:{"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.ag()
w=H.U(x,[x,x]).F(y)
if(w)y.$2(this.b,this.c)
else{x=H.U(x,[x]).F(y)
if(x)y.$1(this.b)
else y.$0()}}z.ar()}},
c5:{"^":"a;"},
aw:{"^":"c5;b,a",
D:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gaQ())return
x=H.eA(a)
if(z.gcc()===y){y=J.B(x)
switch(y.h(x,0)){case"pause":z.b4(y.h(x,1),y.h(x,2))
break
case"resume":z.cA(y.h(x,1))
break
case"add-ondone":z.c8(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.cz(y.h(x,1))
break
case"set-errors-fatal":z.by(y.h(x,1),y.h(x,2))
break
case"ping":z.cm(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.cl(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.K(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Y(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.B(new H.ad(z,new H.en(this,x),w))},
m:function(a,b){if(b==null)return!1
return b instanceof H.aw&&J.H(this.b,b.b)},
gp:function(a){return this.b.gak()}},
en:{"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gaQ())z.bK(this.b)}},
b4:{"^":"c5;b,c,a",
D:function(a){var z,y,x
z=P.W(["command","message","port",this,"msg",a])
y=new H.Q(!0,P.Z(null,P.l)).u(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
m:function(a,b){if(b==null)return!1
return b instanceof H.b4&&J.H(this.b,b.b)&&J.H(this.a,b.a)&&J.H(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bz()
y=this.a
if(typeof y!=="number")return y.bz()
x=this.c
if(typeof x!=="number")return H.a5(x)
return(z<<16^y<<8^x)>>>0}},
as:{"^":"a;ak:a<,b,aQ:c<",
bN:function(){this.c=!0
this.b=null},
bK:function(a){if(this.c)return
this.bY(a)},
bY:function(a){return this.b.$1(a)},
$isdn:1},
dG:{"^":"a;a,b,c",
bH:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.B(new H.ad(y,new H.dI(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a2(new H.dJ(this,b),0),a)}else throw H.d(new P.G("Timer greater than 0."))},
l:{
dH:function(a,b){var z=new H.dG(!0,!1,null)
z.bH(a,b)
return z}}},
dI:{"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
dJ:{"^":"e:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
K:{"^":"a;ak:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.cF()
z=C.e.b1(z,0)^C.e.S(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.K){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
Q:{"^":"a;a,b",
u:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isbB)return["buffer",a]
if(!!z.$isaU)return["typed",a]
if(!!z.$isaJ)return this.bu(a)
if(!!z.$iscX){x=this.gbr()
w=a.gbb()
w=H.ao(w,x,H.x(w,"w",0),null)
w=P.aP(w,!0,H.x(w,"w",0))
z=z.gbn(a)
z=H.ao(z,x,H.x(z,"w",0),null)
return["map",w,P.aP(z,!0,H.x(z,"w",0))]}if(!!z.$isd9)return this.bv(a)
if(!!z.$isc)this.bm(a)
if(!!z.$isdn)this.a_(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaw)return this.bw(a)
if(!!z.$isb4)return this.bx(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.a_(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isK)return["capability",a.a]
if(!(a instanceof P.a))this.bm(a)
return["dart",init.classIdExtractor(a),this.bt(init.classFieldsExtractor(a))]},"$1","gbr",2,0,2],
a_:function(a,b){throw H.d(new P.G(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
bm:function(a){return this.a_(a,null)},
bu:function(a){var z=this.bs(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a_(a,"Can't serialize indexable: ")},
bs:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.u(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bt:function(a){var z
for(z=0;z<a.length;++z)C.c.t(a,z,this.u(a[z]))
return a},
bv:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.a_(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.u(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
bx:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bw:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gak()]
return["raw sendport",a]}},
av:{"^":"a;a,b",
G:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bf("Bad serialized message: "+H.b(a)))
switch(C.c.gck(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.T(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.h(this.T(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.T(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.T(x),[null])
y.fixed$length=Array
return y
case"map":return this.cg(a)
case"sendport":return this.ci(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.cf(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.K(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.T(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gce",2,0,2],
T:function(a){var z,y,x
z=J.B(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.a5(x)
if(!(y<x))break
z.t(a,y,this.G(z.h(a,y)));++y}return a},
cg:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.df()
this.b.push(w)
y=J.cJ(y,this.gce()).aC(0)
for(z=J.B(y),v=J.B(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.f(y,u)
w.t(0,y[u],this.G(v.h(x,u)))}return w},
ci:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.H(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bd(w)
if(u==null)return
t=new H.aw(u,x)}else t=new H.b4(y,w,x)
this.b.push(t)
return t},
cf:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.B(y)
v=J.B(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.a5(t)
if(!(u<t))break
w[z.h(y,u)]=this.G(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
eQ:function(a){return init.types[a]},
f2:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isaK},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.I(a)
if(typeof z!=="string")throw H.d(H.T(a))
return z},
E:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bK:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.l||!!J.m(a).$isau){v=C.h(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.n.bA(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cu(H.b9(a),0,null),init.mangledGlobalNames)},
ap:function(a){return"Instance of '"+H.bK(a)+"'"},
aV:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.T(a))
return a[b]},
bL:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.T(a))
a[b]=c},
a5:function(a){throw H.d(H.T(a))},
f:function(a,b){if(a==null)J.a7(a)
throw H.d(H.o(a,b))},
o:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.J(!0,b,"index",null)
z=J.a7(a)
if(!(b<0)){if(typeof z!=="number")return H.a5(z)
y=b>=z}else y=!0
if(y)return P.bs(b,a,"index",null,z)
return P.ar(b,"index",null)},
T:function(a){return new P.J(!0,a,null,null)},
co:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.T(a))
return a},
d:function(a){var z
if(a==null)a=new P.bH()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cA})
z.name=""}else z.toString=H.cA
return z},
cA:function(){return J.I(this.dartException)},
p:function(a){throw H.d(a)},
f9:function(a){throw H.d(new P.v(a))},
u:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.fb(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.b1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aM(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.bG(v,null))}}if(a instanceof TypeError){u=$.$get$bT()
t=$.$get$bU()
s=$.$get$bV()
r=$.$get$bW()
q=$.$get$c_()
p=$.$get$c0()
o=$.$get$bY()
$.$get$bX()
n=$.$get$c2()
m=$.$get$c1()
l=u.w(y)
if(l!=null)return z.$1(H.aM(y,l))
else{l=t.w(y)
if(l!=null){l.method="call"
return z.$1(H.aM(y,l))}else{l=s.w(y)
if(l==null){l=r.w(y)
if(l==null){l=q.w(y)
if(l==null){l=p.w(y)
if(l==null){l=o.w(y)
if(l==null){l=r.w(y)
if(l==null){l=n.w(y)
if(l==null){l=m.w(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.bG(y,l==null?null:l.method))}}return z.$1(new H.dN(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.bP()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.J(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.bP()
return a},
r:function(a){var z
if(a==null)return new H.cd(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cd(a,null)},
f5:function(a){if(a==null||typeof a!='object')return J.ai(a)
else return H.E(a)},
eN:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
eX:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ae(b,new H.eY(a))
case 1:return H.ae(b,new H.eZ(a,d))
case 2:return H.ae(b,new H.f_(a,d,e))
case 3:return H.ae(b,new H.f0(a,d,e,f))
case 4:return H.ae(b,new H.f1(a,d,e,f,g))}throw H.d(P.al("Unsupported number of arguments for wrapped closure"))},
a2:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.eX)
a.$identity=z
return z},
cQ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isi){z.$reflectionInfo=c
x=H.dq(z).r}else x=c
w=d?Object.create(new H.dv().constructor.prototype):Object.create(new H.aG(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.y
$.y=J.a6(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bj(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.eQ,x)
else if(u&&typeof x=="function"){q=t?H.bi:H.aH
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bj(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
cN:function(a,b,c,d){var z=H.aH
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bj:function(a,b,c){var z,y,x,w,v,u
if(c)return H.cP(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.cN(y,!w,z,b)
if(y===0){w=$.V
if(w==null){w=H.aj("self")
$.V=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.y
$.y=J.a6(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.V
if(v==null){v=H.aj("self")
$.V=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.y
$.y=J.a6(w,1)
return new Function(v+H.b(w)+"}")()},
cO:function(a,b,c,d){var z,y
z=H.aH
y=H.bi
switch(b?-1:a){case 0:throw H.d(new H.dr("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
cP:function(a,b){var z,y,x,w,v,u,t,s
z=H.cM()
y=$.bh
if(y==null){y=H.aj("receiver")
$.bh=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.cO(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.y
$.y=J.a6(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.y
$.y=J.a6(u,1)
return new Function(y+H.b(u)+"}")()},
b7:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.cQ(a,b,z,!!d,e,f)},
fa:function(a){throw H.d(new P.cR("Cyclic initialization for static "+H.b(a)))},
U:function(a,b,c){return new H.ds(a,b,c,null)},
ag:function(){return C.j},
aD:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
h:function(a,b){a.$builtinTypeInfo=b
return a},
b9:function(a){if(a==null)return
return a.$builtinTypeInfo},
cs:function(a,b){return H.cz(a["$as"+H.b(b)],H.b9(a))},
x:function(a,b,c){var z=H.cs(a,b)
return z==null?null:z[c]},
a4:function(a,b){var z=H.b9(a)
return z==null?null:z[b]},
be:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cu(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.b.i(a)
else return},
cu:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.aY("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.be(u,c))}return w?"":"<"+H.b(z)+">"},
cz:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
eH:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.t(a[y],b[y]))return!1
return!0},
b8:function(a,b,c){return a.apply(b,H.cs(b,c))},
t:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ct(a,b)
if('func' in a)return b.builtin$cls==="fG"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.be(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.be(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eH(H.cz(v,z),x)},
cl:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.t(z,v)||H.t(v,z)))return!1}return!0},
eG:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.t(v,u)||H.t(u,v)))return!1}return!0},
ct:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.t(z,y)||H.t(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cl(x,w,!1))return!1
if(!H.cl(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.t(o,n)||H.t(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.t(o,n)||H.t(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.t(o,n)||H.t(n,o)))return!1}}return H.eG(a.named,b.named)},
ho:function(a){var z=$.ba
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
hm:function(a){return H.E(a)},
hk:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
f3:function(a){var z,y,x,w,v,u
z=$.ba.$1(a)
y=$.ay[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aB[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.ck.$2(a,z)
if(z!=null){y=$.ay[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aB[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bc(x)
$.ay[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aB[z]=x
return x}if(v==="-"){u=H.bc(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cv(a,x)
if(v==="*")throw H.d(new P.c3(z))
if(init.leafTags[z]===true){u=H.bc(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cv(a,x)},
cv:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aC(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bc:function(a){return J.aC(a,!1,null,!!a.$isaK)},
f4:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aC(z,!1,null,!!z.$isaK)
else return J.aC(z,c,null,null)},
eV:function(){if(!0===$.bb)return
$.bb=!0
H.eW()},
eW:function(){var z,y,x,w,v,u,t,s
$.ay=Object.create(null)
$.aB=Object.create(null)
H.eR()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.cw.$1(v)
if(u!=null){t=H.f4(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
eR:function(){var z,y,x,w,v,u,t
z=C.r()
z=H.S(C.o,H.S(C.u,H.S(C.i,H.S(C.i,H.S(C.t,H.S(C.p,H.S(C.q(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ba=new H.eS(v)
$.ck=new H.eT(u)
$.cw=new H.eU(t)},
S:function(a,b){return a(b)||b},
dp:{"^":"a;a,b,c,d,e,f,r,x",l:{
dq:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.dp(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
dL:{"^":"a;a,b,c,d,e,f",
w:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
l:{
A:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.dL(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},
at:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
bZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
bG:{"^":"q;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
db:{"^":"q;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
l:{
aM:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.db(a,y,z?null:b.receiver)}}},
dN:{"^":"q;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
fb:{"^":"e:2;a",
$1:function(a){if(!!J.m(a).$isq)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cd:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
eY:{"^":"e:0;a",
$0:function(){return this.a.$0()}},
eZ:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
f_:{"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
f0:{"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
f1:{"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"a;",
i:function(a){return"Closure '"+H.bK(this)+"'"},
gbo:function(){return this},
gbo:function(){return this}},
bR:{"^":"e;"},
dv:{"^":"bR;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aG:{"^":"bR;a,b,c,d",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aG))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.E(this.a)
else y=typeof z!=="object"?J.ai(z):H.E(z)
z=H.E(this.b)
if(typeof y!=="number")return y.cG()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.ap(z)},
l:{
aH:function(a){return a.a},
bi:function(a){return a.c},
cM:function(){var z=$.V
if(z==null){z=H.aj("self")
$.V=z}return z},
aj:function(a){var z,y,x,w,v
z=new H.aG("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
dr:{"^":"q;a",
i:function(a){return"RuntimeError: "+this.a}},
bO:{"^":"a;"},
ds:{"^":"bO;a,b,c,d",
F:function(a){var z=this.bU(a)
return z==null?!1:H.ct(z,this.O())},
bU:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
O:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$ish7)z.v=true
else if(!x.$isbl)z.ret=y.O()
y=this.b
if(y!=null&&y.length!==0)z.args=H.bN(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.bN(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.cq(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].O()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.cq(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].O())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
l:{
bN:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].O())
return z}}},
bl:{"^":"bO;",
i:function(a){return"dynamic"},
O:function(){return}},
M:{"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gC:function(a){return this.a===0},
gbb:function(){return H.h(new H.dd(this),[H.a4(this,0)])},
gbn:function(a){return H.ao(this.gbb(),new H.da(this),H.a4(this,0),H.a4(this,1))},
b7:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.bR(z,a)}else return this.cq(a)},
cq:function(a){var z=this.d
if(z==null)return!1
return this.X(this.A(z,this.W(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.A(z,b)
return y==null?null:y.gI()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.A(x,b)
return y==null?null:y.gI()}else return this.cr(b)},
cr:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.A(z,this.W(a))
x=this.X(y,a)
if(x<0)return
return y[x].gI()},
t:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.am()
this.b=z}this.aG(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.am()
this.c=y}this.aG(y,b,c)}else{x=this.d
if(x==null){x=this.am()
this.d=x}w=this.W(b)
v=this.A(x,w)
if(v==null)this.ap(x,w,[this.an(b,c)])
else{u=this.X(v,b)
if(u>=0)v[u].sI(c)
else v.push(this.an(b,c))}}},
Y:function(a,b){if(typeof b==="string")return this.aX(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aX(this.c,b)
else return this.cs(b)},
cs:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.A(z,this.W(a))
x=this.X(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.b2(w)
return w.gI()},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
v:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.v(this))
z=z.c}},
aG:function(a,b,c){var z=this.A(a,b)
if(z==null)this.ap(a,b,this.an(b,c))
else z.sI(c)},
aX:function(a,b){var z
if(a==null)return
z=this.A(a,b)
if(z==null)return
this.b2(z)
this.aL(a,b)
return z.gI()},
an:function(a,b){var z,y
z=new H.dc(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b2:function(a){var z,y
z=a.gc1()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
W:function(a){return J.ai(a)&0x3ffffff},
X:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].gba(),b))return y
return-1},
i:function(a){return P.di(this)},
A:function(a,b){return a[b]},
ap:function(a,b,c){a[b]=c},
aL:function(a,b){delete a[b]},
bR:function(a,b){return this.A(a,b)!=null},
am:function(){var z=Object.create(null)
this.ap(z,"<non-identifier-key>",z)
this.aL(z,"<non-identifier-key>")
return z},
$iscX:1},
da:{"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
dc:{"^":"a;ba:a<,I:b@,c,c1:d<"},
dd:{"^":"w;a",
gj:function(a){return this.a.a},
gq:function(a){var z,y
z=this.a
y=new H.de(z,z.r,null,null)
y.c=z.e
return y},
v:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.v(z))
y=y.c}},
$isn:1},
de:{"^":"a;a,b,c,d",
gn:function(){return this.d},
k:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.v(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eS:{"^":"e:2;a",
$1:function(a){return this.a(a)}},
eT:{"^":"e:5;a",
$2:function(a,b){return this.a(a,b)}},
eU:{"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,L,{"^":"",
hn:[function(){var z=J.cH(document.querySelector("#surface"))
H.h(new W.c8(0,z.a,z.b,W.cj(L.eL()),!1),[H.a4(z,0)]).aq()
L.cp()},"$0","cn",0,0,1],
hl:[function(a){L.cp()},"$1","eL",2,0,13],
cp:function(){var z,y,x,w,v,u,t
z=J.cI(document.querySelector("#surface"),"2d")
y=C.d.av()
x=C.d.av()
J.cK(z,"#000000")
z.fillRect(0,0,999,999)
for(w=0,v=0,u=0;u<5e4;++u){t=C.d.av()
if(t<0.01){x=0.16*x
y=0}else if(t<0.86){w=0.85*y+0.04*x
v=0.04*y+0.85*x+1.6
x=v
y=w}else if(t<0.92){w=0.2*y-0.26*x
v=0.23*y+0.22*x+1.6
x=v
y=w}else{w=-0.15*y+0.28*x
v=0.26*y+0.24*x+0.44
x=v
y=w}z.fillStyle="rgb(0,"+(100+C.d.cv(143))+",00)"
z.fillRect(100+C.e.aB(y*50),500-C.m.aB(x*40),1,1)}}},1],["","",,H,{"^":"",
bv:function(){return new P.aX("No element")},
d5:function(){return new P.aX("Too few elements")},
aN:{"^":"w;",
gq:function(a){return new H.by(this,this.gj(this),0,null)},
v:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.H(0,y))
if(z!==this.gj(this))throw H.d(new P.v(this))}},
N:function(a,b){return H.h(new H.aQ(this,b),[null,null])},
aD:function(a,b){var z,y,x
z=H.h([],[H.x(this,"aN",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.H(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aC:function(a){return this.aD(a,!0)},
$isn:1},
by:{"^":"a;a,b,c,d",
gn:function(){return this.d},
k:function(){var z,y,x,w
z=this.a
y=J.B(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.v(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.H(z,w);++this.c
return!0}},
bA:{"^":"w;a,b",
gq:function(a){var z=new H.dh(null,J.aF(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.a7(this.a)},
$asw:function(a,b){return[b]},
l:{
ao:function(a,b,c,d){if(!!J.m(a).$isn)return H.h(new H.bm(a,b),[c,d])
return H.h(new H.bA(a,b),[c,d])}}},
bm:{"^":"bA;a,b",$isn:1},
dh:{"^":"d6;a,b,c",
k:function(){var z=this.b
if(z.k()){this.a=this.aj(z.gn())
return!0}this.a=null
return!1},
gn:function(){return this.a},
aj:function(a){return this.c.$1(a)}},
aQ:{"^":"aN;a,b",
gj:function(a){return J.a7(this.a)},
H:function(a,b){return this.aj(J.cF(this.a,b))},
aj:function(a){return this.b.$1(a)},
$asaN:function(a,b){return[b]},
$asw:function(a,b){return[b]},
$isn:1},
br:{"^":"a;"}}],["","",,H,{"^":"",
cq:function(a){var z=H.h(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
dO:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.eI()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a2(new P.dQ(z),1)).observe(y,{childList:true})
return new P.dP(z,y,x)}else if(self.setImmediate!=null)return P.eJ()
return P.eK()},
h9:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a2(new P.dR(a),0))},"$1","eI",2,0,3],
ha:[function(a){++init.globalState.f.b
self.setImmediate(H.a2(new P.dS(a),0))},"$1","eJ",2,0,3],
hb:[function(a){P.aZ(C.f,a)},"$1","eK",2,0,3],
ce:function(a,b){var z=H.ag()
z=H.U(z,[z,z]).F(a)
if(z){b.toString
return a}else{b.toString
return a}},
eC:function(){var z,y
for(;z=$.R,z!=null;){$.a0=null
y=z.b
$.R=y
if(y==null)$.a_=null
z.a.$0()}},
hj:[function(){$.b5=!0
try{P.eC()}finally{$.a0=null
$.b5=!1
if($.R!=null)$.$get$b_().$1(P.cm())}},"$0","cm",0,0,1],
ci:function(a){var z=new P.c4(a,null)
if($.R==null){$.a_=z
$.R=z
if(!$.b5)$.$get$b_().$1(P.cm())}else{$.a_.b=z
$.a_=z}},
eF:function(a){var z,y,x
z=$.R
if(z==null){P.ci(a)
$.a0=$.a_
return}y=new P.c4(a,null)
x=$.a0
if(x==null){y.b=z
$.a0=y
$.R=y}else{y.b=x.b
x.b=y
$.a0=y
if(y.b==null)$.a_=y}},
cx:function(a){var z=$.k
if(C.a===z){P.ax(null,null,C.a,a)
return}z.toString
P.ax(null,null,z,z.as(a,!0))},
eE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.u(u)
z=t
y=H.r(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.C(x)
w=t
v=x.gE()
c.$2(w,v)}}},
ew:function(a,b,c,d){var z=a.at()
if(!!J.m(z).$isL)z.aE(new P.ez(b,c,d))
else b.P(c,d)},
ex:function(a,b){return new P.ey(a,b)},
dK:function(a,b){var z=$.k
if(z===C.a){z.toString
return P.aZ(a,b)}return P.aZ(a,z.as(b,!0))},
aZ:function(a,b){var z=C.b.S(a.a,1000)
return H.dH(z<0?0:z,b)},
af:function(a,b,c,d,e){var z={}
z.a=d
P.eF(new P.eD(z,e))},
cf:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
ch:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
cg:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ax:function(a,b,c,d){var z=C.a!==c
if(z)d=c.as(d,!(!z||!1))
P.ci(d)},
dQ:{"^":"e:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
dP:{"^":"e:7;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
dR:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
dS:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
L:{"^":"a;"},
ca:{"^":"a;ao:a<,b,c,d,e",
gc7:function(){return this.b.b},
gb9:function(){return(this.c&1)!==0},
gco:function(){return(this.c&2)!==0},
gcp:function(){return this.c===6},
gb8:function(){return this.c===8},
gc0:function(){return this.d},
gc6:function(){return this.d}},
O:{"^":"a;R:a@,b,c4:c<",
gbZ:function(){return this.a===2},
gal:function(){return this.a>=4},
bl:function(a,b){var z,y
z=$.k
if(z!==C.a){z.toString
if(b!=null)b=P.ce(b,z)}y=H.h(new P.O(0,z,null),[null])
this.a9(new P.ca(null,y,b==null?1:3,a,b))
return y},
cD:function(a){return this.bl(a,null)},
aE:function(a){var z,y
z=$.k
y=new P.O(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.a)z.toString
this.a9(new P.ca(null,y,8,a,null))
return y},
a9:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gal()){y.a9(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.ax(null,null,z,new P.e3(this,a))}},
aW:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gao()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gal()){v.aW(a)
return}this.a=v.a
this.c=v.c}z.a=this.a4(a)
y=this.b
y.toString
P.ax(null,null,y,new P.e8(z,this))}},
a3:function(){var z=this.c
this.c=null
return this.a4(z)},
a4:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gao()
z.a=y}return y},
af:function(a){var z
if(!!J.m(a).$isL)P.cb(a,this)
else{z=this.a3()
this.a=4
this.c=a
P.P(this,z)}},
bP:function(a){var z=this.a3()
this.a=4
this.c=a
P.P(this,z)},
P:[function(a,b){var z=this.a3()
this.a=8
this.c=new P.a8(a,b)
P.P(this,z)},function(a){return this.P(a,null)},"cH","$2","$1","gag",2,2,8,0],
$isL:1,
l:{
e4:function(a,b){var z,y,x,w
b.sR(1)
try{a.bl(new P.e5(b),new P.e6(b))}catch(x){w=H.u(x)
z=w
y=H.r(x)
P.cx(new P.e7(b,z,y))}},
cb:function(a,b){var z,y,x
for(;a.gbZ();)a=a.c
z=a.gal()
y=b.c
if(z){b.c=null
x=b.a4(y)
b.a=a.a
b.c=a.c
P.P(b,x)}else{b.a=2
b.c=a
a.aW(y)}},
P:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.C(v)
x=v.gE()
z.toString
P.af(null,null,z,y,x)}return}for(;b.gao()!=null;b=u){u=b.a
b.a=null
P.P(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gb9()||b.gb8()){s=b.gc7()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.C(v)
r=v.gE()
y.toString
P.af(null,null,y,x,r)
return}q=$.k
if(q==null?s!=null:q!==s)$.k=s
else q=null
if(b.gb8())new P.eb(z,x,w,b,s).$0()
else if(y){if(b.gb9())new P.ea(x,w,b,t,s).$0()}else if(b.gco())new P.e9(z,x,b,s).$0()
if(q!=null)$.k=q
y=x.b
r=J.m(y)
if(!!r.$isL){p=b.b
if(!!r.$isO)if(y.a>=4){o=p.c
p.c=null
b=p.a4(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.cb(y,p)
else P.e4(y,p)
return}}p=b.b
b=p.a3()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
e3:{"^":"e:0;a,b",
$0:function(){P.P(this.a,this.b)}},
e8:{"^":"e:0;a,b",
$0:function(){P.P(this.b,this.a.a)}},
e5:{"^":"e:2;a",
$1:function(a){this.a.bP(a)}},
e6:{"^":"e:9;a",
$2:function(a,b){this.a.P(a,b)},
$1:function(a){return this.$2(a,null)}},
e7:{"^":"e:0;a,b,c",
$0:function(){this.a.P(this.b,this.c)}},
ea:{"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.az(this.c.gc0(),this.d)
x.a=!1}catch(w){x=H.u(w)
z=x
y=H.r(w)
x=this.a
x.b=new P.a8(z,y)
x.a=!0}}},
e9:{"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.gcp()){x=r.d
try{y=this.d.az(x,J.C(z))}catch(q){r=H.u(q)
w=r
v=H.r(q)
r=J.C(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a8(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y===!0&&u!=null)try{r=u
p=H.ag()
p=H.U(p,[p,p]).F(r)
n=this.d
m=this.b
if(p)m.b=n.cB(u,J.C(z),z.gE())
else m.b=n.az(u,J.C(z))
m.a=!1}catch(q){r=H.u(q)
t=r
s=H.r(q)
r=J.C(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a8(t,s)
r=this.b
r.b=o
r.a=!0}}},
eb:{"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.bi(this.d.gc6())}catch(w){v=H.u(w)
y=v
x=H.r(w)
if(this.c){v=J.C(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.a8(y,x)
u.a=!0
return}if(!!J.m(z).$isL){if(z instanceof P.O&&z.gR()>=4){if(z.gR()===8){v=this.b
v.b=z.gc4()
v.a=!0}return}v=this.b
v.b=z.cD(new P.ec(this.a.a))
v.a=!1}}},
ec:{"^":"e:2;a",
$1:function(a){return this.a}},
c4:{"^":"a;a,b"},
F:{"^":"a;",
N:function(a,b){return H.h(new P.em(b,this),[H.x(this,"F",0),null])},
v:function(a,b){var z,y
z={}
y=H.h(new P.O(0,$.k,null),[null])
z.a=null
z.a=this.M(new P.dz(z,this,b,y),!0,new P.dA(y),y.gag())
return y},
gj:function(a){var z,y
z={}
y=H.h(new P.O(0,$.k,null),[P.l])
z.a=0
this.M(new P.dB(z),!0,new P.dC(z,y),y.gag())
return y},
aC:function(a){var z,y
z=H.h([],[H.x(this,"F",0)])
y=H.h(new P.O(0,$.k,null),[[P.i,H.x(this,"F",0)]])
this.M(new P.dD(this,z),!0,new P.dE(z,y),y.gag())
return y}},
dz:{"^":"e;a,b,c,d",
$1:function(a){P.eE(new P.dx(this.c,a),new P.dy(),P.ex(this.a.a,this.d))},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"F")}},
dx:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
dy:{"^":"e:2;",
$1:function(a){}},
dA:{"^":"e:0;a",
$0:function(){this.a.af(null)}},
dB:{"^":"e:2;a",
$1:function(a){++this.a.a}},
dC:{"^":"e:0;a,b",
$0:function(){this.b.af(this.a.a)}},
dD:{"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.a,"F")}},
dE:{"^":"e:0;a,b",
$0:function(){this.b.af(this.a)}},
dw:{"^":"a;"},
hc:{"^":"a;"},
dT:{"^":"a;R:e@",
aw:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.b5()
if((z&4)===0&&(this.e&32)===0)this.aO(this.gaS())},
bf:function(a){return this.aw(a,null)},
bh:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gC(z)}else z=!1
if(z)this.r.a7(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.aO(this.gaU())}}}},
at:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.ac()
return this.f},
ac:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.b5()
if((this.e&32)===0)this.r=null
this.f=this.aR()},
ab:["bE",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.aZ(a)
else this.aa(new P.dW(a,null))}],
a8:["bF",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.b0(a,b)
else this.aa(new P.dY(a,b,null))}],
bM:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.b_()
else this.aa(C.k)},
aT:[function(){},"$0","gaS",0,0,1],
aV:[function(){},"$0","gaU",0,0,1],
aR:function(){return},
aa:function(a){var z,y
z=this.r
if(z==null){z=new P.eu(null,null,0)
this.r=z}z.K(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.a7(this)}},
aZ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.aA(this.a,a)
this.e=(this.e&4294967263)>>>0
this.ad((z&4)!==0)},
b0:function(a,b){var z,y
z=this.e
y=new P.dV(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ac()
z=this.f
if(!!J.m(z).$isL)z.aE(y)
else y.$0()}else{y.$0()
this.ad((z&4)!==0)}},
b_:function(){var z,y
z=new P.dU(this)
this.ac()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isL)y.aE(z)
else z.$0()},
aO:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.ad((z&4)!==0)},
ad:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gC(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gC(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.aT()
else this.aV()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.a7(this)},
bI:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.ce(b,z)
this.c=c}},
dV:{"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ag()
x=H.U(x,[x,x]).F(y)
w=z.d
v=this.b
u=z.b
if(x)w.cC(u,v,this.c)
else w.aA(u,v)
z.e=(z.e&4294967263)>>>0}},
dU:{"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bj(z.c)
z.e=(z.e&4294967263)>>>0}},
c6:{"^":"a;a5:a@"},
dW:{"^":"c6;b,a",
ax:function(a){a.aZ(this.b)}},
dY:{"^":"c6;U:b>,E:c<,a",
ax:function(a){a.b0(this.b,this.c)}},
dX:{"^":"a;",
ax:function(a){a.b_()},
ga5:function(){return},
sa5:function(a){throw H.d(new P.aX("No events after a done."))}},
eo:{"^":"a;R:a@",
a7:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cx(new P.ep(this,a))
this.a=1},
b5:function(){if(this.a===1)this.a=3}},
ep:{"^":"e:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.ga5()
z.b=w
if(w==null)z.c=null
x.ax(this.b)}},
eu:{"^":"eo;b,c,a",
gC:function(a){return this.c==null},
K:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sa5(b)
this.c=b}}},
ez:{"^":"e:0;a,b,c",
$0:function(){return this.a.P(this.b,this.c)}},
ey:{"^":"e:10;a,b",
$2:function(a,b){return P.ew(this.a,this.b,a,b)}},
b0:{"^":"F;",
M:function(a,b,c,d){return this.bS(a,d,c,!0===b)},
bc:function(a,b,c){return this.M(a,null,b,c)},
bS:function(a,b,c,d){return P.e2(this,a,b,c,d,H.x(this,"b0",0),H.x(this,"b0",1))},
aP:function(a,b){b.ab(a)},
$asF:function(a,b){return[b]}},
c9:{"^":"dT;x,y,a,b,c,d,e,f,r",
ab:function(a){if((this.e&2)!==0)return
this.bE(a)},
a8:function(a,b){if((this.e&2)!==0)return
this.bF(a,b)},
aT:[function(){var z=this.y
if(z==null)return
z.bf(0)},"$0","gaS",0,0,1],
aV:[function(){var z=this.y
if(z==null)return
z.bh()},"$0","gaU",0,0,1],
aR:function(){var z=this.y
if(z!=null){this.y=null
return z.at()}return},
cI:[function(a){this.x.aP(a,this)},"$1","gbV",2,0,function(){return H.b8(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"c9")}],
cK:[function(a,b){this.a8(a,b)},"$2","gbX",4,0,11],
cJ:[function(){this.bM()},"$0","gbW",0,0,1],
bJ:function(a,b,c,d,e,f,g){var z,y
z=this.gbV()
y=this.gbX()
this.y=this.x.a.bc(z,this.gbW(),y)},
l:{
e2:function(a,b,c,d,e,f,g){var z=$.k
z=H.h(new P.c9(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.bI(b,c,d,e)
z.bJ(a,b,c,d,e,f,g)
return z}}},
em:{"^":"b0;b,a",
aP:function(a,b){var z,y,x,w,v
z=null
try{z=this.c5(a)}catch(w){v=H.u(w)
y=v
x=H.r(w)
$.k.toString
b.a8(y,x)
return}b.ab(z)},
c5:function(a){return this.b.$1(a)}},
a8:{"^":"a;U:a>,E:b<",
i:function(a){return H.b(this.a)},
$isq:1},
ev:{"^":"a;"},
eD:{"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bH()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=J.I(y)
throw x}},
eq:{"^":"ev;",
bj:function(a){var z,y,x,w
try{if(C.a===$.k){x=a.$0()
return x}x=P.cf(null,null,this,a)
return x}catch(w){x=H.u(w)
z=x
y=H.r(w)
return P.af(null,null,this,z,y)}},
aA:function(a,b){var z,y,x,w
try{if(C.a===$.k){x=a.$1(b)
return x}x=P.ch(null,null,this,a,b)
return x}catch(w){x=H.u(w)
z=x
y=H.r(w)
return P.af(null,null,this,z,y)}},
cC:function(a,b,c){var z,y,x,w
try{if(C.a===$.k){x=a.$2(b,c)
return x}x=P.cg(null,null,this,a,b,c)
return x}catch(w){x=H.u(w)
z=x
y=H.r(w)
return P.af(null,null,this,z,y)}},
as:function(a,b){if(b)return new P.er(this,a)
else return new P.es(this,a)},
c9:function(a,b){return new P.et(this,a)},
h:function(a,b){return},
bi:function(a){if($.k===C.a)return a.$0()
return P.cf(null,null,this,a)},
az:function(a,b){if($.k===C.a)return a.$1(b)
return P.ch(null,null,this,a,b)},
cB:function(a,b,c){if($.k===C.a)return a.$2(b,c)
return P.cg(null,null,this,a,b,c)}},
er:{"^":"e:0;a,b",
$0:function(){return this.a.bj(this.b)}},
es:{"^":"e:0;a,b",
$0:function(){return this.a.bi(this.b)}},
et:{"^":"e:2;a,b",
$1:function(a){return this.a.aA(this.b,a)}}}],["","",,P,{"^":"",
df:function(){return H.h(new H.M(0,null,null,null,null,null,0),[null,null])},
W:function(a){return H.eN(a,H.h(new H.M(0,null,null,null,null,null,0),[null,null]))},
d4:function(a,b,c){var z,y
if(P.b6(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$a1()
y.push(a)
try{P.eB(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.bQ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
am:function(a,b,c){var z,y,x
if(P.b6(a))return b+"..."+c
z=new P.aY(b)
y=$.$get$a1()
y.push(a)
try{x=z
x.a=P.bQ(x.gJ(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.a=y.gJ()+c
y=z.gJ()
return y.charCodeAt(0)==0?y:y},
b6:function(a){var z,y
for(z=0;y=$.$get$a1(),z<y.length;++z)if(a===y[z])return!0
return!1},
eB:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gq(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.k())return
w=H.b(z.gn())
b.push(w)
y+=w.length+2;++x}if(!z.k()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gn();++x
if(!z.k()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gn();++x
for(;z.k();t=s,s=r){r=z.gn();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
X:function(a,b,c,d){return H.h(new P.eg(0,null,null,null,null,null,0),[d])},
di:function(a){var z,y,x
z={}
if(P.b6(a))return"{...}"
y=new P.aY("")
try{$.$get$a1().push(a)
x=y
x.a=x.gJ()+"{"
z.a=!0
J.cG(a,new P.dj(z,y))
z=y
z.a=z.gJ()+"}"}finally{z=$.$get$a1()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gJ()
return z.charCodeAt(0)==0?z:z},
cc:{"^":"M;a,b,c,d,e,f,r",
W:function(a){return H.f5(a)&0x3ffffff},
X:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gba()
if(x==null?b==null:x===b)return y}return-1},
l:{
Z:function(a,b){return H.h(new P.cc(0,null,null,null,null,null,0),[a,b])}}},
eg:{"^":"ed;a,b,c,d,e,f,r",
gq:function(a){var z=new P.b2(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
cb:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.bQ(b)},
bQ:function(a){var z=this.d
if(z==null)return!1
return this.a2(z[this.a1(a)],a)>=0},
bd:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.cb(0,a)?a:null
else return this.c_(a)},
c_:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.a1(a)]
x=this.a2(y,a)
if(x<0)return
return J.cC(y,x).gaM()},
v:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.v(this))
z=z.b}},
K:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.b3()
this.b=z}return this.aI(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.b3()
this.c=y}return this.aI(y,b)}else return this.B(b)},
B:function(a){var z,y,x
z=this.d
if(z==null){z=P.b3()
this.d=z}y=this.a1(a)
x=z[y]
if(x==null)z[y]=[this.ae(a)]
else{if(this.a2(x,a)>=0)return!1
x.push(this.ae(a))}return!0},
Y:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aJ(this.c,b)
else return this.c2(b)},
c2:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a1(a)]
x=this.a2(y,a)
if(x<0)return!1
this.aK(y.splice(x,1)[0])
return!0},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aI:function(a,b){if(a[b]!=null)return!1
a[b]=this.ae(b)
return!0},
aJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aK(z)
delete a[b]
return!0},
ae:function(a){var z,y
z=new P.eh(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aK:function(a){var z,y
z=a.gbO()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a1:function(a){return J.ai(a)&0x3ffffff},
a2:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].gaM(),b))return y
return-1},
$isn:1,
l:{
b3:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eh:{"^":"a;aM:a<,b,bO:c<"},
b2:{"^":"a;a,b,c,d",
gn:function(){return this.d},
k:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.v(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ed:{"^":"dt;"},
bz:{"^":"a;",
gq:function(a){return new H.by(a,this.gj(a),0,null)},
H:function(a,b){return this.h(a,b)},
v:function(a,b){var z,y,x,w
z=this.gj(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.f(a,w)
b.$1(a[w])
if(x)throw H.d(new P.v(a))}},
N:function(a,b){return H.h(new H.aQ(a,b),[null,null])},
i:function(a){return P.am(a,"[","]")},
$isi:1,
$asi:null,
$isn:1},
dj:{"^":"e:12;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
dg:{"^":"w;a,b,c,d",
gq:function(a){return new P.ei(this,this.c,this.d,this.b,null)},
v:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.p(new P.v(this))}},
gC:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
L:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.am(this,"{","}")},
bg:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bv());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
B:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.aN();++this.d},
aN:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.h(z,[H.a4(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.aF(y,0,w,z,x)
C.c.aF(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bG:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.h(z,[b])},
$isn:1,
l:{
aO:function(a,b){var z=H.h(new P.dg(null,0,0,0),[b])
z.bG(a,b)
return z}}},
ei:{"^":"a;a,b,c,d,e",
gn:function(){return this.e},
k:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.p(new P.v(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
du:{"^":"a;",
N:function(a,b){return H.h(new H.bm(this,b),[H.a4(this,0),null])},
i:function(a){return P.am(this,"{","}")},
v:function(a,b){var z
for(z=new P.b2(this,this.r,null,null),z.c=this.e;z.k();)b.$1(z.d)},
$isn:1},
dt:{"^":"du;"}}],["","",,P,{"^":"",
bo:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.I(a)
if(typeof a==="string")return JSON.stringify(a)
return P.cU(a)},
cU:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.ap(a)},
al:function(a){return new P.e1(a)},
aP:function(a,b,c){var z,y
z=H.h([],[c])
for(y=J.aF(a);y.k();)z.push(y.gn())
return z},
bd:function(a){var z=H.b(a)
H.f6(z)},
eM:{"^":"a;"},
"+bool":0,
fl:{"^":"a;"},
aE:{"^":"ah;"},
"+double":0,
ak:{"^":"a;a",
a0:function(a,b){return new P.ak(C.b.a0(this.a,b.gbT()))},
a6:function(a,b){return C.b.a6(this.a,b.gbT())},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.ak))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.cT()
y=this.a
if(y<0)return"-"+new P.ak(-y).i(0)
x=z.$1(C.b.ay(C.b.S(y,6e7),60))
w=z.$1(C.b.ay(C.b.S(y,1e6),60))
v=new P.cS().$1(C.b.ay(y,1e6))
return""+C.b.S(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
cS:{"^":"e:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
cT:{"^":"e:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
q:{"^":"a;",
gE:function(){return H.r(this.$thrownJsError)}},
bH:{"^":"q;",
i:function(a){return"Throw of null."}},
J:{"^":"q;a,b,c,d",
gai:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gah:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gai()+y+x
if(!this.a)return w
v=this.gah()
u=P.bo(this.b)
return w+v+": "+H.b(u)},
l:{
bf:function(a){return new P.J(!1,null,null,a)},
bg:function(a,b,c){return new P.J(!0,a,b,c)}}},
aW:{"^":"J;e,f,a,b,c,d",
gai:function(){return"RangeError"},
gah:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.cE()
if(typeof z!=="number")return H.a5(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
l:{
dm:function(a){return new P.aW(null,null,!1,null,null,a)},
ar:function(a,b,c){return new P.aW(null,null,!0,a,b,"Value not in range")},
aq:function(a,b,c,d,e){return new P.aW(b,c,!0,a,d,"Invalid value")},
bM:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.aq(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.aq(b,a,c,"end",f))
return b}}},
cW:{"^":"J;e,j:f>,a,b,c,d",
gai:function(){return"RangeError"},
gah:function(){if(J.cB(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
l:{
bs:function(a,b,c,d,e){var z=e!=null?e:J.a7(b)
return new P.cW(b,z,!0,a,c,"Index out of range")}}},
G:{"^":"q;a",
i:function(a){return"Unsupported operation: "+this.a}},
c3:{"^":"q;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
aX:{"^":"q;a",
i:function(a){return"Bad state: "+this.a}},
v:{"^":"q;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bo(z))+"."}},
bP:{"^":"a;",
i:function(a){return"Stack Overflow"},
gE:function(){return},
$isq:1},
cR:{"^":"q;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
e1:{"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
cV:{"^":"a;a,b",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.bg(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.aV(b,"expando$values")
return y==null?null:H.aV(y,z)},
t:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.aV(b,"expando$values")
if(y==null){y=new P.a()
H.bL(b,"expando$values",y)}H.bL(y,z,c)}}},
l:{"^":"ah;"},
"+int":0,
w:{"^":"a;",
N:function(a,b){return H.ao(this,b,H.x(this,"w",0),null)},
v:function(a,b){var z
for(z=this.gq(this);z.k();)b.$1(z.gn())},
aD:function(a,b){return P.aP(this,!0,H.x(this,"w",0))},
aC:function(a){return this.aD(a,!0)},
gj:function(a){var z,y
z=this.gq(this)
for(y=0;z.k();)++y
return y},
H:function(a,b){var z,y,x
if(b<0)H.p(P.aq(b,0,null,"index",null))
for(z=this.gq(this),y=0;z.k();){x=z.gn()
if(b===y)return x;++y}throw H.d(P.bs(b,this,"index",null,y))},
i:function(a){return P.d4(this,"(",")")}},
d6:{"^":"a;"},
i:{"^":"a;",$asi:null,$isn:1},
"+List":0,
fY:{"^":"a;",
i:function(a){return"null"}},
"+Null":0,
ah:{"^":"a;"},
"+num":0,
a:{"^":";",
m:function(a,b){return this===b},
gp:function(a){return H.E(this)},
i:function(a){return H.ap(this)},
toString:function(){return this.i(this)}},
Y:{"^":"a;"},
N:{"^":"a;"},
"+String":0,
aY:{"^":"a;J:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
l:{
bQ:function(a,b,c){var z=J.aF(b)
if(!z.k())return a
if(c.length===0){do a+=H.b(z.gn())
while(z.k())}else{a+=H.b(z.gn())
for(;z.k();)a=a+c+H.b(z.gn())}return a}}}}],["","",,W,{"^":"",
cj:function(a){var z=$.k
if(z===C.a)return a
return z.c9(a,!0)},
z:{"^":"bn;",$isz:1,$isa:1,"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
fe:{"^":"z;",
i:function(a){return String(a)},
$isc:1,
"%":"HTMLAnchorElement"},
fg:{"^":"z;",
i:function(a){return String(a)},
$isc:1,
"%":"HTMLAreaElement"},
fh:{"^":"z;",$isc:1,"%":"HTMLBodyElement"},
fi:{"^":"z;",
bq:function(a,b,c){return a.getContext(b)},
bp:function(a,b){return this.bq(a,b,null)},
"%":"HTMLCanvasElement"},
fj:{"^":"c;cj:fillStyle}","%":"CanvasRenderingContext2D"},
fm:{"^":"c;",
i:function(a){return String(a)},
"%":"DOMException"},
bn:{"^":"dk;",
i:function(a){return a.localName},
gbe:function(a){return H.h(new W.c7(a,"click",!1),[null])},
$isc:1,
"%":";Element"},
fn:{"^":"aI;U:error=","%":"ErrorEvent"},
aI:{"^":"c;","%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
bp:{"^":"c;",
bL:function(a,b,c,d){return a.addEventListener(b,H.a2(c,1),!1)},
c3:function(a,b,c,d){return a.removeEventListener(b,H.a2(c,1),!1)},
"%":"MediaStream;EventTarget"},
fF:{"^":"z;j:length=","%":"HTMLFormElement"},
fI:{"^":"z;",$isc:1,"%":"HTMLInputElement"},
fN:{"^":"z;U:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
aR:{"^":"dM;",$isaR:1,$isa:1,"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
fX:{"^":"c;",$isc:1,"%":"Navigator"},
dk:{"^":"bp;",
i:function(a){var z=a.nodeValue
return z==null?this.bC(a):z},
"%":"Document|HTMLDocument;Node"},
h0:{"^":"z;j:length=","%":"HTMLSelectElement"},
h1:{"^":"aI;U:error=","%":"SpeechRecognitionError"},
dM:{"^":"aI;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
h8:{"^":"bp;",$isc:1,"%":"DOMWindow|Window"},
he:{"^":"z;",$isc:1,"%":"HTMLFrameSetElement"},
e0:{"^":"F;",
M:function(a,b,c,d){var z=new W.c8(0,this.a,this.b,W.cj(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.aq()
return z},
bc:function(a,b,c){return this.M(a,null,b,c)}},
c7:{"^":"e0;a,b,c"},
c8:{"^":"dw;a,b,c,d,e",
at:function(){if(this.b==null)return
this.b3()
this.b=null
this.d=null
return},
aw:function(a,b){if(this.b==null)return;++this.a
this.b3()},
bf:function(a){return this.aw(a,null)},
bh:function(){if(this.b==null||this.a<=0)return;--this.a
this.aq()},
aq:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.cD(x,this.c,z,!1)}},
b3:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.cE(x,this.c,z,!1)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",fc:{"^":"a9;",$isc:1,"%":"SVGAElement"},fd:{"^":"dF;",$isc:1,"%":"SVGAltGlyphElement"},ff:{"^":"j;",$isc:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},fo:{"^":"j;",$isc:1,"%":"SVGFEBlendElement"},fp:{"^":"j;",$isc:1,"%":"SVGFEColorMatrixElement"},fq:{"^":"j;",$isc:1,"%":"SVGFEComponentTransferElement"},fr:{"^":"j;",$isc:1,"%":"SVGFECompositeElement"},fs:{"^":"j;",$isc:1,"%":"SVGFEConvolveMatrixElement"},ft:{"^":"j;",$isc:1,"%":"SVGFEDiffuseLightingElement"},fu:{"^":"j;",$isc:1,"%":"SVGFEDisplacementMapElement"},fv:{"^":"j;",$isc:1,"%":"SVGFEFloodElement"},fw:{"^":"j;",$isc:1,"%":"SVGFEGaussianBlurElement"},fx:{"^":"j;",$isc:1,"%":"SVGFEImageElement"},fy:{"^":"j;",$isc:1,"%":"SVGFEMergeElement"},fz:{"^":"j;",$isc:1,"%":"SVGFEMorphologyElement"},fA:{"^":"j;",$isc:1,"%":"SVGFEOffsetElement"},fB:{"^":"j;",$isc:1,"%":"SVGFESpecularLightingElement"},fC:{"^":"j;",$isc:1,"%":"SVGFETileElement"},fD:{"^":"j;",$isc:1,"%":"SVGFETurbulenceElement"},fE:{"^":"j;",$isc:1,"%":"SVGFilterElement"},a9:{"^":"j;",$isc:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},fH:{"^":"a9;",$isc:1,"%":"SVGImageElement"},fL:{"^":"j;",$isc:1,"%":"SVGMarkerElement"},fM:{"^":"j;",$isc:1,"%":"SVGMaskElement"},fZ:{"^":"j;",$isc:1,"%":"SVGPatternElement"},h_:{"^":"j;",$isc:1,"%":"SVGScriptElement"},j:{"^":"bn;",
gbe:function(a){return H.h(new W.c7(a,"click",!1),[null])},
$isc:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},h2:{"^":"a9;",$isc:1,"%":"SVGSVGElement"},h3:{"^":"j;",$isc:1,"%":"SVGSymbolElement"},bS:{"^":"a9;","%":";SVGTextContentElement"},h4:{"^":"bS;",$isc:1,"%":"SVGTextPathElement"},dF:{"^":"bS;","%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},h5:{"^":"a9;",$isc:1,"%":"SVGUseElement"},h6:{"^":"j;",$isc:1,"%":"SVGViewElement"},hd:{"^":"j;",$isc:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},hf:{"^":"j;",$isc:1,"%":"SVGCursorElement"},hg:{"^":"j;",$isc:1,"%":"SVGFEDropShadowElement"},hh:{"^":"j;",$isc:1,"%":"SVGGlyphRefElement"},hi:{"^":"j;",$isc:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":"",fk:{"^":"a;"}}],["","",,P,{"^":"",ef:{"^":"a;",
cv:function(a){if(a<=0||a>4294967296)throw H.d(P.dm("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
av:function(){return Math.random()}}}],["","",,H,{"^":"",bB:{"^":"c;",$isbB:1,"%":"ArrayBuffer"},aU:{"^":"c;",$isaU:1,"%":"DataView;ArrayBufferView;aS|bC|bE|aT|bD|bF|D"},aS:{"^":"aU;",
gj:function(a){return a.length},
$isaK:1,
$isaJ:1},aT:{"^":"bE;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c}},bC:{"^":"aS+bz;",$isi:1,
$asi:function(){return[P.aE]},
$isn:1},bE:{"^":"bC+br;"},D:{"^":"bF;",
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.l]},
$isn:1},bD:{"^":"aS+bz;",$isi:1,
$asi:function(){return[P.l]},
$isn:1},bF:{"^":"bD+br;"},fO:{"^":"aT;",$isi:1,
$asi:function(){return[P.aE]},
$isn:1,
"%":"Float32Array"},fP:{"^":"aT;",$isi:1,
$asi:function(){return[P.aE]},
$isn:1,
"%":"Float64Array"},fQ:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"Int16Array"},fR:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"Int32Array"},fS:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"Int8Array"},fT:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"Uint16Array"},fU:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"Uint32Array"},fV:{"^":"D;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},fW:{"^":"D;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isn:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
f6:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bx.prototype
return J.bw.prototype}if(typeof a=="string")return J.an.prototype
if(a==null)return J.d8.prototype
if(typeof a=="boolean")return J.d7.prototype
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.a)return a
return J.aA(a)}
J.B=function(a){if(typeof a=="string")return J.an.prototype
if(a==null)return a
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.a)return a
return J.aA(a)}
J.az=function(a){if(a==null)return a
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.a)return a
return J.aA(a)}
J.eO=function(a){if(typeof a=="number")return J.ab.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.au.prototype
return a}
J.eP=function(a){if(typeof a=="number")return J.ab.prototype
if(typeof a=="string")return J.an.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.au.prototype
return a}
J.a3=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.a)return a
return J.aA(a)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eP(a).a0(a,b)}
J.H=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).m(a,b)}
J.cB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.eO(a).a6(a,b)}
J.cC=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.f2(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.B(a).h(a,b)}
J.cD=function(a,b,c,d){return J.a3(a).bL(a,b,c,d)}
J.cE=function(a,b,c,d){return J.a3(a).c3(a,b,c,d)}
J.cF=function(a,b){return J.az(a).H(a,b)}
J.cG=function(a,b){return J.az(a).v(a,b)}
J.C=function(a){return J.a3(a).gU(a)}
J.ai=function(a){return J.m(a).gp(a)}
J.aF=function(a){return J.az(a).gq(a)}
J.a7=function(a){return J.B(a).gj(a)}
J.cH=function(a){return J.a3(a).gbe(a)}
J.cI=function(a,b){return J.a3(a).bp(a,b)}
J.cJ=function(a,b){return J.az(a).N(a,b)}
J.cK=function(a,b){return J.a3(a).scj(a,b)}
J.I=function(a){return J.m(a).i(a)}
var $=I.p
C.l=J.c.prototype
C.c=J.aa.prototype
C.m=J.bw.prototype
C.b=J.bx.prototype
C.e=J.ab.prototype
C.n=J.an.prototype
C.v=J.ac.prototype
C.w=J.dl.prototype
C.x=J.au.prototype
C.j=new H.bl()
C.k=new P.dX()
C.d=new P.ef()
C.a=new P.eq()
C.f=new P.ak(0)
C.o=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.p=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.h=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.i=function(hooks) { return hooks; }

C.q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.t=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.r=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.u=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
$.bI="$cachedFunction"
$.bJ="$cachedInvocation"
$.y=0
$.V=null
$.bh=null
$.ba=null
$.ck=null
$.cw=null
$.ay=null
$.aB=null
$.bb=null
$.R=null
$.a_=null
$.a0=null
$.b5=!1
$.k=C.a
$.bq=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bk","$get$bk",function(){return init.getIsolateTag("_$dart_dartClosure")},"bt","$get$bt",function(){return H.d2()},"bu","$get$bu",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bq
$.bq=z+1
z="expando$key$"+z}return new P.cV(null,z)},"bT","$get$bT",function(){return H.A(H.at({
toString:function(){return"$receiver$"}}))},"bU","$get$bU",function(){return H.A(H.at({$method$:null,
toString:function(){return"$receiver$"}}))},"bV","$get$bV",function(){return H.A(H.at(null))},"bW","$get$bW",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"c_","$get$c_",function(){return H.A(H.at(void 0))},"c0","$get$c0",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"bY","$get$bY",function(){return H.A(H.bZ(null))},"bX","$get$bX",function(){return H.A(function(){try{null.$method$}catch(z){return z.message}}())},"c2","$get$c2",function(){return H.A(H.bZ(void 0))},"c1","$get$c1",function(){return H.A(function(){try{(void 0).$method$}catch(z){return z.message}}())},"b_","$get$b_",function(){return P.dO()},"a1","$get$a1",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.N,args:[P.l]},{func:1,args:[,P.N]},{func:1,args:[P.N]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.Y]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.Y]},{func:1,v:true,args:[,P.Y]},{func:1,args:[,,]},{func:1,v:true,args:[W.aR]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.fa(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cr=a.cr
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cy(L.cn(),b)},[])
else (function(b){H.cy(L.cn(),b)})([])})})()