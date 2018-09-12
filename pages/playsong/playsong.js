var app=getApp();
const util = require("./../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true

  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.flag=this.data.flag;
    console.log(options);
    var id=options.id;
    var songlist = app.globalData.songlist;
    var songname = songlist.songname;
    this.setData({
      songlist: songlist,
      songname: songname
    })
    console.log(app.globalData.songlist);
    this.saveData(id);
    this.progressBar();
    console.log(this.data.songmid);
    if (this.data.songlist){
      this.playMusic(this.data.songlist.songmid);
    }else{
      this.playMusic(this.data.songmid);
    }
    
    
   
    //console.log(this.data.currentPosition)
  },
  //存放data变量
  saveData:function(id){
    var song = app.globalData.songlist[id].data;
    var songmid = app.globalData.songlist[id].data.songmid;
    var vid = app.globalData.songlist[id].data.vid;
    var songname = app.globalData.songlist[id].data.songname;
    var singer = app.globalData.songlist[id].data.singer;
    this.setData({
      id: id,
      songmid: songmid,
      songname: songname,
      vid:vid,
      song: song,
      singer: singer,
      flag: true
    })
  },
  //播放音乐
  playMusic: function (songmid){
    var filename = 'c400' +songmid+'.m4a';
    util.song_vkey(songmid,filename,(res) => {
      console.log(res.data.data.items[0].vkey);
      var vkey = res.data.data.items[0].vkey;
      if (this.data.flag) {

        wx.playBackgroundAudio({
          dataUrl: 'http://dl.stream.qqmusic.qq.com/C400' + songmid + '.m4a?guid=6243148256&vkey=' + vkey+'&uin=0&fromtag=38',
        })
      } else {
        wx.pauseBackgroundAudio();
      }
      
    })
    this.getLyric(this.data.songname);
    
  },
  //播放，暂停
  playEvent:function(){
    //改变播放状态
    var flag = !this.data.flag;
    app.globalData.flag = flag;
    this.setData({
      flag: flag
    })
    console.log(this.data.flag);
    this.playMusic(this.data.songmid);
  },
  //下一首
  next:function(){
    this.setData({
      islyric: false
    })
    var id=++this.data.id;
    if (id > app.globalData.songlist.length) {
      wx.showToast({
        title: '已经是最后一首了',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.saveData(id);
    this.playMusic(this.data.songmid);
  },
  //上一首
  prev:function(){
    this.setData({
      islyric: false
    })
    var id = --this.data.id;
    if(id<0){
      wx.showToast({
        title: '已经是第一首了',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.saveData(id);
    this.playMusic(this.data.songmid);
  },
  //进度条的宽度   1. 当前的时间 / 总时长 * bar的宽度
  //进度条
  progressBar:function(){
    //获取宽度
    var barWidth = wx.getSystemInfoSync().windowWidth - 124;  //82 + 40 
    let that = this;
    setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          var currentPosition = res.currentPosition
          var duration = res.duration
          var width = currentPosition / duration * barWidth * 2;
          if (res.currentPosition == res.duration){
            //that.next();
          }
         // console.log(currentPosition)
          that.setData({
            currentPositionM: parseInt(currentPosition / 60),
            currentPositionS: parseInt(currentPosition % 60),
            durationM: parseInt(duration / 60),
            durationS: parseInt(duration % 60),
            width: width
          })
        }
      })
    }, 1000)
  },
  //快进后退
  barMove: function (ev) {
    //1.拖拽 事件就只有一个 bindtouchmove   
    //2. 获取 bar 的原点  X=ev.touches[0].clientX - bar.offsetLeft
    //3.页面初始化后马上获取 bar宽度 = 屏幕的宽度 - bar.offsetLeft * 2
    //4.改变当前的时间  
    //    公式：手指移动的距离 / bar的宽度 * 总时长
    //5.调用接口 wx.seekBackgroundAudio  改变当前时长

    console.log(ev);
    console.log(ev.target.offsetLeft);
    var that = this;
    var X = ev.touches[0].clientX - ev.target.offsetLeft

    //bar的宽度
    var eleWidth = this.data.eleWidth - ev.target.offsetLeft * 2;


    wx.seekBackgroundAudio({  //只有播放的时候才会执行
      position: X / eleWidth * that.data.duration
    })
    //改变当前的时间
    this.setData({
      width: X / eleWidth * 100
    });

  },
  //获取歌词
  getLyric:function(key){
    var that = this;
    console.log(key);
    util.get_lyric(key, function (data) {
      if (!data.data.count) {
        that.setData({
          islyric: false
        })
        return;
      }
      var url = data.data.result[0].lrc;
     
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var re = /\[[^\[]+\]/g;
          var str = res.data;
          var str1 = str.replace(re, "bbb");
          var re1 = /[^bbb]+\s/g;

          var str2 = str1.match(re1);
          that.setData({
            lyricList: str2,
            islyric: true
          })
        }
      })
    })
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