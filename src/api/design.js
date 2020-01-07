import request from '@/utils/request'

export function getTempleteListsApi() {
	return request({
		url: 'design/getTempleteLists',
		method: 'get',
	})
}

export function getProductCate() {
	return request({
		url: 'design/getProductCate',
		method: 'get',
	})
}

export function getTemplateDetail(id) {
	return request({
		url: 'design/getNxTemplateDetail',
		method: 'get',
		params: {
			id
		}
	})
}
export function getPageProduct4Select(page,cateId,keyword) {
	return request({
		url: 'design/getPageProduct4Select',
		method: 'get',
		params: {
			page,cateId,keyword
		}
	})
}
export function getCustomersPages(page,keyword) {
	return request({
		url: 'design/getCustomersPages',
		method: 'get',
		params: {
			page,keyword
		}
	})
}
export function getSysList() {
	return request({
		url: 'design/getSysList',
		method: 'get',
	})
}

export function createPlan(data) {
	return request({
		url: 'design/createPlan',
		method: 'post',
    data
	})
}
export function updatePlan(data) {
	return request({
		url: 'design/updatePlan',
		method: 'post',
    data
	})
}
export function getPlanDetail(id) {
	return request({
		url: 'design/getPlanDetail',
		method: 'get',
    params:{ id }
	})
}
export function getSysDetail(id) {
	return request({
		url: 'design/getSysDetail',
		method: 'get',
    params:{ id }
	})
}
