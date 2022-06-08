<template>
  <Headline />
  <!-- Search와 MovieList는 형제요소여서 store로 엮어줘야함 -->
  <!-- Vuex 중앙집중식 상태관리 패턴. 라이브러리 이러한 방식을 store-->
  <Search />
  <MovieList />
</template>


<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>
