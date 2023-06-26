import axios from "axios";

//创建axios实例
const request = axios.create({
    // baseURL: 'http://43.154.64.188:8080',
    baseURL: 'https://82.156.137.114:8080',
    timeout: 50000,
})

//请求拦截
request.interceptors.request.use(
    (config) => {
        return config;
    }),(error)=>{
    return Promise.reject(error);
}


//响应拦截
request.interceptors.response.use((response)=>{
    return response;
}),(error)=>{
    //响应失败做什么
    return Promise.reject(error);
}

export default  request;