<template>
    <div class="bar">
        <div class="tabE" id="myCharts" ref="myCharts"></div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
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
                    trigger: "axis", //坐标轴触发提示框
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
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
                        boundaryGap: true,
                      
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
                        max: 500 //坐标轴最大刻度
                    }
                ],
                series: [
                    {
                        name: "COD",
                        type: "bar", //折线
                        animation: true, //是否开启动画
                        barWidth: 20,  //柱状图的大小
                        lineStyle: {
                            color: "rgba(255,0,0,1)"
                        },
                        data: [220, 122, 191, 294, 390, 330, 310]
                    },
                    {
                        name: "总氮",
                        type: "bar", //折线
                        animation: true, //是否开启动画
                        barWidth: 20, //柱状图的大小
                        lineStyle: {
             
                            color: "rgba(0,0,255,1)" //总氮的颜色
                        },
                        data: [129, 321, 191, 234, 190, 230, 110]
                    },
                    {
                        name: "氨氮",
                        type: "bar", //折线
                        animation: true, //是否开启动画
                        barWidth: 20, //柱状图的大小
                        lineStyle: {
   
                            color: "rgba(241,225,0,1)"
                        },
                        data: [150, 52, 201, 154, 190, 330, 410]
                    },
                    {
                        name: "总磷",
                        type: "bar", //折线
                        animation: true, //是否开启动画
                        barWidth: 20, //柱状图的大小
                        lineStyle: {

                            color: "rgba(113,209,75,1)"
                        },
                        data: [320, 332, 81, 334, 90, 480, 320]
                    },
                    {
                        name: "PH",
                        type: "bar", //折线
                        animation: true, //是否开启动画
                        barWidth: 20, //柱状图的大小
                        lineStyle: {
       
                            color: "rgba(255,1,255,1)"
                        },
                        data: [20, 332, 101, 234, 1290, 133, 432]
                    }
                ]
            }
        };
    },
    computed: {
        //hoursArr为x轴坐标区间[.....]
        ...mapState(["hoursArr"])
    },
    mounted() {
        this.getZx();
    },

    methods: {
        //折线图方法
        getZx() {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            myCharts.showLoading(); //加载动画

            this.options.xAxis[0].data = this.hoursArr; //设置x轴坐标
            setTimeout(function() {
                myCharts.hideLoading(); //隐藏加载动画
            }, 2000);
            myCharts.setOption(this.options);
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
.bar {
    height: 82.5%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 1%;
    .tabE {
        height: 60%;
    }
}
</style>