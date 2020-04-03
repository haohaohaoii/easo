<template>
    <div class="enterMation">
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>资源管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addNews"
                >上传文件</el-button>
            </div>
        </div>
        <res-list :newsList="resArr" @delSuccess="delSuccess">
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
        </res-list>
        <res-add :isShow="isAddshow" @close="closeAdd" @refres="refQq"></res-add>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import resList from './resList'
import resAdd from './resAdd'


export default {
   
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            resArr: [], //所有角色数组
            isAddshow:false
        };
    },
    components:{
        resList,
        resAdd,

        // newsEditor
    },
     created(){
        let pageNum = this.currentPage;
        this.getNewslist(pageNum)
    },
    methods:{
        refQq(){
            let pageNum = this.currentPage;
            this.getNewslist(pageNum)
        },
         //父组件监听，子组件删除成功
        delSuccess(status) {
            if (status == true) {
                //重新请求数据
                let pageNum = this.currentPage;
                this.getNewslist(pageNum);
            }
        },
        getNewslist(pageNum){
            let pageSize = this.pagesize;
            this.$api.resManage
                .getManagelist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })

                .then(res => {
                    // debugger
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.resArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //添加企业--更改状态
        addNews(){
            this.isAddshow = true;
        },
        //关闭企业--更改状态
        closeAdd(val){
            this.isAddshow = val;
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
.enterMation {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .enmationTop {
        // margin-top: 1%;
        // margin-bottom: 2%;
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