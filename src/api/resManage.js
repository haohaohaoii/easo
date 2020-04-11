/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const resManage = {

    //获取资源列表  -- 分页
    getManagelist(params) {
        return axios.get(`${base.localUrl}/admin/file`, params)
    },
    //添加资源 --  这个没有用到
    addNews(params) {

        return axios.post(`${base.localUrl}/admin/file`, qs.stringify(params))
    },

    //获取资源row行情
    getResI(id) {
        return axios.get(`${base.localUrl}/admin/file/${id}`)
    },
    //编辑修改资源 ----同第二个接口一样都没有用到
    changeResrow(id, params) {
        return axios.put(`${base.localUrl}/admin/file/${id}`, qs.stringify(params))
    },
    //删除资源
    deleteRes(id) {
        return axios.delete(`${base.localUrl}/admin/file/${id}`)
    }
}


export default resManage