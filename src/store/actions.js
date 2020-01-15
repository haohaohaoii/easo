
import api from '../api' // 导入api接口
export default ({
    getRole(context, adminId) {   //获取角色权限
        return new Promise((resolve, reject) => {
            api.menu.getMenu(adminId).then(res => {
                if (res.data.code == 0) { //获取路由表
                    let roles = res.data.data
                    sessionStorage.setItem('opt', JSON.stringify(roles))
                    context.commit('filters', roles)
                    context.commit('getMenus', roles)
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
    },
    //权限管理模块下的用户管理，编辑
    userEdit(context, id) {
        api.user.getUseritem(id).then(detail => {
            if (detail.data.code == 0) {
                let rowItem = detail.data.data[0]
                api.depart.getDept().then(deparObj => {  //获取部门列表
                    if (deparObj.data.code == 0) {
                        api.roles.getRoles().then(res => {  //获取角色列表
                            if (res.data.code == 0) {
                                context.commit("changeUseredit", true);  //更改dialog状态
                                context.commit('userItemdetail', rowItem) //用户行信息
                                if (deparObj.data.data && deparObj.data.data.length > 0) {
                                    let deparArr = []
                                    for (let i = 0; i < deparObj.data.data.length; i++) {
                                        let departItem = {
                                            label: deparObj.data.data[i].deptName,
                                            value: deparObj.data.data[i].id
                                        }
                                        deparArr.push(departItem)
                                    }
                                    context.commit('userDepar', deparArr)   //提交列表数组
                                }
                                if (res.data.data && res.data.data.length > 0) {
                                    let roleArr = []
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        let roleItem = {
                                            label: res.data.data[i].roleShow,
                                            value: res.data.data[i].id
                                        }
                                        roleArr.push(roleItem)
                                    }
                                    context.commit('userroles', roleArr)  //提交角色数组
                                }
                            }
                        })
                    }
                })
            }
        })
    }
})
