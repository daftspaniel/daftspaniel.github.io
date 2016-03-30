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
else b0.push(a7+a8+";\n")}}return f}function defineClass(a1,a2){var g=[]
var f="function "+a1+"("
var e=""
for(var d=0;d<a2.length;d++){if(d!=0)f+=", "
var c=generateAccessor(a2[d],g,a1)
var a0="p_"+c
f+=a0
e+="this."+c+" = "+a0+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a1+".builtin$cls=\""+a1+"\";\n"
f+="$desc=$collectedClasses."+a1+"[1];\n"
f+=a1+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a1+".name=\""+a1+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
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
function finishClass(b4){if(a2[b4])return
a2[b4]=true
var a5=a4.pending[b4]
if(!a5||typeof a5!="string"){var a6=g[b4]
var a7=a6.prototype
a7.constructor=a6
a7.$isb=a6
a7.$deferredAction=function(){}
return}finishClass(a5)
var a8=g[a5]
if(!a8)a8=existingIsolateProperties[a5]
var a6=g[b4]
var a7=z(a6,a8)
if(Object.prototype.hasOwnProperty.call(a7,"%")){var a9=a7["%"].split(";")
if(a9[0]){var b0=a9[0].split("|")
for(var b1=0;b1<b0.length;b1++){init.interceptorsByTag[b0[b1]]=a6
init.leafTags[b0[b1]]=true}}if(a9[1]){b0=a9[1].split("|")
if(a9[2]){var b2=a9[2].split("|")
for(var b1=0;b1<b2.length;b1++){var b3=g[b2[b1]]
b3.$nativeSuperclassTag=b0[0]}}for(b1=0;b1<b0.length;b1++){init.interceptorsByTag[b0[b1]]=a6
init.leafTags[b0[b1]]=false}}a7.$deferredAction()}if(a7.$isd)a7.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="i"){processStatics(init.statics[b1]=b2.i,b3)
delete b2.i}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.H"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.H"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.H(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.a0=function(){}
var dart=[["","",,H,{"^":"",bc:{"^":"b;a"}}],["","",,J,{"^":"",
i:function(a){return void 0},
x:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
I:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.L==null){H.aR()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.X("Return interceptor for "+H.a(y(a,z))))}w=H.b_(a)
if(w==null){if(typeof a=="function")return C.m
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.n
else return C.o}return w},
d:{"^":"b;",
h:["B",function(a){return H.u(a)}],
"%":"ApplicationCacheErrorEvent|AutocompleteErrorEvent|CanvasGradient|CanvasPattern|ClipboardEvent|DOMError|ErrorEvent|Event|FileError|InputEvent|MediaError|MediaKeyError|Navigator|NavigatorUserMediaError|PositionError|SQLError|SpeechRecognitionError|WebGLRenderingContext"},
ap:{"^":"d;",
h:function(a){return String(a)},
$isaG:1},
ar:{"^":"d;",
h:function(a){return"null"}},
C:{"^":"d;",
h:["C",function(a){return String(a)}]},
av:{"^":"C;"},
F:{"^":"C;"},
t:{"^":"C;",
h:function(a){var z=a[$.$get$R()]
return z==null?this.C(a):J.p(z)}},
A:{"^":"d;",
h:function(a){return P.ao(a,"[","]")},
gj:function(a){return a.length},
$isD:1},
bb:{"^":"A;"},
ab:{"^":"b;a,b,c,d",
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.b2(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
B:{"^":"d;",
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
p:function(a,b){return a+b},
v:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
$iso:1},
T:{"^":"B;",$iso:1,$isa7:1},
aq:{"^":"B;",$iso:1},
r:{"^":"d;",
p:function(a,b){if(typeof b!=="string")throw H.c(P.aa(b,null,null))
return a+b},
A:function(a,b,c){H.a_(b)
if(c==null)c=a.length
H.a_(c)
if(typeof c!=="number")return H.K(c)
if(b>c)throw H.c(P.E(b,null,null))
if(c>a.length)throw H.c(P.E(c,null,null))
return a.substring(b,c)},
w:function(a,b){return this.A(a,b,null)},
h:function(a){return a},
gj:function(a){return a.length},
$isaC:1}}],["","",,H,{"^":"",
aM:function(a){return init.types[a]},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.p(a)
if(typeof z!=="string")throw H.c(H.Z(a))
return z},
aw:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
U:function(a){var z,y,x,w,v,u,t,s,r
z=J.i(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.d||!!J.i(a).$isF){v=C.b(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.e.w(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.a2(H.aL(a),0,null),init.mangledGlobalNames)},
u:function(a){return"Instance of '"+H.U(a)+"'"},
K:function(a){throw H.c(H.Z(a))},
aZ:function(a,b){if(a==null)J.y(a)
throw H.c(H.aH(a,b))},
aH:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.m(!0,b,"index",null)
z=J.y(a)
if(!(b<0)){if(typeof z!=="number")return H.K(z)
y=b>=z}else y=!0
if(y)return P.an(b,a,"index",null,z)
return P.E(b,"index",null)},
Z:function(a){return new P.m(!0,a,null,null)},
a_:function(a){return a},
c:function(a){var z
if(a==null)a=new P.au()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.a6})
z.name=""}else z.toString=H.a6
return z},
a6:function(){return J.p(this.dartException)},
b2:function(a){throw H.c(new P.ah(a))},
aT:function(a,b,c,d,e,f,g){switch(c){case 0:return new H.aU(a).$0()
case 1:return new H.aV(a,d).$0()
case 2:return new H.aW(a,d,e).$0()
case 3:return new H.aX(a,d,e,f).$0()
case 4:return new H.aY(a,d,e,f,g).$0()}throw H.c(new P.aE("Unsupported number of arguments for wrapped closure"))},
bf:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,$,H.aT)
a.$identity=z
return z},
ag:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.i(c).$isD){z.$reflectionInfo=c
x=H.az(z).r}else x=c
w=d?Object.create(new H.aB().constructor.prototype):Object.create(new H.N(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.f
$.f=J.l(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.Q(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.aM,x)
else if(u&&typeof x=="function"){q=t?H.P:H.z
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.Q(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ad:function(a,b,c,d){var z=H.z
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
Q:function(a,b,c){var z,y,x,w,v,u
if(c)return H.af(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ad(y,!w,z,b)
if(y===0){w=$.j
if(w==null){w=H.q("self")
$.j=w}w="return function(){return this."+H.a(w)+"."+H.a(z)+"();"
v=$.f
$.f=J.l(v,1)
return new Function(w+H.a(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.j
if(v==null){v=H.q("self")
$.j=v}v=w+H.a(v)+"."+H.a(z)+"("+u+");"
w=$.f
$.f=J.l(w,1)
return new Function(v+H.a(w)+"}")()},
ae:function(a,b,c,d){var z,y
z=H.z
y=H.P
switch(b?-1:a){case 0:throw H.c(new H.aA("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
af:function(a,b){var z,y,x,w,v,u,t,s
z=H.ac()
y=$.O
if(y==null){y=H.q("receiver")
$.O=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ae(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.f
$.f=J.l(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.f
$.f=J.l(u,1)
return new Function(y+H.a(u)+"}")()},
H:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.i(c).$isD){c.fixed$length=Array
z=c}else z=c
return H.ag(a,b,z,!!d,e,f)},
b3:function(a){throw H.c(new P.ai("Cyclic initialization for static "+H.a(a)))},
aL:function(a){if(a==null)return
return a.$builtinTypeInfo},
b1:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.a2(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.h(a)
else return},
a2:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.V("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.b1(u,c))}return w?"":"<"+H.a(z)+">"},
bi:function(a){var z=$.J
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
bh:function(a){return H.aw(a)},
bg:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
b_:function(a){var z,y,x,w,v,u
z=$.J.$1(a)
y=$.v[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.w[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.Y.$2(a,z)
if(z!=null){y=$.v[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.w[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.M(x)
$.v[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.w[z]=x
return x}if(v==="-"){u=H.M(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.a4(a,x)
if(v==="*")throw H.c(new P.X(z))
if(init.leafTags[z]===true){u=H.M(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.a4(a,x)},
a4:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.x(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
M:function(a){return J.x(a,!1,null,!!a.$isas)},
b0:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.x(z,!1,null,!!z.$isas)
else return J.x(z,c,null,null)},
aR:function(){if(!0===$.L)return
$.L=!0
H.aS()},
aS:function(){var z,y,x,w,v,u,t,s
$.v=Object.create(null)
$.w=Object.create(null)
H.aN()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.a5.$1(v)
if(u!=null){t=H.b0(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
aN:function(){var z,y,x,w,v,u,t
z=C.j()
z=H.h(C.f,H.h(C.l,H.h(C.c,H.h(C.c,H.h(C.k,H.h(C.h,H.h(C.i(C.b),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.J=new H.aO(v)
$.Y=new H.aP(u)
$.a5=new H.aQ(t)},
h:function(a,b){return a(b)||b},
ay:{"^":"b;a,b,c,d,e,f,r,x",i:{
az:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ay(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
aU:{"^":"e;a",
$0:function(){return this.a.$0()}},
aV:{"^":"e;a,b",
$0:function(){return this.a.$1(this.b)}},
aW:{"^":"e;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
aX:{"^":"e;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
aY:{"^":"e;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"b;",
h:function(a){return"Closure '"+H.U(this)+"'"},
gq:function(){return this},
gq:function(){return this}},
W:{"^":"e;"},
aB:{"^":"W;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
N:{"^":"W;a,b,c,d",
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.u(z)},
i:{
z:function(a){return a.a},
P:function(a){return a.c},
ac:function(){var z=$.j
if(z==null){z=H.q("self")
$.j=z}return z},
q:function(a){var z,y,x,w,v
z=new H.N("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
aA:{"^":"k;a",
h:function(a){return"RuntimeError: "+this.a}},
aO:{"^":"e;a",
$1:function(a){return this.a(a)}},
aP:{"^":"e;a",
$2:function(a,b){return this.a(a,b)}},
aQ:{"^":"e;a",
$1:function(a){return this.a(a)}}}],["","",,P,{"^":"",
ao:function(a,b,c){var z,y,x
if(P.aF(a))return b+"..."+c
z=new P.V(b)
y=$.$get$G()
y.push(a)
try{x=z
x.a=P.aD(x.gk(),a,", ")}finally{if(0>=y.length)return H.aZ(y,-1)
y.pop()}y=z
y.a=y.gk()+c
y=z.gk()
return y.charCodeAt(0)==0?y:y},
aF:function(a){var z,y
for(z=0;y=$.$get$G(),z<y.length;++z)if(a===y[z])return!0
return!1}}],["","",,P,{"^":"",
S:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.p(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ak(a)},
ak:function(a){var z=J.i(a)
if(!!z.$ise)return z.h(a)
return H.u(a)},
aG:{"^":"b;",
h:function(a){return this?"true":"false"}},
"+bool":0,
b4:{"^":"o;"},
"+double":0,
k:{"^":"b;"},
au:{"^":"k;",
h:function(a){return"Throw of null."}},
m:{"^":"k;a,b,c,d",
gm:function(){return"Invalid argument"},
gl:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gm()+y+x
v=this.gl()
u=P.S(this.b)
return w+v+": "+H.a(u)},
i:{
aa:function(a,b,c){return new P.m(!0,a,b,c)}}},
ax:{"^":"m;e,f,a,b,c,d",
gm:function(){return"RangeError"},
gl:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.E()
if(typeof z!=="number")return H.K(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
i:{
E:function(a,b,c){return new P.ax(null,null,!0,a,b,"Value not in range")}}},
am:{"^":"m;e,j:f>,a,b,c,d",
gm:function(){return"RangeError"},
gl:function(){var z=this.b
if(typeof z!=="number")return z.F()
if(z<0)return": index must not be negative"
z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
i:{
an:function(a,b,c,d,e){var z=e!=null?e:J.y(b)
return new P.am(b,z,!0,a,c,"Index out of range")}}},
X:{"^":"k;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
ah:{"^":"k;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.S(z))+"."}},
ai:{"^":"k;a",
h:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
aE:{"^":"b;a",
h:function(a){return"Exception: "+this.a}},
a7:{"^":"o;"},
"+int":0,
D:{"^":"b;"},
"+List":0,
bd:{"^":"b;",
h:function(a){return"null"}},
"+Null":0,
o:{"^":"b;"},
"+num":0,
b:{"^":";",
h:function(a){return H.u(this)},
toString:function(){return this.h(this)}},
aC:{"^":"b;"},
"+String":0,
V:{"^":"b;k:a<",
gj:function(a){return this.a.length},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
i:{
aD:function(a,b,c){var z=new J.ab(b,b.length,0,null)
if(!z.n())return a
if(c.length===0){do a+=H.a(z.d)
while(z.n())}else{a+=H.a(z.d)
for(;z.n();)a=a+c+H.a(z.d)}return a}}}}],["","",,W,{"^":"",n:{"^":"aj;","%":"HTMLAppletElement|HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement|PluginPlaceholderElement;HTMLElement"},b5:{"^":"n;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},b6:{"^":"n;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},b7:{"^":"n;",
u:function(a,b,c){return a.getContext(b)},
t:function(a,b){return this.u(a,b,null)},
"%":"HTMLCanvasElement"},b8:{"^":"d;D:fillStyle}","%":"CanvasRenderingContext2D"},b9:{"^":"d;",
h:function(a){return String(a)},
"%":"DOMException"},aj:{"^":"at;",
h:function(a){return a.localName},
"%":"SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphElement|SVGAltGlyphItemElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGDiscardElement|SVGElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGGraphicsElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRadialGradientElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement;Element"},al:{"^":"d;","%":"DOMWindow|Window;EventTarget"},ba:{"^":"n;j:length=","%":"HTMLFormElement"},at:{"^":"al;",
h:function(a){var z=a.nodeValue
return z==null?this.B(a):z},
"%":"Document|HTMLDocument;Node"},be:{"^":"n;j:length=","%":"HTMLSelectElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,K,{"^":"",
a3:function(){K.aI()},
aI:function(){var z,y,x,w,v,u
z=J.a8(document.querySelector("#surface"),"2d")
J.a9(z,"#000000")
z.clearRect(0,0,999,999)
for(y=0,x=0;x<256;++x)for(w=256+x,v=0;v<256;++v){y=C.a.v((x^v)>>>0,256)
z.fillStyle="rgb(0, 0, "+y+")"
z.fillRect(x,v,1,1)
z.fillStyle="rgb("+y+", 0, 0)"
z.fillRect(w,v,1,1)
z.fillStyle="rgb(0, "+y+", 0)"
u=256+v
z.fillRect(x,u,1,1)
z.fillStyle="rgb("+y+", "+y+", 0)"
z.fillRect(w,u,1,1)}}},1]]
setupProgram(dart,0)
J.i=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.T.prototype
return J.aq.prototype}if(typeof a=="string")return J.r.prototype
if(a==null)return J.ar.prototype
if(typeof a=="boolean")return J.ap.prototype
if(a.constructor==Array)return J.A.prototype
if(typeof a!="object"){if(typeof a=="function")return J.t.prototype
return a}if(a instanceof P.b)return a
return J.I(a)}
J.aJ=function(a){if(typeof a=="string")return J.r.prototype
if(a==null)return a
if(a.constructor==Array)return J.A.prototype
if(typeof a!="object"){if(typeof a=="function")return J.t.prototype
return a}if(a instanceof P.b)return a
return J.I(a)}
J.aK=function(a){if(typeof a=="number")return J.B.prototype
if(typeof a=="string")return J.r.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.F.prototype
return a}
J.a1=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.t.prototype
return a}if(a instanceof P.b)return a
return J.I(a)}
J.l=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aK(a).p(a,b)}
J.y=function(a){return J.aJ(a).gj(a)}
J.a8=function(a,b){return J.a1(a).t(a,b)}
J.a9=function(a,b){return J.a1(a).sD(a,b)}
J.p=function(a){return J.i(a).h(a)}
var $=I.p
C.d=J.d.prototype
C.a=J.T.prototype
C.e=J.r.prototype
C.m=J.t.prototype
C.n=J.av.prototype
C.o=J.F.prototype
C.f=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.h=function(hooks) {
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
C.b=function getTagFallback(o) {
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
C.c=function(hooks) { return hooks; }

C.i=function(getTagFallback) {
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
C.k=function(hooks) {
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
C.j=function() {
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
C.l=function(hooks) {
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
$.f=0
$.j=null
$.O=null
$.J=null
$.Y=null
$.a5=null
$.v=null
$.w=null
$.L=null
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
I.$lazy(y,x,w)}})(["R","$get$R",function(){return init.getIsolateTag("_$dart_dartClosure")},"G","$get$G",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.b3(d||a)
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
Isolate.a0=a.a0
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
if(typeof dartMainRunner==="function")dartMainRunner(K.a3,[])
else K.a3([])})})()