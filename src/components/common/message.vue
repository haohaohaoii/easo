<template>
    <!--角色管理-->
    <div class="roleManage">
        <div class="roleTop">
            <div class="markMsg">
                <div></div>
                <p>消息</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="startTime"
                        placeholder="开始时间"
                        time-arrow-control
                    ></el-date-picker>
                    <span>至</span>
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="endTime"
                        placeholder="结束时间"
                        time-arrow-control
                    ></el-date-picker>
                    <el-button type="primary" class="changeW" @click="cx">查询</el-button>
                </div>
            </div>
        </div>
        <message-list
            v-if="messageL && messageL.length>0"
            :messageArr="messageL"
            @delSuccess="delT"
        >
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
        </message-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import noData from './noData';
import messageList from "./messageList"
import { mapMutations } from "vuex";
export default {
     components: {
        messageList,
        noData
    },
    data() {
        return{
            startTime:'',  //选中的开始时间value
            endTime:'',  //选中的结束时间value
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            messageL: [], //所有留言的数组
            state:''   //留言状态
        }
    },
    mounted(){
        this.fromWitch()
    },
    methods: {
        //从哪进入到这个页面的
        fromWitch(){
            if(this.$route.query.state == '0'){  //首页超标消息
                this.state = 0
                let pageNum = this.currentPage;
                this.getUserlist(pageNum);
            }else if(this.$route.query.state == '1'){ //首页异常消息
                this.state = 1
                let pageNum = this.currentPage;
                this.getUserlist(pageNum);
            }else if(this.$route.query.state == '2'){  //首页预警消息
                this.state = 2
                let pageNum = this.currentPage;
                this.getUserlist(pageNum);
            }else{    
                this.getNowTime();
                this.getCurrentMonthFirst();
                let pageNum = this.currentPage;
                this.getUserlist(pageNum);
            }
        },
        //点击查询
        delT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum);
            }
        },
        cx(){
            this.currentPage = 1;
            let pageNum = this.currentPage;
            this.getUserlist(pageNum);
        },
        getNowTime() {
            let now = new Date();
            let year = now.getFullYear(); //得到年份
            let month = now.getMonth(); //得到月份
            let date = now.getDate(); //得到日期
            let hour = now.getHours();//得到小时
            month = month + 1;
            month = month.toString().padStart(2, "0");
            date = date.toString().padStart(2, "0");
            let defaultDate = `${year}-${month}-${date} :${hour}:00:00`;
            this.endTime  =defaultDate
        },
        getCurrentMonthFirst(){
          
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
           let firstData= date.getFullYear() + '-' + month + '-' + day +':'+hour +':00:00';
           this.startTime = firstData
        },
        //获取留言列表数据
        getUserlist(pageNum){
       
                let startTime = this.startTime;
                let endTime = this.endTime;
                let pageSize = this.pagesize;
                this.$api.msg
                    .getMsglist({
                        params: {
                            pageNum: pageNum,
                            pageSize: pageSize,
                            start: startTime,
                            end: endTime,
                            state:this.state
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            if(res.data.pageInfo.list &&res.data.pageInfo.list.length >= 1) {
                                //说明有数据
                                this.messageL = res.data.pageInfo.list;
                                this.totalLength = res.data.pageInfo.total; //获取总条数
                            } else {
                                //说明没有数据
                                this.messageL = [];
                            }
                        }
                    })
                    .catch(error => {});
            
        },
        search(){  //点击查询

        },
        delet(){  //点击删除

        },
        //点击页码的时候
        handleCurrentChange(currentPage){
            //重新赋值，重新请求
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getUserlist(pageNum);
        }
    }
};
</script>


<style lang="scss" scoped>
.roleManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 15px;
    .roleTop {
        // margin-top: 0.5%;
        // margin-bottom: 2%;
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
            .add {
                position: absolute;
                right: 4%;
            }
        }
        .search {
            display: flex;
            justify-content: space-between;

            padding-top: 15px;
            .searchL {
                width: 42%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .changeW {
                margin-right: 2%;
            }
        }
    }
    .tabPage {
        text-align: center;
        // padding-top: 40px;
    }
}
</style>