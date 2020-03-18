<template>
    <div class="enterList">
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="tableData"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="erpName" label="企业名称" width="260"></el-table-column>
                <el-table-column align="center" prop="erpLinkMan" label="联系人"></el-table-column>
                <el-table-column align="center" prop="erpLinkTel" label="联系电话"></el-table-column>
                <el-table-column align="center" prop="erpAddr" label="企业地址"></el-table-column>
                <el-table-column align="center" prop="userSection" label="审核状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userSection==0">审核中</span>
                        <span v-else-if="scope.row.userSection==1">审核通过</span>
                        <span v-else-if="scope.row.userSection==2">审核未通过</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="turnTime" label="注册时间"></el-table-column>
                <el-table-column label="操作" align="center" width="300" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="base(scope.$index, scope.row)"
                            style="background: rgba(54,182,243,1);color: white;"
                            v-has="'基站'"
                        >基站</el-button>
                        <el-button
                            size="mini"
                            @click="audit(scope.$index, scope.row)"
                            v-if="scope.row.userSection==0"
                            type="danger"
                            v-has="'审核'"
                        >审核</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="handleDetail(scope.$index, scope.row)"
                            v-has="'详情'"
                        >详情</el-button>
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
        },
        tableData() {
            if (this.companyList && this.companyList.length > 0) {
                let companyArr = [];
                for (let i = 0; i < this.companyList.length; i++) {
                    let obj = {
                        erpName: this.companyList[i].erpName, //企业名称
                        erpLinkMan: this.companyList[i].erpLinkMan, //联系人
                        erpLinkTel: this.companyList[i].erpLinkTel, //联系电话
                        erpAddr: this.companyList[i].erpAddr, //企业地址
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
            console.log(index, row);
            let erpId = row.id;
            this.$store.dispatch("getEnteritem", erpId);
        },
        
        //跳转基站
        base(index,row) {
            debugger
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
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
        // padding-top: 20px;
    }
}
.enterList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>