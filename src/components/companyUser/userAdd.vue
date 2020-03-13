<template>
    <el-dialog
        :visible.sync="companyUseradd"
        class="dialog"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加企业用户</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
            status-icon
            size="mini"
            label-position="right "
        >
            <el-form-item label="手机号:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="企业:" prop="firmType">
                <el-select
                    v-model="ruleForm.firmType"
                    placeholder="请选择企业类型"
                    @click.native="getTypes"
                >
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor" size="mini">提交</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

            
import { mapState, mapMutations } from "vuex";
export default {
    data() {
      
        return {
            types:[],
            ruleForm: {
                phone: "", //手机号
                userName: "", //用户名
                password: "", //密码
                firmType: ""//企业
                
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "change"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "change"
                    }
                ],
                password: [
                    
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "change"
                    }
                ],
                firmType: [
                    {
                        required: true,
                        message: "请选择企业类型",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(["companyUseradd"])
    },
    methods: {
        //获取企业类型
        getTypes(){
            this.types=[]  //每次都先清空
            this.$api.company.companyAll().then(res=>{
                if(res.data.code == 0){
                    let arr =res.data.data
                    for(let i=0; i<arr.length; i++){
                        let obj = {
                            label:arr[i].erpName,
                            value:arr[i].id
                        }
                        this.types.push(obj)
                    }
                }
            })
        },
        //关闭外层dialog
        closeDialog() {
            this.$store.commit("changeUserA", false);  //修改dialog窗口
            this.$refs.ruleForm.resetFields();  //重置from和rules
        },
        //确定
        sureEditor() {
         
            // 表单验证通过之后的操作
            if(this.ruleForm.phone && this.ruleForm.userName && this.ruleForm.password){
                let params={
                    phone:this.ruleForm.phone,  //手机号
                    username:this.ruleForm.userName,  //用户名
                    password:this.ruleForm.password,  //密码
                    erpId:this.ruleForm.firmType
                }
                let _this = this
                this.$api.company.addCompanyuser(params).then(res=>{
                   
                    if(res.data.code ==0){
                        console.log(res)
                        _this.$message({
                                message: '企业用户添加成功',
                                type: 'success'
                            });
                        _this.closeDialog()
                    }
                })
            }
            
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            this.closeDialog();
        }
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
    .codeBtn {
        display: block;
        width: 100%;
    }
    .foot {
        display: flex;
        justify-content: center;
    }
}
//最外层弹窗
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    height: 40%;
    overflow-y: auto;
    top: 50%;
    width: 36%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;

    width: 40%;
    overflow-y: auto;
}
//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}
//上传图片框
.dialog >>> .el-upload--picture-card {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
//上传图片 +框
.dialog >>> .el-upload--picture-card i {
    position: relative;
    top: -22px;
    color: #999999;
}
//已上传的图片框
.dialog >>> .el-upload-list--picture-card .el-upload-list__item {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
</style>