
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
    },
    //权限管理模块下的角色管理，编辑
    rolesMana(context, roleId) {
        api.menu.getAllmenu().then(mennuArr => {
            if (mennuArr.data.code == 0) {

                api.roles.getRolemsg(roleId).then(res => {  //获取角色对应的菜单
                    console.log(res)
                    if (res.data.code == 0) {
                        let itemArr = res.data.data[0].sysMenus
                        context.commit("getRoleitem", itemArr);
                        let obj = {
                            isTrue: true,
                            type: 'editor',
                            arr: mennuArr.data.data,
                            name: res.data.data[0].roleShow,
                            roleId: roleId,
                        }
                        context.commit("roleEdit", obj);  //获取全部角色菜单权限
                    }


                }).catch(error => {

                })
            }
        }).catch(error => {

        })

    }
})
