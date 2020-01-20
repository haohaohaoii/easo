/**
 * 留言模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const spam = {
    //全部留言列表(分页)
    getSpamlist(params) {
        return axios.get(`${base.localUrl}/admin/board`, params)
    },
    //根据留言信息，获取留言详情
    getSpamitem(spamId) {
        return axios.get(`${base.localUrl}/admin/board/detail/${spamId}`)
    },
    //留言回复
    spamReplay(params) {
        return axios.post(`${base.localUrl}/admin/board/boardReply`, qs.stringify(params))
    },
    //留言删除
    spamDelete(spamId) {
        return axios.delete(`${base.localUrl}/admin/board/${spamId}`)
    }
}

export default spam