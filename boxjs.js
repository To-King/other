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
            "keys": ["jdylheader", "jdylheader2", "jdylheader3", "jdylheader4", "jdylheader5"],
            "author": "@tom",
            "settings": [{
                "id": "jdylSuffix",
                "name": "当前账号",
                "val": "1",
                "type": "number",
                "desc": "当前抓取ck记录的账号序号，如：1、2、3、4"
            }, {
                "id": "jdylCount",
                "name": "账号个数",
                "val": "1",
                "type": "number",
                "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
            }, {
                "id": "jdylXH",
                "name": "循环获取ck",
                "val": "0",
                "type": "number",
                "desc": "0关闭，1打开，默认关闭"
            }, {
                "id": "jdylTXTX",
                "name": "txtx",
                "val": "0",
                "type": "number",
                "desc": "0关闭，1打开，默认关闭"
            }, {
                "id": "jdylSC",
                "name": "sc",
                "val": "0",
                "type": "number",
                "desc": "0关闭，1打开，默认关闭"
            }, {
                "id": "jdylnotifyttt",
                "name": "推送控制",
                "val": "1",
                "type": "number",
                "desc": "0关闭，1推送,默认12点以及23点推送"
            }, {
                "id": "jdylnotifyInterval",
                "name": "通知控制",
                "val": "2",
                "type": "number",
                "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知"
            }, {
                "id": "jdylMinutes",
                "name": "推送-通知 分钟控制",
                "val": "10",
                "type": "number",
                "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
            }],
            "repo": "https://github.com/ugg999999/other/blob/main/jdyl/jdyl.js",
            "script": "https://raw.githubusercontent.com/ugg999999/other/main/jdyl/jdyl.js",
            "icons": ["https://raw.githubusercontent.com/ugg999999/other/main/img/jdyl.png", "https://raw.githubusercontent.com/ugg999999/other/main/img/jdyl.png"]
        }


    ]
}