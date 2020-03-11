<template>
    <el-dialog :visible.sync="menuE" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑菜单</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="菜单名称:" prop="menuName">
                <el-input v-model="ruleForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="访问代码:" prop="menuAddress">
                <el-input v-model="ruleForm.menuAddress"></el-input>
            </el-form-item>
            <el-form-item label="菜单级别" prop="menuLevel">
                <el-select v-model="ruleForm.menuLevel" placeholder="请选择菜单级别">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
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
            ruleForm: {
                menuName: "", //菜单名称
                menuAddress: "", //访问代码
                menuLevel:"", //菜单级别
            },
            rules: {
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }
                ],
                menuAddress: [
                    {
                        required: true,
                        message: "请输入访问代码地址",
                        trigger: "blur"
                    }
                ],
                menuLevel: [
                    {
                        required: true,
                        message: "请选择菜单级别",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$store.commit("menuEditor", false); //关闭dialog
            this.$refs.ruleForm.resetFields(); //重置from和rules
        },
        save() {
            this.closeDialog()
        },
        cancel() {
            this.closeDialog()
        }
    },
    computed: {
        ...mapState(["menuE"])
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
</style>