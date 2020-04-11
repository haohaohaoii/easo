/**
 * 部门模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const dReport = {
    //分页获取所有日报表
    getDaylist(params) {
        return axios.get(`${base.localUrl}/admin/report/day`, params)
    },
    //获取日报表详情
    getDayDetail(mn, params) {
        return axios.get(`${base.localUrl}/admin//report/day/detail/${mn}`, params)
    },
    //导出日报表
    exportDay(params) {
        return axios.get(`${base.localUrl}/admin/report/day/export`, params)
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


export default dReport