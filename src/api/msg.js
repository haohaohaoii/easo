/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const msg = {
    //推送消息分页
    getMsglist(params) {
        return axios.get(`${base.localUrl}/admin/push`, params)
    },
    //消息详情
    getMsgitem(id) {
        return axios.get(`${base.localUrl}/admin/push/${id}`)
    },
    //删除消息
    delMsgitem(id) {
        return axios.delete(`${base.localUrl}/admin/push/${id}`)
    }
}


export default msg