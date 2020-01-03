<template>
    <el-dialog :visible.sync="userAdd" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加用户信息</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="登陆名:" prop="loginName">
                <el-input v-model="ruleForm.loginName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:" prop="realName">
                <el-input v-model="ruleForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户部门:" prop="userDepart">
                <el-select v-model="ruleForm.userDepart" placeholder="请选择用户部门">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户角色:" prop="userrole">
                <el-select v-model="ruleForm.userrole" placeholder="请选择用户角色">
                    <el-option label="区域一" value="jiaose1"></el-option>
                    <el-option label="区域二" value="jiaose2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
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
                loginName: "", //登陆ming
                realName: "", //真实姓名
                phone: "", //电话
                userDepart: "", //用户部门
                userrole: "", //用户角色
                email: "" //邮箱
            },
            rules: {
                loginName: [
                    {
                        required: true,
                        message: "请输入登录名",
                        trigger: "blur"
                    }
                ],
                realName: [
                    {
                        required: true,
                        message: "请输入真实名称",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入电话",
                        trigger: "blur"
                    }
                ],
                userDepart: [
                    {
                        required: true,
                        message: "请选择用户部门",
                        trigger: "change"
                    }
                ],
                userrole: [
                    {
                        required: true,
                        message: "请选择用户角色",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$store.commit("userAdd", false); //关闭dialog
        },
        save() {
            this.$store.commit("userAdd", false); //关闭dialog
        },
        cancel() {
            this.$store.commit("userAdd", false); //关闭dialog
        }
    },
    computed: {
        ...mapState(["userAdd"])
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