<template>
    <div class="operaDep">
        <div class="enmationTop">
            <div class="markMsg">
                <div></div>
                <p>运维部门管理</p>
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addDep"
                >添加部门</el-button>
            </div>
        </div>
        <dep-list :companyList="depArr">
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
        </dep-list>
        <oper-add :isShow="addIsShow" @changeAddDialog='changeA'></oper-add>
    </div>
</template>

<script>
import operAdd from "./operAdd";
import depList from "./depList";
import {mapMutations} from 'vuex'
export default {
    components: {
        depList,
        operAdd
    },
    data() {
        return {
            addIsShow:false,
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            depArr: [    //所有运维部门数组
                {
                    depName:'运维部门',
                    depPeople:'李亚玲',
                    linkPhone:'15136156035',
                    area:'新乡市红旗区',
                    address:'丁栾沟新起寨',
                    createTime:'2020/03/26'
                },
                  {
                    depName:'运维部门',
                    depPeople:'李亚玲',
                    linkPhone:'15136156035',
                    area:'新乡市红旗区',
                    address:'丁栾沟新起寨',
                    createTime:'2020/03/26'
                },
                  {
                    depName:'运维部门',
                    depPeople:'李亚玲',
                    linkPhone:'15136156035',
                    area:'新乡市红旗区',
                    address:'丁栾沟新起寨',
                    createTime:'2020/03/26'
                },  {
                    depName:'运维部门',
                    depPeople:'李亚玲',
                    linkPhone:'15136156035',
                    area:'新乡市红旗区',
                    address:'丁栾沟新起寨',
                    createTime:'2020/03/26'
                },  {
                    depName:'运维部门',
                    depPeople:'李亚玲',
                    linkPhone:'15136156035',
                    area:'新乡市红旗区',
                    address:'丁栾沟新起寨',
                    createTime:'2020/03/26'
                }
            ],
        };
    },
     created(){
        let pageNum = this.currentPage;
        // this.getUserlist(pageNum)
    },
    methods:{
        //点击添加运维部门打开dialog弹窗
        addDep(){
            this.addIsShow = true
        },
        //关闭添加的运维部门弹窗
        changeA(){
            this.addIsShow = false
        },
        //添加企业成功重新请求页面
        addT(val){
            if(val){
               let pageNum = this.currentPage;
                this.getUserlist(pageNum)
           } 
        },
        getUserlist(pageNum){
            let pageSize = this.pagesize;
            this.$api.company
                .companyFyall({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })

                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        this.depArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
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
.operaDep {
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