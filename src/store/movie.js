import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
const _defaultMessage = 'Search for the movie title!'
// 영화검색관련 
// namespaced 하나의 모듈화 되서 사용할 수 있다라는걸 명시적으로 나타내는것
export default {
  // module
  namespaced: 'true',
  // data 상태
  // movies: [] 데이터불변성
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  getter: {
    // 매개변수로 state를 넣어줘야 state안에있는 movies를 쓴다는걸 인식함
  },
  // methods
  // mutations(변이)에서만 수정권한을 유일하게가지고있음.변경가능
  // Store Mutations 실행할 때는 commit() 메소드
  // 변이메소드
  mutations: {
    updateState(state, payload) {
      //['movies', 'message', 'loading'] state.movies 에 = payload.movies 를 할당
      Object.keys(payload).forEach(key => {
        // 대괄호표기법
        // state['movies'] = payload['movies'] forEach key에 의해 차례로 들어가기때문에 key로 변경 가능
        state[key] = payload[key]

      })
    },
    //초기화
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // actions는 비동기로 처리됨. state를 불러오는게 아니라 context로 사용
  // Store actions 실행할 때는 dispatch() 메소드
  // context객체구조분해하기 전
  // serachMovies(context) {
  //   context.state
  //   context.getters
  //   context.commit
  // }
  // 후 -> ({state, getters, commit})
  //payload??? serachMovies가 실행될 때 인수로 들어온 어떠한 특정한 데이터들을 두번째 매개변수로 사용할 수 있음
  actions: {
    async searchMovies({
      state,
      commit
    }, payload) {
      if (state.loading) {
        return
      }
      // 최초실행이 flase라 실행안돼고 true로 넘어감, finally에 false가 써있으니 반복
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const {
          Search,
          totalResults
        } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults)
        console.log(typeof totalResults) //string

        const total = parseInt(totalResults, 10) //change number
        const pageLength = Math.ceil(total / 10)

        //추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              // 내부변수 page
              page
            })
            const {
              Search
            } = res.data
            commit('updateState', {
              //기존 state에 들어간 데이터가 덮어지지않게 하기위해서 전개연산자
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          // message: message
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithId({
      state,
      commit
    }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }

}
// _는 현재파일내부에서만 사용
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
  // const {
  //   title,
  //   type,
  //   page,
  //   year,
  //   id
  // } = payload
  // const OMDB_API_KEY = '7035c60c'
  // // 삼항연산자. searchMovieWithId 영화정보 가져올때 
  // const url = id ?
  //   `https://www.omdbapi.com?apikey=${OMDB_API_KEY}&i=${id}` :
  //   `https://www.omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then((res) => {
  //       if (res.data.Error) {
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message)
  //     })
  // })
}