
import api from '../api' // 导入api接口
export default ({
    getRoles(context, adminId) {   //获取角色权限
        return new Promise((resolve, reject) => {
            api.menu.getMenu(adminId).then(res => {
                if (res.status == 200) {
                    if (res.data.code == 0) { //获取路由表
                        let roles = res.data.data
                        sessionStorage.setItem('opt', JSON.stringify(roles))
                        context.commit('filters', roles)
                        context.commit('getMenus', roles)
                    }
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
})
