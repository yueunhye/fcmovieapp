<!-- 스켈레톤 UI : ui의 뼈대를 만들어 주는 것 -->
<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <!-- Boolean데이터는 단순히 속성의 유무만 가지고도 값을 전달 가능 그래서 따로 값을 넣지 않아도됨 -->
    <div
      v-else
      class="movie-details">
      <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
        class="poster">
        <Loader 
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- 이름변경 -->
            <div
              v-for="{ Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <!-- 이미지고해상도 출력. AWS Lambda 실시간 리사이징-->
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('movie',[
      'theMovie',
      'loading'
    ])
  },
  created() {
    console.log('route', this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // index.js의 :hello
      id: this.$route.params.id
    })
  },
  // 이미지 리사이징
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if(!url || url === 'N/A') {
        this.imageLoading = false
        //1. return처리를 해줘야 아래코드 실행 안됨
        //2. return뒤에 값이 없으면 undefined가 반환됨
        //3. 백그라운드 이미지에 아무것도 존재하지 않게
        return ''
      }
      const src = url.replace(`SX${300}`, `SX${700}`)
      this.$loadImage(src)
        .then(()=> {
          this.imageLoading = false
        })
      return src  
    }
  }
}
</script>





<style lang="scss" scoped>
@import '~/scss/main';

// 스켈레톤 UI : ui의 뼈대를 만들어 주는 것 
.container {
  padding-top: 40px;
}

.skeletons {
  display: flex;

  .poster {
    $width: 500px;
    width: $width;
    height: $width * 3 / 2;
    margin-right: 70px;
    flex-shrink: 0;
    position: relative;
  }

  .specs {
    flex-grow: 1;
  }

  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;

    &.title {
      widows: 80%;
      height: 70px;
    }

    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }

    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }

    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
    display: flex;
    color: $gray-600;
    .poster {
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
      border-radius: 10px;
      background-color: $gray-200;
      background-size: cover;
      background-position: center;
      flex-shrink: 0;
    }
    .specs {
      flex-grow: 1;
      .title {
        color: $black;
        font-family: 'Oswald', sans-serif;
        font-size: 70px;
        line-height: 1;
        margin-bottom: 30px;
      }
      .labels {
        color: $primary;
        span {
          &::after {
            //가운데 점표시
            content: "\00b7";
            margin: 0 6px;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      .plot {
        margin-top: 20px;
      }
      .ratings {
        .rating-wrap {
          display: flex;
          .rating {
            display: flex;
            align-items: center;
            margin-right: 32px;
            img {
              height: 30px;
              flex-shrink: 0;
              margin-right: 6px;
            }
          }
        }
      }
      h3 {
        margin: 25px 0 6px;
        color: $black;
        font-family: 'Oswald', sans-serif;
        font-size: 20px;
      }
    }
    @include media-breakpoint-down(xl) {
      .poster {
        width: 300px;
        height: 300px * 3 / 2;
        margin-right: 40px;
      }
    }
    @include media-breakpoint-down(lg) {
      display: block;
      .poster {
        margin-right: 40px;

      }
    }
    @include media-breakpoint-down(md) {
      .specs {
        .title {
          font-size: 50px;
        }
        .ratings {
          .rating-wrap {
            display: block;
            .rating {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
</style>
