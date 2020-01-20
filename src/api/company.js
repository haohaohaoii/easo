/**
 * 企业模块接口
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
    }

}


export default company