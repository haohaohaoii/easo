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
    setEditordialog(state,editorDialogstatus){
        state.editorDialog = editorDialogstatus;
    },
    //企业管理下的企业基站管理中的添加（编辑）dialog状态
    baseAdd(state,dialogStatus){
        state.baseAdd = dialogStatus;
    },
    //企业管理下的企业基站管理下的详情（审核）dialog状态
    baseDetail(state,detailDialog){
        state.baseDetail = detailDialog;
    },
    //企业管理下的留言回复 dialog状态
    spamReply(state,spamDialog){
        state.spamReply = spamDialog;
    },
    //权限管理下的角色管理添加角色 dialog状态
    roleAdd(state,addStatus){
        state.roleAdd = addStatus;
    },
    //权限管理下的用户管理添加用户 dialog状态
    userAdd(state,status){
        state.userAdd = status;
    },
    //权限管理下的用户管理添加用户 dialog状态
    divAdd(state,divStatus){
        state.divAdd = divStatus;
    },
    //权限管理下的菜单管理添加菜单 dialog状态
    menuAdd(state,menuStatus){
        state.menuAdd = menuStatus;
    },
    //获取实际路由表
    getMenulist(state,menulist){
        debugger
        state.menulist = menulist
    },
    //更改默认选中的菜单
    changeDefaultmenu(state,menuMsg){
        debugger
        state.defaultMenu = menuMsg
    }
})