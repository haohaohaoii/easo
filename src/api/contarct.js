/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const contarct = {

    //获取运维合同所有列表--分页
    getTarctlist(params) {
        return axios.get(`${base.localUrl}/admin/mtContract`, params)
    },
    //获取省市区三级
    getArea(id) {
        return axios.get(`${base.localUrl}/admin/area/${id}`)
    },
    //添加运维合同
    addcon(params) {
        return axios.post(`${base.localUrl}/admin/mtContract`, qs.stringify(params))
    },

    //获取运维人员row行数据
    getTarctitem(id) {
        return axios.get(`${base.localUrl}/admin/mtContract/${id}`)
    },
    //编辑合同行数据
    changeTarctrow(id, params) {
        return axios.put(`${base.localUrl}/admin/mtContract/${id}`, qs.stringify(params))
    },
    //删除合同
    deleteTarct(id) {
        return axios.delete(`${base.localUrl}/admin/mtContract/${id}`)
    }
}


export default contarct