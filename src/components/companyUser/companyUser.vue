<template>
    <div class="companyUser">
        <user-add @addSuccess="addT"></user-add>
        <user-editor @ediSuccess="ediT"></user-editor>
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
        <user-list
            :companyList="companyArr"
            @delSuccess="delT"
            v-if="companyArr &&　companyArr.length>0"
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
        </user-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import userAdd from './userAdd';
import userEditor from './userEditor';
import userList from "./userList";
import {mapMutations} from 'vuex';
import noData from '../common/noData';
export default {
    components: {
        userList,
        userAdd,
        userEditor,
        noData
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 13, //一页多少条数据
            companyArr: [], //所有角色数组
        };
    },
     created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum);
    },
    methods:{
        //企业用户添加成功
        addT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
        //编辑成功
        ediT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
        //删除成功
        delT(val){

            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            }
        },
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
.companyUser {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .enmationTop {
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