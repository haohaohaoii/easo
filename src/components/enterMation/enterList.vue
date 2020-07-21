<template>
    <div class="enterList">
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="tableData"
                stripe
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="left" prop="erpName" label="企业名称" width="260"></el-table-column>
                <el-table-column align="center" prop="erpLinkMan" label="联系人"></el-table-column>
                <el-table-column align="center" prop="erpLinkTel" min-width="120px" label="联系电话"></el-table-column>
                <el-table-column align="left" prop="erpAddr" min-width="200px" label="企业地址"></el-table-column>
                <el-table-column align="center" prop="userSection" label="审核状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userSection==0">审核中</span>
                        <span v-else-if="scope.row.userSection==1">审核通过</span>
                        <span v-else-if="scope.row.userSection==2">审核未通过</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="turnTime" min-width="160px" label="注册时间"></el-table-column>
                <el-table-column label="操作" align="center" width="360" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="audit(scope.$index, scope.row)"
                            :disabled="!scope.row.userSection==0"
                            type="info"
                            v-has="'审核'"
                        >审核</el-button>
                        <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)"
                            v-has="'详情'"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            @click="base(scope.$index, scope.row)"
                            type="primary"
                            v-has="'基站'"
                        >基站</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteEnter(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <slot></slot>
        </div>
    </div>
</template>

<script>

import { mapMutations } from "vuex";

export default {
  
    props: {
        companyList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tableHeight:window.innerHeight -230
        };
    },
    computed: {
        iRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
        tableData() {
            if (this.companyList && this.companyList.length > 0) {
                let companyArr = [];
                for (let i = 0; i < this.companyList.length; i++) {
                    let obj = {
                        erpName: this.companyList[i].erpName, //企业名称
                        erpLinkMan: this.companyList[i].erpLinkMan, //联系人
                        erpLinkTel: this.companyList[i].erpLinkTel, //联系电话
                        erpAddr: this.companyList[i].province +this.companyList[i].city +this.companyList[i].county+ this.companyList[i].erpAddr, //企业地址
                        userSection: this.companyList[i].auditState, //审核状态
                        turnTime: this.companyList[i].createTime, //更新时间
                        id: this.companyList[i].id //企业id
                    };
                    companyArr.push(obj);
                }
                return companyArr;
            }
        }
    },
    methods: {
        //详情--跳转详情dialog
        handleDetail(index, row) {
       
            let erpId = row.id
            this.$store.dispatch('getComdetail',erpId)
            // this.$store.commit("getDialogstatus", true);
        },
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
          
            let erpId = row.id;
            this.$store.dispatch("getEnteritem", erpId);
        },
        //删除企业信息
        deleteEnter(index,row){
            let erpId = row.id
            this.$confirm("此操作将删除该基站, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.delete(erpId).then(res=>{
                        if(res =='success'){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.$emit('delSuccess',true)
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
        delete(erpId){
            return new Promise((resolve,reject)=>{
                this.$api.company.deleteCompany(erpId).then(res=>{           
                    if(res.data.code == 0){
                        resolve('success')
                    }
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        
        //跳转基站
        base(index,row) {
            let companyId = row.id;
            let companyName = row.erpName
        
            this.$router.push({path:'/baseManage',query:{companyId:companyId,companyName:companyName}});
        },
     
        audit(index, row){
         
            let id =row.id
            this.$store.commit ('getEnterId',id)
            this.$store.commit('changeEnteraudit',true)
        }
    }
};
</script>

<style lang="scss" scoped>
.enterList {
    height: calc(100% - 40px);
    .tabE {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 15px;
    }
}
.enterList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>