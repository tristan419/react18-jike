//用户相关的所有请求
//1.登录请求
import { request } from '@/utils/request'   

export function loginAPI(FormData) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: FormData
  })
}

export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}