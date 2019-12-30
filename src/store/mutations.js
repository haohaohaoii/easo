export default ({
    //左侧导航栏宽度
    changeMenuleft(state, size) {
        state.menuLeftwidth = size;
    },
    //获取搜索时间区间[yyyy-MM-dd HH:00:00 ...... yyyy-MM-dd HH:00:00]
    getHours(state, hourA) {
        state.hoursArr = hourA
    },
    //获取企业管理下的企业信息中的详情dialog状态
    getDialogstatus(state, dialogStatus) {
        state.enterDialog = dialogStatus
    }
})