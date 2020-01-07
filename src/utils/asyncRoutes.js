/**
 * 异步路由（本地完整路由）
 */
import hisData from '../components/historyData/historyData'
let asyncRoutes = [
    {
        path: 'hisData',     //历史数据
        name: '历史数据',
        component: hisData
    }, {
        path: 'realData',     //实时数据
        name: '实时数据',
        component: resolve => (require(["@/components/realData/realData"], resolve))
    }, {
        path: 'enterMation',     //企业信息
        name: '企业信息',
        component: resolve => (require(["@/components/enterMation/enterMation"], resolve))
    },
    {
        path: 'enterDialog',     //企业信息--查看详情
        name: 'enterDialog',
        component: resolve => (require(["@/components/enterMation/enterDialog"], resolve))
    },
    {
        path: 'ediDialog',     //企业信息--编辑
        name: 'ediDialog',
        component: resolve => (require(["@/components/enterMation/ediDialog"], resolve))
    },
    {
        path: 'spam',     //留言管理
        name: '留言管理',
        component: resolve => (require(["@/components/spam/spam"], resolve))
    },
    {
        path: 'spamReply',     //留言管理 ---留言回复
        name: 'spamReply',
        component: resolve => (require(["@/components/spam/spamReply"], resolve))
    }, {
        path: 'baseManage',     //基站管理
        name: '基站管理',
        component: resolve => (require(["@/components/baseManage/baseManage"], resolve))
    },{
        path: 'baseAdd',     //基站管理 --基站添加
        name: 'baseAdd',
        component: resolve => (require(["@/components/baseManage/baseAdd"], resolve))
    },{
        path: 'baseDetail',     //基站管理 --基站详情
        name: 'baseDetail',
        component: resolve => (require(["@/components/baseManage/baseDetail"], resolve))
    },
     {
        path: 'roleManage',     //角色管理
        name: '角色管理',
        component: resolve => (require(["@/components/roleManage/roleManage"], resolve))
    },
    {
        path: 'roleAdd',     //角色管理 -- 添加角色
        name: 'roleAdd',
        component: resolve => (require(["@/components/roleManage/roleAdd"], resolve))
    }, {
        path: 'userManage',     //用户管理
        name: '用户管理',
        component: resolve => (require(["@/components/userManage/userManage"], resolve))
    },{
        path: 'userAdd',     //用户管理 --添加用户
        name: 'userAdd',
        component: resolve => (require(["@/components/userManage/userAdd"], resolve))
    }, {
        path: 'divManage',     //部门管理
        name: '部门管理',
        component: resolve => (require(["@/components/divManage/divManage"], resolve))
    },{
        path: 'divAdd',     //部门管理 --添加部门
        name: 'divAdd',
        component: resolve => (require(["@/components/divManage/divAdd"], resolve))
    }, {
        path: 'menuManage',     //菜单管理
        name: '菜单管理',
        component: resolve => (require(["@/components/menuManage/menuManage"], resolve))
    },{
        path: 'menuAdd',     //菜单管理 --添加菜单
        name: 'menuAdd',
        component: resolve => (require(["@/components/menuManage/menuAdd"], resolve))
    }
]

export default asyncRoutes