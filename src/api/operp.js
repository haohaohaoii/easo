/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const operp = {
    //获取运维人员所有列表 --不分页
    getOperpAll() {
        return axios.get(`${base.localUrl}/admin/mtUser/all`)
    },
    //获取运维人员所有列表 -- 分页
    getOperplist(params) {
        return axios.get(`${base.localUrl}/admin/mtUser`, params)
    },
    //获取省市区三级
    getArea(id) {
        return axios.get(`${base.localUrl}/admin/area/${id}`)
    },
    //添加运维人员
    addOperp(params) {

        return axios.post(`${base.localUrl}/admin/mtUser`, qs.stringify(params))
    },

    //获取运维人员row行数据
    getOperpitem(id) {
        return axios.get(`${base.localUrl}/admin/mtUser/${id}`)
    },
    //编辑修改运维人员行数据
    changeOperprow(id, params) {
        return axios.put(`${base.localUrl}/admin/mtUser/${id}`, qs.stringify(params))
    },
    //删除运维人员
    deleteOperp(id) {
        return axios.delete(`${base.localUrl}/admin/mtUser/${id}`)
    }
}


export default operp