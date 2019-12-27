export default ({
    //左侧导航栏宽度
    changeMenuleft(state,size){
        state.menuLeftwidth = size;
    },
    //获取搜索时间区间[yyyy-MM-dd HH:00:00 ...... yyyy-MM-dd HH:00:00]
    getHours(state,hourA){
        state.hoursArr = hourA
    },
    //点击的到底是历史数据页面左上角的哪个按钮
    getWitchbtn(state,btnName){
        state.whichBrn = btnName
    }
})