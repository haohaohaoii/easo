<template>
    <div class="userList" v-if="tableData && tableData.length>0">
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="tableData"
                stripe
                style="width: 100%"
                class="tab"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="userName" label="用户名" width="260"></el-table-column>
                <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
                <el-table-column align="center" prop="comName" label="企业名称"></el-table-column>
                <el-table-column align="center" prop="creTime" label="注册时间"></el-table-column>
                <el-table-column label="操作" align="center" width="220" fixed="right">
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
                            v-has="'删除'"
                            @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <slot></slot>
        </div>
    </div>
    <no-data v-else></no-data>
</template>

<script>
import { mapMutations } from "vuex";
import noData from "../common/noData"
export default {
    props: {
        newsList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    components:{
        noData
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
            let companyArr = [];
            if (this.newsList && this.newsList.length > 0) {
                
                for (let i = 0; i < this.newsList.length; i++) {
                    let obj = {
                        userName: this.newsList[i].username, //联系人
                        comName: this.newsList[i].userDetail? this.newsList[i].userDetail.companyName:'', //企业名称
                 
                        phone: this.newsList[i].phone, //联系电话
                        creTime: this.newsList[i].createTime, //企业地址
                        id:this.newsList[i].id
                    };
                    companyArr.push(obj);
                }
                return companyArr;
            }else{
                 return companyArr;
            }
        }
    },
    methods: {
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
            console.log(index, row);
            let erpId = row.id;
            this.$store.dispatch("getUseritem", erpId);
        },
        handleDel(index,row){
            this.$confirm("此操作将永久删除该条企业用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let userId = row.id;
                    this.$api.company.deleteComuserItem(userId).then(res=>{
                        if(res.data.code == 0){
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
           
        }
    }
};
</script>

<style lang="scss" scoped>
.userList {
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
    }
}
.userList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>