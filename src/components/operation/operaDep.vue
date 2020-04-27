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
                    v-has="'添加部门'"
                >添加部门</el-button>
            </div>
        </div>

        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="depArr"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="deptName" label="部门名称"></el-table-column>
                <el-table-column align="center" prop="contactMan" label="负责人"></el-table-column>
                <el-table-column align="center" prop="contactPhone" label="电话"></el-table-column>
                <el-table-column align="center" label="区域">
                    <template slot-scope="scope">
                        <p>{{scope.row.city}}{{scope.row.county}}</p>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="addressDetail" label="地址"></el-table-column>
                <el-table-column align="center" prop="createTime" label="添加时间"></el-table-column>

                <el-table-column label="操作" align="center" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDel(scope.$index, scope.row)"
                            v-has="'删除'"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>
        <oper-add :isShow="addIsShow" @changeAddDialog="changeA" @addSuccess="addT"></oper-add>
        <oper-editor
            :isShow="ediIsShow"
            @changeEdiDialog="changeE"
            :item="operItem"
            @ediSuccess="ediT"
        ></oper-editor>
    </div>
</template>

<script>
import operAdd from "./operAdd";
import operEditor from './operEditor'

import {mapMutations} from 'vuex'
export default {
    components: {
      
        operAdd,
        operEditor
    },
    data() {
        return {
            tableHeight:window.innerHeight -230,
            addIsShow:false, //添加弹窗
            ediIsShow:false, //编辑弹窗
            operItem:'',  //行数据详情
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页码
            pagesize: 10, //一页多少条数据
            depArr: [], //所有运维部门数组
        };
    },
    created(){
        let pageNum = this.currentPage;
        this.getUserlist(pageNum)
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        }
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
        //关闭编辑的运维部门弹窗
        changeE(){
            this.ediIsShow = false
        },
        //添加企业成功重新请求页面
        addT(val){
            if(val){
               let pageNum = this.currentPage;
                this.getUserlist(pageNum)
           } 
        },
        //编辑成功重新请求页面
        ediT(val){
            if(val){
                let pageNum = this.currentPage;
                this.getUserlist(pageNum)
            } 
        },
        getUserlist(pageNum){
            let pageSize = this.pagesize;
            this.$api.oper
                .getOperlist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        let arr  = res.data.pageInfo.list;
                        this.depArr = res.data.pageInfo.list  //获取数据
                    }
                })
                .catch(error => {});
        },
        //点击编辑--跳转编辑dialog并传递行数据
        handleEdit(index, row) {
            console.log(index, row);
            let resId = row.id;
            let _this = this;
            this.$api.oper.getOperitem(resId).then(res => {
      
                console.log(res)
                if (res.data.code == 0) {
                    _this.operItem = res.data.data[0]
                    _this.ediIsShow = true
                }
            }).catch(error => {

            })
        },
        //点击删除
        handleDel(index,row){
            this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let newId = row.id;
                    this.$api.oper.deleteOper(newId).then(res=>{
                        if(res.data.code == 0){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            let pageNum = this.currentPage;
                            this.getUserlist(pageNum)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
           
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
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
        // padding-top: 20px;
    }
}
.operaDep >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>