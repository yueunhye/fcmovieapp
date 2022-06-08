<!-- inner역할을 해서는 bootstrap의 container. 기본적인 브레이크 포인트가 적용되있음 -->
<!-- https://getbootstrap.kr/docs/5.1/layout/containers/ -->
<template>
  <div class="container">
    <h1>
      <span> OMDb API</span><br />
      THE OPEN <br />
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>
<!-- scoped사용이유 -->
<!-- 1. 이름이 겹치지 않는 장점 -->
<!-- 2. 태그 선택자만 사용가능 -->
<!-- 3. 해당영역에서만 적용 가능 -->
<style lang="scss" scoped>

  .container {
    padding-top: 40px;
  }
  h1 {
    line-height: 1;
    font-family: 'Oswald', sans-serif;
    font-size: 80px;
    span {
      color: $primary;
    }
  }
  p {
    margin: 30px 0;
    color: $gray-600;
  }
</style>
