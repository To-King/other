/*
软件名：趣红包短视频     收益未知  定时自己设置  执行一次脚本大概需要3分钟
邀请码：EEBCO46Q
【REWRITE】
匹配链接（正则表达式） http://api2.guaniuvideo.com/reward/video
对应重写目标   https://raw.fastgit.org/byxiaopeng/myscripts/main/qhbdsp.js

/////////////////////////////////////////////////////////////////////////////
*/

const $ = new Env('趣红包短视频');
let status;
status = (status = ($.getval("qhbdspstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const qhbdsphdArr = [],
    qhbdspbodyArr = [],
    qhbdspcount = ''

let qhbdsphd = $.getdata('qhbdsphd');
let qhbdspbody = $.getdata('qhbdspbody');
let times = new Date().getTime();
let DD = RT(60000, 100000);
let tz = ($.getval('tz') || '1');
let dz = [80157, 109931, 114503]
let rwmid = [87, 11, 70, 88, 89]
//{"extra":"{\"mid\":\"118\",\"code_id\":\"xx\",\"position_id\":\"xx\"}"}  看视频5分钟奖励
//{"extra":"{\"mid\":\"117\",\"code_id\":\"xx\",\"position_id\":\"xx\"}"}  看视频3分钟奖励
//{"extra":"{\"mid\":\"116\",\"code_id\":\"xx\",\"position_id\":\"xx\"}"}  看视频1分钟奖励
$.message = ''
!(async () => {
    if (typeof $request !== "undefined") {
        qhbdspck()

    } else {
        qhbdsphdArr.push($.getdata('qhbdsphd'))
        qhbdspbodyArr.push($.getdata('qhbdspbody'))
        let qhbdspcount = ($.getval('qhbdspcount') || '1');
        for (let i = 2; i <= qhbdspcount; i++) {
            qhbdsphdArr.push($.getdata(`qhbdsphd${i}`))
            qhbdspbodyArr.push($.getdata(`qhbdspbody${i}`))
        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`
        );
        console.log(`=================== 共${qhbdsphdArr.length}个账号 ==================\n`)
        for (let i = 0; i < qhbdsphdArr.length; i++) {
            if (qhbdsphdArr[i]) {
                qhbdsphd = qhbdsphdArr[i];
                qhbdspbody = qhbdspbodyArr[i];
                $.index = i + 1;
                console.log(`\n【 趣红包短视频 账号${$.index} 】`)
                await getUserInfo()
                await $.wait(1000)
                await getAll()
                //await $.wait(3000)
                //await dzspAll(dz)  //点赞视频
                //await $.wait(3000)
                //await fbpl(dz)  //评论视频
                //await $.wait(3000)
                //await fxsp(dz)  //分享视频
                //await $.wait(3000)
                //await getRewardAll(rwmid)  //任务奖励
                //await dzlq()   //获取ad参数
                //await $.wait(3000)
                //await pllq()  //获取ad参数
                //await $.wait(3000)
                //await bxlq() //获取ad参数
                //await $.wait(3000)
                //await fxlq() //获取ad参数
                //await $.wait(3000)
                //await dzwc()   //双倍领取
                //await $.wait(3000)
                //await plwc()  //双倍领取
                //await $.wait(3000)
                //await bxwc() //双倍领取
                //await $.wait(3000)
                //await fxwc() //双倍领取
                //await $.wait(3000)
                //await qxdzAll(dz)  //取消点赞
                
                for (let x = 0; x < 5; x++) {
                    $.index = x + 1
                    console.log(`\n第${x + 1}次看视频！`)
                    await qhbdspksp()
                    await $.wait(32000)
                }

            }
        }
    }
    message()
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


function qhbdspck() {
    if ($request.url.indexOf("reward/video") > -1 && $request.body.indexOf("check_token") > -1) {

        const qhbdsphd = JSON.stringify($request.headers)
        if (qhbdsphd) $.setdata(qhbdsphd, `qhbdsphd${status}`)
        $.log(qhbdsphd)

        const qhbdspbody = $request.body
        if (qhbdspbody) $.setdata(qhbdspbody, `qhbdspbody${status}`)
        $.log(qhbdspbody)

        $.msg($.name, "", `趣红包短视频${status}headers获取成功`)

    }
}

function getUserInfo(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/user/getUserInfo`,
            headers: JSON.parse(qhbdsphd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    user_id=data.data["id"]
                    console.log(`\n你的账户ID是：` + data.data["id"] + `\n你的邀请码是：` + data.data["recommend_id"])
                    $.message += `\n你的账户ID是：` + data.data["id"] + `\n你的邀请码是：` + data.data["recommend_id"]
                } else {
                    console.log(data.message)
                    $.message += `\n个人资料获取失败` + data.message
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


function getAll(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/mission/getAll`,
            headers: JSON.parse(qhbdsphd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    renwu=data.data.daily[0].title
                    mid=data.data.daily[0]['mission_id']
                    console.log(`\n任务名称：` + data.data.daily[0].title + `---任务mid：` + data.data.daily[0]['mission_id'])
                    console.log(`\n任务名称：` + data.data.daily[1].title + `---任务mid：` + data.data.daily[1]['mission_id'])
                    console.log(`\n任务名称：` + data.data.daily[2].title + `---任务mid：` + data.data.daily[2]['mission_id'])
                    console.log(`\n任务名称：` + data.data.daily[3].title + `---任务mid：` + data.data.daily[3]['mission_id'])
                    console.log(`\n任务名称：` + data.data.daily[4].title + `---任务mid：` + data.data.daily[4]['mission_id'])
                    $.message += `\n任务名称：` + data.data.daily[0].title + `---任务mid：` + data.data.daily[0]['mission_id']
                    $.message += `\n任务名称：` + data.data.daily[1].title + `---任务mid：` + data.data.daily[1]['mission_id']
                    $.message += `\n任务名称：` + data.data.daily[2].title + `---任务mid：` + data.data.daily[2]['mission_id']
                    $.message += `\n任务名称：` + data.data.daily[3].title + `---任务mid：` + data.data.daily[3]['mission_id']
                    $.message += `\n任务名称：` + data.data.daily[4].title + `---任务mid：` + data.data.daily[4]['mission_id']
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//点赞视频 3次
async function dzspAll(Array) {
    for (const i of Array) {
      await dzsp(i);
      await $.wait(3000)
    }
  }

function dzsp(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/like`,
            headers: JSON.parse(qhbdsphd),
            body:`{"like":1,"video_id":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【点赞成功ID】+`+ num)
                    $.message += `\n【点赞成功视频ID】`+ num
                } else {
                    console.log(`\n【点赞失败】`)
                    $.message += `\n【点赞失败】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}

//点赞视频 3次
async function qxdzAll(Array) {
    for (const i of Array) {
      await qxdz(i);
      await $.wait(3000)
    }
  }

function qxdz(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/like`,
            headers: JSON.parse(qhbdsphd),
            body:`{"like":0,"video_id":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【取消点赞成功ID】+`+ num)
                    $.message += `\n【取消点赞成功视频ID】`+ num
                } else {
                    console.log(`\n【取消点赞失败】`)
                    $.message += `\n【取消点赞失败】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}


//任务奖励
async function getRewardAll(Array) {
    for (const i of Array) {
      await getReward(i);
      await $.wait(3000)
    }
  }


function getReward(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body:`{"extra":"{\"code_id\":\"${code_id}\",\"position_id\":\"${position_id}\"}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【获得金币】`+ data.data)
                    $.message += `\n【获得金币】`+ data.data
                } else {
                    console.log(`\n【任务已完成】`)
                    $.message += `\n【任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}



async function getRewardAll(Array) {
    for (const i of Array) {
      await getReward(i);
      await $.wait(3000)
    }
  }

function getReward(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/mission/getReward`,
            headers: JSON.parse(qhbdsphd),
            body:`{"mid":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【完成任务ID】+`+ num)
                    $.message += `\n【完成任务ID】`+ num
                } else {
                    console.log(`\n【任务已完成】`)
                    $.message += `\n【任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}
//http://api2.guaniuvideo.com/comment/submit
//{"content":"牛","video_id":"136121"}
//发表评论
function fbpl(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/comment/submit`,
            headers: JSON.parse(qhbdsphd),
            body:`{"content":"牛","video_id":"136121"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n发表评论成功视频ID：136121`)
                    $.message += `\n发表评论成功视频ID：136121`
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//宝箱position_id获取和ad_code
function bxlq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body:'{"keyword":"BoxVideo","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    bxcode_id=data.data[1]["ad_code"]
                    bxposition_id=data.data[1]["position_id"]
                    console.log(`\n宝箱code_id是：` + data.data[1]["ad_code"] + `\n宝箱position_id是：` + data.data[1]["position_id"])
                    $.message += `\n宝箱code_id是：` + data.data[1]["ad_code"] + `\n宝箱position_id是：` + data.data[1]["position_id"]
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//分享视频position_id获取和ad_code
function fxlq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body:'{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    fxcode_id=data.data[1]["ad_code"]
                    fxposition_id=data.data[1]["position_id"]
                    console.log(`\n分享视频code_id是：` + data.data[1]["ad_code"] + `\n分享视频position_id是：` + data.data[1]["position_id"])
                    $.message += `\n分享视频code_id是：` + data.data[1]["ad_code"] + `\n分享视频position_id是：` + data.data[1]["position_id"]
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//点赞小视频position_id获取和ad_code
function dzlq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body:'{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    dzcode_id=data.data[0]["ad_code"]
                    dzposition_id=data.data[0]["position_id"]
                    console.log(`\n点赞小视频code_id是：` + data.data[0]["ad_code"] + `\n点赞小视频position_id是：` + data.data[0]["position_id"])
                    $.message += `\n点赞小视频code_id是：` + data.data[0]["ad_code"] + `\n点赞小视频position_id是：` + data.data[0]["position_id"]
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//评论小视频position_id获取和ad_code
function pllq(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body:'{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    plcode_id=data.data[0]["ad_code"]
                    plposition_id=data.data[0]["position_id"]
                    console.log(`\n评论小视频code_id是：` + data.data[0]["ad_code"] + `\n评论小视频position_id是：` + data.data[0]["position_id"])
                    $.message += `\n评论小视频code_id是：` + data.data[0]["ad_code"] + `\n评论小视频position_id是：` + data.data[0]["position_id"]
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//宝箱任务翻倍完成
function bxwc(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body:`{"extra":"{\"code_id\":\"${bxcode_id}\",\"position_id\":\"${bxposition_id}\"}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【宝箱任务获得金币】`+ data.data)
                    $.message += `\n【宝箱任务获得金币】`+ data.data
                } else {
                    console.log(`\n【宝箱任务已完成】`)
                    $.message += `\n【宝箱任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//分享任务翻倍完成
function fxwc(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body:`{"extra":"{\"mid\":\"89\",\"code_id\":\"${fxcode_id}\",\"position_id\":\"${fxposition_id}\"}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【分享视频任务获得金币】`+ data.data)
                    $.message += `\n【分享视频任务获得金币】`+ data.data
                } else {
                    console.log(`\n【分享视频任务已完成】`)
                    $.message += `\n【分享视频任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//点赞小视频翻倍任务完成
function dzwc(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body:`{"extra":"{\"mid\":\"11\",\"code_id\":\"${dzcode_id}\",\"position_id\":\"${dzposition_id}\"}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【点赞小视频任务获得金币】`+ data.data)
                    $.message += `\n【点赞小视频任务获得金币】`+ data.data
                } else {
                    console.log(`\n【点赞小视频任务已完成】`)
                    $.message += `\n【点赞小视频任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//评论任务翻倍任务完成
function plwc(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body:`{"extra":"{\"mid\":\"70\",\"code_id\":\"${plcode_id}\",\"position_id\":\"${plposition_id}\"}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.code == 200) {
                    console.log(`\n【评论任务获得金币】`+ data.data)
                    $.message += `\n【评论任务获得金币】`+ data.data
                } else {
                    console.log(`\n【评论任务已完成】`)
                    $.message += `\n【评论任务已完成】`
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//分享视频
function fxsp(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/share`,
            headers: JSON.parse(qhbdsphd),
            body: `{"video_id":"43340"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【分享视频成功】视频ID43340`)
                    $.message += `\n【分享视频成功】视频ID43340`
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

function qhbdspksp(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/video`,
            headers: JSON.parse(qhbdsphd),
            body: qhbdspbody,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【看视频成功】获得金币` + data.data["reward_gold"])
                    $.message += `\n【看视频成功】获得金币` + data.data["reward_gold"]
                } else {
                    console.log(data.message)
                    $.message += `\n【看视频成功】获得金币` + data.message
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}





function message() {
    if (tz == 1) { $.msg($.name, "", $.message) }
}

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}



function getCurrentDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;

}


function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }
        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }
        get(opts) {
            return this.send.call(this.env, opts)
        }
        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }
    return new (class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name
                }, 开始!`)
        }
        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }
        isQuanX() {
            return 'undefined' !== typeof $task
        }
        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }
        isLoon() {
            return 'undefined' !== typeof $loon
        }
        isShadowrocket() {
            return 'undefined' !== typeof $rocket
        }
        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }
        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }
        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch { }
            }
            return json
        }
        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }
        getScript(url) {
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }
        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http: //${addr}/v1/scripting/evaluate`,
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }
        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }
        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/[(d+)]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }
        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
            ] = value
            return obj
        }
        getdata(key) {
            let val = this.getval(key)
            // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }
        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }
        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }
        get(opts, callback = () => { }) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }
        post(opts, callback = () => { }) {
            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if (opts.headers) delete opts.headers['Content-Length']
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient[method](opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                opts.method = method
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                const {
                    url,
                    ..._opts
                } = opts
                this.got[method](url, _opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => {
                        const {
                            message: error,
                            response: resp
                        } = err
                        callback(error, resp, resp && resp.body)
                    }
                )
            }
        }
        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {string} fmt 格式化参数
         * @param {number} 可选: 根据指定时间戳返回格式化日期
         *
         */
        time(fmt, ts = null) {
            const date = ts ? new Date(ts) : new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }
        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if (this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }
        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }
        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name
                    }, 错误!`, err)
            } else {
                this.log('', `❗️${this.name
                    }, 错误!`, err.stack)
            }
        }
        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }
        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name
                }, 结束!🕛${costTime}秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}
