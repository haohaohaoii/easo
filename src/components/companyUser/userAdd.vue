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
                <el-input v-model="ruleForm.password" type="password" show-password></el-input>
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
            <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
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
                        trigger: "blur"
                    },
                    {
                        pattern: "^[1][3,4,5,7,8][0-9]{9}$",
                        message: "请填写正确的手机号",
                        trigger: "blur"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                        message: "用户名长度要大于6位，由数字和字母组成",
                        trigger: "blur"
                    }
                ],
                password: [
                    
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                        message: "密码长度要大于6位，由数字和字母组成",
                        trigger: "blur"
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
        companyUseradd:{
            get(){
                return this.$store.state.companyUseradd
            },
            set(){}
        }
    },
    methods: {
        //获取企业类型
        getTypes(){
  
            this.types=[]  //每次都先清空
            this.$api.company.companyWAll().then(res=>{
                
                if(res.data.code == 0){
                    let arr =res.data.data
                    if(arr && arr.length>0){
                        for(let i=0; i<arr.length; i++){
                            let obj = {
                                label:arr[i].erpName,
                                value:arr[i].id
                            }
                            this.types.push(obj)
                        }
                    }else{
                        this.$message({
                            type: "warning",
                            message: "请先添加企业"
                        }); 
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
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
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
                            _this.$emit('addSuccess',true)
                            _this.closeDialog()
                        }
                    })
                } else {
                    this.$message({
                        type: "warning",
                        message: "请按规则填写完后再添加"
                    });
                }
            });
            
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
// .dialog >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     overflow-y: auto;
//     top: 50%;
//     width: 30%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;

//     overflow-y: auto;
// }
.dialog >>> .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: calc(50% + 120px);
    transform: translate(-50%, -50%);

    width: 28%;
}

.dialog >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
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
.dialog >>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    width: 90%;
}
.dialog >>> .el-select {
    width: 100%;
}
</style>