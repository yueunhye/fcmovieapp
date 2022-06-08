exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'SUNNY',
      age: 92,
      email: '1233123@gmail.com'
    })
  }
}