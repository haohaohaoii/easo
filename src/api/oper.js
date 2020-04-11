/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const oper = {
    //获取运维部门所有列表 --不分页
    getOperall() {
        return axios.get(`${base.localUrl}/admin/mtDept/all`)
    },
    //获取运维部门所有列表 --不分页(省市区三级)
    getOperThird(params) {
        return axios.get(`${base.localUrl}/admin/mtDept/all`, params)
    },
    //获取运维部门所有列表  -- 分页
    getOperlist(params) {
        return axios.get(`${base.localUrl}/admin/mtDept`, params)
    },
    //获取省市区三级
    getArea(id) {
        return axios.get(`${base.localUrl}/admin/area/${id}`)
    },
    //添加运维部门
    addOper(params) {

        return axios.post(`${base.localUrl}/admin/mtDept`, qs.stringify(params))
    },

    //获取运维部门row行数据
    getOperitem(id) {
        return axios.get(`${base.localUrl}/admin/mtDept/${id}`)
    },
    //编辑修改运维部门行数据
    changeOperrow(id, params) {
        return axios.put(`${base.localUrl}/admin/mtDept/${id}`, qs.stringify(params))
    },
    //删除资源
    deleteOper(id) {
        return axios.delete(`${base.localUrl}/admin/mtDept/${id}`)
    }
}


export default oper