export default ({
    //左侧导航栏宽度
    changeMenuleft(state, size) {
        state.menuLeftwidth = size;
    },
    getBreadlist(state, nowPath) {

        let menuArr = state.menulist;
        let arr = [];
        let objF = {
            name: '',
            path: ''
        };
        let objN = {
            name: nowPath.name,
            path: nowPath.path
        }
        for (let i = 0; i < menuArr.length; i++) {
            if (menuArr[i].menuName == nowPath.name) {
                objF.name = ''
                break
            } else {
                if (menuArr[i].subMenus && menuArr[i].subMenus.length > 0) {
                    for (let k = 0; k < menuArr[i].subMenus.length; k++) {
                        if (menuArr[i].subMenus[k].menuName == nowPath.name) {
                            objF.name = menuArr[i].menuName
                            break
                        }
                    }
                }
            }
        }
        console.log(objF)
        if (objF.name) {
            arr.push(objF)
            arr.push(objN)
        } else {
            arr.push(objN)
        }

        state.breadArr = arr
        localStorage.breadArr = JSON.stringify(arr)
    },
    // getBreadlist(state, toObj) {

    //     let obj = {
    //         name: toObj.name,
    //         path: toObj.path
    //     }
    //     let arr = state.breadArr

    //     let flag = false
    //     if (arr && arr.length > 0) {
    //         for (let i = 0; i < arr.length; i++) {
    //             if (arr[i].name == obj.name) {
    //                 arr.splice(i + 1, arr.length - 1)
    //                 flag = true
    //                 break
    //             } else {
    //                 if (i == arr.length - 1 && !flag) {
    //                     arr.push(obj)
    //                     break
    //                 }
    //             }
    //         }
    //     } else {
    //         arr.push(obj)
    //     }


    //     localStorage.breadArr = JSON.stringify(arr)
    // },
    //获取搜索时间区间[yyyy-MM-dd HH:00:00 ...... yyyy-MM-dd HH:00:00]
    getWDLY(state, num) {
        state.wdly = num
    },
    getHours(state, hourA) {

        state.hoursArr = hourA;
    },
    //获取消息  当行详情
    getMsgD(state, obj) {
        state.msgRowDetail = obj
    },
    //获取历史数据--折线图用
    getHisdataAll(state, objHis) {
        state.hisDataall = objHis
    },
    //头部右侧 修改密码 dialog状态
    pwdDialog(state, status) {
        state.pwdDialog = status
    },
    //获取企业管理下的企业信息中的详情dialog状态
    getDialogstatus(state, dialogStatus) {
        state.enterDialog = dialogStatus;
    },
    //获取企业管理下的 行详情数据
    getEnterrow(state, item) {
        state.enterRow = item
    },
    //企业管理  企业信息  添加企业  dialog状态
    changeEnterAdd(state, status) {
        state.enterAdd = status
    },
    //获取企业管理下的企业信息中的编辑dialog状态
    setEditordialog(state, editorDialogstatus) {
        state.editorDialog = editorDialogstatus;
    },
    //企业信息下的 详情  行数据
    getCompanyDetails(state, obj) {

        state.comDetail = obj
    },
    //企业管理下的企业基站管理中的添加（编辑）dialog状态
    baseAdd(state, dialogStatus) {
        state.baseAdd = dialogStatus;
    },
    //企业管理下的 企业基站管理 添加和编辑中都需要的托管设备信息
    getEqui(state, equiArr) {
        state.Equilist = equiArr
    },
    //企业管理下的 企业基站管理 编辑 dialog状态
    baseEditor(state, status) {
        state.baseEditor = status
    },
    //企业管理下的 企业基站管理 编辑 中所需的全部企业
    getCompanyall(state, companyArr) {
        state.companyArr = companyArr
    },
    //企业管理下的 企业基站管理 编辑中需要的row信息
    getBaseitemList(state, itemList) {
        state.baseItemlist = itemList
    },
    //企业管理下的企业基站管理下的详情（审核）dialog状态
    baseDetail(state, detailDialog) {
        state.baseDetail = detailDialog;
    },
    //企业管理下的企业基站管理 点击审核  dialog状态
    siteRowstatus(state, status) {
        state.baseAudit = status
    },
    //企业管理下的 企业基站管理 点击详情  获取row
    getSiterowList(state, rowMsg) {
        state.siteRowlist = rowMsg
    },
    //企业管理下的 企业基站管理  点击审核 需要 mn
    getSiterowMn(state, mn) {
        state.siteRowmn = mn
    },
    //企业管理下的留言回复 dialog状态
    spamReply(state, spamDialog) {
        state.spamReply = spamDialog;
    },
    //企业管理下的留言回复 单个留言id对应的内容
    getspamDetail(state, content) {
        state.spamItemlist = content
    },
    //权限管理下的菜单管理   菜单id获取行信息
    getMenuitem(state, itemObj) {
        state.menuItemD = itemObj
    },
    //权限管理下的角色管理添加角色 dialog状态,并获取全部菜单
    roleAdd(state, pdObj) {
        if (pdObj.type == 'add') {  //添加角色
            state.roleAdd = pdObj.isTrue;
            state.roleTree = pdObj.arr
        } else if (pdObj.type == 'close') {   //关闭弹窗
            state.roleAdd = pdObj.isTrue;
        }

    },
    //权限管理下的角色管理修改角色权限 dialog状态
    roleEdit(state, editorObj) {
        if (editorObj.type == 'editor') {  //编辑角色
            state.roleTree = editorObj.arr
            state.roleEditor = editorObj.isTrue
            state.roleName = editorObj.name
            state.roleId = editorObj.roleId
        } else if (editorObj.type == 'close') {   //关闭弹窗
            state.roleEditor = editorObj.isTrue;
        }

    },
    //获取单个角色id对应的角色权限
    getRoleitem(state, itemArr) {
        state.roleItem = itemArr
    },
    //权限管理下的用户管理添加用户 dialog状态
    changeUserAdd(state, status) {
        state.userAdddialog = status;
    },
    //权限管理下的用户管理编辑用户 dialog状态
    changeUseredit(state, status) {
        state.userEditor = status
    },
    //企业信息 审核 dialog
    changeEnteraudit(state, status) {
        state.enterAud = status
    },
    //企业信息 审核行的id
    getEnterId(state, id) {
        state.enterId = id
    },
    //企业用户 编辑 dialog
    comUserE(state, status) {
        state.companyUseredi = status
    },
    //企业用户行信息 
    comUseri(state, obj) {

        state.companyUseritem = obj
    },
    //权限管理下的用户管理编辑用户 所需的行数据信息
    userItemdetail(state, itemDetail) {
        state.userItem = itemDetail;
    },
    //权限管理下的用户管理编辑用户 所需的部门数据
    userDepar(state, deparArr) {
        state.deparArr = deparArr
    },
    //权限管理下的用户管理编辑用户 所需的角色数据
    userroles(state, roleArr) {
        state.roleList = roleArr
    },
    //权限管理下的用户管理添加用户 dialog状态
    divAddstatus(state, divStatus) {
        state.divAdd = divStatus;
    },
    //权限管理下的用户管理编辑用户 dialog状态
    changeStatusdiv(state, status) {
        state.divEditor = status
    },
    //权限管理下的用户管理编辑用户  所需的对应id的数据
    getEditordiv(state, divArr) {
        state.divItem = divArr
    },
    //权限管理下的菜单管理添加菜单 dialog状态
    menuEditor(state, menuStatus) {
        state.menuE = menuStatus;
    },
    //消息详情 dialog状态
    messageDe(state, status) {
        state.messageD = status
    },
    //企业管理下  企业用户  添加用户
    changeUserA(state, status) {
        state.companyUseradd = status
    },
    //更改默认选中的菜单
    changeDefaultmenu(state, menuMsg) {

        state.defaultMenu = menuMsg
    },
    //获取登陆成功后的token
    getToken(state, token) {
        state.token = token
    },
    //内容管理下的资源管理 编辑成功 告知主页面
    changeReDitor(state, status) {
        state.resIsEditSuccess = status;
    },
    //获取登陆后的角色id
    getAdminid(state, adminId) {
        state.adminId = adminId
    },
    //更改新闻编辑dialog状态
    changeNewsE(state, status) {
        state.newsEstatus = status
    },
    //获取新闻编辑下的行信息
    getNewsE(state, item) {
        state.newsErow = item
    },
    //根据返回的角色权限，生成路由表
    filters(state, roles) {
        let menuTree = roles  //角色权限
        let asyncRoutes = state.asyncRoutes //本地完整路由
        let res = []
        let childrenName = []
        for (let i = 0; i < menuTree.length; i++) {
            if (menuTree[i].subMenus && menuTree[i].subMenus.length > 0) { //有二级菜单
                for (let j = 0; j < menuTree[i].subMenus.length; j++) {
                    menuTree[i].subMenus[j].meta = {}
                    if (menuTree[i].subMenus[j].subMenus && menuTree[i].subMenus[j].subMenus.length > 0) { //有三级菜单(按钮管控)
                        menuTree[i].subMenus[j].meta.btnPress = []
                        for (let k = 0; k < menuTree[i].subMenus[j].subMenus.length; k++) {
                            let name = menuTree[i].subMenus[j].subMenus[k].menuName
                            menuTree[i].subMenus[j].meta.btnPress.push(name)
                        }
                        childrenName.push(menuTree[i].subMenus[j])
                    } else {
                        childrenName.push(menuTree[i].subMenus[j])
                    }
                }
            } else {
                menuTree[i].meta = {}
                childrenName.push(menuTree[i])
            }
        }
        asyncRoutes.forEach((route) => {
            let routeItem = route
            childrenName.forEach((item) => {
                if (routeItem.name == item.menuName) {
                    let metaArr = Object.keys(item.meta)
                    if (metaArr.length > 0 && item.meta.btnPress && item.meta.btnPress.length > 0) {
                        routeItem.meta = item.meta
                    }

                    res.push(routeItem)
                } else {
                    if (routeItem.name == '消息') {
                        res.push(routeItem)
                    } else if (routeItem.name == '首页') {
                        res.push(routeItem)
                    } else if (routeItem.name == '日报表详情') {
                        res.push(routeItem)
                    } else if (routeItem.name == '月报表详情') {
                        res.push(routeItem)
                    }
                }
            })
        })
        console.log(res)
        state.rolesRoutes = res
    },
    //根据返回的角色权限,生成菜单表
    getMenus(state, roles) {
        let menuTree = roles
        let asyncRoutes = state.asyncRoutes
        asyncRoutes.forEach((route) => {
            let routeItem = route
            menuTree.forEach((item) => {

                if (routeItem.name == item.subMenus.menuName) {
                    iitem.subMenus.path = routeItem.path
                }
            })
        })
        for (let i = 0; i < asyncRoutes.length; i++) {
            for (let k = 0; k < menuTree.length; k++) {
                if (menuTree[k].subMenus && menuTree[k].subMenus.length >= 1) {   //说明有二级菜单
                    for (let j = 0; j < menuTree[k].subMenus.length; j++) {
                        if (asyncRoutes[i].name == menuTree[k].subMenus[j].menuName) {
                            menuTree[k].subMenus[j].path = asyncRoutes[i].path;
                        }
                    }
                } else {
                    if (asyncRoutes[i].name == menuTree[k].subMenus.menuName) { //说明是一级菜单
                        menuTree[k].subMenus.path = asyncRoutes[i].path;
                    }
                }
            }
        }
        console.log(menuTree)

        state.menulist = menuTree
    },

    //实时消息有没有权限
    getSpamisShow(state, roles) {
        let menuTree = roles
        let status = false
        for (let i = 0; i < menuTree.length; i++) {
            if (menuTree[i].menuName == '企业管理') {
                if (menuTree[i].subMenus && menuTree[i].subMenus.length > 0) {
                    for (let k = 0; k < menuTree[i].subMenus.length; k++) {
                        if (menuTree[i].subMenus[k].menuName == '留言管理') {
                            status = true
                        }
                    }
                }
            }
        }
        state.spamIsshow = status;
    }
})