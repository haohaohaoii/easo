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
        return axios.post(`${base.localUrl}/admin/role`, qs.stringify(params))
    },
    //修改角色
    editorRole(params, roleId) {
        return axios.put(`${base.localUrl}/admin/role/${roleId}`, qs.stringify(params))
    },
    //根据角色id查看角色信息
    getRolemsg(roleId) {
        return axios.get(`${base.localUrl}/admin/role/${roleId}`)
    },
    //删除角色
    deleteRoles(roleId) {
        return axios.delete(`${base.localUrl}/admin/role/${roleId}`)
    }
}


export default roles