(this["webpackJsonpatom-mail-2019-nikita"]=this["webpackJsonpatom-mail-2019-nikita"]||[]).push([[0],{2:function(e,t,a){e.exports={mainBox:"CityProfile_mainBox__1ZNQp",appearence:"CityProfile_appearence__3qEhT",backButton:"CityProfile_backButton__jFxK7",headerWrap:"CityProfile_headerWrap__1audk",header:"CityProfile_header__Hfhye",tempWrap:"CityProfile_tempWrap__2ZtJv",temperature:"CityProfile_temperature__3HU86",futureWrap:"CityProfile_futureWrap__3RCJq",text:"CityProfile_text__25DQm",weatherBox:"CityProfile_weatherBox__2uVbc",leftWrap:"CityProfile_leftWrap__2r23R",icon:"CityProfile_icon__3Dh4u"}},22:function(e,t,a){e.exports={mainList:"App_mainList__SGZfi",mainBox:"App_mainBox__1Leif"}},27:function(e,t,a){e.exports={addButton:"AddCity_addButton__1qoEJ"}},33:function(e,t,a){e.exports=a(45)},38:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(15),i=a.n(r),o=(a(38),a(17)),l=a(11),s=a(9),m=a.n(s);var u=Object(l.b)((function(e){return{geopos:e.cities.geopos}}))((function(e){var t=e.data,a=e.isGeopos,n=(t.wind||"").deg;return c.a.createElement("div",{className:m.a.main},c.a.createElement("div",{className:m.a.header},c.a.createElement("div",{className:m.a.upperLeft},c.a.createElement("div",{className:m.a.nameAndGeoWrap},c.a.createElement("div",null,t.name||""),a?c.a.createElement("img",{src:"https://image.flaticon.com/icons/png/512/117/117967.png",alt:"geopos",className:m.a.geoIcon}):null),c.a.createElement("div",null,t.country||"")),c.a.createElement("div",{className:m.a.upperRight},c.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(t.weather[0].icon,"@2x.png"),alt:"icon",className:m.a.weatherImg}),c.a.createElement("div",null,"".concat(function(e){if(Object.is(e,void 0))return"";return Math.round(e-273)}(t.main.temp),"\u2103")))),c.a.createElement("div",{className:m.a.bottom},c.a.createElement("div",null,"Humidity ".concat(t.main.humidity||"","% | ").concat(function(e){if(Object.is(e,void 0))return"";var t;e>250&&e<360||e>0&&e<=45?t="North":e>45&&e<=135?t="West":e>135&&e<=180?t="South":e>180&&e<=270&&(t="East");return t}(n)," | ").concat(t.wind.speed||"","m/s"))))})),p=a(27),d=a.n(p),f="https://api.openweathermap.org",h="9fd7b573ebcf73babceccf4fedcd17d4",_=function(e,t){return{type:"@@GET_CITY_SUCCESS",payload:e,geopos:t}},E=function(){return{type:"@@GET_CITY_REQUEST"}},g=function(e){return{type:"@@GET_CITY_FAILURE",payload:{error:e}}};function v(e,t){return function(a){"name"===t?(a(E()),fetch("".concat(f,"/data/2.5/weather?q=").concat(e,"&appid=").concat(h)).then((function(e){if(200!==e.status)throw new Error("Not 200 response");return e.json()})).then((function(e){a(_(e))})).catch((function(e){a(g(e))}))):"ID"===t&&(a(E()),fetch("".concat(f,"/data/2.5/weather?id=").concat(e,"&appid=").concat(h)).then((function(e){return e.json()})).then((function(e){a(_(e))})).catch((function(e){a(g(e))})))}}function b(){var e=prompt("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u0447\u0430\u0442\u0430: ");if(Object.is(e,null)||Object.is(e,""))return 1;this(e,"name")}var y=Object(l.b)((function(e){return{data:e.cities.cities}}),{getCity:v})((function(e){var t=e.getCity;return c.a.createElement("div",null,c.a.createElement("img",{src:"https://image.flaticon.com/icons/png/512/1828/1828817.png",alt:"add button",className:d.a.addButton,onClick:b.bind(t)}))})),w=a(28),C=a.n(w),N=a(13),k=a(2),x=a.n(k);function j(e){var t=e.data,a=c.a.useState(null),n=Object(o.a)(a,2),r=n[0],i=n[1];return c.a.useEffect((function(){!function(e,t){C.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:fetch("".concat(f,"/data/2.5/forecast?q=").concat(t,"&appid=").concat(h)).then((function(e){return e.json()})).then((function(t){e(t)}));case 1:case"end":return a.stop()}}))}(i,t.name)}),[]),null!==r?c.a.createElement("div",{className:x.a.mainBox},c.a.createElement(N.b,{to:"/",style:{textDecoration:"none"}},c.a.createElement("img",{src:"https://cdn4.iconfinder.com/data/icons/controls-add-on-flat/48/Contols_-_Add_On-29-512.png",alt:"backButton",className:x.a.backButton})),c.a.createElement("div",{className:x.a.headerWrap},c.a.createElement("div",{className:x.a.header},t.name||""),c.a.createElement("div",{className:x.a.tempWrap},c.a.createElement("div",{className:x.a.temperature},"".concat(W(t.main.temp),"\u2103")))),c.a.createElement("div",{className:x.a.futureWrap},c.a.createElement("div",{className:x.a.weatherBox},c.a.createElement("div",{className:x.a.leftWrap},c.a.createElement("div",{className:x.a.text},"Today: ".concat(r.list[0].weather[0].main||"")),c.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(r.list[0].weather[0].icon,"@2x.png"),alt:"icon",className:x.a.icon})),c.a.createElement("div",null,"".concat(W(r.list[0].main.temp),"\u2103 / ").concat(W(r.list[3].main.temp)," \u2103"))),c.a.createElement("div",{className:x.a.weatherBox},c.a.createElement("div",{className:x.a.leftWrap},c.a.createElement("div",null,"Tomorroy: ".concat(r.list[0].weather[0].main||"")),c.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(r.list[8].weather[0].icon,"@2x.png"),alt:"icon",className:x.a.icon})),c.a.createElement("div",null,"".concat(W(r.list[8].main.temp),"\u2103 / ").concat(W(r.list[11].main.temp)," \u2103"))),c.a.createElement("div",{className:x.a.weatherBox},c.a.createElement("div",{className:x.a.leftWrap},c.a.createElement("div",null,"".concat(function(e){if(Object.is(e,void 0))return"";var t,a=new Date(e),n=a.getMonth();0===n||9===n?t=1:4===n?t=2:7===n?t=3:1===n||2===n||10===n?t=4:5===n?t=5:11===n||9===n?t=6:3!==n&&6!==n||(t=0);var c,r,i=a.getFullYear(),o=String(i),l=(6+Number(o[2]+o[3])+Number(o[2]+o[3])/4)%7;switch(a.getDay()){case 0:c=2;break;case 1:c=3;break;case 2:c=4;break;case 3:c=5;break;case 4:c=6;break;case 5:c=0;break;case 6:c=1;break;default:c=0}switch((c+t+l)%7){case 0:r="Sa";break;case 1:r="Su";break;case 2:r="Mo";break;case 3:r="Tu";break;case 4:r="We";break;case 5:r="Th";break;case 6:r="Fr";break;default:r="Sa"}return r}(r.list[16].dt_txt),": ").concat(r.list[0].weather[0].main||"")),c.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(r.list[16].weather[0].icon,"@2x.png"),alt:"icon",className:x.a.icon})),c.a.createElement("div",null,"".concat(W(r.list[16].main.temp),"\u2103 / ").concat(W(r.list[19].main.temp)," \u2103"))))):null}function W(e){return Object.is(e,void 0)?"":Math.round(e-273)}var O=a(22),B=a.n(O),T=a(12);var S=Object(l.b)((function(e){return{data:e.cities.cities}}),{getCity:v})((function(e){var t=e.getCity,a=e.data,r=["1510853","475936","1784734"],i=Object(n.useState)(null),l=Object(o.a)(i,2),s=l[0],m=l[1];return c.a.useEffect((function(){navigator.geolocation.getCurrentPosition((function(e){var t={lat:e.coords.latitude,lon:e.coords.longitude};return fetch("".concat(f,"/data/2.5/weather?lat=").concat(t.lat,"&lon=").concat(t.lon,"&appid=").concat(h)).then((function(e){return e.json()})).then((function(e){m(e)})).catch((function(e){console.log(e)})),0}),(function(e){console.log(e.message)}),{enableHighAccuracy:!0,maximumAge:3e4,timeout:27e3}),r.map((function(e){return t(e,"ID"),0}))}),[]),c.a.createElement(N.a,null,c.a.createElement(T.c,null,s?c.a.createElement(T.a,{path:"/".concat(s.name),key:s.key},c.a.createElement(j,{data:s})):null,a.map((function(e){return c.a.createElement(T.a,{path:"/".concat(e.name),key:e.key},c.a.createElement(j,{data:e}))})),c.a.createElement(T.a,{path:"/"},c.a.createElement("div",{className:B.a.mainBox},c.a.createElement("ul",{className:B.a.mainList},s?c.a.createElement("li",{key:s.id},c.a.createElement(N.b,{to:"/".concat(s.name),style:{textDecoration:"none"}},c.a.createElement(u,{data:s,isGeopos:!0}))):null,a.map((function(e){return c.a.createElement("li",{key:e.id},c.a.createElement(N.b,{to:"/".concat(e.name),style:{textDecoration:"none"}},c.a.createElement(u,{data:e})))}))),c.a.createElement(y,null)))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=a(10),A=a(30),P=a(31),G=a(32),D=a(23),L={cities:[],error:null,loading:!1},R=Object(I.combineReducers)({cities:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@@GET_CITY_REQUEST":return Object(D.a)({},e,{loading:!0});case"@@GET_CITY_SUCCESS":var a=Object(G.a)(e.cities),n=!1,c=0;if(a.length>0){for(;!n&&c<a.length;)a[c].id===t.payload.id&&(n=!0,alert("\u042d\u0442\u043e\u0442 \u0433\u043e\u0440\u043e\u0434 \u0443\u0436\u0435 \u0435\u0441\u0442\u044c \u0432 \u0441\u043f\u0438\u0441\u043a\u0435")),c++;n||a.push(t.payload)}else a.push(t.payload);return{loading:!1,cities:a,error:null};case"@@GET_CITY_FAILURE":return Object(D.a)({},e,{loading:!1,error:t.payload.error});default:return e}}}),Y=Object(I.createStore)(R,Object(A.composeWithDevTools)({})(Object(I.applyMiddleware)(P.a)));i.a.render(c.a.createElement(l.a,{store:Y},c.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,a){e.exports={main:"City_main__2uwxY",appearence:"City_appearence__1pv2s",header:"City_header__27FMm",bottom:"City_bottom__2tdAJ",upperLeft:"City_upperLeft__D0L0N",nameAndGeoWrap:"City_nameAndGeoWrap__A5Abi",geoIcon:"City_geoIcon__1N60d",upperRight:"City_upperRight__1eSb7",weatherImg:"City_weatherImg__2ZeFO"}}},[[33,1,2]]]);
//# sourceMappingURL=main.55c5ba61.chunk.js.map