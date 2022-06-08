<template>
  <header>
    <Logo />
    <!-- bootstrap nav-pills 추가 -->
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- a링크태그대신 사용할 수 있는 컴포넌트 -->
        <!-- vue3에서는 파스칼케이스 컴포넌트도 허용 -->
        <!-- `active-class` type:String, default: "router-link-active" -->
        <!-- html 버튼 클릭해서 보면 기본값이 보이는데 그 값을 변경해줌 -->
        <!-- to는 어떻한 페이지로 이동할 것인지를 명시해 둘 수 있음 -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          class="nav-link"
          :class="{ active: isMatch(nav.path) }">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/ // '/movie'가 일치할 경우
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]) 

  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log('path',this.$route)
      // route내부에 있는 fullPath와 일치하는지
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>
