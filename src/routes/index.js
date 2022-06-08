// 페이지를 구분할때 쓰는 기술: router
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash, 
  // https://google.com/#/search
  // 메인도메인 뒤쪽에 # 붙여 접근. 사용하는이유? 
  // 특정페이지에서 새로고침했을때 페이지를 찾을 수 없다는 메세지 방지
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    top: 0
  }),
  // 페이지들을 구분
  // ex) https://google.com의 가장메인페이지로 이동하겠다
  // ex) https://google.com/
  // ex) https://google.com/about
  routes: [{
      // 페이지 구분 경로 /무엇을의미?
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})