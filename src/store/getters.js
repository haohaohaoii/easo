import router from '../router'
import Router from 'vue-router'
export default ({
    //测试用获取x轴坐标
    getXzhou(state) {
        console.log(state.searchHours);
        if (state.searchHours != 0) {
            let arr = [];
            for (let i = 0; i < state.searchHours; i++) {
                arr.push(i)
            }
            return arr;
        }
    },
    //根据token和adminId获取角色权限
    getRoles(state) {
        let menuRoutes = state.rolesRoutes
        menuRoutes.forEach(route => {
            router.options.routes[1].children.push(
                route
            );
        });
        return router.options.routes
    }
})