<template>
    <div class="companyUser">
        <user-add></user-add>
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>企业用户</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addQy"
                    v-has="'添加企业用户'"
                >添加企业用户</el-button>
            </div>
        </div>
        <user-list :companyList="companyArr">
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
    </div>
</template>

<script>
import userAdd from './userAdd'
import userList from "./userList";
import {mapMutations} from 'vuex'
export default {
    components: {
        userList,
        userAdd
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            companyArr: [], //所有角色数组
        };
    },
     created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum)
    },
    methods:{
        getUserlist(pageNum){
            let pageSize = this.pagesize;
            this.$api.company
                .getCompanyusers({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })

                .then(res => {
                 
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.companyArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //添加企业用户
        addQy(){
            this.$store.commit('changeUserA',true);
        },
        //点击页码的时候
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getUserlist(pageNum)
        }
        
    }
};
</script>

<style lang="scss" scoped>
.companyUser {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .enmationTop {
        margin-top: 1%;
        margin-bottom: 2%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
}
</style>