<template>
    <el-dialog :visible.sync="userEditor" class="dialog" center @close="closeDialog">
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
                <el-select v-model="ruleForm.userDepart" placeholder="请选择用户部门" clearable>
                    <el-option
                        v-for="item of deparArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户角色:" prop="userrole">
                <el-select v-model="ruleForm.userrole" placeholder="请选择用户角色" clearable multiple>
                    <el-option
                        v-for="item of roleList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
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
            // departArr:[],  //用户部门数组集合
            // roleArr:[], //用户角色数组集合
            ruleForm: {
                loginName: "", //登陆ming
                realName: "", //真实姓名
                phone: "", //电话
                userDepart: "", //用户部门
                userrole: [ ], //用户角色
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
                ]
            }
        };
    },
    computed: {
        ...mapState(["userItem","deparArr","roleList"]),
        userEditor:{
            get(){
                return this.$store.state.userEditor
            },
            set(){}
        }

    },
    methods: {
        //提交
        save() {
            let username = this.ruleForm.loginName
            let realName = this.ruleForm.realName
            let phone = this.ruleForm.phone
            let deptId = this.ruleForm.userDepart
            let roles = this.ruleForm.userrole
            let email = this.ruleForm.email
            let id = this.userItem.id
            if(username && realName && phone && deptId && roles.length>0){
                let params={
                    username:username,
                    realName:realName,
                    phone:phone,
                    deptId:deptId,
                    roles:roles,
                    email:email
                }
                let _this = this
                this.$api.user.changeUser(params,id).then(res=>{
                    if(res.data.code == 0){
                        _this.$message({
                            message: '用户修改成功',
                            type: 'success'
                        });
                        _this.$emit('ediSuccess',true)
                       _this.clearForm()
                    }
                }).catch(error=>{

                })
            }else{
                this.$message({
                    type: "warning",
                    message: "请将必填项填写完毕后再提交"
                });
            }
        },
        //清除表单内容
        clearForm(){
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
            })
            this.$store.commit("changeUseredit", false); //关闭dialog
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
    },
    watch: {
        userItem(val){
            let arr = Object.keys(val);
            if(arr && arr.length>0){
                this.ruleForm.loginName = val.username  //登陆名
                this.ruleForm.realName = val.realName  //真实名称
                this.ruleForm.phone = val.phone   //电话
                this.ruleForm.email = val.email  //邮箱
                this.ruleForm.userDepart = val.sysDept.id //部门
                if(val.sysRoleList && val.sysRoleList.length>0){
                    this.ruleForm.userrole = []
                    for(let i=0; i<val.sysRoleList.length; i++){
                        this.ruleForm.userrole.push(val.sysRoleList[i].id)
                    }
                    
                }
            }
        }
    },
    
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
    width: 35%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
</style>