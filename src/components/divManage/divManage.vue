<template>
    <div class="divManage">
        <div-add @addSuccess="addT"></div-add>
        <div-editor @editorSuccess="ediT"></div-editor>
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
        <div-list
            :divManas="divManaArr"
            @delSuccess="delT"
            v-if="divManaArr && divManaArr.length>0"
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
        </div-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import divList from './divList'
import divEditor from './divEditor';
import {mapMutations} from 'vuex'
import divAdd from './divAdd'
import noData from '../common/noData'
export default {
    components:{
        divList,
        divAdd,
        divEditor,
        noData
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
        addT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getdivMana(pageNum)
            }
        },
        ediT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getdivMana(pageNum)
            }
        },
        delT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getdivMana(pageNum)
            }
        },
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
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .divTop {
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