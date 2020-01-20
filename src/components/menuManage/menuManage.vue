<template>
    <div class="menuManage">
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
                >添加菜单</el-button>
            </div>
        </div>
        <menu-list :munuList="menuArr">
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
    </div>
</template>

<script>
import menuList from './menuList'
export default {
    components:{
        menuList
    },
    data() {
         return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            menuArr: [], //所有角色数组
        };
    },
    created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum)
    },
    methods:{
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
        
    }
};
</script>

<style lang="scss" scoped>
.menuManage {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .menuTop {
        margin-top: 1%;
        margin-bottom: 2%;
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
    }
}
</style>