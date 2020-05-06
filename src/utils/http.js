/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Message, MessageBox } from 'element-ui';
import { showLoading, hideLoading } from './loading';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 创建axios实例
var instance = axios.create({ timeout: 1000 * 15 });

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''

//     for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = (message) => {

    MessageBox.confirm(message + ',请重新登陆！', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        store.commit("getToken", '');
        store.commit("getAdminid", '');
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    }).catch(() => {
        Message.error('您无法使用此系统，请重新登陆');
    })
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, message) => {
    // 状态码判断
    switch (status) {
        case -1:
            toLogin(message);
            break;
        case -2:
            Message.error(message);
            break;
        default:
            console.log(message)
    }
}

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(

    config => {
        showLoading();
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token  
        const token = localStorage.getItem('token')
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzgxMDE0ODcsInVzZXJuYW1lIjoiYWRtaW4xIn0.Qz1MVonBD73y4qNAplWp6wCUiD32T7PrhHgTaK09U7Aasdasdasd'
        token && (config.headers.Authorization = token);
        return config;
    },

    error => Promise.error(error)
)
// 响应拦截器
instance.interceptors.response.use(
    // //请求成功
    function (res) {
        hideLoading();
        NProgress.done();
        if (res.status == 200) {
            if (res.data.code == -1) {   //token校验错误
                errorHandle(res.data.code, res.data.message);
            } else if (res.data.code == -2) { //其他错误
                errorHandle(res.data.code, res.data.message);
            }
            return Promise.resolve(res)
        } else {

            return Promise.reject(res)
        }
    },
    // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失败
    error => {
        hideLoading();
        NProgress.done();
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            Message.error(response.data.message);
            return Promise.reject(response);

        } else {
            //请求超时
            //断网处理
            if (!window.navigator.onLine) {
                Message.error('本地未联网,请联网后再登录!');
            } else {
                Message.error('服务器请求超时,请稍后再试');
            }
        }
    });

export default instance;