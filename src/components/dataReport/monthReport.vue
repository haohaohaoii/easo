<template>
    <div class="opetract">
        <div class="opetracttop">
            <div class="markMsg">
                <div></div>
                <p>月报表</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select
                        v-model="siteStateVal"
                        @focus="getSites"
                        placeholder="选择站点"
                        filterable
                        size="small"
                        clearable
                    >
                        <el-option
                            v-for="item in siteList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="dateD">
                        <el-date-picker
                            format="yyyy-MM-dd "
                            value-format="yyyy-MM-dd"
                            size="small"
                            type="date"
                            class="changeW"
                            v-model="startTime"
                            placeholder="开始时间"
                            time-arrow-control
                        ></el-date-picker>
                        <span>至</span>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="small"
                            type="date"
                            class="changeW"
                            v-model="endTime"
                            placeholder="结束时间"
                            time-arrow-control
                        ></el-date-picker>
                    </div>

                    <el-button
                        type="primary"
                        class="changeW"
                        size="mini"
                        @click="search"
                        style="width:100px"
                    >查询</el-button>
                    <!-- <el-button type="primary" class="changeW" size="mini">导出EXL表</el-button> -->
                </div>
            </div>
        </div>
        <div class="tabE" v-if="dayList && dayList.length>0">
            <el-table
                :height="tableHeight"
                :data="dayList"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="siteName" label="基站名"></el-table-column>
                <el-table-column align="center" prop="cod" label="COD(mg/L)"></el-table-column>
                <el-table-column align="center" prop="ad" label="氨氮(mg/L)"></el-table-column>
                <el-table-column align="center" prop="zl" label="总磷(mg/L)"></el-table-column>
                <el-table-column align="center" prop="zd" label="总氮(mg/L)"></el-table-column>
                <el-table-column align="center" prop="ll" label="流量"></el-table-column>
                <el-table-column align="center" prop="numDate" label="数据时间(月)"></el-table-column>

                <el-table-column label="操作" align="center" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleExport(scope.$index, scope.row)"
                        >导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabPage">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalLength"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                ></el-pagination>
            </div>
        </div>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import noData from "../common/noData";
import base from '../../api/base.js'; // 导入接口域名列表
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        noData
    },

    data() {
        return {
            id:'',
            tableHeight:window.innerHeight -270,
            siteStateVal:'', //选中的站点
            dayList:[],   //数据数组
            startTime:'', //开始时间
            endTime:'',  //结束时间
            siteList:[],  //站点数组
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页
            pagesize: 10, //每页显示多少条
      
        };
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
    },
    mounted(){
        this.getNowTime().then(eTime=>{
            this.getCurrentMonthFirst().then(sTime=>{
                this.endTime = eTime
                this.startTime = sTime
                this.search()
            })
        })
    },
    
    methods: {

        //开始时间
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
        //结束时间
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
                let firstData= date.getFullYear() + '-' + month + '-' + day;
            
                resolve(firstData)
            })
        },
        //获取站点
        getSites(){
            this.$api.site.getAlls().then(res=>{
   
                if(res.data.code == 0){
                    let arr = res.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].siteName,
                            value:arr[i].mn
                        }
                        list.push(obj)
                    }
                    this.siteList = list
                }
            })
        },
        //点击查询
        search() {
            if(this.startTime || this.endTime ){
                this.currentPage = 1;
                let pageNum = this.currentPage;
                this.sendAxios(pageNum);
            }else{
                this.$message.error("请选择查询条件!");
            }
           
        },
        //点击第几页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;

            this.sendAxios(pageNum);
        },
        //发送数据请求(分页)
        sendAxios(pageNum) {
        
            let pageSize = this.pagesize;
            this.$api.dReport
                .getMonthlist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        mn:this.siteStateVal, //选中的站点
                        start:this.startTime,  //开始时间
                        end:this.endTime  //结束时间
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        let arr  = res.data.pageInfo.list;
                        if(arr && arr.length>0){
                            let listA = []
                            for(let k=0; k<arr.length; k++){
                         
                                let d =arr[k].createTime;
                                let p = new Date(new Date(d).getTime())
                                let month = p.getMonth()+1
             
                                if (month < 10) month = "0" + month;
                             
                                let s1 = p.getFullYear()+'年' +month+'月'
                                let obj = {
                                    id:arr[k].id,    //id
                                    siteName:arr[k].siteName, //基站名
                                    numDate:s1, //数据时间
                                    ioType:arr[k].ioType?'进水口':'排水口',
                                    createTime:arr[k].createTime
                                }
                                let yzArr = arr[k].reports
                                for(let j=0; j<yzArr.length; j++){
                                    obj.mn = yzArr[j].mn
                                    if(yzArr[j].factorCode == '011'){   //cod
                                        obj.cod = yzArr[j].avgValue
                                    }
                                    if(yzArr[j].factorCode == '101'){   //氨氮
                                        obj.ad = yzArr[j].avgValue
                                    }
                                    if(yzArr[j].factorCode == '060'){   //总磷
                                        obj.zl = yzArr[j].avgValue
                                    }
                                    if(yzArr[j].factorCode == '065'){   //总氮
                                        obj.zd = yzArr[j].avgValue
                                    }
                                    if(yzArr[j].factorCode == 'B01'){   //流量
                                        obj.ll = yzArr[j].avgValue
                                    }
                                }
                                listA.push(obj)
                            }
                            this.dayList = listA //获取数据
                        }else{
                             this.dayList = []
                        }
                       
                    }
                })
                .catch(error => {});
        },
        //详情
        handleDetails(index, row){

            console.log(index, row);
            let mn = row.mn;
            let siteName = row.siteName
            let ioType = row.ioType
            let createTime = row.createTime
            let pTime =this.getPreMonth(createTime)
            let params = {
                date:row.createTime
            }
           
            this.$api.dReport.getMonthDetail(mn,{params}).then(res=>{
           
                if(res.data.code == 0){
                    
                    // this.detailPeodilaog = true;
                    let item = res.data.data[0]
                    let obj = {
                        siteName:siteName,
                        ioType:ioType,
                        sTime:pTime,
                        eTime:createTime
                    }
                    localStorage.item = JSON.stringify(res.data.data[0])
                    localStorage.itemXy = JSON.stringify(obj)
                    this.$router.push({path:'/monthDetail'})
                }
            })
        },
         getPreMonth(date) {  
            var arr = date.split('-');  
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);  
            days = days.getDate(); //获取当前日期中月的天数  
            var year2 = year;  
            var month2 = parseInt(month) - 1;  
            if (month2 == 0) {  
                year2 = parseInt(year2) - 1;  
                month2 = 12;  
            }  
            var day2 = day;  
            var days2 = new Date(year2, month2, 0);  
            days2 = days2.getDate();  
            if (day2 > days2) {  
                day2 = days2;  
            }  
            if (month2 < 10) {  
                month2 = '0' + month2;  
            }  
            var t2 = year2 + '-' + month2 + '-' + day2; 
            return t2;  
        },
          
        handleExport(index, row){
             console.log(index, row);
            let params = {
                date:row.createTime,
                mn :row.mn
            }
            if ('ActiveXObject' in window) {
                    var url = `${base.localUrl}/admin/report/month/export?date=${params.date}&mn=${params.mn}`
                } else {
                    var url = `${base.localUrl}/admin/report/month/export?date=${params.date}&mn=${params.mn}`
                }
                window.location.href = url;
        }
    },

};
</script>

<style lang="scss" scoped>
.opetract >>> .el-input {
    width: 200px !important;
}
.opetract >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
.opetract {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .opetracttop {
        height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .markMsg {
            display: flex;
            div {
                width: 0.15%;
                background: rgba(30, 135, 240, 1);
                position: relative;
                right: 1%;
                top: 10%;
            }
            p {
                font-size: 20px;
                font-family: Adobe Heiti Std;
                font-weight: bold;
                color: rgba(51, 62, 68, 1);
            }
        }
        .search {
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            .searchL {
                width: 60%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .dateD {
                    width: 55%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
        // padding-top: 20px;
    }
}
</style>