import axios from 'axios'
import { Message , MessageBox } from 'element-ui'
import store from '@/store'
// create an axios instance
const service = axios.create({
//  baseURL: process.env.BASE_API, // api的base_url
    baseURL: "http://fchaob.nething.com", // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
 
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
      const res = response.data
  
      // if the custom code is not 20000, it is judged as an error.
      if (res.status == 0 && res.msg=="校验失败，请重新登录") {
       // MessageBox.confirm('您已掉线,请重新登录', '确认登出', {
       //   confirmButtonText: '重登',
       //   cancelButtonText: '取消',
       //   type: 'warning'
       // }).then(() => {
       //   store.dispatch('user/resetToken').then(() => {
       //     location.reload()
       //   })
       // })
        // return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )

export default service
