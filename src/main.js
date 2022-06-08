import { createApp } from 'vue'
import App from './App.vue'
// 특정 폴더안에있는 index는 생략가능 
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'


// use메소드 현재 프로젝트 특정한 플러그인 연결시 사용하는 메소드
createApp(App)
  .use(store) //$store
  .use(router) //$route, $roueter
  .use(loadImage) //$loadImage
  .mount('#app')
