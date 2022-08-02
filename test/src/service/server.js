import axios from '../plugins/axios';

//获取用户信息

export function _loginOut(){
  return new Promise((resolve,reject)=>{
      axios.get('/api/v1/auth/log_out').then(result =>{
        resolve(result)
      }).catch( error =>{
        reject(error)
      })
  })
}
