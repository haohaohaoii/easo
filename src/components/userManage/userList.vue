<template>
    <div class="userList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                class="tab"
                :height="tableHeight"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
                <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
                <el-table-column align="center" prop="linkPhone" min-width="120px" label="联系电话"></el-table-column>
                <el-table-column align="center" prop="userMail" min-width="160px" label="邮箱"></el-table-column>
                <el-table-column align="center" prop="userSection" min-width="140px" label="所属部门"></el-table-column>
                <el-table-column align="center" prop="userPart" min-width="160px" label="用户角色"></el-table-column>
                <el-table-column align="center" prop="turnTime" min-width="160px" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="roleEditor(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="roleDelete(scope.$index, scope.row)"
                            v-has="'删除'"
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
        userarr: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tableHeight: window.innerHeight -230
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
            if (this.userarr && this.userarr.length > 0) {
                let userArr = [];
                for (let i = 0; i < this.userarr.length; i++) {
                    let str =''
                    if(this.userarr[i].sysRoleList && this.userarr[i].sysRoleList.length>0){
                        
                        for(let k=0; k<this.userarr[i].sysRoleList.length; k++){
                            if(k ==0){
                                str =this.userarr[i].sysRoleList[k].roleShow
                            }else{
                                str+= ','+this.userarr[i].sysRoleList[k].roleShow
                            }
                        }
                    }
                    
                    // if(this.userarr[i].)
                    let obj = {
                        userName: this.userarr[i].username, //用户名
                        realName: this.userarr[i].realName, //真实名称
                        linkPhone: this.userarr[i].phone, //联系电话
                        userMail: this.userarr[i].email, //邮箱
                        userSection: this.userarr[i].sysDept?this.userarr[i].sysDept.deptName:'', //所属部门
                        userPart: str, //用户角色
                        turnTime: this.userarr[i].createTime, //更新时间
                        id: this.userarr[i].id //用户id
                    };
                    userArr.push(obj);
                }
                return userArr;
            }
        }
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            let id = row.id;
            this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.delete(id).then(res => {
                        if (res == "success") {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.$emit('delSuccess',true)
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        delete(roleId) {
            return new Promise((resolve, reject) => {
                this.$api.user
                    .deleteUseritem(roleId)
                    .then(res => {
                 
                        if (res.data.code == 0) {
                            resolve("success");
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        //点击编辑
        roleEditor(index, row) {
            console.log(index, row);
            let id = row.id;
            this.$store.dispatch("userEdit", id);
        }
    }
};
</script>

<style lang="scss" scoped>
.userList {
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
.userList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>