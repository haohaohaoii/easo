<template>
    <!--角色管理-->
    <div class="roleManage">
        <div class="roleTop">
            <div class="markMsg">
                <div></div>
                <p>角色管理</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select
                        placeholder="选择企业"
                        class="changeW"
                        v-model="companyValue"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item of companyLit"
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
                    <el-button type="danger" class="changeW" @click="delet">删除</el-button>
                </div>
            </div>
             <message-list :messageArr="messageL">
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
        </div>
    </div>
</template>

<script>
import messageList from "./messageList"
import { mapMutations } from "vuex";
export default {
     components: {
        messageList
    },
    data() {
       return{
           companyValue:'',  //选中的企业value
           companyLit:[],  //企业数组
           startTime:'',  //选中的开始时间value
           endTime:'',  //选中的结束时间value
           totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            messageL: [], //所有留言的数组
       }
    },
    created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum)
    },
    methods: {
        //获取留言列表数据
        getUserlist(){

        },
        search(){  //点击查询

        },
        delet(){  //点击删除

        },
        //点击页码的时候
        handleCurrentChange(){

        }
    }
};
</script>


<style lang="scss" scoped>
.roleManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .roleTop {
        margin-top: .5%;
        margin-bottom: 2%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .markMsg {
            display: flex;
             margin-bottom: 2%;
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
            .searchL {
                width: 68%;
                display: flex;
                justify-content: space-between;
            }
            .changeW {
               margin-right: 2%;
            }
        }
    }
    .tabPage {
        text-align: center;
        padding: 20px;
    }
}
</style>