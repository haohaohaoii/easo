/**
 * 部门模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const depart = {
    //获取全部部门(分页)
    getDept(params) {
        return axios.get(`${base.localUrl}/admin/dept`, params)
    },
    //获取全部部门不分页
    getDeptlist() {
        return axios.get(`${base.localUrl}/admin/dept/list`)
    },
    //添加部门
    addDept(params) {
        return axios.post(`${base.localUrl}/admin/dept`, qs.stringify(params))
    },
    //根据部门id获取部门信息
    deptDetail(deptId) {
        return axios.get(`${base.localUrl}/admin/dept/${deptId}`)
    },
    //修改部门
    changeDeptitem(params, deptId) {
        return axios.put(`${base.localUrl}/admin/dept/${deptId}`, qs.stringify(params))
    },
    //删除部门
    deletDept(deptId) {
        return axios.delete(`${base.localUrl}/admin/dept/${deptId}`)
    }
}


export default depart