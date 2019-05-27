import authHeader from './authHeader'

const fetchProtected = (path, headers, body, method, callBack) => {
  const data = {
    headers: {
      ...authHeader(),
      headers,
    },
    method,
    body,
  }

  fetch(path, data)
    .then((res) => res.json())
    .then((res) => callBack(res))
}

export default fetchProtected
