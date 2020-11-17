import axios from 'axios'
import router from '../../router'

const http = axios.create({
    baseURL: '/api'
});

//请求拦截(一般用于在请求头加信息)
http.interceptors.request.use(req => {
    let userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
    req.headers.authorization = userInfo.token;
    //返回请求信息
    return req;
})

//响应拦截
http.interceptors.response.use(res => {
    if (res.data.code == 403) {
        router.push('/login');
        return res;
    } else if (res.data.code == 500) {
        router.push('/login');
        return res;
    } else {
        return res
    }
})


export default http