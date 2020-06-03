/**
 * 留言模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const storep = {
    //全部模板列表(分页)
    getTemplist(params) {
        return axios.get(`${base.localUrl}/admin/reportTemplate`, params)
    },
    //获取模板详情
    getTempitem(spamId) {
        return axios.get(`${base.localUrl}/admin/reportTemplate/${spamId}`)
    },
    //留言回复
    spamReplay(params) {
        return axios.post(`${base.localUrl}/admin/board/boardReply`, qs.stringify(params))
    },
    //模板删除
    tepDelete(id) {
        return axios.delete(`${base.localUrl}/admin/reportTemplate/${id}`)
    }
}

export default storep