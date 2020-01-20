
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
                api.depart.getDeptlist().then(deparObj => {  //获取部门列表
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
    },
    //权限管理模块下的用户管理，编辑
    divEdit(context, id) {
        api.depart.deptDetail(id).then(res => {  //获取角色对应的菜单
            console.log(res)
            if (res.data.code == 0) {
                let itemArr = res.data.data[0]
                let obj = {
                    deptName: itemArr.deptName,  //部门名称
                    contactName: itemArr.contactName, //部门联系人
                    contactPhone: itemArr.contactPhone, //部门电话
                    id: itemArr.id
                }
                context.commit('changeStatusdiv', true)  //编辑对应的dialog状态
                context.commit("getEditordiv", obj); //存储对应id的部门信息
            }


        }).catch(error => {

        })
    },
    //企业管理下的留言管理, 回复
    spamDetail(context, id) {
        api.spam.getSpamitem(id).then(res => {  //获取角色对应的菜单
            console.log(res)
            if (res.data.code == 0) {
                let itemArr = res.data.data[0]
                let obj = {
                    title: itemArr.title,  //留言标题
                    content: itemArr.content, //留言内容
                    messageType: itemArr.messageType, //留言类型
                    id: itemArr.id
                }
                context.commit("spamReply", true) //留言回复对应的dialog状态
                context.commit("getspamDetail", obj); //存储对应id的留言信息
            }


        }).catch(error => {

        })
    },
    //企业管理下的基站管理，添加基站 需要dialog状态 和 托管设备数组
    getEquilist(context) {
        api.equi.getEquiments().then(res => {  //获取托管设备数组
            console.log(res)
            if (res.data.code == 0) {
                let itemArr = res.data.data
                if (itemArr && itemArr.length) {
                    context.commit('getEqui', itemArr)
                    context.commit('baseAdd', true);
                }
            }


        }).catch(error => {

        })
    },
    //企业管理下的基站管理，编辑的时候 需要dialog状态 和 对应mn的detail
    getBasei(context, mn) {
        let getSiteitem = new Promise((resolve, reject) => {   //对应mn的基站详情
            api.site.getSiteitem(mn).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        });

        let getEquiments = new Promise((resolve, reject) => { //获取托管设备数组
            api.equi.getEquiments().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
        let companyAll = new Promise((resolve, reject) => { //获取全部企业信息
            api.company.companyAll().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
        Promise.all([getSiteitem, getEquiments, companyAll]).then(res => {
            console.log(res);
            if (res[0].data.code == 0) {
                let itemObj = res[0].data.data[0]
                let siteDevarr = []
                if (itemObj.siteDevices && itemObj.siteDevices.length > 0) {
                    for (let i = 0; i < itemObj.siteDevices.length; i++) {
                        siteDevarr.push(itemObj.siteDevices[i].factorCode)
                    }
                }
                let obj = {
                    mn: itemObj.mn,
                    siteName: itemObj.siteName,  //基站名称
                    ioType: itemObj.ioType,  // 进口/出口
                    erpId: itemObj.erpId,  //企业id
                    siteDevices: siteDevarr  //托管设备对应的id
                }
                context.commit('getBaseitemList', obj)

            }
            if (res[1].data.data && res[1].data.data.length > 0) {
                let itemArr = res[1].data.data
                context.commit('getEqui', itemArr)
            }
            if (res[2].data.data && res[2].data.data.length > 0) {
                let companyArr = res[2].data.data
                if (companyArr && companyArr.length > 0) {
                    let itemArr = []
                    for (let i = 0; i < companyArr.length; i++) {
                        let roleItem = {
                            label: companyArr[i].erpName,
                            value: companyArr[i].id
                        }
                        itemArr.push(roleItem)
                    }
                    context.commit('getCompanyall', itemArr)
                }

            }
            context.commit('baseEditor', true)

        }).catch(error => {

        })
    },
    //基站详情(传递行数据 更改 dialog状态)
    openSitedetail(context, rowMsg) {
        context.commit('baseDetail', true)   //改变dialog状态
        context.commit('getSiterowList', rowMsg)  //获取行数据信息
    },
    //基站详情(传递行数据 更改 审核状态)
    changeSitestatus(context, mn) {
        context.commit('siteRowstatus', true)   //改变dialog状态
        context.commit('getSiterowMn', mn)  //获取行数据信息
    }

})
