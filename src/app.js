import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const TARO_ENV = process.env.TARO_ENV
if (TARO_ENV == 'h5'){
  global.url = 'https://api.douban.com'
} else {
  global.url = 'https://douban.uieee.com'
}
console.log(global.url);

// global.url = 'https://douban.uieee.com'
global.getData = (url, params) => {
  Taro.showLoading({
    title: '加载中'
  })
  return Taro.request({
    method: 'post',
    url: global.url + url,
    data: params,
    dataType: 'jsonp',
    jsonp: "jsoncallback",
    jsonpCallback: "success_jsonpCallback",
    header: {
      'content-type': 'application/xml'
    },
  }).then(res => {

    Taro.hideLoading({
      title: '加载中'
    })
    // console.log("getData", res.data);
    
    if (res.statusCode == 200 ) {
      return res.data
    } else {
      Taro.showToast({
        title: '小老弟 出错了',
        duration: 2000
      })
    }

  })
}
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/user/index',
      // 'pages/nowintheater/index',
      // 'pages/latest/index',
      'pages/search/index',
      'pages/detail/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#e54847',
      navigationBarTitleText: '电影推荐'
    },
    tabBar: {
      color: "#8D93A8",
      selectedColor: "#e54847",
      backgroundColor: "#fff",
      borderStyle: "#d8d8d8",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/move.png",
          selectedIconPath: "./assets/images/move-active.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./assets/images/user.png",
          selectedIconPath: "./assets/images/user-active.png"
        }
      ]
    },

  }

  componentWillMount() {
    /* 
      componentWillMount: 程序被载入
      在微信小程序中这一生命周期对应app中的 onLaunch
    */
    console.log("componentWillMount===1");
  }

  componentDidMount() {
    /* 
      componentDidMount:程序被载入
      在微信小程序中这一生命周期对应app的onLaunch, 
      在componentWillMount后执行 
    */
    console.log("componentDidMount ===3");
  }

  componentDidShow() {
    /*
      componentDidShow: 程序展示出来
      在微信小程序中这一生命周期方法对应 onshow,
      在H5 中同样实现
    */
    console.log("componentDidShow===2");
  }

  componentDidHide() {
    /* 
      componentDidHide: 程序被隐藏
      在微信小程序中这一生命周期对应 onHide,
      在 H5中同样实现
    */

    console.log("componentDidHide");
  }

  componentDidCatchError() {
    /* 
      componentDidCatchError: 错误监听函数
      在微信小程序中这一生命周期方法对应 onError
    */
    console.log("componentDidCatchError");
  }

  componentDidNotFound() {
    /* 
      componentDidNotFound: 页面不存在监听函数
      在微信小程序中这一生命周期方法对应 onPageNotFound
    */
    console.log("componentDidNotFound");

  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))