/**
 * 基站模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const site = {
    //根据企业ID获取所有站点信息接口
    formComsite(companyId) {
        return axios.get(`${base.localUrl}/admin/site/user/${companyId}`)
    },
    //获取全部基站(分页)
    getSiteall(params) {
        return axios.get(`${base.localUrl}/admin/site`, params)
    },
    //添加基站
    addSite(params) {
        return axios.post(`${base.localUrl}/admin/site`, qs.stringify(params))
    },
    //根据mn号查看基站信息
    getSiteitem(mn) {
        return axios.get(`${base.localUrl}/admin/site/${mn}`)
    },
    //修改站点
    changeSitedetail(params, mn) {
        return axios.put(`${base.localUrl}/admin/site/${mn}`, qs.stringify(params))
    }
}

export default site