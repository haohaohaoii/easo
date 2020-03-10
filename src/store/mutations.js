export default ({
    //左侧导航栏宽度
    changeMenuleft(state, size) {
        state.menuLeftwidth = size;
    },
    getBreadlist(state, toObj) {
        let obj = {
            name: toObj.name,
            path: toObj.path
        }
        let arr = state.breadArr

        let flag = false
        if (arr && arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == obj.name) {
                    arr.splice(i + 1, arr.length - 1)
                    flag = true
                    break
                } else {
                    if (i == arr.length - 1 && !flag) {
                        arr.push(obj)
                        break
                    }
                }
            }
        } else {
            arr.push(obj)
        }


        localStorage.breadArr = JSON.stringify(arr)
    },
    //获取搜索时间区间[yyyy-MM-dd HH:00:00 ...... yyyy-MM-dd HH:00:00]
    getHours(state, hourA) {

        state.hoursArr = hourA;
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
    //获取企业管理下的企业信息中的编辑中的企业类型数组
    // getCompanytypes(state, companyTypes) {
    //     state.companyType = companyTypes
    // },
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
        state.userAdd = status;
    },
    //权限管理下的用户管理编辑用户 dialog状态
    changeUseredit(state, status) {
        state.userEditor = status
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
    menuAdd(state, menuStatus) {
        state.menuAdd = menuStatus;
    },

    //更改默认选中的菜单
    changeDefaultmenu(state, menuMsg) {
        state.defaultMenu = menuMsg
    },
    //获取登陆成功后的token
    getToken(state, token) {
        state.token = token
    },
    //获取登陆后的角色id
    getAdminid(state, adminId) {
        state.adminId = adminId
    },
    //根据返回的角色权限，生成路由表
    filters(state, roles) {
        let menuTree = roles  //角色权限
        let asyncRoutes = state.asyncRoutes //本地完整路由
        let res = []
        let childrenName = []
        for (let i = 0; i < menuTree.length; i++) {
            if (menuTree[i].subMenus) { //有二级菜单
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
                    }
                }
            })
        })
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

        state.menulist = menuTree
    }
})