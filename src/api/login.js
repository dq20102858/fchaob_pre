import request from '@/utils/request'

export function login(data) {
	
return request({
    url: '/login/index',
    method: 'post',
    data
  })
}

export function getInfo(id) {
	
return request({
    url: '/login/getUserInfo',
    method: 'get',
    params:{id}
  })
}

export function logout(id) {
	
return request({
    url: '/login/logout',
    method: 'get',
    params:{id}
  })
}

export function register(data) {
	
return request({
    url: '/login/register',
    method: 'post',
    data
  })
}

export function getSendSms(phone) {
	
return request({
    url: '/login/getSendSms',
    method: 'get',
	params:{ phone }
  })
}

export function getVerify() {
	
return request({
    url: '/common/verify',
    method: 'get',
  })
}

export function checkCaptcha(data) {
	
return request({
    url: '/common/checkCaptcha',
    method: 'post',
    data
  })
}