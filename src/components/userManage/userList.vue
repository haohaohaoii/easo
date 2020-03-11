<template>
    <div class="userList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
                :height="tableHeight"
            >
                <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
                <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
                <el-table-column align="center" prop="linkPhone" label="联系电话"></el-table-column>
                <el-table-column align="center" prop="userMail" label="邮箱"></el-table-column>
                <el-table-column align="center" prop="userSection" label="所属部门"></el-table-column>
                <el-table-column align="center" prop="userPart" label="用户角色"></el-table-column>
                <el-table-column align="center" prop="turnTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="roleEditor(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="roleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <user-editor></user-editor>
        <slot></slot>
    </div>
</template>

<script>
import userEditor from "./userEditor";
import { mapMutations } from "vuex";
export default {
    components: {
        userEditor
    },
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
            tableHeight: window.innerHeight * 0.65
        };
    },
    computed: {
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
                        userSection: this.userarr[i].sysDept.deptName, //所属部门
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
            this.$confirm("此操作将永久删除该条角色, 是否继续?", "提示", {
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
                        debugger;
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
    .tabE {
        margin-top: 1%;
        .tab {
            height: 100%;
            overflow-y: auto;
        }
    }
    .tabPage {
        text-align: center;
        padding: 20px;
    }
}
</style>