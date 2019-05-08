/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtList, AtListItem, AtNavBar, AtDivider, AtCard, AtBadge, AtIcon, AtLoadMore } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.state = {
      isH5: process.env.TARO_ENV === 'h5',
      top: [],
      goods: [],
      hasMore: false
    }
  }

  componentWillMount() {
    global.getData('/v2/movie/in_theaters', { start: 0, count: 10 }).then(res => {
      // console.log("res", res);
      let data;
      if (this.state.isH5){
        data = res
      } else {
        data = JSON.parse(res)
      }
      console.log(data);
      
      let topArray = [];
      data.subjects.forEach(item => {
        topArray.push(item.images)
      });
      this.setState({ top: topArray.slice(0, 3), goods: data.subjects })
    })

  }
  onShareAppMessage = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  render() {
    return (
      <View className='index'>
        {this.state.isH5 ? <AtNavBar title='电影推荐' ></AtNavBar> : null}
        <Swiper
          className='swiper-container'
          indicatorActiveColor='#e93b3d'
          interval={5000}
          circular
          indicatorDots
          autoplay
        >

          {this.state.top.map(t => {
            // eslint-disable-next-line react/jsx-key
            return <SwiperItem>
              <Image className='swiper-img' mode='aspectFit' src={t.large}></Image>
            </SwiperItem>
          })}
        </Swiper>

        <View className='listMian'>
          {this.state.goods.map(item => {
            // console.log("item.directors", item.directors);

            // eslint-disable-next-line react/jsx-key
            return <View className='item'>
              <View className='avatar'>
                <Image mode='aspectFit' className='card-img' src={item.images.small} ></Image>
              </View>
              <View className='content-wrapper'>
                <View className='content'>
                  <View className='box-flex movie-title line-ellipsis'>
                    {item.title}
                  </View>
                  <View className='brief'>
                    导演：{item.directors.map(dir => {
                      // eslint-disable-next-line react/jsx-key
                      return <Text> {dir.name} </Text>
                    })}
                  </View>
                  <View className='brief'>
                    主演：{item.casts.map(lis => {
                      // eslint-disable-next-line react/jsx-key
                      return <Text> {lis.name} </Text>
                    })}
                  </View>
                </View>
                <View className='normal'>
                  <View className='score-suffix'>观众评分 </View>
                  <View className='grade'>{item.rating.average}</View>
                </View>

              </View>
            </View>
          })}
        </View>
      </View>
    )
  }
}

