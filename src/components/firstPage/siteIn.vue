<template>
    <div class="tabE" id="myCharts" ref="myCharts"></div>
</template>

<script>
import { mapState } from "vuex";
import echarts from 'echarts'
export default {
    props:['zuData','nowY'],
    data() {
        return {
            maxNum:'',
            xDatas:[],
            yDatas:[],
            options: {
                title: {
                    text: '接入站点曲线图',//标题
                    textStyle: {
                        color: 'rgba(51,51,51,1)'
                        
                    },
                    x:'5.5%',
                    y:'2%'
                },
                grid: {
                    top: 60,
                    left: '2%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
               
                tooltip: {
                    trigger: "axis", //坐标轴触发提示框
                    axisPointer: {
                        lineStyle: {
                        color: '#C3CBD6'
                        }
                    }
                    
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
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                        color: '#57617B'
                        }
                    },
                    data: []
                }],
                yAxis: [{
                        type: 'value',
                        max:'',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                            color: '#57617B'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                            fontSize: 14
                            }
                        },
                        splitLine: {
                            lineStyle: {
                            color: '#57617B'
                            }
                        }
                }],
                // yAxis: [
                //     //y轴
                //     {
                //         name: "", //坐标轴名称
                //         type: "value", //数值轴
                //         max: 80 //坐标轴最大刻度
                //     }
                // ],
                series: [
                    // {
                    //     name: "站点接入",
                    //     type: "line", //柱状
                    //     barWidth:18,
                    //     animation: true, //是否开启动画
                    //     data: [],
                    //     itemStyle: {
                            
                    //         normal: {
                    //         //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    //         color: function(params) {
                    //             var index = params.dataIndex;
                    //             var colorList = [
                    //             ['rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)','rgba(62,122,255,1)',],
                    //             //到透明度1 ,如果需要不同的颜色直接修改不同颜色即可
                    //             ['rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)','rgba(76,186,255,1)',]

                    //             ];
                    //             return {
                    //             colorStops: [{
                    //                 offset: 0,   //颜色的开始位置
                    //                 color: colorList[0][index] // 0% 处的颜色
                    //             },{
                    //                 offset:1,    //颜色的结束位置
                    //                 color: colorList[1][index] // 100% 处的颜色
                    //             }]
                    //             }
                    //         }
                    //         }
                    //     }

                    // }
                    {
                        name: '站点接入个数',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,  //所有的坐标点是都都显示
                        lineStyle: {
                            normal: {
                                width: 6   //最顶层线的宽度
                            }
                        },
                        areaStyle: {
                            normal: {
                             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,  //从0到100%的样式，注意是上下覆盖
                                color: 'rgba(79,107,245, 1)'
                            }, {
                                offset: 1,    //如果是0.8下面有部分覆盖不了
                                color: 'rgba(255,255,255, 0.3)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#4f6bf5',
                                borderColor: 'rgba(255,255,255,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: []
                    }
                  
                ]
            }
        };
    },
    mounted() {
         let _this = this;//赋值vue的this
        window.onresize = ()=>{
    　　　　//调用methods中的事件
             _this.$nextTick(() => {
                _this.getZx();
            });
        }
       
    },
  
    methods: {
        
        //折线图方法
        getZx() {
            let myCharts = this.$echarts.init(this.$refs.myCharts);

            this.options.yAxis[0].max = this.maxNum
            this.options.xAxis[0].data = this.xDatas //设置x轴坐标
            this.options.series[0].data = this.yDatas  //设置y轴坐标
            myCharts.setOption(this.options);
        },
        getMaxnum(arr){
            return new Promise(resolve=>{
                let max = arr[0];
                for (let i = 0; i < arr.length - 1; i++) {
                    max = max < arr[i+1] ? arr[i+1] : max
                }
                resolve(max)

            })
        }
    },
    watch:{
        zuData(val){
      
            if(val && val.length>0){
                let x =[]
                let y =[]
                for(let i=0; i<val.length; i++){
                    if(val[i].month <10){
                        x.push(`${this.nowY}-0${val[i].month}`)
                    }else{
                         x.push(`${this.nowY}-${val[i].month}`)
                    }
                   
                    y.push(val[i].siteCount)
                }
                this.xDatas = x
                this.yDatas = y
                this.getMaxnum(y).then(maxNum=>{
                    this.maxNum =maxNum;
                    this.getZx()
                })
              
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