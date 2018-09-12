const util = require("./../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.flag = app.globalData.flag;
    console.log(options);
    var id=options.id;
    util.get_topListData(id,(res) => {
      console.log(res)
      this.setData({
        num: res.data.cur_song_num,
        date: res.data.date,
        day_of_year: res.data.day_of_year,
        songlist: res.data.songlist,
        songmid: res.data.songlist[0].data.songmid,
        topinfo: res.data.topinfo
      })
    })
  },
  playsong:function(){
    this.setData({
      flag:false
    })
    var songmid = this.data.songmid;
    console.log(songmid);
    this.playMusic(songmid);
  },
  //播放音乐
  playMusic: function (songmid) {
    var filename = 'c400' + songmid + '.m4a';
    util.song_vkey(songmid, filename, (res) => {
      console.log(res.data.data.items[0].vkey);
      var vkey = res.data.data.items[0].vkey;
    if (!this.data.flag) {
      wx.playBackgroundAudio({
        dataUrl: 'http://dl.stream.qqmusic.qq.com/C400' + songmid + '.m4a?guid=6243148256&vkey=' + vkey + '&uin=0&fromtag=38',
      })
    } else {
      wx.pauseBackgroundAudio();
    }
    this.setData({
      flag: true
    })
    
    })
  },
  //播放，暂停
  playEvent: function () {
    //改变播放状态
    var flag = !this.data.flag;
    this.setData({
      flag: flag
    })
    if (this.data.flag==false){
      wx.pauseBackgroundAudio();
    }else{
      this.playsong();
    }
    console.log(this.data.flag);
    //this.playMusic(this.data.songmid);
    
  },
  opendetail:function(ev){
    //console.log(ev);
    app.globalData.songlist = this.data.songlist;
    var index=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../playsong/playsong?id='+index,
    })
    this.data.flag=app.globalData.flag; 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})