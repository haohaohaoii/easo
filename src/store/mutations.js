export default ({
    //左侧导航栏宽度
    changeMenuleft(state, size) {
        state.menuLeftwidth = size;
    },
    //获取搜索时间区间[yyyy-MM-dd HH:00:00 ...... yyyy-MM-dd HH:00:00]
    getHours(state, hourA) {
        state.hoursArr = hourA;
    },
    //获取企业管理下的企业信息中的详情dialog状态
    getDialogstatus(state, dialogStatus) {
        state.enterDialog = dialogStatus;
    },
    //获取企业管理下的企业信息中的编辑dialog状态
    setEditordialog(state, editorDialogstatus) {
        state.editorDialog = editorDialogstatus;
    },
    //企业管理下的企业基站管理中的添加（编辑）dialog状态
    baseAdd(state, dialogStatus) {
        state.baseAdd = dialogStatus;
    },
    //企业管理下的企业基站管理下的详情（审核）dialog状态
    baseDetail(state, detailDialog) {
        state.baseDetail = detailDialog;
    },
    //企业管理下的留言回复 dialog状态
    spamReply(state, spamDialog) {
        state.spamReply = spamDialog;
    },
    //权限管理下的角色管理添加角色 dialog状态
    roleAdd(state, addStatus) {
        state.roleAdd = addStatus;
    },
    //权限管理下的用户管理添加用户 dialog状态
    userAdd(state, status) {
        state.userAdd = status;
    },
    //权限管理下的用户管理添加用户 dialog状态
    divAdd(state, divStatus) {
        state.divAdd = divStatus;
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
        debugger
        let menuTree = roles
        let asyncRoutes = state.asyncRoutes
        let res = []
        let childrenName = []
        for (let i = 0; i < menuTree.length; i++) {
            if (menuTree[i].two) {
                for (let j = 0; j < menuTree[i].two.length; j++) {
                    childrenName.push(menuTree[i].two[j])
                }
            } else {
                childrenName.push(menuTree[i].one)
            }
        }
        asyncRoutes.forEach((route) => {
            let routeItem = route
            childrenName.forEach((item) => {
                if (routeItem.name == item.menuName) {
                    res.push(routeItem)
                }
            })
        })
        state.rolesRoutes = res
    },
    //根据返回的角色权限,生成菜单表
    getMenus(state, roles) {
        debugger
        let menuTree = roles
        let asyncRoutes = state.asyncRoutes
        asyncRoutes.forEach((route) => {
            let routeItem = route
            menuTree.forEach((item) => {

                if (routeItem.name == item.two.menuName) {
                    iitem.two.path = routeItem.path
                }
            })
        })
        for(let i=0; i<asyncRoutes.length; i++){
            // debugger
            for(let k=0; k<menuTree.length;k++){
                if(menuTree[k].two && menuTree[k].two.length>=1){   //说明有二级菜单
                    for(let j=0; j<menuTree[k].two.length; j++){
                        // debugger
                        if(asyncRoutes[i].name == menuTree[k].two[j].menuName){
                            menuTree[k].two[j].path = asyncRoutes[i].path;
                        }
                    }
                }else{
                    if(asyncRoutes[i].name == menuTree[k].one.menuName){ //说明是一级菜单
                        menuTree[k].one.path = asyncRoutes[i].path;
                    }
                }
            }
        }
        debugger
        state.menulist = menuTree
    }
})