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
                    v-has="'上传文件'"
                >上传文件</el-button>
            </div>
        </div>
        <res-list :newsList="resArr" @delSuccess="delSuccess" v-if="resArr &&resArr.length>0">
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
        <no-data v-else></no-data>
        <res-add :isShow="isAddshow" @close="closeAdd" @refres="refQq"></res-add>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import resList from './resList';
import resAdd from './resAdd';
import noData from '../common/noData';
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
        noData
    },
    computed:{
        ...mapState(['resIsEditSuccess'])
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
            this.getNewslist(pageNum)
        }
        
    },
    watch:{
        //
        resIsEditSuccess(val){
            if(val==true){
                this.refQq()
            }
        },
        //删除页面最后一条数据时，currentPage没有减一，页面列表为空
        totalLength(){
            if(this.totalLength==(this.currentPage-1)*this.pagesize&& this.totalLength!=0){
            this.currentPage-=1;
            this.getNewslist(this.currentPage)
            }
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