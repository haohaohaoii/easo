<template>
    <div class="baseMation">
        <base-add @addSuccess="addT"></base-add>
        <base-editor @ediSuccess="ediT"></base-editor>
        <base-detail></base-detail>
        <base-audit @auditSuccess="audiT"></base-audit>
        <div class="baseTop">
            <div class="markMsg">
                <div></div>
                <p>基站管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="baseAdd"
                    v-has="'添加基站'"
                >添加基站</el-button>
                <el-button
                    type="danger"
                    class="backbase"
                    @click="backbase"
                    icon="el-icon-back"
                    v-show="isShowback"
                    size="mini"
                >查看所有基站</el-button>
            </div>
        </div>
        <base-list :baseAll="baseArr" v-if="baseArr && baseArr.length>0" @delSuccess="delS">
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
        </base-list>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import baseAdd from './baseAdd';
import baseAudit from './baseAudit'
import baseDetail from './baseDetail'
import baseEditor from './baseEditor';
import baseList from './baseList';
import {mapMutations} from 'vuex';
import noData from '../common/noData';
export default {
    components:{
        baseList,
        baseAdd,
        baseEditor,
        baseDetail,
        baseAudit,
        noData
    },
    data() {
        return {
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 13, //一页多少条数据
            baseArr: [], //所有基站数组
            isShowback:false,  //返回基站列表按钮是否显示
            state:'' //基站的状态
        };
    },
   mounted(){
       this.fromWitch()
   },
    methods:{
        //添加成功，重新请求
        addT(val){
            if(val){
                this.fromWitch()
            }
        },
        //编辑成功，重新请求
        ediT(val){
            if(val){
                this.fromWitch()
            }
        },
        //审核成功,重新请求页面
        audiT(val){
            if(val){
                this.fromWitch()
            }
        },
        //删除成功,重新请求页面
        delS(val){
            if(val){
                this.fromWitch()
            }
        },
        //返回基站列表页面
        backbase(){
            this.$router.push({path:'/baseManage'});
            this.fromWitch()
        },
        //当前页面是从哪进入的
        fromWitch(){
            if(this.$route.query.companyId && this.$route.query.companyName){  //说明是从企业信息过来的
                let companyId = this.$route.query.companyId
                let pageNum = this.currentPage;
                let pagesize = this.pagesize;
                this.getCombase(companyId,pageNum,pagesize)
                this.isShowback = true
            }else if(this.$route.query.state == '1'){   //说明是从首页在线过来的
                this.isShowback = false
                let pageNum = this.currentPage;
                this.state = 1
                this.getBaselist(pageNum)
            }else if(this.$route.query.state == '2'){
                this.isShowback = false
                let pageNum = this.currentPage;
                this.state = 2
                this.getBaselist(pageNum)
            }else{    
                this.isShowback = false
                let pageNum = this.currentPage;
                this.getBaselist(pageNum)
            }
        },
        getCombase(companyId,pageNum,pagesize){
            let params={
                pageNum:pageNum,
                pageSize:pagesize
            }
            this.$api.site.getSitess(companyId,{params}).then(res=>{
 
                console.log(res)
                if(res.data.code ==0){
                    this.totalLength = res.data.pageInfo.total  //获取总条数
                    this.baseArr = res.data.pageInfo.list  //获取数据
                }
            })
        },
      
        getBaselist(pageNum){
            let pageSize = this.pagesize;
            this.$api.site
                .getSiteall({
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
                        this.baseArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //添加基站
        baseAdd(){
            this.$store.dispatch('getEquilist')
            
        },
        //点击页码的时候
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.getBaselist(pageNum)
        }
        
    }
};
</script>

<style lang="scss" scoped>
.baseMation {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .baseTop {
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
                right: 0;
            }
            .backbase {
                position: absolute;
                right: 10%;
            }
        }
    }
    .tabPage {
        text-align: center;
    }
}
</style>