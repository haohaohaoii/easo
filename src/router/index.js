import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                login_require: true,
            },
            component: resolve => (require(["@/components/home/home"], resolve)), children: [
                {
                    path: 'hisData',     //历史数据
                    name: 'historyData',
                    component: resolve => (require(["@/components/historyData/historyData"], resolve))
                }, {
                    path: 'realData',     //实时数据
                    name: 'realData',
                    component: resolve => (require(["@/components/realData/realData"], resolve))
                }, {
                    path: 'enterMation',     //企业信息
                    name: 'enterMation',
                    component: resolve => (require(["@/components/enterMation/enterMation"], resolve))
                },
                {
                    path: 'enterDialog',     //企业信息--查看详情
                    name: 'enterDialog',
                    component: resolve => (require(["@/components/enterMation/enterDialog"], resolve))
                },
                {
                    path: 'spam',     //留言管理
                    name: 'spam',
                    component: resolve => (require(["@/components/spam/spam"], resolve))
                }, {
                    path: 'baseManage',     //基站管理
                    name: 'baseManage',
                    component: resolve => (require(["@/components/baseManage/baseManage"], resolve))
                }, {
                    path: 'roleManage',     //角色管理
                    name: 'roleManage',
                    component: resolve => (require(["@/components/roleManage/roleManage"], resolve))
                }, {
                    path: 'userManage',     //用户管理
                    name: 'userManage',
                    component: resolve => (require(["@/components/userManage/userManage"], resolve))
                }, {
                    path: 'divManage',     //部门管理
                    name: 'divManage',
                    component: resolve => (require(["@/components/divManage/divManage"], resolve))
                }, {
                    path: 'menuManage',     //菜单管理
                    name: 'menuManage',
                    component: resolve => (require(["@/components/menuManage/menuManage"], resolve))
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => (require(["@/components/login/login"], resolve))
        }


    ]
})
//前置路由钩子 -- 判断用户是否登录
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.login_require)) {
//         if (!sessionStorage.logined && to.path != '/login') {
//             next('/login')
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// })
