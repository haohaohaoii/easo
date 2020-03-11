/**
 * 数据模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const data = {

    //实时数据接口
    realData(params) {
        return axios.get(`${base.localUrl}/admin/data/hourData`, params)
    },
    //历史数据接口--分页
    historyData(params) {
        return axios.get(`${base.localUrl}/admin/data/history`, params)
    },
    //历史数据接口，不分页
    hisAlldata(params) {

        return axios.get(`${base.localUrl}/admin/data/history/list`, params)
    }
}


export default data