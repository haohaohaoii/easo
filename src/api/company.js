/**
 * 企业管理下--企业信息 
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const company = {
    companyAll() {   //所有企业信息接口(不分页)
        return axios.get(`${base.localUrl}/admin/company/list`)
    },
    companyFyall(params) {   //所有企业信息接口(分页)
        return axios.get(`${base.localUrl}/admin/company`, params)
    },
    companyDetail(erpId) {    //企业行数据详情
        return axios.get(`${base.localUrl}/admin/company/${erpId}`)
    },
    companyEditor(erpId) {    //企业行数据详情
        return axios.put(`${base.localUrl}/admin/company/${erpId}`)
    },
    addCompany(params) {   //添加企业
        return axios.post(`${base.localUrl}/admin/company`, qs.stringify(params))
    },
    getCompanytypes() {  //获取企业类型
        return axios.get(`${base.localUrl}/admin/sys/company_type`)
    }
}


export default company