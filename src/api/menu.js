/**
 * menu模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const menu ={
    getMenu(adminId){     //登陆接口,获取id,然后拿着id去获取菜单权限

        return axios.get(`${base.localUrl}/admin/menu/menus/${adminId}`)
    }
}


export default menu