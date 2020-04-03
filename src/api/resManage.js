/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const resManage = {

    //获取新闻列表  -- 分页
    getManagelist(params) {
        return axios.get(`${base.localUrl}/admin/file`, params)
    },
    //添加新闻
    addNews(params) {
        debugger
        return axios.post(`${base.localUrl}/admin/file`, qs.stringify(params))
    },
    //获取新闻分类
    getNewtypes() {
        let type = 'article_cate'
        return axios.get(`${base.localUrl}/admin/sys/${type}`)
    },
    //获取新闻row行情
    getNewsI(id) {
        return axios.get(`${base.localUrl}/admin/article/${id}`)
    },
    //编辑新闻
    editorNews(id, params) {
        return axios.put(`${base.localUrl}/admin/article/${id}`, qs.stringify(params))
    },
    //删除新闻
    deleteNews(id) {
        return axios.delete(`${base.localUrl}/admin/article/${id}`)
    }
}


export default resManage