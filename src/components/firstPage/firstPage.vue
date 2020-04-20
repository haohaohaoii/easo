<template>
    <div class="firstPage">
        <div class="contentLeft">
            <div class="contentL">
                <img class="tps" src="../../assets/images/treicon.png" alt />
                <div class="date">
                    <el-date-picker
                        format="yyyy"
                        value-format="yyyy"
                        class="sT"
                        v-model="yearV"
                        size="mini"
                        type="year"
                        placeholder="选择年"
                    ></el-date-picker>
                </div>
                <site-in :zuData="zuData" :nowY="yearV"></site-in>
            </div>

            <div class="footer">
                <img class="tps" src="../../assets/images/cb.png" alt />
                <div class="date">
                    <el-date-picker
                        size="mini"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="startTime"
                        placeholder="开始时间"
                        class="sT"
                    ></el-date-picker>
                    <el-date-picker
                        size="mini"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="endTime"
                        placeholder="结束时间"
                        class="sT"
                    ></el-date-picker>
                    <el-button size="mini" type="primary" @click="searchSiteover">查询</el-button>
                </div>

                <site-over :zxData="zxData"></site-over>
            </div>
        </div>
        <div class="contentRight">
            <div class="rigSpam">
                <el-card class="box-card">
                    <div slot="header" class="titRU">
                        <img src="../../assets/images/lyxxicon.png" alt />
                        <p>留言消息</p>
                    </div>
                    <div class="contentR">
                        <div class="itemR">
                            <div>
                                <p class="t">全部留言</p>
                                <p class="nu">{{qbly}}</p>
                            </div>
                            <div>
                                <p class="t">最新回复</p>
                                <p class="nu">{{zxhf}}</p>
                            </div>
                            <div>
                                <p class="t">未读留言</p>
                                <p class="nu">{{wdly}}</p>
                            </div>
                        </div>
                        <div class="itemR">
                            <div>
                                <p class="t">超标消息</p>
                                <p class="nu">{{cbxc}}</p>
                            </div>
                            <div>
                                <p class="t">异常消息</p>
                                <p class="nu">{{ycxc}}</p>
                            </div>
                            <div>
                                <p class="t">预警消息</p>
                                <p class="nu">{{yjxx}}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="site">
                <img class="titp" src="../../assets/images/ricon.png" alt />
                <cake-page :list="pieDatas"></cake-page>
                <div class="sm">
                    <div class="smItem">
                        <p>
                            <img src="../../assets/images/onicon.png" alt />
                            在线
                        </p>

                        <span style="color:rgba(109,153,249,1)">{{zxzd}}个</span>
                    </div>
                    <div class="smItem">
                        <p>
                            <img src="../../assets/images/outicon.png" alt />
                            离线
                        </p>
                        <span style="color:rgba(109,153,249,1);">{{lxzd}}个</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import siteOver from './siteOver'
import siteIn from './siteIn'
import cakePage from './cakePage'
export default {
    components:{
        siteOver,
        cakePage,
        siteIn
    },
    data() {
        return {
            yearV:'',  //按年查询
            startTime:'', //开始时间
            endTime:'', //结束时间
            firstArr:[],
            zxData:[],  //超标站点
            zuData:[],  //接入站点
            xzqy:'',  //本月新增企业
            xzzd:'',  //本月新增站点
            cbqy:'',  //超标企业
            cbzd:'',  //超标站点
            ycqy:'',  //异常企业
            yczd:'',  //异常站点
            yjqy:'',  //预警企业
            yjzd:'',  //预警站点
            zdzs:'',  //站点总数
            qbly:'',  //全部留言
            zxhf:'',  //最新回复
            wdly:'',  //未读留言
            cbxc:'',  //超标消息
            ycxc:'',  //异常消息
            yjxx:'',  //预警消息
            lxzd:'',  //离线站点

        };
    },
    mounted(){

       this.sendAxios()   //首页
       this.getzdcb()  //超标站点
       this.getzdjr()   //站点接入
    },

    computed:{
        zxzd(){  //在线站点
            return  this.zdzs - this.lxzd
        },
        pieDatas(){
            let arr = [
                {value:this.zxzd,name: '在线'},
                {value:this.lxzd,name: '离线'}
            ]
            return arr
        }
    },
    methods:{
        //超标站点点击查询
        searchSiteover(){
            if(this.startTime && this.endTime){
                this.getzdcb2()
            }else{
                this.$message({
                    message: "请选择查询时间",
                    type: "success"
                });
            }
        },
        //首页接口
        sendAxios(){
            this.getNowTime().then(end=>{
                this.getCurrentMonthFirst().then(start=>{
                    if(end && start){
                        let params={
                            start:start,
                            end:end
                        }
                        this.$api.user.firstP({params}).then(res=>{
                           
                            if(res.data.code ==0){
                                let firstObj = res.data.data[0]
                                this.xzqy = firstObj.newCompany    //本月新增企业
                                this.xzzd = firstObj.newSite   //本月新增站点
                                this.cbqy = firstObj.overCompany  //超标企业
                                this.cbzd = firstObj.overSite  //超标站点
                                this.ycqy = firstObj.exCompany  //异常企业
                                this.yczd = firstObj.exSite  //异常站点
                                this.yjqy = firstObj.warnCompany  //预警企业
                                this.yjzd = firstObj.warnSite  //预警站点
                                this.zdzs = firstObj.siteAll //站点总数
                                this.qbly = firstObj.boardAll //全部留言
                                this.zxhf = firstObj.boardReply //最新回复
                                this.wdly = firstObj.boardUnread //未读留言
                                this.cbxc = firstObj.pushOver  //超标消息
                                this.ycxc = firstObj.pushEx  //异常消息
                                this.yjxx = firstObj.pushWarn  //预警消息
                                // if(firstObj.countAndCreateTimeByDate && firstObj.countAndCreateTimeByDate.length>0){    //获取柱状图数组
                                //     this.zxData = firstObj.countAndCreateTimeByDate
                                // }
                                this.lxzd = firstObj.siteCountOff   //离线站点总数
                                this.$store.commit('getWDLY', this.wdly)
                                localStorage.setItem('wdly',this.wdly)
                            }
                        })
                    }
                })
            })
            
        },
        //获取站点超标(首次进入)
        getzdcb(){
            this.getNowTime().then(endT=>{
                this.getCurrentMonthFirst().then(startT=>{
                    if(endT && startT){
                        this.startTime = startT;
                        this.endTime = endT
                        let params = {
                            start: this.startTime,
                            end: this.endTime 
                        }
                        this.$api.user.zdcb({params}).then(res=>{
                     
                            if(res.data.code ==0){
                                if(res.data.data && res.data.data.length>0){
                                  
                                    this.zxData = res.data.data    //获取柱状图数组
                                }
                            }
                        })
                    }
                })
            })
           
        },
        getzdjr(){        
            let now = new Date();
            let year = now.getFullYear(); //得到年份
            console.log(year)
            this.yearV =JSON.stringify(year)
        },
        getzdjr2(year){        
            let startY = `${year}-01-01`
            let endY = `${year+1}-01-01`
            let params={
                start: startY,
                end: endY 
            }
            this.$api.user.zdjr({params}).then(res=>{

                if(res.data.code ==0){
                   this.zuData = res.data.data
                  
                }
            })
        },
        //点击搜索
        getzdcb2(){
            let params = {
                start: this.startTime,
                end: this.endTime 
            }
            this.$api.user.zdcb({params}).then(res=>{
            
                if(res.data.code ==0){
                    if(res.data.data && res.data.data.length>0){
                        
                        this.zxData = res.data.data    //获取柱状图数组
                    }
                }
            })
        },
        getNowTime() {
            return new Promise(resolve=>{
                let now = new Date();
                let year = now.getFullYear(); //得到年份
                let month = now.getMonth(); //得到月份
                let date = now.getDate(); //得到日期
                let hour = now.getHours();//得到小时
                month = month + 1;
                month = month.toString().padStart(2, "0");
                date = date.toString().padStart(2, "0");
                let defaultDate = `${year}-${month}-${date}`;
                resolve(defaultDate)
            })
            
        },
        getCurrentMonthFirst(){
            return new Promise(resolve=>{
                let date = new Date();
                date.setDate(1);
                let month = parseInt(date.getMonth()+1);
                let day = date.getDate();
                let hour = date.getHours();//得到小时
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                let firstData= `${date.getFullYear()}-${month}-${day}`;;
                resolve(firstData)
            })
            
        }

    },
    watch:{
        yearV(val){
            this.getzdjr2(val)
        }
    }
};
</script>

<style lang="scss" scoped>
// .el-picker-panel .el-date-picker .el-popper .has-time > .el-picker-panel__body {
//     height: 200px !important;
//     overflow-y: auto;
// }
// .firstPage >>> .el-input--mini .el-input__inner {
//     width: 160px;
// }
.sT {
    width: 145px !important;
}
.firstPage >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 180px;
}
.firstPage {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .contentLeft {
        height: 100%;
        width: 60%;
        .contentL {
            height: 50%;
            background: #fff;
            position: relative;
            .tps {
                position: absolute;
                top: 3.2%;
                left: 3%;
                width: 22px;
            }
            .date {
                position: absolute;
                right: 4%;
                top: 10px;
                z-index: 999;
            }
        }
        .footer {
            height: 48%;
            margin-top: 15px;
            background: #fff;
            position: relative;
            .tps {
                position: absolute;
                top: 3.2%;
                left: 3%;
                width: 22px;
            }
            .date {
                position: absolute;
                right: 4%;
                top: 10px;
                z-index: 999;
            }
        }
    }
    .contentRight {
        height: 100%;
        // border: 1px solid;
        width: 40%;
        margin-left: 15px;
        .rigSpam {
            height: 50%;
            // border: 1px solid;
            .box-card {
                height: 99.5%;
                .titRU {
                    height: 15%;
                    display: flex;
                    align-items: center;
                    width: 30%;
                    p {
                        padding-left: 3%;
                        font-family: SimHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        font-size: 18px;
                        width: 200px;
                    }
                }

                .contentR {
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    .itemR {
                        display: flex;
                        justify-content: space-around;
                        div {
                            width: 25%;
                            height: 120px;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 6px 20px 0px rgba(90, 94, 253, 0.24);
                            border-radius: 10px;
                            // border: 1px solid;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .nu {
                                font-size: 27px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(46, 101, 253, 1);
                            }
                            .t {
                                font-size: 18px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                                opacity: 0.8;
                            }
                        }
                    }
                }
            }
        }
        .site {
            position: relative;
            height: 48%;
            background: rgba(255, 255, 255, 1);
            display: flex;
            flex-direction: column;
            margin-top: 15px;
            .sm {
                height: 120px;
                display: flex;
                justify-content: space-around;
                .smItem {
                    width: 150px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    p {
                        display: flex;
                        width: 70px;
                        justify-content: space-around;
                    }
                }
            }
            .titp {
                position: absolute;
                top: 2.5%;
                left: 4%;
            }
        }
    }
}
.firstPage >>> .el-card__header {
    background: linear-gradient(
        142deg,
        rgba(90, 94, 253, 1) 0%,
        rgba(103, 182, 253, 1) 100%
    );
    border-radius: 5px 5px 0px 0px;
}
.firstPage >>> .el-card__body {
    height: 85%;
    padding: 0 !important;
}
</style>