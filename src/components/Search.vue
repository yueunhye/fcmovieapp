<!-- Bootstap UI 가져와서 적용하기 핵심:input class="form-control" -->
<!-- Bootstap UI 가져와서 적용하기 핵심:class="form-select" -->
<!-- keyup.enter 엔터를 눌렀다 뗄 때 apply실행되게 -->
<!-- 검색을 한 후 검사창 Network -> Fetch/XHR -> Invert -> Header를 보면 요청정보를얻을 수 있음 -->
<!-- 응답결과는 Preview로 보면 보기편함. status: 200 상태정보잘 들어왔다는 뜻 -->
<!-- 화면에 내용을 출력할려고 보니까 형제컴포넌트여서 데이터 교환이 힘드네? 그래서 Vuex를 사용해야겠어!! 상태관리패턴 -->
<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply" />
    <div class="selects">
      <!-- $data 객체의 속성에 접근할 수 있습니다. -->
      <!-- $data는 아래있는 data()에 접근할수있다 title, type, number ...... -->
      <!-- 동적으로 접근을 해야되기때문에[filter] .표기법은 대괄호표기법으로 사용할 수 있기때문에 $data[filter.name] -->

      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <!-- option태그에 value라는 속성이 없는 경우 option태그가 가지고 있는 컨텐츠{{}}가 value가 될 수 있음
        if를 적용해주지 않으면 3곳에서 모두 All Years가 출력되 버림 -->
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
      <button
        class="btn btn-primary"
        @click="apply">
        Apply
      </button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        title: '',
        type: 'movie',
        number: 10,
        year: '',
        // v-for로 제어할려고 filters배열데이터는 총 3개의 객체데이터를 가지고 있음
        filters: [{
          name: 'type',
          items: ['movie', 'seriese', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // 반복문을 사용해 년도 생성
          items: (function () {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          }())
        }
        ]
      }
    },
    methods: {
      async apply() {
        this.$store.dispatch('movie/searchMovies', {
          title: this.title,
          type: this.type,
          number: this.number,
          year: this.year
        })
      }

      
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    > * {
      margin-right: 10px;
      font-size: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selects {
      display: flex;
      select {
        width: 120px;
        margin-right: 10px;
      &:last-child {
        margin-right: 0;
        }
      }
    }
    .btn {
      width: 120px;
      height: 50px;
      font-weight: 700;
      flex-shrink: 0;
    }
    @include media-breakpoint-down(lg) {
      display: block;
      input {
        margin-right: 0;
        margin-bottom: 10px;      
      }
      .selects {
        margin-right: 0;
        margin-bottom: 10px;
        select {
          width: 100%;
        }
      }
      .btn {
          width: 100%;
      }
    }
  }
</style>

