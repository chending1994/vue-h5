import api from './index'
import qs from 'qs'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  // https://support.miniprogramhacker.cn/test/rest/behaviorRecord/insert
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.UserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}

// let params = {typeId:5};
// params['userId'] = '12323';
// params['page'] = '投票项标签';

// 用户名称 get 方法
export function behaviorRecord_gotoBuy(data) {
  return request({
    url: 'test/rest/behaviorRecord/insert',
    method: 'post',
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    hideloading: true
    // baseApi: 'https://support.miniprogramhacker.cn/test/rest/'
  })
}

export function behaviorRecord_like(data) {
  return request({
    url: 'test/rest/behaviorRecord/insert',
    method: 'post',
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    hideloading: true
    // baseURL: 'https://support.miniprogramhacker.cn/test/rest/'
  })
}

export function getSubfieldPageList(params) {
  return request({
    url: 'test/rest/subfield/pageList',
    method: 'get',
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    params,
    hideloading: true
    // baseURL: 'https://support.miniprogramhacker.cn/test/rest/'
  })
}