/*
软件名：趣红包短视频     收益未知  定时自己设置  执行一次脚本大概需要3分钟

【REWRITE】
匹配链接（正则表达式） http://api2.guaniuvideo.com/reward/video
对应重写目标   https://raw.githubusercontent.com/ugg999999/other/main/qhb_rw.js
食用方法：视频页面看视频 等待红包转圈完成即可获取
提现兑换里面开启活动提现即可
定时5-23.59点运行一次即可

10 6 * * * https://raw.githubusercontent.com/ugg999999/other/main/qhb_rw.js
/////////////////////////////////////////////////////////////////////////////
*/

const $ = new Env('趣红包短视频每日任务');
let status;
status = (status = ($.getval("qhbdspstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const qhbdsphdArr = [],
    qhbdspbodyArr = [],
    qhbdspcount = ''
let qhbdsphd = $.getdata('qhbdsphd');
let qhbdspbody = $.getdata('qhbdspbody');
let times = new Date().getTime();
let tz = ($.getval('tz') || '1');
let rwmid = [87, 11, 70, 88, 89]
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
                await $.wait(3000)
                await SignDouble() //签到ad获取
                await $.wait(50000)
                await qdwc() //签到双倍领取
                await $.wait(3000)
                await BoxVideo() //宝箱ad参数
                await $.wait(50000)
                await bxwc() //宝箱双倍领取
                await $.wait(3000)
                await huoquid()  //获取视频ID并点赞分享评论
                await $.wait(3000)
                await getRewardAll(rwmid)  //完成任务领取
                await $.wait(3000)
                await TaskDouble1() //点赞ad
                await $.wait(50000)
                await dzwc()   //点赞双倍领取
                await $.wait(3000)
                await TaskDouble2() //评论ad
                await $.wait(50000)
                await plwc()  //评论双倍领取
                await $.wait(3000)
                await TaskDouble3() //分享ad
                await $.wait(50000)
                await fxwc() //分享双倍领取
                await $.wait(3000)
                await txcs()  //提现参数获取并提现
                //await $.wait(3000)
                //await qxdz(spid1) //取消点赞1 
                //await $.wait(3000)
                //await qxdz(spid2) //取消点赞2
                //await $.wait(3000)
                //await qxdz(spid3) //取消点赞3
                //根据自己的需要决定是否取消点赞
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
                    user_id = data.data["id"]
                    console.log(`\n你的账户ID是：` + data.data["id"] + `\n你的邀请码是：` + data.data["recommend_id"] + `\n今日获得金币：` + data.data.gold + `\n账户现金余额：` + data.data.money)
                    $.message += `\n你的账户ID是：` + data.data["id"] + `\n你的邀请码是：` + data.data["recommend_id"] + `\n今日获得金币：` + data.data.gold + `\n账户现金余额：` + data.data.money
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
                    renwu = data.data.daily[0].title
                    mid = data.data.daily[0]['mission_id']
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
            url: `http://api2.guaniuvideo.com/mission/getReward`,
            headers: JSON.parse(qhbdsphd),
            body: `{"mid":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【完成任务ID】` + num)
                    $.message += `\n【完成任务ID】` + num
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
//获取视频ID编号
function huoquid(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/index`,
            headers: JSON.parse(qhbdsphd),  //这里这样改 
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    spid1 = data.data.list[0].id
                    spid2 = data.data.list[1].id
                    spid3 = data.data.list[2].id
                    console.log(`获取评点赞分享视频ID=${data.data.list[0].id}`)
                    console.log(`获取评点赞分享视频ID=${data.data.list[1].id}`)
                    console.log(`获取评点赞分享视频ID=${data.data.list[2].id}`)
                    await fbpl(spid1)   //评论视频
                    await $.wait(3000)
                    await dzsp(spid1)  //点赞视频1
                    await $.wait(3000)
                    await dzsp(spid2)  //点赞视频2
                    await $.wait(3000)
                    await dzsp(spid3)  //点赞视频3
                    await $.wait(3000)
                    await fxsp(spid1) //分享视频1
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
//发表评论
function fbpl(num) {
    return new Promise((resolve) => {
        pllist = ["感谢分享", "很感谢分享", "谢谢分享", "非常谢谢分享", "值得分享", "很值得分享", "非常值得分享", "值得观看", "很值得观看", "感觉不错", "感觉很不错", "非常不错", "感觉非常不错", "我觉得不错", "这个我觉得不错", "这个我觉得非常不错", "我觉得好看", "这个我觉得好看", "我觉得非常好看", "这个我觉得非常好看", "非常感谢分享", "这个好看", "这个精彩", "这个非常精彩", "这个很精彩", "这个值得分享", "这个很值得分享", "这个非常值得分享", "这个值得点赞", "这个很值得点赞", "这个非常值得点赞", "这个视频好看", "这个视频不错", "这个视频精彩", "这个视频很棒", "这个视频值得分享", "这个视频值得点赞", "这个视频值得观看", "这个视频非常不错", "值得分享这个", "值得点赞这个", "这个感觉不错", "这个感觉很不错", "这个视频感觉不错", "这个视频感觉很不错", "这个值得观看", "这个很值得观看", "这个值得称赞", "这个值得夸奖", "这个视频很棒", "这个视频非常棒", "这个视频很好", "这个视频很好看", "这个很好看"]
        contentes = pllist[RT(0, pllist.length - 1)]
        let url = {
            url: `http://api2.guaniuvideo.com/comment/submit`,
            headers: JSON.parse(qhbdsphd),
            body: `{"content":"${contentes}","video_id":"${num}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n发表评论成功视频ID：` + num)
                    $.message += `\n发表评论成功视频ID：` + num
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}

//分享视频
function fxsp(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/share`,
            headers: JSON.parse(qhbdsphd),
            body: `{"video_id":"${num}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【分享视频成功】视频ID` + num)
                    $.message += `\n【分享视频成功】视频ID` + num
                } else {
                    console.log(data.message)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}

//点赞视频
function dzsp(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/like`,
            headers: JSON.parse(qhbdsphd),
            body: `{"like":1,"video_id":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【点赞成功ID】+` + num)
                    $.message += `\n【点赞成功视频ID】` + num
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


//取消点赞
function qxdz(num) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/video/like`,
            headers: JSON.parse(qhbdsphd),
            body: `{"like":0,"video_id":${num}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【取消点赞成功ID】+` + num)
                    $.message += `\n【取消点赞成功视频ID】` + num
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
//宝箱position_id获取和ad_code
function BoxVideo(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body: '{"keyword":"BoxVideo","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    bxcode_id = data.data[0]["ad_code"]
                    bxposition_id = data.data[0]["position_id"]
                    console.log(`\n宝箱code_id是：` + data.data[0]["ad_code"] + `---宝箱position_id是：` + data.data[0]["position_id"])
                    $.message += `\n宝箱code_id是：` + data.data[0]["ad_code"] + `---宝箱position_id是：` + data.data[0]["position_id"]
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



//签到position_id获取和ad_code
function SignDouble(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body: '{"keyword":"SignDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    qdcode_id = data.data[0]["ad_code"]
                    qdposition_id = data.data[0]["position_id"]
                    console.log(`\n签到code_id是：` + data.data[0]["ad_code"] + `---签到position_id是：` + data.data[0]["position_id"])
                    $.message += `\n签到code_id是：` + data.data[0]["ad_code"] + `---签到position_id是：` + data.data[0]["position_id"]
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
function TaskDouble1(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body: '{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    dzcode_id = data.data[0]["ad_code"]
                    dzposition_id = data.data[0]["position_id"]
                    console.log(`\n点赞小视频code_id是：` + data.data[0]["ad_code"] + `---点赞小视频position_id是：` + data.data[0]["position_id"])
                    $.message += `\n点赞小视频code_id是：` + data.data[0]["ad_code"] + `---点赞小视频position_id是：` + data.data[0]["position_id"]
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
//评论
function TaskDouble2(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body: '{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    plcode_id = data.data[1]["ad_code"]
                    plposition_id = data.data[1]["position_id"]
                    console.log(`\n评论小视频code_id是：` + data.data[1]["ad_code"] + `---评论小视频position_id是：` + data.data[1]["position_id"])
                    $.message += `\n评论小视频code_id是：` + data.data[1]["ad_code"] + `---评论小视频position_id是：` + data.data[1]["position_id"]
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



//分享
function TaskDouble3(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/system/getAd`,
            headers: JSON.parse(qhbdsphd),
            body: '{"keyword":"TaskDouble","user_id":' + user_id + '}',
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    fxcode_id = data.data[0]["ad_code"]
                    fxposition_id = data.data[0]["position_id"]
                    console.log(`\n分享视频code_id是：` + data.data[0]["ad_code"] + `---分享视频position_id是：` + data.data[0]["position_id"])
                    $.message += `\n分享视频code_id是：` + data.data[0]["ad_code"] + `---分享视频position_id是：` + data.data[0]["position_id"]
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


//签到翻倍
function qdwc(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/reward/videoNotify`,
            headers: JSON.parse(qhbdsphd),
            body: {
                'extra': '{"code_id":"' + qdcode_id + '","position_id":"' + qdposition_id + '"}'
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                console.log(data)
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【签到获得金币】` + data.data)
                    $.message += `\n【签到获得金币】` + data.data
                } else {
                    console.log(`\n【签到已完成】`)
                    $.message += `\n【签到已完成】`
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
            body: {
                'extra': '{"code_id":"' + bxcode_id + '","position_id":"' + bxposition_id + '"}'
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【宝箱任务获得金币】` + data.data)
                    $.message += `\n【宝箱任务获得金币】` + data.data
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
            body: {
                'extra': '{"mid":"89","code_id":"' + fxcode_id + '","position_id":"' + fxposition_id + '"}'
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【分享视频任务获得金币】` + data.data)
                    $.message += `\n【分享视频任务获得金币】` + data.data
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
            body: {
                'extra': '{"mid":"11","code_id":"' + dzcode_id + '","position_id":"' + dzposition_id + '"}'
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【点赞小视频任务获得金币】` + data.data)
                    $.message += `\n【点赞小视频任务获得金币】` + data.data
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
            body: {
                'extra': '{"mid":"70","code_id":"' + plcode_id + '","position_id":"' + plposition_id + '"}'
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n【评论任务获得金币】` + data.data)
                    $.message += `\n【评论任务获得金币】` + data.data
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




//获取提现参数
function txcs(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `http://api2.guaniuvideo.com/wallet/getPackageList`,
            headers: JSON.parse(qhbdsphd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                var lb = data
                if (lb.code == 200) {
                    if (lb.data['event_list'][0]['is_finish'] == 0) {
                        txid = lb.data['event_list'][0].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][1]['is_finish'] == 0) {
                        txid = lb.data['event_list'][1].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][2]['is_finish'] == 0) {
                        txid = lb.data['event_list'][2].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][3]['is_finish'] == 0) {
                        txid = lb.data['event_list'][3].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][4]['is_finish'] == 0) {
                        txid = lb.data['event_list'][4].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][5]['is_finish'] == 0) {
                        txid = lb.data['event_list'][5].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][6]['is_finish'] == 0) {
                        txid = lb.data['event_list'][6].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][7]['is_finish'] == 0) {
                        txid = lb.data['event_list'][7].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
                    if (lb.data['event_list'][8]['is_finish'] == 0) {
                        txid = lb.data['event_list'][8].id
                        console.log(`\n【提现ID获取成功】` + txid)
                        await tixian(txid)
                    }
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


//提现
function tixian(num) {
    return new Promise((resolve) => {
        qhbdspb = JSON.parse(qhbdspbody)
        check_token = qhbdspb.check_token
        let url = {
            url: `http://api2.guaniuvideo.com/wallet/apply`,
            headers: JSON.parse(qhbdsphd),
            body: {
                'check_token': check_token,
                'package_id': num,
                'pay_type': 1
            },
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                if (data.code == 200) {
                    console.log(`\n提现成功`)
                    $.message += `\n【提现成功】`
                } else {
                    console.log(data.message)
                    await $.wait(3000)
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
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
//Env.min.js  来源https://raw.fastgit.org/chavyleung/scripts/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.JSON.parse(qhbdsphd),{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.JSON.parse(qhbdsphd),{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
