<template>
    <el-dialog
        title="修改密码"
        :visible.sync="pwdDialog"
        center
        @close="closeDialog"
        class="dialog"
        :close-on-click-modal="false"
    >
        <el-form
            :model="form"
            ref="forms"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            status-icon
        >
            <el-form-item label="原密码" prop="oldPawwd">
                <el-input v-model="form.oldPawwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPawwd">
                <el-input type="password" v-model="form.newPawwd" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="sureNewpwwd">
                <el-input
                    type="password"
                    v-model="form.sureNewpwwd"
                    autocomplete="off"
                    show-password
                ></el-input>
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
            if(this.form.oldPawwd && this.form.newPawwd && this.form.sureNewpwwd){
                if( this.form.newPawwd === this.form.sureNewpwwd){
                    let adminId = this.adminId;
                    let params = {
                        password:this.form.sureNewpwwd,
                        username:localStorage.userName
                    }
                    let _this =this
                    _this.$api.user.changePawd(adminId,params).then(res=>{
                      
                        if(res.data.code == 0){
                            _this.close();
                            _this.$alert('密码修改成功，请重新登陆', '注意', {
                                confirmButtonText: '确定',
                                callback: action => {
                            
                                    localStorage.clear(); //清空local中的数据
                                    sessionStorage.clear(); //清空session中的数据
                                    _this.$store.commit("getToken", "");
                                    _this.$store.commit("getAdminid", "");
                                    _this.$router.push("/login");
                                }
                            });
                        }
                        
                    })
                }else{
                     this.$message({
                        type: "warning",
                        message: "两次密码输入不一致!"
                    });
                
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
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    width: 30%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>