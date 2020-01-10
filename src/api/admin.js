/**
 * 角色模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const roles = {
    //获取全部角色
    getAllroles(params) {
        return axios.get(`${base.localUrl}/admin/role`, params)
    },
    //添加角色
    addRole(params) {
        qs.stringify(params)
        return axios.post(`${base.localUrl}/admin/role`, qs.stringify(params))
    }
}


export default roles