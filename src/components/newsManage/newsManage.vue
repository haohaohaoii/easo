<template>
    <div class="enterMation">
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>新闻管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addNews"
                    v-has="'添加新闻'"
                >添加新闻</el-button>
            </div>
        </div>
        <news-list :newsList="newsArr" @delSuccess="delSuccess" v-if="newsArr && newsArr.length>0">
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
        </news-list>
        <no-data v-else></no-data>
        <news-add :isShow="isAddshow" @close="closeAdd" @refres="refQq"></news-add>
        <news-editor @refres="refQq"></news-editor>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import newsList from './newsList'
import newsAdd from './newsAdd'
import newsEditor from './newsEditor'
import noData from '../common/noData'
export default {
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            newsArr: [], //所有角色数组
            isAddshow:false
        };
    },
    components:{
        newsList,
        newsAdd,
        newsEditor,
        noData
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
            this.$api.news
                .getNewslist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })

                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.newsArr = res.data.pageInfo.list  //获取数据
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