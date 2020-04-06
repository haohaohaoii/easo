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
                <el-table-column align="center" prop="depName" label="部门名称" ></el-table-column>
                <el-table-column align="center" prop="depPeople" label="负责人"></el-table-column>
                <el-table-column align="center" prop="linkPhone" label="电话"  ></el-table-column>
                <el-table-column align="center" prop="area" label="区域"></el-table-column>
                 <el-table-column align="center" prop="address" label="地址"></el-table-column>
                 <el-table-column align="center" prop="createTime" label="添加时间"></el-table-column>

                <el-table-column label="操作" align="center" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                   
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="handleDetail(scope.$index, scope.row)"
                           
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
            // if (this.companyList && this.companyList.length > 0) {
            //     let companyArr = [];
            //     for (let i = 0; i < this.companyList.length; i++) {
            //         let obj = {
            //             erpName: this.companyList[i].erpName, //企业名称
            //             erpLinkMan: this.companyList[i].erpLinkMan, //联系人
            //             erpLinkTel: this.companyList[i].erpLinkTel, //联系电话
            //             erpAddr: this.companyList[i].erpAddr, //企业地址
            //             userSection: this.companyList[i].auditState, //审核状态
            //             turnTime: this.companyList[i].createTime, //更新时间
            //             id: this.companyList[i].id //企业id
            //         };
            //         companyArr.push(obj);
            //     }
            //     return companyArr;
            // }
            return this.companyList
        }
    },
    methods: {
        //详情--跳转详情dialog
        handleDetail(index, row) {
       
            // let erpId = row.id
            // this.$store.dispatch('getComdetail',erpId)
            
        },
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
            console.log(index, row);
            let erpId = row.id;
            this.$store.dispatch("getEnteritem", erpId);
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