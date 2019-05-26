import authHeader from "./authHeader";

const fetchProtected = (path, headers, body, method, callBack) => {

    let data = {
        headers: {
            ...authHeader(),
            headers
        },
        method: method,
        body: body
    }

    fetch(path, data).then(res => res.json()).then(res => callBack(res))
}

export default fetchProtected