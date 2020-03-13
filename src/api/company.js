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
    companyEditor(erpId, params) {    //企业编辑
        return axios.put(`${base.localUrl}/admin/company/${erpId}`, qs.stringify(params))
    },
    addCompany(params) {   //添加企业
        return axios.post(`${base.localUrl}/admin/company`, qs.stringify(params))
    },
    getCompanytypes() {  //获取企业类型
        return axios.get(`${base.localUrl}/admin/sys/company_type`)
    },
    getCompanyusers(params) {  //获取企业用户 分页
        return axios.get(`${base.localUrl}/admin/companyUser`, params)
    },
    addCompanyuser(params) {  //添加企业用户
        return axios.post(`${base.localUrl}/admin/companyUser`, qs.stringify(params))
    },
    getUseritem(id) {  //获取当行企业用户信息
        return axios.get(`${base.localUrl}/admin/companyUser/${id}`)
    },
    comEditor(id, params) {  //修改企业用户信息
        return axios.put(`${base.localUrl}/admin/companyUser/${id}`, qs.stringify(params))
    },
    deleteComuserItem(id) {  //删除企业用户信息
        return axios.delete(`${base.localUrl}/admin/companyUser/${id}`)
    }
}


export default company