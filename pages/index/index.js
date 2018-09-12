const util = require("./../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["推荐", "排行榜", "搜索"],
    navcur: 0,
    SearchFocus: false,
    searchRsult: [],
    searchP: 1, // 搜索结果第几页
    storeList: [],
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(util.get_indexData()) // 异步 变同步
    util.get_indexData((res) => {
      //console.log(res)
      this.setData({
        slider: res.data.slider,
        radioList: res.data.radioList,
        songList: res.data.songList
      })
    })
    util.get_topList((res) => {
      //console.log(res)
      this.setData({
        topList: res.data.topList
      })
    })
    util.search_list((data) => {
      this.setData({
        search_list: data.data.hotkey.slice(1, 10),
        special_key: data.data.special_key
      })
    })
  },

  //导航条 tab
  navtab(ev) {
    let index = ev.currentTarget.dataset.navindex
    this.setData({
      navcur: index
    })
  },

  //搜索
  //清除历史记录
  removelist: function () {
    this.setData({
      storeList: ''
    })
  },
  //获取焦点
  onSearchFocus() {
    this.setData({
      SearchFocus: true
    })
  },
  //取消事件
  onSearchCancel() {
    this.setData({
      SearchFocus: false,
      searchRsult: [],
      searchVal: ""
    })
  },
  // 每次输入 触发
  onSearchInput(ev) {
    let val = ev.detail.value;
    this.setData({ searchVal: val })
  },
  //回车事件
  onSearchConfirm() {
    let val = this.data.searchVal;
    let index = this.data.searchP;
    //搜索历史记录
    this.searchStore(val);
    //搜索结果
    this.searchEvent(val, index)
  },
  // 搜索封装
  searchEvent(val, index) {
    app.showLoading(); // 动画
    util.search_result(val, index, (data) => {
      console.log(data.data.data.song.list)
      let searchRsult = this.data.searchRsult; //[]  []20 []40

      if (searchRsult.length == 0) {
        //不拼接
        this.setData({
          searchRsult: data.data.data.song.list
        })
      }
      else {
        this.setData({
          searchRsult: searchRsult.concat(data.data.data.song.list)
        })
      }
    })
  },
  //搜索历史记录
  searchStore(val) {
    let storeList = this.data.storeList;
    for (var i = 0; i < storeList.length; i++) {
      if (val.trim() == storeList[i]) {
        return;
      }
    }
    storeList.push(val);
    //同步缓存
    wx.setStorageSync('gg', storeList);
    this.setData({ storeList })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  opentopList:function(ev){
    //console.log(ev);
   
    var index = ev.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '../topList/topList?id='+index,
    })
  },
  onReady: function () {

  },
  //搜索结果跳转到播放界面
  searchToplay: function (ev) {
    //获取ID 
    var index = ev.currentTarget.dataset.searchid;
    console.log(ev);
    //把一个 传到 getApp
    app.globalData.songlist = this.data.searchRsult[index];
    console.log(app.globalData.songlist);
    //跳转
    wx.navigateTo({
     url: '../playsong/playsong'
    })
  },
  //热门搜索结果跳转到播放界面
  /*keyToplay: function (ev) {
    //获取ID 
    var index = ev.currentTarget.dataset.hotSearchid;
    console.log(ev.currentTarget.dataset);
    //把一个 传到 getApp
    app.globalData.songlist = this.data.search_list[index];
    console.log(app.globalData.songlist);
    //跳转
    wx.navigateTo({
      url: '../playsong/playsong'
    })
  },*/
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
    //只在搜索页面执行
    if (this.data.navcur == 2) {
      let val = this.data.searchVal;
      let index = ++this.data.searchP;
      this.searchEvent(val, index);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})