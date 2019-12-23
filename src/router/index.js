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
            component: resolve => (require(["@/components/home/home"], resolve))
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
