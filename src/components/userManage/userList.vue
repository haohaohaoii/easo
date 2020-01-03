<template>
    <div class="userList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
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
        <div class="tabPage">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            tableData: [
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                },
                {
                    userName: "郑州富铭环保科技有限公司",
                    realName: "张冉冉",
                    linkPhone: "1314567891",
                    userMail: "641882555@qq.com",
                    userSection: "研发部",
                    userPart: "超级管理员",
                    roleDate: "19/11/20 16:40:20"
                }
            ]
        };
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            this.$confirm("此操作将永久删除该条角色, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //点击编辑
        roleEditor(index, row) {
            console.log(index, row);
            this.$router.push({ path: "/userAdd" });
            this.$store.commit("userAdd", true);
        }
    }
};
</script>

<style lang="scss" scoped>
.userList {
    height: 62.5%;

    .tabE {
        height: 99.5%;
        margin-top: 1%;
        border: 1px solid rgba(235, 235, 235, 1);
        .tab {
            height: 100%;
            overflow-y: auto;
        }
    }
    .tabPage {
        text-align: center;
        padding-top: 4%;
    }
}
</style>