module.exports = {
    "id": "jscfz",
    "name": "嘉实宠粉站",
    "keys": ["jscfzheader","jscfzheader2","jscfzheader3","jscfzheader4","jscfzheader5"],
    "author": "@ugg999999",
    "settings": [{
      "id": "jscfzSuffix",
      "name": "当前账号",
      "val": "1",
      "type": "number",
      "desc": "当前抓取ck记录的账号序号，如：1、2、3、4"
    }, {
      "id": "jscfzCount",
      "name": "账号个数",
      "val": "1",
      "type": "number",
      "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
    }, {
      "id": "jscfzXH",
      "name": "循环获取ck",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "jscfzTXTX",
      "name": "txtx",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "jscfzSC",
      "name": "sc",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "jscfznotifyttt",
      "name": "推送控制",
      "val": "1",
      "type": "number",
      "desc": "0关闭，1推送,默认12点以及23点推送"
    }, {
      "id": "jscfznotifyInterval",
      "name": "通知控制",
      "val": "2",
      "type": "number",
      "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知"
    }, {
      "id": "jscfzMinutes",
      "name": "推送-通知 分钟控制",
      "val": "10",
      "type": "number",
      "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
    }],
    "repo": "https://raw.githubusercontent.com/ugg999999/other/main/jscfz/jscfz.js",
    "icons": ["https://raw.githubusercontent.com/ugg999999/other/main/img/jscfz.png", "https://raw.githubusercontent.com/ugg999999/other/main/img/jscfz.png"],
    "script": "https://raw.githubusercontent.com/ugg999999/other/main/jscfz/jscfz.js",
    "icon": "https://raw.githubusercontent.com/ugg999999/other/main/img/jscfz.png",
    "favIcon": "mdi-star-outline",
    "favIconColor": "grey",
    "datas": [{
      "key": "jscfzheader",
      "val": ""
    }, {
      "key": "jscfzheader2",
      "val": ""
    }, {
      "key": "jscfzheader3",
      "val": ""
    }, {
      "key": "jscfzheader4",
      "val": ""
    }, {
      "key": "jscfzheader5",
      "val": ""
    }],
    "sessions": [],
    "isLoaded": true
  }
  