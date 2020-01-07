/**
 * 基站模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
const site ={
    formComsite(companyId){   //根据企业ID获取所有站点信息接口
        return axios.get(`${base.localUrl}/admin/site/user/${companyId}`)
    }
}

export default site