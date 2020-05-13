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
        <spam-reply @closeD="closeDs"></spam-reply>
    </div>
</template>
<script>
import spamList from './spamList';
import noData from '../common/noData';
import spamReply from './spamReply'
export default {
    components:{
        spamList,
        noData,
        spamReply
    },  

    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            spamArr: [], //所有角色数组
            state:'', //留言状态
        };
    },
 
    mounted(){
       this.fromWitch()
    },
    methods:{
        //从哪进入到这个页面的
        fromWitch(){
            if(this.$route.query.state == '2'){  //首页最新回复
                let pageNum = this.currentPage;
                this.state = 2
                this.getSpam(pageNum)
            }else if(this.$route.query.state == '0'){ //首页未读留言
                let pageNum = this.currentPage;
                this.state = 0
                this.getSpam(pageNum)
            }else{    
                let pageNum = this.currentPage;
                this.getSpam(pageNum)
            }
        },
        //删除成功
        delT(val){
            let pageNum = this.currentPage;
            this.getSpam(pageNum)
        },
        //详情窗口关闭 --因为有三个状态需要实时更新
        closeDs(){
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
                        state:this.state
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
        
    },
    watch:{
        //删除页面最后一条数据时，currentPage没有减一，页面列表为空
        totalLength(){
            if(this.totalLength==(this.currentPage-1)*this.pagesize&& this.totalLength!=0){
            this.currentPage-=1;
            this.getSpam(this.currentPage)
            }
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