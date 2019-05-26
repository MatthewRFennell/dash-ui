export default () => {
    // return authorization header with jwt token
    let token = localStorage.getItem('userToken');

    console.log(token)

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}