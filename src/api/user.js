/**
 * 用户模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const user = {
    //获取全部用户
    getUser(params) {
        return axios.get(`${base.localUrl}/admin/admin`, params)
    },
    //添加管理员
    addUser(params) {
        return axios.post(`${base.localUrl}/admin/admin`, qs.stringify(params))
    },
    //根据角色id查询角色信息
    getUseritem(userId) {
        return axios.get(`${base.localUrl}/admin/admin/${userId}`)
    },
    //修改用户信息
    changeUser(params, adminId) {
        return axios.put(`${base.localUrl}/admin/admin/${adminId}`, qs.stringify(params))
    },
    //删除用户信息
    deleteUseritem(adminId) {
        return axios.delete(`${base.localUrl}/admin/admin/${adminId}`)
    },
    changePawd(adminId, params) {  //修改密码
        return axios.put(`${base.localUrl}/admin/admin/${adminId}`, qs.stringify(params))
    }
}


export default user