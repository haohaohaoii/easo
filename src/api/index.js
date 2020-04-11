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
import msg from '@/api/msg.js' //消息相关
import news from '@/api/news.js' //新闻相关
import resManage from '@/api/resManage.js' //资源相关
import oper from '@/api/oper.js' //运维管理
import operp from '@/api/operp.js' //运维人员
import contarct from '@/api/contarct.js' //运维合同
import recodes from '@/api/recodes.js' //运维记录
import dReport from '@/api/dataReport.js' //数据报表
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
    equi,
    msg,
    news,
    resManage,
    oper,
    operp,
    contarct,
    recodes,
    dReport
}