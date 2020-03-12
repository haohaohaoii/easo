/**
 * menu模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const menu = {
    getMenu(adminId) {     //登陆接口,获取id,然后拿着id去获取菜单权限

        return axios.get(`${base.localUrl}/admin/menu/menus/${adminId}`)
    },
    getAllmenu() {   //获取所有菜单
        return axios.get(`${base.localUrl}/admin/menu/menus`)
    },
    getFymenu(params) {  //分页获取所有菜单
        return axios.get(`${base.localUrl}/admin/menu`, params)
    },
    getMenuitem(menuId) {  //根据菜单id查看菜单信息
        return axios.get(`${base.localUrl}/admin/menu/${menuId}`)
    },
    getFathermenu(type) {  //根据菜单类型查看菜单信息
        return axios.get(`${base.localUrl}/admin/menu/menusByType/${type}`)
    },
    menuAdd(params) {  //添加菜单
        return axios.post(`${base.localUrl}/admin/menu`, qs.stringify(params))
    },
    menuChange(menuId, params) {  //修改菜单

        return axios.put(`${base.localUrl}/admin/menu/${menuId}`, qs.stringify(params))
    },
    menuDel(menuId) {  //删除菜单
        return axios.delete(`${base.localUrl}/admin/menu/${menuId}`)
    },
}


export default menu