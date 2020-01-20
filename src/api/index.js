/** 
 * api接口的统一出口
 */

import login from '@/api/login';  // 登陆模块接口
import menu from '@/api/menu';  // 菜单模块接口
import data from '@/api/data';  // 数据模块
import company from '@/api/company';  // 企业相关
import site from '@/api/site';  // 基站相关
import roles from '@/api/roles'; //角色相关
import user from '@/api/user.js'  //用户相关
import depart from '@/api/depart.js' //部门相关
import spam from '@/api/spam.js'  //留言相关
import equi from '@/api/equipment.js' //设备相关
export default {
    login,
    menu,
    data,
    company,
    site,
    roles,
    user,
    depart,
    spam,
    equi
}