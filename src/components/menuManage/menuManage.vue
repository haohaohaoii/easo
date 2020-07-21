<template>
    <div class="menuManage">
        <menu-add @addSuccess="addT"></menu-add>
        <menu-editor @ediSuccess="ediT"></menu-editor>
        <div class="menuTop">
            <div class="markMsg">
                <div></div>
                <p>菜单管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="menuClick"
                    v-has="'添加菜单'"
                >添加菜单</el-button>
            </div>
        </div>
        <menu-list :munuList="menuArr" @delSuccess="delT" v-if="menuArr && menuArr.length>0">
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
        </menu-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import menuList from './menuList'
import menuAdd from './menuAdd'
import menuEditor from './menEditor'
import noData from '../common/noData'
export default {
    components:{
        menuList,
        menuAdd,
        menuEditor,
        noData
    },
    data() {
         return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 13, //一页多少条数据
            menuArr: [], //所有角色数组
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
            this.$api.menu
                .getFymenu({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.menuArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //添加角色
        menuClick(){
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
.menuManage {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .menuTop {
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