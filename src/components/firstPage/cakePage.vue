<template>
    <div class="tabE" id="myCharts" ref="myCharts"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:["list"],
    data() {
        return {
            pieList:[],
             screenWidth: 0,  //给它赋值个（个人理解为网页的宽度）
            options: {
                title: {
                    text: '站点状态',//标题
                    textStyle: {
                        color: 'rgba(51,51,51,1)'
                        
                    },
                    x:'8%',
                    y:'2%'
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
                        name: '状态',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                              normal: {
                                    show: true,
                                    position: 'center',
                                   
                                    textStyle:{
                                     
                                       
                                    }
                                }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    },
                ]
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
      
            this.getZx();
            this.getWidth()
        });
        
    },

    methods: {
        getWidth(){
            window.screenWidth = document.body.clientWidth;
            this.screenWidth = window.screenWidth;
        },
        //折线图方法
        getZx() {

            let myCharts = this.$echarts.init(this.$refs.myCharts);
            // myCharts.showLoading(); //加载动画
            this.options.series[0].data = this.pieList
            let _this = this
            this.options.series[0].label.normal.formatter=function (argument) {
                                        let arr = _this.list
                                        let num = 0
                                        for(let i=0; i<arr.length; i++){
                                            num +=arr[i].value
                                        }
                                       
                                        var html;
                                        html=num+'\r\n\r\n'+'总数';
                                        // html='2356'+'总数\r\n\r\n';
                                        return html;
                                    },
            // setTimeout(function() {
            //     myCharts.hideLoading(); //隐藏加载动画
            // }, 2000);
            myCharts.setOption(this.options);
        },
    },
    watch:{
        list(val){
            this.pieList = val
            this.getZx()
        },
        screenWidth(val){
             
            console.log(val)
            if(val >1199 && val<1399){
        
                this.options.series[0].label.normal.textStyle={
                    fontSize:18,
                    color:'rgba(51,51,51,1)'
                }
                this.getZx()
            }else if(val >1399 && val<1599){
                this.options.series[0].label.normal.textStyle={
                    fontSize:22,
                    color:'rgba(51,51,51,1)'
                }
                this.getZx()
            }else if(val >1599 && val<1899){
                this.options.series[0].label.normal.textStyle={
                    fontSize:24,
                    color:'rgba(51,51,51,1)'
                }
                this.getZx()
            }else if(val >1900){
                 this.options.series[0].label.normal.textStyle={
                    fontSize:26,
                    color:'rgba(51,51,51,1)'
                }
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