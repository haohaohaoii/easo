
import api from '../api' // 导入api接口

export default ({
    getRole(context, adminId) {   //获取角色权限
        return new Promise((resolve, reject) => {
            api.menu.getMenu(adminId).then(res => {
                if (res && res.data.code == 0) { //获取路由表
                    let roles = res.data.data.reverse()
                    console.log(roles)
                    sessionStorage.setItem('opt', JSON.stringify(roles))
                    context.commit('filters', roles)
                    context.commit('getMenus', roles)
                    context.commit('getSpamisShow', roles)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
        // return new Promise((resolve, reject) => {
        //     let roles = [{ "id": 2, "parentId": null, "menuName": "数据查看", "url": "/data", "menuType": 0, "perms": null, "icon": null, "orderNum": 0, "createTime": "2019-12-20 06:17:48", "subMenus": [{ "id": 5, "parentId": 2, "menuName": "实时数据", "url": "/data/current", "menuType": 1, "perms": null, "icon": null, "orderNum": 0, "createTime": "2019-12-20 06:24:36", "subMenus": [] }, { "id": 6, "parentId": 2, "menuName": "历史数据", "url": "/data/history", "menuType": 1, "perms": null, "icon": null, "orderNum": 1, "createTime": "2019-12-20 06:24:38", "subMenus": [] }] }, { "id": 3, "parentId": null, "menuName": "企业管理", "url": "/company", "menuType": 0, "perms": null, "icon": null, "orderNum": 1, "createTime": "2019-12-20 06:18:21", "subMenus": [{ "id": 7, "parentId": 3, "menuName": "企业信息", "url": "/company/detail", "menuType": 1, "perms": null, "icon": null, "orderNum": 0, "createTime": "2019-12-20 06:31:37", "subMenus": [{ "id": 32, "parentId": 7, "menuName": "添加企业", "url": "/company/detail", "menuType": 2, "perms": "company:detail:add", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:49:14", "subMenus": null }, { "id": 34, "parentId": 7, "menuName": "编辑", "url": "/company/detail", "menuType": 2, "perms": "company:detail:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:49:16", "subMenus": null }, { "id": 35, "parentId": 7, "menuName": "基站", "url": "/company/detail", "menuType": 1, "perms": "", "icon": null, "orderNum": 0, "createTime": "2020-01-10 01:34:15", "subMenus": null }, { "id": 36, "parentId": 7, "menuName": "详情", "url": "/company/detail", "menuType": 1, "perms": "company:detail:view", "icon": null, "orderNum": 0, "createTime": "2020-01-10 01:34:18", "subMenus": null }] }, { "id": 8, "parentId": 3, "menuName": "留言管理", "url": "/company/board", "menuType": 1, "perms": null, "icon": null, "orderNum": 1, "createTime": "2019-12-20 06:31:38", "subMenus": [{ "id": 30, "parentId": 8, "menuName": "删除", "url": "/company/board", "menuType": 2, "perms": "company:board:delete", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:47:57", "subMenus": null }, { "id": 37, "parentId": 8, "menuName": "回复", "url": "/company/board", "menuType": 1, "perms": "company:board:reply", "icon": null, "orderNum": 0, "createTime": "2020-01-10 01:36:39", "subMenus": null }] }, { "id": 9, "parentId": 3, "menuName": "基站管理", "url": "/company/site", "menuType": 1, "perms": null, "icon": null, "orderNum": 2, "createTime": "2019-12-20 06:31:40", "subMenus": [{ "id": 26, "parentId": 9, "menuName": "添加基站", "url": "/company/site", "menuType": 2, "perms": "company:site:add", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:46:25", "subMenus": null }, { "id": 28, "parentId": 9, "menuName": "编辑", "url": "/company/site", "menuType": 2, "perms": "company:site:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:46:27", "subMenus": null }, { "id": 38, "parentId": 9, "menuName": "详情", "url": "/company/site", "menuType": 1, "perms": "company:site:view", "icon": null, "orderNum": 0, "createTime": "2020-01-10 01:43:09", "subMenus": null }, { "id": 39, "parentId": 9, "menuName": "审核", "url": "/company/site", "menuType": 1, "perms": "company:site:audit", "icon": null, "orderNum": 0, "createTime": "2020-01-10 01:43:11", "subMenus": null }] }] }, { "id": 4, "parentId": null, "menuName": "权限管理", "url": "/perm", "menuType": 0, "perms": null, "icon": null, "orderNum": 2, "createTime": "2019-12-20 06:18:43", "subMenus": [{ "id": 10, "parentId": 4, "menuName": "角色管理", "url": "/perm/role", "menuType": 1, "perms": null, "icon": null, "orderNum": 0, "createTime": "2019-12-20 06:36:49", "subMenus": [{ "id": 17, "parentId": 10, "menuName": "添加角色", "url": "/perm/role", "menuType": 2, "perms": "perm:role:add", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:37:55", "subMenus": null }, { "id": 18, "parentId": 10, "menuName": "删除", "url": "/perm/role", "menuType": 2, "perms": "perm:role:delete", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:37:57", "subMenus": null }, { "id": 19, "parentId": 10, "menuName": "编辑", "url": "/perm/role", "menuType": 2, "perms": "perm:role:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:37:58", "subMenus": null }] }, { "id": 11, "parentId": 4, "menuName": "用户管理", "url": "/perm/admin", "menuType": 1, "perms": null, "icon": null, "orderNum": 1, "createTime": "2019-12-20 06:36:51", "subMenus": [{ "id": 23, "parentId": 11, "menuName": "添加用户", "url": "/perm/admin", "menuType": 2, "perms": "perm:admin:add", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:44:21", "subMenus": null }, { "id": 24, "parentId": 11, "menuName": "删除", "url": "/perm/admin", "menuType": 2, "perms": "perm:admin:delete", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:44:23", "subMenus": null }, { "id": 25, "parentId": 11, "menuName": "编辑", "url": "/perm/admin", "menuType": 2, "perms": "perm:admin:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:44:24", "subMenus": null }] }, { "id": 12, "parentId": 4, "menuName": "部门管理", "url": "/perm/dept", "menuType": 1, "perms": null, "icon": null, "orderNum": 2, "createTime": "2019-12-20 06:36:53", "subMenus": [{ "id": 20, "parentId": 12, "menuName": "添加部门", "url": "/perm/dept", "menuType": 2, "perms": "perm:dept:add", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:41:14", "subMenus": null }, { "id": 21, "parentId": 12, "menuName": "编辑", "url": "/perm/dept", "menuType": 2, "perms": "perm:dept:delete", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:41:16", "subMenus": null }, { "id": 22, "parentId": 12, "menuName": "删除", "url": "/perm/dept", "menuType": 2, "perms": "perm:dept:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:41:18", "subMenus": null }] }, { "id": 13, "parentId": 4, "menuName": "菜单管理", "url": "/perm/menu", "menuType": 1, "perms": null, "icon": null, "orderNum": 3, "createTime": "2019-12-20 06:36:54", "subMenus": [{ "id": 14, "parentId": 13, "menuName": "菜单添加", "url": "/perm/menu", "menuType": 2, "perms": "perm:menu:add", "icon": null, "orderNum": 0, "createTime": "2019-12-26 05:51:35", "subMenus": null }, { "id": 15, "parentId": 13, "menuName": "删除", "url": "/perm/menu", "menuType": 2, "perms": "perm:menu:delete", "icon": null, "orderNum": 1, "createTime": "2019-12-26 05:51:37", "subMenus": null }, { "id": 16, "parentId": 13, "menuName": "编辑", "url": "/perm/menu", "menuType": 2, "perms": "perm:menu:update", "icon": null, "orderNum": 0, "createTime": "2020-01-09 06:34:57", "subMenus": null }] }] }]

        //     if (roles) {
        //         resolve(roles)
        //         context.commit('filters', roles)
        //         context.commit('getMenus', roles)
        //     } else {
        //         reject('错误')
        //     }

        // })
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
    //点击新闻编辑
    getNewsitem(context, id) {
        api.news.getNewsI(id).then(res => {  //获取角色对应的菜单

            console.log(res)
            if (res.data.code == 0) {
                let itemObj = res.data.data[0]
                context.commit('changeNewsE', true)  //编辑对应的dialog状态
                context.commit("getNewsE", itemObj); //存储对应id的部门信息
            }
        }).catch(error => {

        })
    },
    //右下留言过来的
    spamDetail(context, id) {
        api.spam.getSpamitem(id).then(res => {  //获取角色对应的菜单
            console.log(res)
            if (res.data.code == 0) {

                let itemArr = res.data.data[0]
                let obj = {
                    title: itemArr.title,  //留言标题
                    content: itemArr.content, //留言内容
                    messageType: itemArr.messageType, //留言类型
                    id: itemArr.id,
                    replies: itemArr.replies
                }

                context.commit("spamReply", true) //留言回复对应的dialog状态
                context.commit("getspamDetail", obj); //存储对应id的留言信息
            }


        }).catch(error => {

        })
    },
    //从列表中过来的
    spamDetails(context, id) {
        api.spam.getSpamitem(id).then(res => {  //获取角色对应的菜单
            console.log(res)
            if (res.data.code == 0) {

                let itemArr = res.data.data[0]
                let obj = {
                    title: itemArr.title,  //留言标题
                    content: itemArr.content, //留言内容
                    messageType: itemArr.messageType, //留言类型
                    id: itemArr.id,
                    replies: itemArr.replies
                }

                context.commit("spamReplys", true) //留言回复对应的dialog状态
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
                    for (let m = 0; m < itemArr.length; m++) {
                        if (itemArr[m].name == 'NH3-N') {
                            itemArr[m].name = '氨氮'
                        } else if (itemArr[m].name == 'TN') {
                            itemArr[m].name = '总氮'
                        } else if (itemArr[m].name == 'TP') {
                            itemArr[m].name = '总磷'
                        }
                    }

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
                // let siteDevarr = []
                // if (itemObj.siteDevices && itemObj.siteDevices.length > 0) {
                //     for (let i = 0; i < itemObj.siteDevices.length; i++) {
                //         siteDevarr.push(itemObj.siteDevices[i].factorCode)
                //     }
                // }
                let obj = {
                    mn: itemObj.mn,
                    siteName: itemObj.siteName,  //基站名称
                    ioType: itemObj.ioType,  // 进口/出口
                    erpId: itemObj.erpId,  //企业id
                    siteDevices: itemObj.siteDevices, //设备对应的数组
                    siteS: itemObj.siteState,  //站点状态
                }
                context.commit('getBaseitemList', obj)

            }
            if (res[1].data.data && res[1].data.data.length > 0) {
                let itemArr = res[1].data.data
                if (itemArr && itemArr.length > 0) {
                    for (let m = 0; m < itemArr.length; m++) {
                        if (itemArr[m].name == 'NH3-N') {
                            itemArr[m].name = '氨氮'
                        } else if (itemArr[m].name == 'TN') {
                            itemArr[m].name = '总氮'
                        } else if (itemArr[m].name == 'TP') {
                            itemArr[m].name = '总磷'
                        }
                    }
                }
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
    },
    //企业信息(编辑 dialog状态)  详情也可以用
    getEnteritem(context, erpId) {

        api.company.companyDetail(erpId).then(res => {
            console.log(res)
            if (res.data.code == 0) {
                api.company.getCompanytypes().then(types => {
                    let rowObj = res.data.data[0]
                    let arr = types.data.data
                    rowObj.companyType = []
                    for (let i = 0; i < arr.length; i++) {
                        let obj = {
                            label: arr[i].name,
                            value: arr[i].value
                        }
                        rowObj.companyType.push(obj)
                    }
                    // context.commit('getCompanytypes', companyType)  //获取企业类型
                    context.commit("setEditordialog", true) //改变dialog状态
                    context.commit('getEnterrow', rowObj)  //获取行数据信息
                })

            }


        }).catch(error => {

        })

    },
    //企业用户  点击 编辑 dialog状态  和当行信息
    getUseritem(context, erpId) {

        api.company.getUseritem(erpId).then(res => {
            console.log(res)
            if (res.data.code == 0) {
                let rowObj = res.data.data[0]
                context.commit("comUserE", true) //改变dialog状态
                context.commit('comUseri', rowObj)  //获取行数据信息

            }


        }).catch(error => {

        })
    },
    //权限管理下  菜单管理  编辑菜单   
    menuE(context, id) {
        api.menu.getMenuitem(id).then(res => {
            if (res.data.code == 0) {
                let itemObj = res.data.data[0]
                context.commit('getMenuitem', itemObj)
                context.commit("menuEditor", true);
            }
        })
    },
    //获取到历史数据中的总数据(折线和柱状需要)
    getAllhisData(context, params) {
        api.data
            .hisAlldata({ params })
            .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    let arr = res.data.data
                    let obj = {}
                    obj.xData = []  //x轴数据
                    obj.yDatacod = []  //cod数据
                    obj.yDataandan = []  //氨氮数据
                    obj.yDatazolin = []  //总磷数据
                    obj.yDataph = []  //ph数据
                    obj.yDatazodan = []  //总氮数据
                    obj.yDatall = []  //流量数据
                    if (arr && arr.length > 0) {
                        for (let i = 0; i < arr.length; i++) {
                            obj.xData.push(arr[i].createTime)
                            for (let j = 0; j < arr[i].dataInfoList.length; j++) {
                                if (arr[i].dataInfoList[j].factorCode == '011') {   //cod
                                    obj.yDatacod.push(arr[i].dataInfoList[j].factorValue)
                                } else if (arr[i].dataInfoList[j].factorCode == '101') {   //氨氮
                                    obj.yDatazolin.push(arr[i].dataInfoList[j].factorValue)

                                } else if (arr[i].dataInfoList[j].factorCode == '065') {//总氮
                                    obj.yDatazodan.push(arr[i].dataInfoList[j].factorValue)
                                } else if (arr[i].dataInfoList[j].factorCode == '060') {//总磷
                                    obj.yDataandan.push(arr[i].dataInfoList[j].factorValue)
                                } else if (arr[i].dataInfoList[j].factorCode == '001') {//ph
                                    obj.yDataph.push(arr[i].dataInfoList[j].factorValue)
                                } else if (arr[i].dataInfoList[j].factorCode == 'B01') {//流量
                                    obj.yDatall.push(arr[i].dataInfoList[j].factorValue)
                                }
                            }
                        }
                    }
                    console.log(obj)
                    context.commit('getHisdataAll', obj)  //获取到历史数据--折线图用
                }
            })
            .catch(error => { });
    },
    //企业管理下的  企业信息 详情
    getComdetail(context, erpId) {

        api.company.companyDetail(erpId).then(res => {
            console.log(res)
            if (res.data.code == 0) {

                context.commit('getCompanyDetails', res.data.data[0])
                context.commit("getDialogstatus", true)
            }


        }).catch(error => {

        })
    },
    getMsgdetail(context, id) {
        api.msg.getMsgitem(id).then(res => {

            console.log(res)
            if (res.data.code == 0) {
                context.commit('getMsgD', res.data.data[0]);
                context.commit("messageDe", true);
            }
        })
    }
})
