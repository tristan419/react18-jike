//axios封装处理

//根域名配置
//拦截时间
//请求拦截器//响应拦截器

import axios from 'axios'
import { getToken } from './token'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
  //操作这个config注入token数据
  //获取token
  //按照后端要求的格式注入token
  const token = getToken() //获取token
  if(token) {
    config.headers.Authorization = `Bearer ${token}` //注入token
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { request }