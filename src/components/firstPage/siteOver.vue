<template>
    <div class="tabE" id="myCharts" ref="myCharts"></div>
</template>

<script>

import { mapState } from "vuex";
import echarts from 'echarts'
export default {

    props:['zxData'],
    data() {
        return {
            maxNum:'',
            chart:null,
            xDatas:[],
            yDatas:[],
            options: {
               
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
   
    destroyed(){
      window.onresize = null;
    },
    methods: {
        
        //折线图方法
        getZx() {
            this.chart = this.$echarts.init(this.$refs.myCharts);
           

            // this.options.xAxis[0].data = this.xDatas //设置x轴坐标
            // this.options.series[0].data = this.yDatas  //设置y轴坐标
   
            this.chart.setOption({
               
                title: {
                    text: '超标站点曲线图',//标题
                    textStyle: {
                        color: 'rgba(51,51,51,1)'
                        
                    },
                    x:'5.5%',
                    y:'3%'
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
                    data: this.xDatas
                }],
                yAxis: [{
                        type: 'value',
                        max:this.maxNum,
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
                series: [
    
                    {
                        name: '超标站点个数',
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
                                color: 'rgba(185,82,228, 1)'
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
                                color: '#D78CE2',
                                borderColor: 'rgba(255,255,255,0.2)',
                                borderWidth: 12
                            }
                        },
                        data:this.yDatas
                    }
                  
                ]
                
           });
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
        zxData(val){
            if(val && val.length>0){
           
                let objA = val[0]
                let x=[]
                let y = []
                Object.keys(objA).forEach(function(key,i,v){
                    // console.log(key,i,v,objA[key])
                    x.push(key)
                    y.push(objA[key])
                  
                })
                this.xDatas = x
                this.yDatas = y
   
                this.getMaxnum(y).then(maxNum=>{
                    this.maxNum =maxNum;
                    this.getZx()
                })
            }else{
                 this.xDatas =[]
                  this.yDatas = []
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