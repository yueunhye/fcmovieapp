<template>
  <!-- 컴포넌트 실행될 수 있도록 연결. 전역화되어져있는 컴포넌트 -->
  <Header />
  <RouterView />
  <Footer />
</template>


<script>

import Header from '~/components/Header'
import Footer from '~/components/Footer'


export default {
  components: {
    Header,
    Footer
  }
}
</script>

