import authHeader from './authHeader'

const fetchProtected = (path, headers, body, method, callBack) => {

  if (body) {
    if (headers) {
      headers['Content-Type'] = 'application/json'
    } else {
      headers = {
        'Content-Type': 'application/json',
      }
    }
  }

  const data: RequestInit = {
    headers: {
      ...authHeader(),
      ...headers,
    },
    method,
  }
  if (method.toLowerCase() !== 'get') {
    data.body =  JSON.stringify(body)
  }
  fetch(path, data)
    .then((res) => res.json())
    .then((res) => callBack(res))
}

export default fetchProtected
