<template>
    <div class="tabE" id="myCharts" ref="myCharts"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
           
            options: {
                title: {
                    text: '站点状态',//标题
                    textStyle: {
                        color: 'rgba(51,51,51,1)'
                        
                    },
                    x:'4%',
                    y:'3%'
                },
               

                grid: {
                    bottom: 80
                },
               
                tooltip: {
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                    trigger: 'item'
                
                },
                color: ["#4CA2FE","#41ECDD"], //这里改变legend的颜色，同时也改变tooltip的颜色
               
               
               
                series: [
                    {
                        name: '在线',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                              normal: {
                                    show: true,
                                    position: 'center',
                                    formatter:function (argument) {
                                        var html;
                                        html='2356\r\n\r\n'+'总数';
                                        // html='2356'+'总数\r\n\r\n';
                                        return html;
                                    },
                                    textStyle:{
                                       fontSize: 15,
                                        color:'rgba(51,51,51,1)'
                                    }
                                }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {value: 1772, name: '在线'},
                            {value: 584, name: '离线'}
                        ]
                    },
                ]
            }
        };
    },
    mounted() {
        this.getZx();
    },

    methods: {
        
        //折线图方法
        getZx() {
            let myCharts = this.$echarts.init(this.$refs.myCharts);
            myCharts.showLoading(); //加载动画
      
            setTimeout(function() {
                myCharts.hideLoading(); //隐藏加载动画
            }, 2000);
            myCharts.setOption(this.options);
        },
    }
};
</script>

<style lang="scss" scoped>
.tabE {
    height: 100%;
}
</style>