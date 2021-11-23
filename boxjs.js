{
    "id": "ugg999999.app.sub",
    "name": "小姐姐 订阅",
    "author": "@ugg999999",
    "icon": "https://raw.githubusercontent.com/ugg999999/other/main/img/icon.jpg",
    "repo": "https://github.com/ugg999999/other",
    "apps": [

        {
            "id": "jdyl",
            "name": "捷达有礼",
            "keys": ["dsjheader", "dsjuserck","dsjheader2", "dsjuserck2"],
            "author": "@ugg999999",
            "settings": [{
                "id": "dsjSuffix",
                "name": "当前账号",
                "val": "1",
                "type": "number",
                "desc": "当前抓取ck记录的账号序号，如：1、2、3、"
            }, {
                "id": "dsjCount",
                "name": "账号个数",
                "val": "1",
                "type": "number",
                "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
            }, {
                "id": "dsjXH",
                "name": "循环获取ck",
                "val": "0",
                "type": "number",
                "desc": "0关闭，1打开，默认关闭"
            }, {
                "id": "dsjTXTX",
                "name": "txtx",
                "val": "0",
                "type": "number",
                "desc": "0关闭，1打开，默认关闭"
            }, {
                "id": "dsjTXTX",
                "name": "余额提醒",
                "val": "0",
                "type": "number",
                "desc": "0不提醒 可设置0,5,10,20,25,30,50,100"
            }, {
                "id": "dsjnotifyttt",
                "name": "推送控制",
                "val": "1",
                "type": "number",
                "desc": "0关闭，1推送,默认12点以及23点推送"
            }, {
                "id": "dsjnotifyInterval",
                "name": "通知控制",
                "val": "2",
                "type": "number",
                "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知"
            }, {
                "id": "dsjMinutes",
                "name": "推送-通知 分钟控制",
                "val": "10",
                "type": "number",
                "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
            }, {
                "id": "dsjuserck",
                "name": "账号",
                "val": "1",
                "type": "number",
                "desc": "指定账号"
            }],
      "repo": "https://github.com/ugg999999/other/blob/main/dsj/dsj.js",
      "script": "https://raw.githubusercontent.com/ugg999999/other/main/dsj/dsj.js",
      "icons": ["https://raw.githubusercontent.com/ugg999999/other/main/img/dsj.png", "https://raw.githubusercontent.com/ugg999999/other/main/img/dsj.png"]
        }


    ]
}