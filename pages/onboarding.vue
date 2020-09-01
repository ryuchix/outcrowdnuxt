<template>
    <div class="onboarding">
        <div class="skip" @click="$router.replace('login')">Skip</div>
        <swiper ref="mySwiper" class="swiper" 
            :options="swiperOption"
            @slideChange="onSwipe">
            <swiper-slide v-for="item in items" :key="item.id">
                <img :src="item.src" alt="Onboarding image">
                <div class="head">{{ item.heading }}</div>
                <div class="subhead">{{ item.text }}</div>
                <div class="my-2 get-started" v-if="item.button">
                    <v-btn color="primary" large @click="$router.replace('login')">Get started</v-btn>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  layout: 'fullpage',
  head: {
    title: 'Onboarding',
  },
  components: {
      Swiper, SwiperSlide
  },
  data(){
    return {
      getSlide: 0,
      lastSlide: false,
      swiperOption: {
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        onSlideChangeEnd:function(){
            this.onSwipe()
        }
      },
      items: [
        {
            id: 1,
            heading: 'Attend events',
            text: 'Dignissim magnis dictum at ornare egestas. Non et proin elementum risus magna dignissim eu',
            src: require('@/static/images/slide1.png'),
        },
        {
            id: 2,
            heading: 'Make friends',
            text: 'Dignissim magnis dictum at ornare egestas. Non et proin elementum risus magna dignissim eu',
            src: require('@/static/images/slide2.png'),
        },
        {
            id: 3,
            heading: 'One on one chat',
            text: 'Dignissim magnis dictum at ornare egestas. Non et proin elementum risus magna dignissim eu',
            src: require('@/static/images/slide3.png'),
            button: true,
        },
      ]
    }
  },
  methods: {
      onSwipe() {
          let lastVisibleItem = this.activeIndex;
          if (lastVisibleItem == 3) {
              this.lastSlide = true;
          }
      }
  },
  computed: {
      swiper() {
          return this.$refs.mySwiper.swiper
      }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.onboarding {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  height: 100vh;
  .skip {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: #434399;
    cursor: pointer;
    z-index: 10;
    &:hover {
      background-color: #eee;
    }
  }
  .head {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #434399;
    padding: 20px 10px 0px 10px;
  }
  .subhead {
    font-size: 16px;
    line-height: 19px;
    color: #434399;
    padding: 10px 20px;
  }
  .swiper {
    padding-top: 5em;
     height: calc(450px + 13em);
    //height: 100%;
    width: 100%;
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
  }
  .get-started {
    position: relative;
    top: 5em;
    margin-bottom: 1em;
    text-align: center;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    margin: 0 20px;
    button {
      background-color: #E24444 !important;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      border-radius: 50px;
      width: 100%;
    }
  }
  .swiper-pagination-bullets {
    bottom: 150px !important;
  }
  .swiper-pagination-bullet-active {
    border-radius: 10px !important;
    width: 30px !important;
    background: #E24444 !important;
  }
}    
</style>

