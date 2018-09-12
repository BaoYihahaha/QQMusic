//获取推荐页面接口
function get_indexData(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: new Date().getTime()
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback(res.data)
    }
  })
}
//获取排行榜接口
function get_topList(callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: new Date().getTime()
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback(res.data)
    }
  })
}
//获取前100首排行榜数据接口
function get_topListData(id,callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      tpl: 3,
      page:' detail',
      type: 'top',
      topid: id,
      platform: 'h5',
      needNewCode: 1,
      _: new Date().getTime()
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback(res)
    }
  })
}

//获取歌词
function get_lyric(val, callback) {
  wx.request({
    url: 'http://gecimi.com/api/lyric/' + val, //仅为示例，并非真实的接口地址
    data: {

    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback && callback(res)
    }
  })
}
//获取热门搜索接口
function search_list(callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }

    }
  })
}
//获取搜索结果接口
function search_result(val, key, callback) {
  wx.request({
    url: 'https://c.y.qq.com//soso/fcgi-bin/search_for_qq_cp', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: val,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: key,
      _: new Date().getTime()
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback && callback(res)
    }
  })
};
//获取歌曲源vkey接口
function song_vkey(songmid,filename,callback) {
  wx.request({
    url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      //jsonpCallback:'MusicJsonCallback004680169373158849',  
      loginUin:0, //可以传空值  
      hostUin: 0,  
      format: 'json',  
      inCharset: 'utf-8',  
      outCharset: 'utf-8',  
      notice: 0,  
      platform: 'h5', 
      needNewCode: 1,  
      cid: 205361747,
      //callback: 'MusicJsonCallback004680169373158849',  
      uin: 0, //可以传空值  
      songmid: songmid,  
      filename: filename,  
      guid: 6243148256
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      callback && callback(res)
    }
  })
};
module.exports = {
  get_indexData,
  get_topListData,
  get_topList,
  get_lyric,
  search_result,
  search_list,
  song_vkey
}