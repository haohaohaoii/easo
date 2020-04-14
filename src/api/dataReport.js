/**
 * 部门模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const dReport = {
    //分页获取所有日报表
    getDaylist(params) {
        return axios.get(`${base.localUrl}/admin/report/day`, params)
    },
    //获取日报表详情
    getDayDetail(mn, params) {
        return axios.get(`${base.localUrl}/admin//report/day/detail/${mn}`, params)
    },
    //导出日报表
    exportDay(params) {
        return axios.get(`${base.localUrl}/admin/report/day/export`, params)
    },
    //分页获取所有月报表
    getMonthlist(params) {
        return axios.get(`${base.localUrl}/admin/report/month`, params)
    },
    //获取月报表详情
    getMonthDetail(mn, params) {
        return axios.get(`${base.localUrl}/admin//report/month/detail/${mn}`, params)
    },
    //分页获取所有年报表
    getYearlist(params) {
        return axios.get(`${base.localUrl}/admin/report/year`, params)
    },
}


export default dReport