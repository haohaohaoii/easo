<template>
    <div class="spam">
        <div class="spamTop">
            <div class="markMsg">
                <div></div>
                <p>留言管理</p>
            </div>
        </div>
        <spam-list :spamAll="spamArr" @delSuccess="delT" v-if="spamArr && spamArr.length>0">
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
        </spam-list>
        <no-data v-else></no-data>
    </div>
</template>
<script>
import spamList from './spamList';
import noData from '../common/noData';
export default {
    components:{
        spamList,
        noData
    },  

    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            spamArr: [], //所有角色数组
        };
    },
    created(){
        let pageNum = this.currentPage;
        this.getSpam(pageNum)
    },
    methods:{
        //删除成功
        delT(val){
            let pageNum = this.currentPage;
            this.getSpam(pageNum)
        },
        getSpam(pageNum){
            let pageSize = this.pagesize;
            this.$api.spam
                .getSpamlist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.spamArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //点击页码的时候
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getSpam(pageNum)
        }
        
    }
};
</script>

<style lang="scss" scoped>
.spam {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .spamTop {
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
        }
    }
    .tabPage {
        text-align: center;
    }
}
</style>