<template>
    <div class="zhexian">
        <div class="tabE" id="myCharts" ref="myCharts"></div>
        <div class="caozuo">
            <div class="leftb">
                <el-checkbox v-model="cod" @change="changeCod">COD</el-checkbox>
                <el-checkbox v-model="andan" @change="changeAn">氨氮</el-checkbox>
                <el-checkbox v-model="zolin" @change="changeZl">总磷</el-checkbox>
                <el-checkbox v-model="zodan" @change="changeZd">总氮</el-checkbox>
                <el-checkbox v-model="ph" @change="changePh">PH</el-checkbox>
                <el-checkbox v-model="ll" @change="changeLl">流量</el-checkbox>
            </div>
            <div class="shuoming">
                <div class="cod">
                    <div></div>
                    <p>COD</p>
                </div>
                <div class="andan">
                    <div></div>
                    <p>氨氮</p>
                </div>
                <div class="zolin">
                    <div></div>
                    <p>总磷</p>
                </div>
                <div class="zodan">
                    <div></div>
                    <p>总氮</p>
                </div>
                <div class="ph">
                    <div></div>
                    <p>PH</p>
                </div>
                <div class="liuliang">
                    <div></div>
                    <p>流量</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:{
        datalist:{  //校验历史数据
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            cod: true, //cod
            andan: false, //氨氮
            zolin: false, //总磷
            ph: false,
            zodan: true,
            ll: false,
            options: {
                grid: {
                    bottom: 80
                },
                toolbox: {
                    //工具栏
                    feature: {
                        dataZoom: {
                            //数据区域缩放工具
                        },
                        restore: {}, //配置项还原
                        saveAsImage: {} //导出图片
                    }
                },
                tooltip: {
                    trigger: "axis" //坐标轴触发提示框
                },
                color: ["rgba(255,0,0,1)", "rgba(0,0,255,1)"], //这里改变legend的颜色，同时也改变tooltip的颜色
                legend: {
                    //图列组件
                    // data: ["COD","总氮","氨氮","总磷","PH"], //提升框展示的问题
                    data: ["COD", "总氮"], //提升框展示的问题
                    x: "center"
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: "inside",
                        realtime: true,
                        start: 65,
                        end: 85
                    }
                ],
                xAxis: [
                    {
                        type: "category", // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                        boundaryGap: false,
                        axisLine: { onZero: true },
                        data: [].map(function(str) {
                            return str.replace(" ", "\n");
                        })
                    }
                ],
                yAxis: [
                    //y轴
                    {
                        name: "", //坐标轴名称
                        type: "value", //数值轴
                        max: 90 //坐标轴最大刻度
                    }
                ],
                series: [
                    {
                        name: "COD",
                        type: "line", //折线
                        animation: true, //是否开启动画
                        smooth: true, //在这里添加属性,使折线变顺滑
                        lineStyle: {
                            width: 2,
                            color: "rgba(255,0,0,1)"
                        },
                        data: [220, 122, 191, 294, 390, 330, 310]
                    },
                    {
                        name: "总氮",
                        type: "line", //折线
                        animation: true, //是否开启动画
                        smooth: true, //在这里添加属性,使折线变顺滑
                        lineStyle: {
                            width: 2, //线宽
                            color: "rgba(0,0,255,1)" //总氮的颜色
                        },
                        data: [129, 321, 191, 234, 190, 230, 110]
                    }
                    // {
                    //     name:'氨氮',
                    //     type: "line", //折线
                    //     animation: true, //是否开启动画
                    //     smooth:true,   //在这里添加属性,使折线变顺滑
                    //     lineStyle: {
                    //         width: 2,
                    //         color: 'rgba(241,225,0,1)'
                    //     },
                    //     data:[150, 52, 201, 154, 190, 330, 410]
                    // },
                    // {
                    //     name:'总磷',
                    //     type: "line", //折线
                    //     animation: true, //是否开启动画
                    //     smooth:true,   //在这里添加属性,使折线变顺滑
                    //     lineStyle: {
                    //         width: 2,
                    //         color: 'rgba(113,209,75,1)'
                    //     },
                    //     data:[320, 332, 81, 334, 90, 480, 320]
                    // },
                    // {
                    //     name:'PH',
                    //     type: "line", //折线
                    //     animation: true, //是否开启动画
                    //     smooth:true,   //在这里添加属性,使折线变顺滑
                    //     lineStyle: {
                    //         width: 2,
                    //         color: 'rgba(255,1,255,1)'
                    //     },
                    //     data:[20, 332, 101, 234, 1290, 133, 432]
                    // },
                ]
            }
        };
    },
    computed: {
        //hoursArr为x轴坐标区间[.....]
        ...mapState(["hoursArr"]),
        getAxis(){
            if(this.datalist && this.datalist.length>=1){
                debugger
            }
        }
    },
    mounted() {
        this.getZx();
    },

    methods: {
        //折线图方法
        getZx() {
            debugger
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            myCharts.showLoading(); //加载动画

            this.options.xAxis[0].data = this.hoursArr; //设置x轴坐标
            setTimeout(function() {
                myCharts.hideLoading(); //隐藏加载动画
            }, 2000);
            myCharts.setOption(this.options);
        },
        //点击COD
        changeCod(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let cod = {
                    name: "COD",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(255,0,0,1)"
                    },
                    data: [220, 122, 191, 294, 390, 330, 310]
                };
                this.options.series.push(cod); //先添加数据
                this.options.legend.data.push("COD"); //再添加name值
                this.options.color.push("rgba(255,0,0,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "COD") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "COD") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(255,0,0,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        },
        //点击总氮
        changeZd(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let zd = {
                    name: "总氮",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(0,0,255,1)"
                    },
                    data: [129, 321, 191, 234, 190, 230, 110]
                };
                this.options.series.push(zd); //先添加数据
                this.options.legend.data.push("总氮"); //再添加name值
                this.options.color.push("rgba(0,0,255,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "总氮") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "总氮") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(0,0,255,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        },
        //点击氨氮
        changeAn(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let an = {
                    name: "氨氮",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(241,225,0,1)"
                    },
                    data: [150, 52, 201, 154, 190, 330, 410]
                };
                this.options.series.push(an); //先添加数据
                this.options.legend.data.push("氨氮"); //再添加name值
                this.options.color.push("rgba(241,225,0,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "氨氮") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "氨氮") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(241,225,0,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        },
        //点击总磷
        changeZl(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let zl = {
                    name: "总磷",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(113,209,75,1)"
                    },
                    data: [320, 332, 81, 334, 90, 480, 320]
                };
                this.options.series.push(zl); //先添加数据
                this.options.legend.data.push("总磷"); //再添加name值
                this.options.color.push("rgba(113,209,75,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "总磷") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "总磷") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(113,209,75,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        },
        //点击PH
        changePh(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let ph = {
                    name: "PH",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(255,1,255,1)"
                    },
                    data: [20, 332, 101, 234, 1290, 133, 432]
                };
                this.options.series.push(ph); //先添加数据
                this.options.legend.data.push("PH"); //再添加name值
                this.options.color.push("rgba(255,1,255,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "PH") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "PH") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(255,1,255,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        },
        //点击流量
        changeLl(val) {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            if (val) {
                //选中
                let ll = {
                    name: "流量",
                    type: "line", //折线
                    animation: true, //是否开启动画
                    smooth: true, //在这里添加属性,使折线变顺滑
                    lineStyle: {
                        width: 2,
                        color: "rgba(228,139,0,1)"
                    },
                    data: [50, 232, 191, 294, 129, 436, 132]
                };
                this.options.series.push(ll); //先添加数据
                this.options.legend.data.push("流量"); //再添加name值
                this.options.color.push("rgba(228,139,0,1)"); //再添加颜色
            } else {
                for (let i = 0; i < this.options.series.length; i++) {
                    if (this.options.series[i].name == "流量") {
                        this.options.series.splice(i, 1); //先删除数据
                        break;
                    }
                }
                for (let j = 0; j < this.options.legend.data.length; j++) {
                    if (this.options.legend.data[j] == "流量") {
                        //再删除name值
                        this.options.legend.data.splice(j, 1);
                    }
                }
                for (let k = 0; k < this.options.color.length; k++) {
                    if (this.options.color[k] == "rgba(228,139,0,1)") {
                        this.options.color.splice(k, 1); //再删除颜色
                    }
                }
            }
            myCharts.setOption(this.options, true);
        }
    },
    watch: {
        hoursArr(val) {
            if (val.length > 0) {
                this.getZx();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.zhexian {
    height: 82.5%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .tabE {
        height: 80%;
    }
    .caozuo {
        height: 20%;
        display: flex;
        margin: 0 auto;
        width: 80%;
        align-items: center;
        justify-content: space-between;
        .leftb {
            width: 44%;
        }
        .shuoming {
            display: flex;
            justify-content: space-around;
            width: 40%;
            .cod {
                display: flex;
                align-items: center;

                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(255, 0, 0, 1);
                }
            }
            .andan {
                display: flex;
                align-items: center;
                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(241, 225, 0, 1);
                }
            }
            .zolin {
                display: flex;
                align-items: center;
                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(113, 209, 75, 1);
                }
            }
            .zodan {
                display: flex;
                align-items: center;
                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(0, 0, 255, 1);
                }
            }
            .ph {
                display: flex;
                align-items: center;
                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(255, 1, 255, 1);
                }
            }
            .liuliang {
                display: flex;
                align-items: center;
                div {
                    width: 19px;
                    height: 11px;
                    background: rgba(228, 139, 0, 1);
                }
            }
        }
    }
}
</style>