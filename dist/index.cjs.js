"use strict";const e={1:{nameCn:"星期天",nameEn:"Sunday"},2:{nameCn:"星期一",nameEn:"Monday"},3:{nameCn:"星期二",nameEn:"Tuesday"},4:{nameCn:"星期三",nameEn:"Wednesday"},5:{nameCn:"星期四",nameEn:"Thursday"},6:{nameCn:"星期五",nameEn:"Friday"},7:{nameCn:"星期六",nameEn:"Saturday"}},n=/^([19|20]\d{2})#(\d+)$/,t=/^([1-7])#(\d+)$/,r=/^(1[0-2]|[1-9])#(\d+)$/,s=/^(3[01]|[12][0-9]|[1-9])#(\d+)$/,a=/^([0-23])#(\d+)$/,c=/^([0-59])#(\d+)$/,u=/^([0-59])#(\d+)$/,$={"秒":{range:60,unit:"秒"},"分":{range:60,unit:"分钟"},"时":{range:24,unit:"小时"}};function i(e,n,t){switch(!0){case/^\*$/.test(e):return n;case/^\?$/.test(e):return"";case/^\d+#\d+$/.test(e):if(t){const r=e.match(t);if(r)return function(e,n,t){switch(t){case"秒":case"分":case"时":case"天":case"月":case"年":return`第${n}个${e}${t}`;case"周":return`第${n}个${l(e)}`;default:return""}}(r[1],r[2],n);throw new Error(`${n}${e}格式不正确`)}const r=e.split("#"),[s,a]=r;return`第${a}${n}的${s}${n}`;case/^(\d+,)+\d+$/.test(e):return function(e,n){function t(e){if(2===e.split(",").length)return`第${e.replace(/,/g,"和第")}${n}`;{const t=e.lastIndexOf(","),r=e.substring(t+1);return`第${e.substring(0,t).replace(/,/g,"、第")}和第${r}${n}`}}switch(n){case"秒":case"时":case"天":case"月":case"周":case"年":return t(e);case"分":return`${t(e)}钟`;default:return""}}(e,n);case/^[0-9]+-[0-9]+$/.test(e):return function(e,n){const t=e.split("-"),[r,s]=t;switch(n){case"秒":case"分":case"时":case"天":case"月":case"年":return`${r}${n}到${s}${n}`;case"周":return`${n}${l(r)}到${l(s)}`;default:return""}}(e,n);case/^[*0-9]+\/[0-9]+$/.test(e):if(["时","分","秒"].includes(n))return function(e,n){const t=e.split("/"),[r,s]=t,a=$[n].range+parseInt(r)-parseInt(s);return`从${r}${n}开始到${a}${$[n].unit}范围内每隔${s}${$[n].unit},`}(e,n);{const t=e.split("/"),[r,s]=t;return["0","*"].includes(r)?`每隔${s}${n}`:`从第${r}${n}开始，每隔${s}${n}`}case/^\d*[Ll]$/.test(e):{const t=e.split("L"),[r]=t;return l(t[0])?`最后一${n}的${l(r)}`:`最后一${n}`}case/^\d+$/.test(e):return function(e,n){switch(n){case"秒":return`${e}秒`;case"分":return`${e}分`;case"时":case"天":case"月":return`${e}时`;case"周":return`周${l(e)}`;case"年":return`${e}年`;default:return""}}(e,n);default:return""}}function l(n,t=!0){const r=Object.entries(e);for(let e=0;e<r.length;e++){const[s,a]=r[e];if(s===n)return t?a.nameCn:a.nameEn}}function o(e,n){return 0===e.length&&1===n.length||1===e.length&&1===n.length?n:e.length>1&&1===n.length?e:1===e.length&&n.length>1?n:e+n}module.exports=function(e){return function(e,$){if(null===e||e.trim().length<1)throw new Error("cron表达式为空");let l=e.trim().split(" "),d="";if(6===l.length||7===l.length){if(7===l.length){d=i(l[6],$[6],n)}if(l.every((e=>"*"===e)))return"每秒";d=o(d,i(l[4],$[4],r));d=o(d,i(l[5],$[5],t));d=o(d,i(l[3],$[3],s));d+=i(l[2],$[2],a);d+=i(l[1],$[1],c);return d+=i(l[0],$[0],u),d.length?d.startsWith("最后一")||d.startsWith("第")||d.includes("年")?d:`每${d}`:""}throw new Error("crontab格式不正确")}(e,["秒","分","时","天","月","周","年"])};
