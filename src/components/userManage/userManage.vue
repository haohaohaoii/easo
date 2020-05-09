<template>
    <div class="userManage">
        <user-add @addSuccess="addT"></user-add>
        <user-editor @ediSuccess="ediT"></user-editor>
        <div class="userTop">
            <div class="markMsg">
                <div></div>
                <p>用户管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addUser"
                    v-has="'添加用户'"
                >添加用户</el-button>
            </div>
        </div>
        <user-list :userarr="userArr" @delSuccess="delT" v-if="userArr && userArr.length>0">
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
        </user-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import userList from './userList';
import userAdd from './userAdd';
import userEditor from "./userEditor";
import noData from '../common/noData';
export default {
    components:{
        userList,
        userAdd,
        userEditor,
        noData
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            userArr: [], //所有角色数组
        };
    },
    created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum)
    },
    methods:{
        addT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
        ediT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
        delT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
        getUserlist(pageNum){
            let pageSize = this.pagesize;
            this.$api.user
                .getUser({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.userArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //添加角色
        addUser(){
            this.$store.commit('changeUserAdd',true);
        },
        //点击页码的时候
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getUserlist(pageNum)
        }
        
    },
    watch:{
        //删除页面最后一条数据时，currentPage没有减一，页面列表为空
        totalLength(){
            if(this.totalLength==(this.currentPage-1)*this.pagesize&& this.totalLength!=0){
            this.currentPage-=1;
            this.getUserlist(this.currentPage)
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.userManage {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .userTop {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .markMsg {
            display: flex;
            position: relative;
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
    }
    .tabPage {
        text-align: center;
    }
}
</style>