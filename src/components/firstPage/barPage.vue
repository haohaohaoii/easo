<template>
    <div class="tabE" id="myCharts" ref="myCharts"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props:['zxData'],
    data() {
        return {
      
            xDatas:[],
            yDatas:[],
            options: {
                title: {
                    text: '最近三个月接入站点',//标题
                    textStyle: {
                        color: 'rgba(51,51,51,1)'
                        
                    },
                    x:'5.5%',
                    y:'3%'
                },
                grid: {
                    bottom: 80,
                    left:60
                },
               
                tooltip: {
                    trigger: "axis", //坐标轴触发提示框
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ["#3E7AFF"], //这里改变legend的颜色，同时也改变tooltip的颜色
                legend: {
                    //图列组件
                    // data: ["COD","总氮","氨氮","总磷","PH"], //提升框展示的问题
                    data: ["站点"], //提升框展示的问题
                    x: "center"
                },
                dataZoom: [
                    
                    //内容能不能拉
                    {
                        type: "inside",
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                xAxis: [
                    {
                        type: "category", // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                        boundaryGap: true, //柱状图设置为true从横坐标的0开始

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
                        max: 80 //坐标轴最大刻度
                    }
                ],
                series: [
                    {
                        name: "站点接入",
                        type: "bar", //柱状
                        barWidth:18,
                        animation: true, //是否开启动画
                        data: [],
                        itemStyle: {
                            
                            normal: {
                            //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function(params) {
                                var index = params.dataIndex;
                                var colorList = [
                                ['rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)',],
                                //到透明度1 ,如果需要不同的颜色直接修改不同颜色即可
                                ['rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)',]

                                ];
                                return {
                                colorStops: [{
                                    offset: 0,   //颜色的开始位置
                                    color: colorList[0][index] // 0% 处的颜色
                                },{
                                    offset:1,    //颜色的结束位置
                                    color: colorList[1][index] // 100% 处的颜色
                                }]
                                }
                            }
                            }
                        }

                    }
                  
                ]
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
           this.getZx();
        });
    },
  
    methods: {
        
        //折线图方法
        getZx() {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            myCharts.showLoading(); //加载动画
            this.options.xAxis[0].data = this.xDatas //设置x轴坐标
            this.options.series[0].data = this.yDatas  //设置y轴坐标
            setTimeout(function() {
                myCharts.hideLoading(); //隐藏加载动画
            }, 2000);
            myCharts.setOption(this.options);
        },
    },
    watch:{
        zxData(val){
            if(val && val.length>0){
                let x =[]
                let y =[]
                for(let i=0; i<val.length; i++){
                    x.push(val[i].create_time)
                    y.push(val[i].count)
                }
                this.xDatas = x
                this.yDatas = y
                this.getZx()
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.tabE {
    height: 100%;
}
</style>