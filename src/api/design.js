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

export function getTemplateDetail() {
  return request({
    url: 'design/getNxTemplateDetail',
    method: 'get',
  })
}
export function getPageProduct4Select() {
  return request({
    url: 'design/getPageProduct4Select',
    method: 'get',
  })
}






