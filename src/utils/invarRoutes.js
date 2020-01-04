
/**
 * 不变的路由
 */

let invarRoutes = [
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

export default{
    invarRoutes
}