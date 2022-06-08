<template>
  <!-- vue에서 제공하는 a링크태그. a링크로 자동변환됨. to에는 경로 -->
  <Router-link
    to="/"
    class="logo">
    <span>OMDbAIP</span>.DOM
  </Router-link>
</template>


<style lang="scss" scoped>

  .logo {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    //$어디서?? scss폴더에 있는 bootstrap패키지 variables에서가져오는것 
    color: $black;
    text-decoration: none;
    &:hover {
      color: $black;
    }
    span {
      color: $primary;
    }
  }
</style>
