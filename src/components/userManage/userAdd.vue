<template>
    <el-dialog :visible.sync="userAdddialog" class="dialog" center @close="closeDialog">
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
            size="mini"
        >
            <el-form-item label="登陆名:" prop="loginName">
                <el-input v-model="ruleForm.loginName"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:" prop="realName">
                <el-input v-model="ruleForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户部门:" prop="userDepart">
                <el-select
                    v-model="ruleForm.userDepart"
                    placeholder="请选择用户部门"
                    @visible-change="departChange"
                    clearable
                >
                    <el-option
                        v-for="item of departArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户角色:" prop="userrole">
                <el-select
                    v-model="ruleForm.userrole"
                    placeholder="请选择用户角色"
                    @visible-change="roleChange"
                    clearable
                >
                    <el-option
                        v-for="item of roleArr"
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
            departArr:[],  //用户部门数组集合
            roleArr:[], //用户角色数组集合
            ruleForm: {
                loginName: "", //登陆ming
                realName: "", //真实姓名
                password:"", //密码
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
                password:[
                    {
                        required: true,
                        message: "请输入密码",
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
                    },
                     {
                        pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                        message: "请输入正确的手机号",
                        trigger: "change"
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
                        trigger: "blur"
                    }
                ],
                email:[
                    {
                        required: true,
                        message: "请填写正确的邮箱地址",
                        trigger: "blur"
                    },
                    {
                        pattern:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: "请输入正确的邮箱号",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(["userAdddialog"])
    },
    methods: {
        //点击部门 获取部门列表
        departChange(val){
            if(val == true){  //获取所有部门
                this.$api.depart.getDeptlist().then(res=>{
                    if(res.data.code == 0){
                        if(res.data.data && res.data.data.length>0){
                            let itemArr = []
                            for(let i=0; i<res.data.data.length; i++){
                                let departItem={
                                    label:res.data.data[i].deptName,
                                    value:res.data.data[i].id
                                }
                                itemArr.push(departItem)
                            }
                            this.departArr=itemArr
                        }
                    }
                })
            }
        },
        //点击用户角色 获取角色列表
        roleChange(val){
            if(val == true){
                this.$api.roles.getRoles().then(res=>{

                    if(res.data.code == 0){
                        if(res.data.data && res.data.data.length>0){
                            let itemArr = []
                            for(let i=0; i<res.data.data.length; i++){
                                let roleItem={
                                    label:res.data.data[i].roleShow,
                                    value:res.data.data[i].id
                                }
                                itemArr.push(roleItem)
                            }
                            this.roleArr=itemArr
                        }
                    }
                })
            }
        },
        //提交
        save() {
             this.$refs["ruleForm"].validate(valid => {
               
                if(valid){
                    let username = this.ruleForm.loginName
                    let password = this.ruleForm.password
                    let realName = this.ruleForm.realName
                    let phone = this.ruleForm.phone
                    let deptId = this.ruleForm.userDepart
                    let roles = []
                    roles.push(this.ruleForm.userrole)
                    let email = this.ruleForm.email
                    if(username && password && realName && phone && deptId && roles.length>0){
                        let params={
                            username:username,
                            password:password,
                            realName:realName,
                            phone:phone,
                            deptId:deptId,
                            roles:roles,
                            email:email
                        }
                        let _this = this
                        this.$api.user.addUser(params).then(res=>{
                            if(res.data.code == 0){
                                _this.$message({
                                    message: '用户添加成功',
                                    type: 'success'
                                });
                            _this.$emit('addSuccess',true)
                            _this.clearForm()
                            }
                        }).catch(error=>{

                        })
                    }
                            
                
                }else{
                    this.$message({
                        type: "warning",
                        message: "请按照要求填写完后再提交!"
                    });
                }
                
            });
           
        },
        //清除表单内容
        clearForm(){
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
            })
            this.$store.commit("changeUserAdd", false); //关闭dialog
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
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
    width: 30%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
.dialog >>> .el-select {
    width: 100%;
}
</style>