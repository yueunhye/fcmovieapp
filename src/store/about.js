export default {
  //store의 하나의 모듈의 될 수 있도록
  namespaced: true,
  // state 왜 함수? 참조형데이터라 데이터불변성을 유지해야하기 때문에
  // state: () => {return {}} /return,{}생략가능함. 중괄호시작하니까 소괄호로 묶어서
  state: () => ({
    name: 'Sunny',
    email: '123123@gmail.com',
    blog: 'https://yusunny.tistory.com/',
    phone: '010-1122-2233',
    image: 'https://blog.kakaocdn.net/dn/dGQrpG/btrEiwMLDC6/1hlBiSzg1IuJ2zmvZr96B1/img.gif'
  })
}