<template>
    <el-dialog title="修改密码" :visible.sync="pwdDialog" center width="40%" @close="closeDialog">
        <el-form :model="form" ref="forms" :rules="rules">
            <el-form-item label="原密码" prop="oldPawwd">
                <el-input v-model="form.oldPawwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPawwd">
                <el-input v-model="form.newPawwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="sureNewpwwd">
                <el-input v-model="form.sureNewpwwd" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            form: {
                oldPawwd: "",
                newPawwd: "",
                sureNewpwwd: ""
            },
            rules: {
                oldPawwd: [
                    {
                        required: true,
                        message: "请输入旧密码",
                        trigger: "blur"
                    }
                ],
                newPawwd: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    }
                ],
                sureNewpwwd: [
                    {
                        required: true,
                        message: "请再次输入新密码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(["pwdDialog","adminId"])
    },
    methods: {
        //点击取消关闭dialog
        cancel() {
            this.close();
        },
        sure(){
            debugger
            if(this.oldPawwd && this.newPawwd && this.sureNewpwwd){
                if( this.newPawwd && this.sureNewpwwd){
                    let adminId = this.adminId;
                    this.$api.user.changePawd(adminId).then(res=>{
                        debugger
                    })
                }
            }
        },
        //点击弹出框右上角x号，关闭dialog
        closeDialog() {
            this.close();
        },
        //关闭dialog公共方法
        close() {
            this.$nextTick(() => {
                this.$refs["forms"].resetFields();
            });
            this.$store.commit("pwdDialog", false);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>