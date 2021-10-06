/*
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注册地址：https://www.wuhuoculture.com/#/register
不含邀请链接
需要实名认证后绑定支付宝
xfPhone:手机号#密码
export xfPhone='手机号#密码'
*/

// [task_local]
//#溆锋
// 9 10 * * * https://raw.githubusercontent.com/ugg999999/other/main/xfapp.js, tag=溆锋APP, enabled=true


const $ = new Env('溆锋APP签到');
let status;
status = (status = ($.getval("xfstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let xfPhoneArr = []
let xfPhone = $.isNode() ? (process.env.xfPhone ? process.env.xfPhone : "") : ($.getdata('xfPhone') ? $.getdata('xfPhone') : "")
let xfPhones = ""
//
!(async() => {
  if (typeof $request !== "undefined") {
    // xfck()
  } else {
    if (!$.isNode()) {
      xfPhoneArr.push($.getdata('xfPhone'))
      let xfcount = ($.getval('xfcount') || '1');
      for (let i = 2; i <= xfcount; i++) {
        xfPhoneArr.push($.getdata(`xfPhone${i}`))
      }
      console.log(`-------------共${xfPhoneArr.length}个账号-------------\n`)
      for (let i = 0; i < xfPhoneArr.length; i++) {
        if (xfPhoneArr[i]) {
          xfPhone = xfPhoneArr[i];
          $.index = i + 1;
          console.log(`\n开始【溆锋账户 ${$.index}】`) 
          zhanghu=xfPhone.split('#')
          user=zhanghu[0]
          mima=zhanghu[1]
          await login();//登录获取token
          await $.wait(3000);
          await dati();//答题
        }
      }
    } else {
      if (process.env.xfPhone && process.env.xfPhone.indexOf('@') > -1) {
        xfPhoneArr = process.env.xfPhone.split('@');
        console.log(`您选择的是用"@"隔开\n`)
      } else {
        xfPhones = [process.env.xfPhone]
      };
      Object.keys(xfPhones).forEach((item) => {
        if (xfPhones[item]) {
          xfPhoneArr.push(xfPhones[item])
        }
      })
      console.log(`共${xfPhoneArr.length}个账号`)
      for (let k = 0; k < xfPhoneArr.length; k++) {
        $.message = ""
        xfPhone = xfPhoneArr[k]
        $.index = k + 1;
        console.log(`\n开始【溆锋账户 ${$.index}】`)
        zhanghu=xfPhone.split('#')
        user=zhanghu[0]
        mima=zhanghu[1]
        await login();//登录获取token
        await $.wait(3000);
        await dati();//答题
      }
    }
  }
})()
  .catch ((e) => $.logErr(e))
  .finally(() => $.done())

//登录
function login(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `https://www.wuhuoculture.com/api/index/login`,
      headers: {
        'Host': 'www.wuhuoculture.com',
        'Content-Type': 'pplication/json;charset=utf-8',
        'Origin': 'https://www.wuhuoculture.com',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer' : 'https://www.wuhuoculture.com/'
    },
      body: `{"username":"${user}","password":"${mima}","token":null}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.code == 1) {
           token = result.data.token
           $.log(`\ntoken获取成功开始执行签到`)
           await $.wait(3000);
           await sign();//签到
         } else {
           $.log(`\n请填写正确的手机号和密码`)
         }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}


//签到
function sign(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `https://www.wuhuoculture.com/api/user/sign`,
      headers: {
        'Host': 'www.wuhuoculture.com',
        'Content-Type': 'pplication/json;charset=utf-8',
        'Origin': 'https://www.wuhuoculture.com',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://www.wuhuoculture.com/'
      },
      body: `{"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.code == 1) {
          if (result.info == '请实名认证后再签到！') {
            $.log(`\n错误信息：` + result.info)
          }
          $.log(`\n签到成功获得现金` + result.data.reward)
        } else {
          $.log(`\n每天只能签到一次`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//答题开始
function dati(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `https://www.wuhuoculture.com/api/index/getask`,
      headers: {
        'Host': 'www.wuhuoculture.com',
        'Content-Type': 'pplication/json;charset=utf-8',
        'Origin': 'https://www.wuhuoculture.com',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://www.wuhuoculture.com/'
      },
      body: `{"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.code == 1) {
          tmid = result.data.id
          $.log(`\n题目iD` + result.data.id)
          $.log(`\n题目内容` + result.data.title)
          $.log(`\n选择题` + result.data.values[0].value)
          $.log(`\n选择题` + result.data.values[1].value)
          $.log(`\n选择题` + result.data.values[2].value)
          $.log(`\n选择题` + result.data.values[3].value)
          await $.wait(10000);
          await godati(tmid);//开始答题
        } else {
          $.log(`\n返回错误信息` + result.info)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//答题5次
async function datiAll(Array) {
  for (const i of Array) {
    await godati(i);
  }
}
//答题
function godati(id) {
  return new Promise((resolve) => {
    key = 1
    if (id == 2 |id == 14|id == 23 |id == 51 |id == 41 | id == 40 | id == 94 | id == 25 | id == 66 | id == 10 | id == 65 | id == 74 | id == 21| id == 8| id == 54| id == 88| id == 83| id == 85) {
      key = 1
    }
    if (id == 62 |id == 43 |id == 15 |id == 46 |id == 35| id == 42 | id == 6 | id == 17| id == 27| id == 29 | id == 76 | id == 68 | id == 31 | id == 36 | id == 89 | id == 90| id == 55 | id == 91 | id == 87| id == 95| id == 96| id == 34| id == 13) {
      key = 2
    }
    if (id == 3 |id == 4 |id == 44 |id == 45|id == 93 |id == 12 |id == 73 |id == 48 |id == 30 |id == 33 |id == 61 | id == 81 | id == 58 | id == 77 | id == 79 | id == 80 | id == 16 | id == 19| id == 64| id == 5| id == 24| id == 92| id == 100) {
      key = 3
    }
    if (id == 57 |id == 52 |id == 26 |id == 56 |id == 32 |id == 37 | id == 70 | id == 71| id == 72| id == 82 | id == 84 | id == 86 | id == 22 | id == 38 | id == 86 | id == 98 | id == 101| id == 20| id == 69| id == 78| id == 11| id ==67| id ==97) {
      key = 4
    }
    let url = {
      url: `https://www.wuhuoculture.com/api/index/getask`,
      headers: {
        'Host': 'www.wuhuoculture.com',
        'Content-Type': 'pplication/json;charset=utf-8',
        'Origin': 'https://www.wuhuoculture.com',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://www.wuhuoculture.com/'
      },
      body: `{"id":${id},"key":${key},"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.code == 1) {
          tmid = result.data.id
          $.log(`\n答题状态` + result.info + `\n开始下一题`)
          $.log(`\n题目iD` + result.data.id)
          $.log(`\n题目内容` + result.data.title)
          $.log(`\n选择题` + result.data.values[0].value)
          $.log(`\n选择题` + result.data.values[1].value)
          $.log(`\n选择题` + result.data.values[2].value)
          $.log(`\n选择题` + result.data.values[3].value)
          await $.wait(10000);
          await godati(tmid);//开始答题
        } else {
          $.log(`\n返回错误信息` + result.info)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, 0)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
