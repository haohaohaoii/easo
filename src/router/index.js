import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'


Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => (require(["@/components/login/login"], resolve)),

        },
        {
            path: '/',
            name: 'home',
            redirect: '/hisData',
            component: resolve => (require(["@/components/home/home"], resolve)),
            children: []
        }
    ]
})

//不变的路由
// let invarRoutes = [
//     {
//         path: '/',
//         name: 'home',
//         meta: {
//             login_require: true,
//         },
//         component: resolve => (require(["@/components/home/home"], resolve))
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: resolve => (require(["@/components/login/login"], resolve))
//     }
// ]

//动态加载的路由
// let asyncRoutes = [
//     {
//         path: 'hisData',     //历史数据
//         name: 'historyData',
//         component: resolve => (require(["@/components/historyData/historyData"], resolve))
//     }, {
//         path: 'realData',     //实时数据
//         name: 'realData',
//         component: resolve => (require(["@/components/realData/realData"], resolve))
//     }, {
//         path: 'enterMation',     //企业信息
//         name: 'enterMation',
//         component: resolve => (require(["@/components/enterMation/enterMation"], resolve))
//     },
//     {
//         path: 'enterDialog',     //企业信息--查看详情
//         name: 'enterDialog',
//         component: resolve => (require(["@/components/enterMation/enterDialog"], resolve))
//     },
//     {
//         path: 'ediDialog',     //企业信息--编辑
//         name: 'ediDialog',
//         component: resolve => (require(["@/components/enterMation/ediDialog"], resolve))
//     },
//     {
//         path: 'spam',     //留言管理
//         name: 'spam',
//         component: resolve => (require(["@/components/spam/spam"], resolve))
//     },
//     {
//         path: 'spamReply',     //留言管理 ---留言回复
//         name: 'spamReply',
//         component: resolve => (require(["@/components/spam/spamReply"], resolve))
//     }, {
//         path: 'baseManage',     //基站管理
//         name: 'baseManage',
//         component: resolve => (require(["@/components/baseManage/baseManage"], resolve))
//     },{
//         path: 'baseAdd',     //基站管理 --基站添加
//         name: 'baseAdd',
//         component: resolve => (require(["@/components/baseManage/baseAdd"], resolve))
//     },{
//         path: 'baseDetail',     //基站管理 --基站详情
//         name: 'baseDetail',
//         component: resolve => (require(["@/components/baseManage/baseDetail"], resolve))
//     },
//      {
//         path: 'roleManage',     //角色管理
//         name: 'roleManage',
//         component: resolve => (require(["@/components/roleManage/roleManage"], resolve))
//     },
//     {
//         path: 'roleAdd',     //角色管理 -- 添加角色
//         name: 'roleAdd',
//         component: resolve => (require(["@/components/roleManage/roleAdd"], resolve))
//     }, {
//         path: 'userManage',     //用户管理
//         name: 'userManage',
//         component: resolve => (require(["@/components/userManage/userManage"], resolve))
//     },{
//         path: 'userAdd',     //用户管理 --添加用户
//         name: 'userAdd',
//         component: resolve => (require(["@/components/userManage/userAdd"], resolve))
//     }, {
//         path: 'divManage',     //部门管理
//         name: 'divManage',
//         component: resolve => (require(["@/components/divManage/divManage"], resolve))
//     },{
//         path: 'divAdd',     //部门管理 --添加部门
//         name: 'divAdd',
//         component: resolve => (require(["@/components/divManage/divAdd"], resolve))
//     }, {
//         path: 'menuManage',     //菜单管理
//         name: 'menuManage',
//         component: resolve => (require(["@/components/menuManage/menuManage"], resolve))
//     },{
//         path: 'menuAdd',     //菜单管理 --添加菜单
//         name: 'menuAdd',
//         component: resolve => (require(["@/components/menuManage/menuAdd"], resolve))
//     }
// ]

router.beforeEach((to, from, next) => {
    debugger
    if (store.state.token && store.state.adminId) {  //用户已经登陆
        debugger
        if (to.path == '/login') {
            next('/')
        } else {
            let defaultVal = to.path.substr(1)
            store.commit('getBreadlist', to)
            store.commit('changeDefaultmenu', defaultVal)
            next()

        }
    } else {   //用户未登陆
        if (to.path == '/login') {
            next()
        } else {
            if (localStorage.getItem('token') && localStorage.getItem('adminId')) {
                let adminId = localStorage.getItem('adminId')
                store.dispatch('getRoles', adminId).then(res => {
                    debugger
                    store.commit("getToken", localStorage.getItem('token'));
                    store.commit("getAdminid", adminId);
                    let menuRoutes = store.state.rolesRoutes
                    menuRoutes.forEach(route => {
                        router.options.routes[1].children.push(
                            route
                        );
                    });
                    router.matcher = new Router({ mode: 'history' }).matcher;
                    debugger
                    router.addRoutes(router.options.routes)
                    next({ ...to, replace: true })
                })

            } else {
                next('/login');
            }

        }
    }
})

export default router
