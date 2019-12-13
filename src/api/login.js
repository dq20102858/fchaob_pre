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
