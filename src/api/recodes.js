/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const recodes = {

    //获取运维记录
    getRecodeslist(params) {
        return axios.get(`${base.localUrl}/admin/mtRecord`, params)
    },
    //获取类型
    getTypes() {
        let type = 'mt_action_type'
        return axios.get(`${base.localUrl}/admin/sys/${type}`)
    },
    //添加运维记录
    addRecodes(params) {

        console.log(qs.stringify(params))
        return axios.post(`${base.localUrl}/admin/mtRecord`, qs.stringify(params))

    },

    //获取运维人员row行数据
    getRecodesitem(id) {
        return axios.get(`${base.localUrl}/admin/mtRecord/${id}`)
    },
    //编辑修改运维人员行数据
    changemtRecordrow(id, params) {
        return axios.put(`${base.localUrl}/admin/mtRecord/${id}`, qs.stringify(params))
    },
    //删除运维人员
    deleteRecords(id) {
        return axios.delete(`${base.localUrl}/admin/mtRecord/${id}`)
    }
}


export default recodes