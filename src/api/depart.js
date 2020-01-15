/**
 * 部门模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const depart = {
    //获取全部部门
    getDept() {
        return axios.get(`${base.localUrl}/admin/dept/list`)
    },
}


export default depart