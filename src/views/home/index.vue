<!-- home -->
<template>
  <div class="index-container" @touchstart="isDo(true)">
    
    <div class="swiper-box list">
      <swiper class="box-container" :options="swiperOption" ref="mySwiper">
        <swiper-slide
          v-for="(item, index) in cardlist"
          :key="index"
        >
        <div :class="['card-item', index != currentIndex ?  'filter' : '']" :key="index">
          <div class="item-header">{{ item.title }}</div>
          <div class="item-content">
            <div class="item-content-left" @click="handleChoose(index, 0)">
              <van-image fit="cover" :src="item.leftImage" />
              <div :class="item.leftActive||item.rightActive?'mask2':'mask'"></div>
              <div class="tag">#{{item.leftName}}#</div>
              <div class="vote" v-if="item.hasChoose">
                <div class="line nor">
                  <div
                    :class="['line-true', item.leftActive ? 'active' : 'nor']"
                    :style="{ height: toPercent(item).leftPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).leftPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content-right" @click="handleChoose(index, 1)">
              <van-image fit="cover" :src="item.rightImage" />
              <div :class="item.leftActive||item.rightActive?'mask2':'mask'"></div>
              <div class="tag">#{{item.rightName}}#</div>
              <div class="vote" v-if="item.hasChoose">
                <div class="line active">
                  <div
                    :class="['line-true', item.rightActive ? 'active' : 'nor']"
                    :style="{ height: toPercent(item).rightPrecent }"
                  >
                    <div class="percent">{{ toPercent(item).rightPrecent }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-footer">
            <!-- <a class="footer-btn" @click="handleBuy(item, 0)" href="tbopen://m.taobao.com/tbopen/index.html">去购买</a>
            <a class="footer-btn" @click="handleBuy(item, 1)" href="tbopen://m.taobao.com/tbopen/index.html">去购买</a> -->
            <a class="footer-btn" href="tbopen://m.taobao.com/tbopen/index.html" @click="handleBuy(item, 0)" 
            v-clipboard:copy="item.leftToken" v-clipboard:success="onCopy" v-clipboard:error="onError">去购买</a> 
            <a class="footer-btn" href="tbopen://m.taobao.com/tbopen/index.html" @click="handleBuy(item, 1)" 
            v-clipboard:copy="item.rightToken" v-clipboard:success="onCopy" v-clipboard:error="onError">去购买</a>
          </div>
        </div>

        </swiper-slide>
      </swiper>
    </div>

    <!-- <div v-show="isShow" class="arrow">
      <van-image fit="cover" :src="imgArrow" />
    </div> -->

    <!-- <div v-show="isShow" class="top_arrow">
      <div class="title">下滑查看更多精彩内容</div>
      <div class="img">
        <van-image width="66" :src="downArrow" alt="" srcset=""></van-image>
      </div>
    </div> -->
    <!-- <div v-show="isShowDown" class="down_arrow">
      <div class="title">向下更多精彩内容</div>
      <div class="img">
        <van-image width="66" :src="downArrow" alt="" srcset=""></van-image>
      </div>
    </div> -->

  </div>
</template>

<script>


import { behaviorRecord_like, getSubfieldPageList, behaviorRecord_gotoBuy } from '@/api/user.js'

export default {
  data() {
    
    let that = this;
    return {
      count:0,
      currentIndex:that.getRandomInt(1,30),
      userId: null,

      swiperOption: {
        notNextTick: true,
        direction: 'vertical',
        observer:true,
        // slidesPerView: 2,
        slidesPerView: 'auto',
        // loopedSlides: 1,
        centeredSlides: true,
        // loop: true, // 循环
        // autoHeight: true,
        // autoplay: {
        //   // 自动播放
        //   delay: 1000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        // loop: true, // 循环
        // directionType: 'horizontal', // 方向
        observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，
        // 开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',//分式指示器  
        },
        initialSlide: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on:{
          slideChange:function(){
            if(that.currentIndex != this.realIndex){
              that.currentIndex = this.realIndex;
              console.log(that.currentIndex)
              that.toLook()
            }
          }
        }
      },
      imgArrow: require('../../assets/images/arrow.png'),
      topArrow: require('../../assets/images/top_arrow.png'),
      downArrow: require('../../assets/images/down_arrow.png'),
      cardlist: [
        // {
        //   title: '谁才是真正的螺蛳粉之王？',
        //   imgLeftUrl: 'https://supimage.miniprogramhacker.cn/uploadPic/a34fcd06283d414cdbde8593b65cd815',
        //   leftName: '好欢螺',
        //   leftValue: 100,
        //   imgRightUrl: 'https://supimage.miniprogramhacker.cn/uploadPic/934f4f1bf573386c9d05c447d07dee9b',
        //   rightName: '螺霸王',
        //   rightValue: 100,
        //   leftToken: '$Tv7KcWc4EsQ$',
        //   rightToken: '$UnjDcWTRwDy$',
        //   leftActive: false,
        //   rightActive: false,
        //   hasChoose: false
        // }
      ],

      lastTime: null, //最后一次点击的时间
      currentTime: null, //当前点击的时间
      timeOut: 5 * 1000, //设置超时时间：
      isShow: false,
      isShowDown: true,
      timeOutEvent: 0
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

  created() {
    this.lastTime = new Date().getTime();
    this.isDo(false);
    this.loadSubfieldPageList();

    const type = this.$route.query.type
    console.log("type : " + type);
  
    if(type > 0){
      this.toLoadLife(type)
    }
  },
  destroyed: function () {
    console.log("我已经离开了！");
    // this.stopTimer();

 },
  mounted(e) {
    let ip = localStorage.getItem('Ip');
    this.ip = ip;
    // let reg = new RegExp('.', 'g');
    let numIp = ip.replace(/\./g, '');
    this.userId = numIp.substring(numIp.length-9); // 取后9位作为userId
    this.userId = this.getRandomInt(1,2147483640)
    this.toEnter();

    
    // this.count ++;
    // console.log("mounted count : " + this.count);
    // if(this.count == 1){
    //   window.location.href = 'https://m.taobao.com/tbopen/index.html';
    // }else{
    //   setInterval(()=>{
    //      window.location.href = 'alipays://platformapi/startapp?appId=2021001189605033&page=pages/listPK/listPK';
    //   },1000)
    // }


  },

  
  methods: {
    getTime(){
      setInterval(()=>{
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString();
      },1000)
    },

    isDo(flag) {
      if(flag) {
        this.isShow = false;
      }
      if(!this.isShow) {
        clearTimeout(this.timeOutEvent);
        // this.timeOutEvent = setTimeout(() => {
        //   this.isShow = true;
        //   this.swiperOption.autoplay.stop();
        // }, this.timeOut);
      }

      this.currentTime = new Date().getTime(); //记录这次点击的时间
      // if((this.currentTime - this.lastTime) > this.timeOut && this.isShow) {  //判断上次最后一次点击的时间和这次点击的时间间隔是否大于设置时间
      // } else {
      //   this.isShow = false;
      //   this.lastTime = new Date().getTime(); //如果在设置内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      // }
    },
    

    async handleChoose(index, type) {
      console.log(index);
      if(!this.cardlist[index].hasChoose) {
        if(type == 0) {
          this.cardlist[index].leftActive = true;
          
          this.cardlist[index].leftValue = this.cardlist[index].leftValue + this.getRandomInt(-50,100);
        }
        if(type == 1) {
          this.cardlist[index].rightActive = true;
          this.cardlist[index].rightValue = this.cardlist[index].rightValue + this.getRandomInt(-50,100);
        }
        let pageName = type == 0 ? this.cardlist[index].leftName : this.cardlist[index].rightName;

        const data = await behaviorRecord_like({
          active: 'like',
          typeId: 5,
          page: pageName,
          userId: parseInt(this.userId)
        });
        console.log(data);
        if(data.code == 1) {
          this.$toast({
            message: '投票成功',
            icon: 'passed',
          });
        } else {
          this.$toast({
            message: data.msg,
            icon: 'fail',
          });
        }
        this.cardlist[index].hasChoose = true;
      } else {
        this.$toast({
          message: '已投票',
          icon: 'fail',
        });
      }
      
    },
    async onCopy(e) {
      // window.location.href = 'tbopen://m.taobao.com/tbopen/index.html';
      // window.location.href = 'tbopen://m.taobao.com/tbopen/index.html?spm=a2o5r.9022594.0.0&action=ali.open.nav&module=h5&h5Url=https%3A%2F%2Fdetail.tmall.com%2Fitem.htm%3Fspm%3Da2o5r.9022594.0.0%26id%3D610147788029&appkey=wild_baichuanpingtai_appkey&backURL=__back_url__';
      // alert('商品淘口令已复制，请打开淘宝APP，前往购买！');

    },
    async handleBuy(item, type) {
      let pageName = type == 0 ? item.leftName : item.rightName;
      const data = await behaviorRecord_gotoBuy({
        active: 'gotoBuy',
        typeId: 6,
        page: pageName,
        userId: parseInt(this.userId)
      });
    },
    async toLook() {
      if(this.currentIndex){
        let pageName = this.cardlist[this.currentIndex].title
        const data = await behaviorRecord_gotoBuy({
          active: 'look',
          typeId: 7,
          page: pageName,
          userId: parseInt(this.userId)
        });
      }
      
    },
    async toEnter() {
      const data = await behaviorRecord_gotoBuy({
        active: 'enter',
        typeId: 8,
        page: this.ip,
        userId: parseInt(this.userId)
      });
    },

    async toLoadLife(type) {
      console.log("toLoadLife : " + type)
      const data = await behaviorRecord_gotoBuy({
        active: 'loadLife',
        typeId: 1,
        page: type,
        userId: 11111
      });
    },

    onError(e) {
      console.log(e);
    },
    reload(index){
      this.currentIndex = index;
    },
    getRandomInt(min, max) {
        // 以下函数返回 min（包含）～ max（包含）之间的数字：
      this.data = Math.floor(Math.random() * (max - min + 1)) + min
      return this.data
    },
    async loadSubfieldPageList() {
      const data = await getSubfieldPageList();
      if(data.code == 1) {
        this.cardlist = data.data;
      } else {
        this.$toast({
          message: data.msg,
          icon: 'fail',
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  position: relative;
  background: #f5f5f5;
  .swiper-container {
    height: 100vh;
    .swiper-slide {
      height: 900px;
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
      filter: blur(5px);
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
      opacity: 0.06;
    }
    .mask2 {
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
  .arrow {
    transition: 0.3s;
    width: 200px;
    height: 200px;
    font-size: 0;
    position: absolute;
    top: calc(50% - 100px);
    // top: 0;
    left: calc(50% - 100px);
    z-index: 1;
    animation: 1.5s ease-in alternate infinite rocket;
  }

  .top_arrow, .down_arrow {
    width: 240px;
    position: absolute;
    left:calc(50% - 120px);
    text-align: center;
    animation: 1.5s ease-in alternate infinite arrow;
    .title {
      font-weight: 500;
      color: #000000;
    }
  }
  .top_arrow {
    top: 10px;
    z-index: 1;
    .title {
      margin-bottom: 10px;
    }
  }
  .down_arrow {
    bottom: 10px;
    z-index: 1;
    .title {
      margin-bottom: 10px;
    }
  }
}

@keyframes rocket {
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
  100% {
    -webkit-transform: translateY(-300);
    transform: translateY(-300px);
  }
}
@keyframes arrow {
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
  100% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
</style>
