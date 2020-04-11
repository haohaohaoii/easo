<template>
    <div class="roleList">
        <div class="tabE">
            <el-table
                :data="roleData"
                stripe
                style="width: 100%"
                class="tab"
                :height="tableHeight"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
                <el-table-column align="center" prop="roleDate" label="时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="editor(scope.$index, scope.row)"
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
import { resolve, reject } from "q";
export default {
    props: {
        rolelist: {
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
        roleData() {
            if (this.rolelist && this.rolelist.length > 0) {
                let roleArr = [];
                for (let i = 0; i < this.rolelist.length; i++) {
                    let obj = {
                        roleName: this.rolelist[i].roleShow, //角色名称
                        roleDate: this.rolelist[i].createTime,
                        id: this.rolelist[i].id
                    };
                    roleArr.push(obj);
                }
                return roleArr;
            }
        }
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            this.$confirm("此操作将永久删除该条角色, 是否继续?", "注意", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    debugger
                    let roleId = row.id; //获取角色id
                    this.delete(roleId).then(res => {
                        if (res == "success") {
                            this.$emit("delSuccess", true);
                            this.$message({
                                type: "success",
                                message: "删除成功"
                            });
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
                this.$api.roles
                    .deleteRoles(roleId)
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
        editor(index, row) {
            console.log(index, row);
            let roleId = row.id; //获取角色id
            this.$store.dispatch("rolesMana", roleId);
        }
    }
};
</script>

<style lang="scss" scoped>
.roleList {
    .tabE {
        padding-top: 15px;
    }
}
.roleList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>