/** 
 * api接口的统一出口
 */

import login from '@/api/login';  // 登陆模块接口
import menu from '@/api/menu';  // 菜单模块接口
import data from '@/api/data';  // 数据模块
import company from '@/api/company';  // 企业相关
import site from '@/api/site';  // 基站相关
export default {    
    login,
    menu,
    data,
    company,
    site
}