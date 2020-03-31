/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const news = {

    //获取新闻列表  -- 分页
    getNewslist(params) {
        return axios.get(`${base.localUrl}/admin/article`, params)
    },
    //添加新闻
    addNews(params) {
        return axios.post(`${base.localUrl}/admin/article`, qs.stringify(params))
    },
    //获取新闻分类
    getNewtypes() {
        let type = 'article_cate'
        return axios.get(`${base.localUrl}/admin/sys/${type}`)
    }
}


export default news