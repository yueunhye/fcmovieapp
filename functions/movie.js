//node.js환경
const axios = require('axios')
const {
  OMDB_API_KEY
} = process.env

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const {
    title,
    type,
    page,
    year,
    id
  } = payload
  // const OMDB_API_KEY = '7035c60c'
  // 삼항연산자. searchMovieWithId 영화정보 가져올때 
  const url = id ?
    `https://www.omdbapi.com?apikey=${OMDB_API_KEY}&i=${id}` :
    `https://www.omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const {
      data
    } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }

}