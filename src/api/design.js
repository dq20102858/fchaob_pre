import request from '@/utils/request'

export function getTempleteListsApi() {
  return request({
    url: 'design/getTempleteLists',
    method: 'get',
  })
}
