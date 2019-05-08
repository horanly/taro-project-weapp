/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtAvatar, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import userHead from '../../assets/images/userhead.png'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isH5: process.env.TARO_ENV === 'h5',
      isOpened: false,
      imagehead: userHead,
      userName: ''
    }
  }

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() {
    if (this.state.isH5){
      console.log('h5登录事件');
      
    } else {
      Taro.getSetting()
        .then(res => {
          if (res.authSetting["scope.userInfo"]) {
            let userData = Taro.getStorageSync('userinfo')
            this.setState({
              isOpened: false,
              imagehead: userData.avatarUrl,
              userName: userData.nickName
            })
            return true;
          } else {
            this.setState({
              isOpened: true
            })
            throw new Error("没有授权");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onShareAppMessage = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  shareAppMessage = () =>{
    console.log("分享");
    // Taro.showShareMenu({
    //   withShareTicket: true
    // })
  
  }

  tobeginLogin = (e) => {
    let userData = e.detail.userInfo

    if (!!userData){
      Taro.setStorageSync("userinfo", userData)
  
      this.setState({
        isOpened: false,
        imagehead: userData.avatarUrl,
        userName: userData.nickName
      })
    } else {
      console.log("取消授权了");
      // Taro.showModal({
      //   title: '警告',
      //   content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //   showCancel: false,
      //   confirmText: '返回授权',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”');
      //     }
      //   }
      // });
    }
  }

  handleClose = () => {
    console.log("关闭了", this.props);
    // Taro.switchTab({
    //   url: `/pages/index/index`
    // });
  }

  render() {
    return (
      <View className='userMian'>
        <AtFloatLayout isOpened={this.state.isOpened} title='提示' onClose={this.handleClose}>
          <View className='layTips'>
            为了获取更好的体验,请您先登录!
          </View>
          <AtButton type='secondary' openType='getUserInfo' onGetUserInfo={this.tobeginLogin}> 登录 </AtButton>
        </AtFloatLayout>

        <View className='at-row userCentent'>
          <View className='at-col at-col-3 headloginPic'>
            <AtAvatar circle image={this.state.imagehead}></AtAvatar>
          </View>
          <View className='at-col at-col-6 headloginBtn'>
          {
            this.state.isH5 ? <text> Hello </text>:
            this.state.isOpened?
            <AtButton type='secondary' size='small' openType='getUserInfo' onGetUserInfo={this.tobeginLogin}> 登 录 </AtButton>
            :
            <text>{this.state.userName}</text>
          }
          </View>
        </View>

        <View>
          <AtList className='AtList'>
            <AtListItem title='分享小程序' arrow='right' open-type='share' onClick={this.shareAppMessage} />
            <AtListItem title='关于我' arrow='right' />
          </AtList>
          <AtList>
            <AtListItem title='想看的电影' arrow='right' />
            <AtListItem title='看过的电影' arrow='right' />
          </AtList>
        </View>
      </View>
    )
  }
}

