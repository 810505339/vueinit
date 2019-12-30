import { http,get, post, } from '@/utils/axios'

export const LoginApi=user=>post('/Login',user);
export const GetApi=()=>get('/Companies');
export const out=()=>post('/Login/out')