<template>
    <el-dialog :visible.sync="roleAdd" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加角色</p>
        </div>
        <div>
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="角色名称：">
                    <el-col :span="10">
                        <el-input v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="tree">
                <p class="left">分配权限:</p>
                <el-tree
                    :data="dataTree"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    class="right"
                    @check-change="handleCheckChange"
                ></el-tree>
            </div>
        </div>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            status: false, //控制表头不显示
            form: {
                roleName: "" //角色名称
            },
            dataTree: [
                {
                    id: 1,
                    label: "数据查看",
                    children: [
                        { id: 7, label: "实时数据" },
                        { id: 8, label: "历史数据" }
                    ]
                },
                {
                    id: 2,
                    label: "企业管理",
                    children: [
                        { id: 5, label: "企业信息" },
                        { id: 6, label: "留言管理" },
                        { id: 4, label: "基站管理" }
                    ]
                },
                {
                    id: 3,
                    label: "权限管理",
                    children: [
                        { id: 9, label: "角色管理." },
                        { id: 10, label: "用户管理" },
                        { id: 11, label: "部门管理" },
                        { id: 12, label: "菜单管理" }
                    ]
                }
            ]
        };
    },
    methods: {
        handleCheckChange() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        closeDialog() {
            this.$store.commit("getDialogstatus", false); //关闭dialog
        },
        save() {
            this.$store.commit("getDialogstatus", false); //关闭dialog
        },
        cancel() {
            this.$store.commit("getDialogstatus", false); //关闭dialog
        }
    },
    computed: {
        ...mapState(["roleAdd"])
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    .tit {
        display: flex;
        align-items: center;
        .line {
            background: #1e87f0;
            width: 0.5%;
            height: 20px;
            position: relative;
            left: 0;
        }
        p {
            margin-left: 2%;
        }
    }
    .tree {
        display: flex;
        .left {
            margin-left: 1.5%;
           
        }
        .right {
            margin-left: 2.5%;
            background: #EBF1FD;
            width: 75%;
        }
    }
}
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;

    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}

//输入框的背景颜色
.dialog >>> .el-input__inner{
     background: #EBF1FD;
}
</style>