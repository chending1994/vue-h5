<!-- home -->
<template>
  <div class="index-container">
    <div class="swiper-box list">
      <swiper class="box-container" :options="swiperOption" ref="mySwiper">
        <swiper-slide
          v-for="(item, index) in cardlist"
          :key="index"
        >
        <div :class="['card-item', index != 1 ?  'filter' : '']" :key="index">
          <div class="item-header">{{ item.title }}</div>
          <div class="item-content">
            <div class="item-content-left" @click="handleChoose(index)">
              <van-image fit="cover" :src="item.imgLeftUrl" />
              <div class="mask"></div>
              <div class="tag">#{{item.leftName}}#</div>
              <div class="vote" v-if="index == 1">
                <div class="line nor">
                  <div
                    :class="['line-true', 'nor']"
                    :style="{ height: toPercent(item).leftPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).leftPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content-right" @click="handleChoose(index)">
              <van-image fit="cover" :src="item.imgRightUrl" />
              <div class="mask"></div>
              <div class="tag">#{{item.rightName}}#</div>
              <div class="vote" v-if="index == 1">
                <div class="line active">
                  <div
                    :class="['line-true', 'active']"
                    :style="{ height: toPercent(item).rightPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).rightPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-footer">
            <div class="footer-btn"  v-clipboard:copy="item.leftToken" v-clipboard:success="onCopy" v-clipboard:error="onError">去购买</div>
            <div class="footer-btn"  v-clipboard:copy="item.rightToken" v-clipboard:success="onCopy" v-clipboard:error="onError">去购买</div>
          </div>
        </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div class="list">
      <template v-for="(item,index) in cardlist">
        <div :class="['card-item', index != 1 ?  'filter' : '']" :key="index">
          <div class="item-header">{{ item.title }}</div>
          <div class="item-content">
            <div class="item-content-left" @click="handleChoose(index)">
              <van-image fit="cover" :src="item.imgLeftUrl" />
              <div class="mask"></div>
              <div class="tag">#{{item.leftName}}#</div>
              <div class="vote" v-if="index == 1">
                <div class="line nor">
                  <div
                    :class="['line-true', 'nor']"
                    :style="{ height: toPercent(item).leftPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).leftPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content-right" @click="handleChoose(index)">
              <van-image fit="cover" :src="item.imgRightUrl" />
              <div class="mask"></div>
              <div class="tag">#{{item.rightName}}#</div>
              <div class="vote" v-if="index == 1">
                <div class="line active">
                  <div
                    :class="['line-true', 'active']"
                    :style="{ height: toPercent(item).rightPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).rightPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-footer">
            <div class="footer-btn">去购买</div>
            <div class="footer-btn">去购买</div>
          </div>
        </div>
      </template>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        direction: 'vertical',
        // slidesPerView: 3,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true, // 循环
        // autoHeight: true,
        // autoplay: {
        //   // 自动播放
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        // loop: true, // 循环
        // directionType: 'horizontal', // 方向
        observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        setWrapperSize: true // Swiper使用flexbox布局(display: flex)，
        // 开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
      },
      cardlist: [
        {
          title: '谁才是真正的螺蛳粉之王？',
          imgLeftUrl: require('../../assets/images/01_luosifeng/left.jpg'),
          leftName: '好欢螺',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/01_luosifeng/right.jpg'),
          rightName: '螺霸王',
          rightValue: 0,
          leftToken: '$O98mcdB03C7$',
          rightToken: '$YcrDcdB0EXf$'
        },
        {
          title: '好吃又健康的面包，你更喜欢哪种？',
          imgLeftUrl: require('../../assets/images/2_miangbao/left.jpg'),
          leftName: '紫米夹心面包',
          leftValue: 1,
          imgRightUrl: require('../../assets/images/2_miangbao/right.jpg'),
          rightName: '全麦黑麦面包',
          rightValue: 2,
          leftToken: '$v2UNcdBc4LM$',
          rightToken: '$BPJqcdBcqFq$'
        },
        {
          title: '早餐喜欢吃哪种麦片？',
          imgLeftUrl: require('../../assets/images/3_maipian/left.jpg'),
          leftName: '西麦燕麦片',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/3_maipian/right.jpg'),
          rightName: '桂格即食燕麦片',
          rightValue: 0,
          leftToken: '$Iv2HcdBdDl5$',
          rightToken: '$IWAfcdBWvMv$'
        },
        {
          title: '哪种爽辣零食最解压？',
          imgLeftUrl: require('../../assets/images/4_suangla/left.jpg'),
          leftName: '卫龙大面筋面条',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/4_suangla/right.jpg'),
          rightName: '牛板筋',
          rightValue: 0,
          leftToken: '$JWQecdB3Rnd$',
          rightToken: '$IJ7kcdz0bBz$'
        },
        {
          title: '办公室下午茶喜欢吃哪种零食？',
          imgLeftUrl: require('../../assets/images/5_bangongshi/left.jpg'),
          leftName: '良品铺子猪肉脯',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/5_bangongshi/right.jpg'),
          rightName: '三只松鼠炭烧腰果',
          rightValue: 0,
          leftToken: '$GX1CcdBBVcx$',
          rightToken: '$UNsHcdBAmSK$'
        },
        {
          title: '你觉得最经典的薯片是哪种？',
          imgLeftUrl: require('../../assets/images/6_zuijindiansupian/left.jpg'),
          leftName: '乐事薯片',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/6_zuijindiansupian/right.jpg'),
          rightName: '可比克薯片',
          rightValue: 0,
          leftToken: '$XtdjcdBfPtR$',
          rightToken: '$0MqvcdBgZJn$'
        },
        {
          title: '你最喜欢哪种果肉干？',
          imgLeftUrl: require('../../assets/images/7_nizuixihuan/left.jpg'),
          leftName: '芒果干',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/7_nizuixihuan/right.jpg'),
          rightName: '榴莲干',
          rightValue: 0,
          leftToken: '$pbKvcdBgmvx$',
          rightToken: '$2hoqcdBTqZP$'
        },
        {
          title: '喜欢吃哪种饼干',
          imgLeftUrl: require('../../assets/images/8_binggang/left.jpg'),
          leftName: '芝士威化饼干',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/8_binggang/right.jpg'),
          rightName: '奥利奥饼干',
          rightValue: 0,
          leftToken: '$ppfPcdzYnqz$',
          rightToken: '$J4Zacdz1MdK$'
        },
        {
          title: '哪种牛奶更好喝？',
          imgLeftUrl: require('../../assets/images/9_niunai/left.jpg'),
          leftName: '蒙牛真果粒',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/9_niunai/right.jpg'),
          rightName: '旺仔牛奶',
          rightValue: 0,
          leftToken: '$hL3zcdBIbaF$',
          rightToken: '$Sja9cdBHeo4$'
        },
        {
          title: '韩国网红方便面，喜欢吃哪个？',
          imgLeftUrl: require('../../assets/images/10_fanbianmian/left.jpg'),
          leftName: '农心辛拉面',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/10_fanbianmian/right.jpg'),
          rightName: '三养火鸡面',
          rightValue: 0,
          leftToken: '$DKW4cdBhRpN$',
          rightToken: '$2ahHcdBhksB$'
        },
        {
          title: '哪个自热火锅最好吃？',
          imgLeftUrl: require('../../assets/images/11_zirehuoguo/left.jpg'),
          leftName: '海底捞',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/11_zirehuoguo/right.jpg'),
          rightName: '小龙坎',
          rightValue: 0,
          leftToken: '$AHqtcdBi0ry$',
          rightToken: '$3PmdcdBiYKs$'
        },
        {
          title: '网红速食好物，更喜欢吃哪个？',
          imgLeftUrl: require('../../assets/images/12_wanghonsushi/left.jpg'),
          leftName: '阿宽红油面皮',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/12_wanghonsushi/right.jpg'),
          rightName: '顾大嫂拌面',
          rightValue: 0,
          leftToken: '$vz52cdBjKnL$',
          rightToken: '$YcrDcdB0EXf$'
        },
        {
          title: '哪种雪糕更好吃？',
          imgLeftUrl: require('../../assets/images/13_xuegao/left.jpg'),
          leftName: '八喜',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/13_xuegao/right.jpg'),
          rightName: '梦龙',
          rightValue: 0,
          leftToken: '$MWLicdzTpq9$',
          rightToken: '$A9VicdzhOnD$'
        },
        {
          title: '小时候吃的最多的童年零食是哪个？',
          imgLeftUrl: require('../../assets/images/14_tongnianlingshi/left.jpg'),
          leftName: '咪咪',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/14_tongnianlingshi/right.jpg'),
          rightName: '旺旺仙贝',
          rightValue: 0,
          leftToken: '$IqxxcdBksCG$',
          rightToken: '$DR1AcdBP1LW$'
        },
        {
          title: '哪种无糖饮料更好喝？',
          imgLeftUrl: require('../../assets/images/15_wutangyingliao/left.jpg'),
          leftName: '元气森林气泡水',
          leftValue: 0,
          imgRightUrl: require('../../assets/images/15_wutangyingliao/right.jpg'),
          rightName: '零度无糖可乐',
          rightValue: 0,
          leftToken: '$ufgPcdBNia9$',
          rightToken: '$tcPScdBr5Vq$'
        }
        // {
        //   title: '浙江杭帮菜，你更爱哪个？',
        //   imgLeftUrl: require('../../assets/images/img01.png'),
        //   leftName: '1111',
        //   imgRightUrl: require('../../assets/images/img02.png'),
        //   rightName: '222',
        // }
      ]
    }
  },

  computed: {
    toPercent(item) {
      return function(item) {
        // let total = item.leftValue + item.rightValue;
        if (item.leftPrecent == 0 || item.leftPrecent + item.rightValue == 0) {
          return {
            leftPrecent: 0 + '%',
            rightPrecent: 0 + '%'
          }
        }
        return {
          // Math.round(num / total * 10000) / 100.00 + "%"
          leftPrecent: Math.round((item.leftValue / (item.leftValue + item.rightValue)) * 10000) / 100.0 + '%',
          rightPrecent: Math.round((item.rightValue / (item.leftValue + item.rightValue)) * 10000) / 100.0 + '%'
        }
      }
    }
  },

  mounted() {},

  methods: {
    handleChoose(index) {
      console.log(index)
    },
    onCopy(e) {
      window.location.href = 'taobao://';
      console.log(e);
    },
    onError(e) {
      console.log(e);
    },
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  background: #f5f5f5;
  .swiper-container {
    height: 100vh;
    .swiper-slide {
      height: 936px;
      margin: 30px 0;
    }
  }
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .card-item {
    background: #ffffff;
    margin: 30px 0;
    opacity: 1;
    border-radius: 8px;
    &.filter {
      // filter: blur(5px);
    }
    .item-header {
      height: 50px;
      font-size: 36px;
      font-family: PingFangSC-Medium;
      line-height: 50px;
      color: #333333;
      opacity: 1;
      padding: 36px 29px 29px;
    }
  }
  .item-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .mask {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background: #000000;
      opacity: 0.31;
    }
    .item-content-left,
    .item-content-right {
      position: relative;
      width: 344px;
      height: 697px;
    }
    .vote {
      position: absolute;
      bottom: 0;
      .line {
        position: relative;
        height: 392px;
        width: 14px;
        // background: #CACBCC;
        opacity: 1;
        border-radius: 14px 14px 0px 0px;
        margin: 0 auto;
        .line-true {
          position: absolute;
          bottom: 0;
          width: 14px;
          border-radius: 14px 14px 0px 0px;
          background: #000000;
          &.active {
            background: #ff313a;
          }
          &.nor {
            background: #cacbcc;
          }
          .percent {
            position: absolute;
            height: 35px;
            font-size: 30px;
            font-family: DIN Alternate;
            font-weight: bold;
            line-height: 35px;
            color: #ffffff;
            opacity: 1;
            top: -55px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .item-content-left {
      .tag {
        left: 70px;
        top: 105px;
        position: absolute;
        height: 38px;
        background: #f1f2f3;
        border-radius: 6px;
        line-height: 38px;
        border-radius: 6px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #151a30;
        padding: 0 10px;
      }
      .vote {
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .item-content-right {
      .tag {
        right: 60px;
        top: 26px;
        position: absolute;
        height: 38px;
        background: #f1f2f3;
        border-radius: 6px;
        line-height: 38px;
        border-radius: 6px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #151a30;
        padding: 0 10px;
      }
      .vote {
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .van-image {
      height: 100%;
    }
  }
  .item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 77px 30px 68px;
    .footer-btn {
      width: 183px;
      height: 64px;
      line-height: 64px;
      border: 1px solid #fe6b50;
      text-align: center;
      opacity: 1;
      border-radius: 45px;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      color: #fd6a52;
      opacity: 1;
    }
  }
}
</style>
