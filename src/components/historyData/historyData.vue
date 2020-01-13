<template>
    <div class="historyD">
        <div class="historyTop">
            <div class="markMsg">
                <div></div>
                <p>历史数据</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select
                        placeholder="选择企业"
                        class="changeW"
                        v-model="companyValue"
                        filterable
                        clearable
                        @change="changeVal"
                    >
                        <el-option
                            v-for="item of companyLit"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select placeholder="选择基站" class="changeW" filterable v-model="baseValue">
                        <el-option
                            v-for="item of baseArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="startTime"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd HH:00:00"
                        format="yyyy-MM-dd HH:00:00"
                        time-arrow-control
                    ></el-date-picker>
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="endTime"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:00:00"
                        format="yyyy-MM-dd HH:00:00"
                        time-arrow-control
                    ></el-date-picker>
                    <el-button type="primary" class="changeW" @click="search">查询</el-button>
                </div>
                <div>
                    <el-radio-group v-model="btnMsg">
                        <el-radio-button label="列表"></el-radio-button>
                        <el-radio-button label="折线"></el-radio-button>
                        <el-radio-button label="柱状"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <list-data v-if="btnMsg=='列表'" :datalist="hisDatalist">
            <!--插槽-->
            <div class="tabPage">
                <p class="indic">注：红色字体代表超标数据，橙色字体代表异常数据。</p>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalLength"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                ></el-pagination>
            </div>
        </list-data>
        <line-data v-if="btnMsg=='折线'" :datalist="hisDatalist"></line-data>
        <bar-data v-if="btnMsg=='柱状'"></bar-data>
    </div>
</template>

<script>
import listData from "./listData"; //引入列表组件
import lineData from "./lineData"; //引入折线组件
import barData from "./barData";
import commonJs from "../common/common.js"; //引入全局公共方法
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        listData,
        lineData,
        barData
    },

    data() {
        return {
            companyLit:[],  //选择企业下拉数组
            baseArr:[],  //选择基站下拉数组
            hisDatalist:[],  //历史数据
            btnMsg: "列表",  //默认以列表形式展示数据
            companyValue:'',  //选中的企业值
            baseValue:'',    //选中的基站值
            startTime: "", //开始时间
            endTime: "", //结束时间
            totalLength:0, //总共多少条数据
            currentPage:1, //初始页
            pagesize: 10, //每页显示多少条
        };
    },
    mounted(){
        this.getCompany()
    },
    computed: {
        ...mapState(["searchHours"])
    },
    methods: {

        //点击查询
        search() {
            //必传参数 开始时间和结束时间
            this.currentPage = 1
            let pageNum = this.currentPage
            this.sendAxios(pageNum)
        },
        //点击第几页
        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            let pageNum = this.currentPage;
          
            this.sendAxios(pageNum)
        },
       //发送数据请求
        sendAxios(pageNum){
            if(this.startTime!='' && this.endTime!=''){
                let startTime = this.startTime;
                let endTime = this.endTime;
                let pageSize = this.pagesize;
                this.$api.data.historyData({params: {pageNum: pageNum,pageSize:pageSize,start:startTime,end:endTime}})
                .then(res=>{
  
                    console.log(res)
                    if(res.data.code ==0){
                        if(res.data.pageInfo.list && res.data.pageInfo.list.length>=1){  //说明有数据
                            this.hisDatalist= res.data.pageInfo.list
                            this.totalLength = res.data.pageInfo.total  //获取总条数
                        }else{  //说明没有数据
                            this.hisDatalist = [];
                        }
                    }
                }).catch(error=>{

                })

            }else{
                this.$message.error("注意：开始时间和结束时间为必选项");
            }
        },
        //获取企业下拉数组
        getCompany(){
            this.$api.company.companyAll().then(res=>{
                console.log(res)
                if(res.data.code ==0){
                    let companyList = res.data.data
                    let listArr = [];
                    for(let i =0; i<companyList.length; i++){
                        let obj = {
                            label:companyList[i].username,
                            value:companyList[i].id
                        }
                        listArr.push(obj)
                    }
                    this.companyLit = listArr;
                }
            }).catch(error=>{

            })
        },
        //选中企业事件
        changeVal(val){
            this.baseValue = ''  //每次点击都要把之前选中的基站置空
            if(val){  //这个判断为了防止删除的时候，val的值为空
                this.getComsite(val)
            }else{   //这个逻辑防止企业选择框删除的时候,基站的下拉框中还有值
                this.baseArr = []
            }
        },
        //根据企业获取对应基站相关数据
        getComsite(companyId){
            this.$api.site.formComsite(companyId).then(res=>{
                console.log(res);
                if(res.data.code ==0){
                    let siteList = res.data.data
                    let siteArr = []
                    for(let k=0; k<siteList.length; k++){
                        let item = {
                            label:siteList[k].siteName,
                            value:siteList[k].mn
                        }
                        siteArr.push(item)
                    }
                    this.baseArr = siteArr
                }
            }).catch(error=>{

            })
        }
    }
};
</script>

<style lang="scss" scoped>
.historyD {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .historyTop {
        height: 16.5%;
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
            display: flex;
            justify-content: space-between;
            .searchL {
                width: 68%;
                display: flex;
                justify-content: space-between;
            }
            .changeW {
                width: 18%;
            }
        }
    }
    .tabPage {
        text-align: center;
        padding: 20px;

        .indic {
            position: absolute;
            right: 2%;

            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 0, 0, 1);
        }
    }
}
</style>