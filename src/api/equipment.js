/**
 * 设备模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
const equi = {
    //根据类型获取设备  (基站管理中添加基站,获取托管设备数组)
    getEquiments() {
        let type = 'factor'
        return axios.get(`${base.localUrl}/admin/sys/${type}`)
    }
}


export default equi