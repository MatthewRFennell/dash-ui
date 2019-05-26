const fetchProtected = (path, headers, body, method, callBack) => {

    let data = {
        headers: headers,
        method: method,
        body: body
    }

    console.log(data)

    fetch(path, data).then(res => res.json()).then(res => callBack(res))
}

export default fetchProtected