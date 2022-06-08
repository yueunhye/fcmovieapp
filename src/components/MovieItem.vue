<!-- ID중복제거. lodash -> uniqBy 배열데이터 안에 객체데이터의 속성이름 기준으로 이름을 고유화 시켜줌 -->
<!-- npm i lodash -->

<template>
  <!-- 동일한 이미지 크기 적용시 backgroundImage속성을 사용하는게 더 편리함 -->
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading" 
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
  <!-- <div>{{ movie.imdbID }}</div> -->
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      // 참조형데이터는 데이터가변성 함수로만들어서 반환해줘야 문제가 안생김
      default: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // html의 무언가를 다룰 때는 mounted를 사용해주기
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const poster = this.movie.Poster
      // poster에 값이 없거나 n/a일 경우
      if(!poster || poster === 'N/A') { 
      this.imageLoading = false
      } else {
        await this.$loadImage(poster)
        this.imageLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.movie {
  // 값을 지정함으로써 변경사이즈가 유연하게 바뀔 수 있도록
  $width: 168px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  // backgroundImage로 불러왔기때문에 현재 지정한 movie크기를 덮을 수 있게 cover지정
  // 배경이미지를 요소의 더 넓은 너비에 맞춰서 출력함 
  background-size: cover;
  overflow: hidden;
  position: relative;

  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border: 6px solid $primary;
  }

  .info {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    text-align: center;
    // 뒷배경 흐림처리
    backdrop-filter: blur(10px);

    .year {
      color: $primary;
    }

    .title {
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
