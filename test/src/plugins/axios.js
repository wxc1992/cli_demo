import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom';
import qs from 'qs'
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  async config =>{
    const token = localStorage.getItem('token');
    const tokenHead = localStorage.getItem('tokenHead');
    console.log(process.env.NODE_ENV)
    if(token){
      config.headers.common['authorization'] = tokenHead+token
    }
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)

//响应拦截
axios.interceptors.response.use(
  async response =>{
    let router=new Router();
    console.log('axios.interceptors.response',response)
    let {data} = response
    if(response.status === 400){
      // console.log('token 失败 跳转到login',router);
         localStorage.clear()
         window.location.href = `https://sso.i.wxblockchain.com/user/login?redirectUrl= https://sql.i.wxblockchain.com`
    }

    return response
  },
  error=>{
    return Promise.reject(error)
  }
)

React.axios = axios;//axios绑到对象包上
React.Component.prototype.axios = axios; // axios绑定到Component类的原型 组件|this.axios
window.axios = axios; //× 希望全局使用axios , 使用webpack 来配置
export default axios;
