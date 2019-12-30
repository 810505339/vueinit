import axios from 'axios';
import store from '@/store';
import router from "@/router";
import qs  from 'qs';

export  const http=axios.create({
    baseURL:'/api',
    timeout:2000,
})
/*get方法*/
export function get(url,params) {
    return new Promise((resolve, reject)=>{
        http.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
//封装的post方法
export function post(url,params) {
    return new Promise((resolve, reject)=>{
        http.post(url,params).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
    
}

http.interceptors.request.use(config=>{
     //每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token=store.state.token;//获取vuex中的token
    if(token) //判断token存在而且获取的token
    {
        config.headers.Authorization ="bearer "+ token

    }
    return config;

},err=>Promise.reject(err))

http.interceptors.response.use(response=>{
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }

},err=>{
        if(err.state){
            switch (err.state) {
                // 401: 未登录跳转到登录页面
                case 401:
                    console.log(`为登录状态码为401`)
                    router.replace({
                        path:'/login',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }  //设置路径登录以后返回
                    })
                    break;
                case 403:
                    console.log(`登录过期状态码为403`)
                    localStorage.removeItem('token');//清除token
                    store.commit('loginSuccess', null); //把登录成功设置成null
                    router.replace({
                        path:'/login',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }  //设置路径登录以后返回
                    })
                    break;
                case 500:
                    console.log('状态码为500，未找到该页面')
                    break;
                default:
                    console.log('未知错误');

            }
            return Promise.reject(error);
        }
})
