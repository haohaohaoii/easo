<template>
    <div class="divManage">
        <div-add></div-add>
        <div class="divTop">
            <div class="markMsg">
                <div></div>
                <p>部门管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addManage"
                    v-has="'添加部门'"
                >添加部门</el-button>
            </div>
        </div>
        <div-list :divManas="divManaArr">
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
        </div-list>
    </div>
</template>

<script>
import divList from './divList'
import {mapMutations} from 'vuex'
import divAdd from './divAdd'
export default {
    components:{
        divList,
        divAdd
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            divManaArr: [], //所有角色数组
        };
    },
    created(){
        let pageNum = this.currentPage;
        this.getdivMana(pageNum)
    },
    methods:{
        addManage(){
            this.$store.commit('divAddstatus',true)
        },
        getdivMana(pageNum){
            let pageSize = this.pagesize;
            this.$api.depart
                .getDept({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.divManaArr = res.data.pageInfo.list  //获取数据
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
            this.getdivMana(pageNum)
        }
        
    }
};
</script>


<style lang="scss" scoped>
.divManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .divTop {
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