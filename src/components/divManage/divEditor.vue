<template>
    <el-dialog
        :visible.sync="divEditor"
        class="dialog"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>部门编辑</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            status-icon
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="部门名称:" prop="deptName">
                <el-input v-model="ruleForm.deptName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="contactPhone">
                <el-input v-model="ruleForm.contactPhone"></el-input>
            </el-form-item>

            <el-form-item label="部门联系人:" prop="contactName">
                <el-input v-model="ruleForm.contactName"></el-input>
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
                id:'',   
                deptName: "", //部门名称
                contactPhone: "", //联系电话
                contactName: "", //部门联系人
            },
            rules: {
                deptName: [
                    {
                        required: true,
                        message: "请输入部门名称",
                        trigger: "blur"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "部门名称不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                    
                ],
                contactPhone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "change"
                    },
                    {
                        pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                        message: "请输入正确的手机号",
                        trigger: "change"
                    }
                ],
                contactName: [
                    {
                        required: true,
                        message: "请输入部门联系人",
                        trigger: "blur"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "部门联系人不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(["divItem"]),
        divEditor:{
            get(){
                return  this.$store.state.divEditor
            },
            set(){
                
            }
        }
    },
    methods: {
        //提交
        save() {
             this.$refs["ruleForm"].validate(valid => {
               
                if(valid){
                    let deptName = this.ruleForm.deptName
                    let contactName = this.ruleForm.contactName
                    let contactPhone = this.ruleForm.contactPhone
                    let id = this.id
                    let params={
                        deptName:deptName,
                        contactName:contactName,
                        contactPhone:contactPhone,
                    }
                    let _this = this
                    this.$api.depart.changeDeptitem(params,id).then(res=>{
                        if(res.data.code == 0){
                            _this.$message({
                                message: '部门编辑成功',
                                type: 'success'
                            });
                        _this.$emit('editorSuccess',true)
                        _this.clearForm()
                        }
                    }).catch(error=>{

                    })
                
                }else{
                    this.$message({
                        type: "warning",
                        message: "请按照要求填写完后再提交!"
                    });
                }
                
            });
           
        },
        //清除表单内容,并关闭弹出框
        clearForm(){
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
            })
            this.$store.commit("changeStatusdiv", false); //关闭dialog
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
        divItem(val){
            let arr = Object.keys(val);
           
            if(arr && arr.length>0){
                this.ruleForm.deptName = val.deptName  //部门名称
                this.ruleForm.contactName = val.contactName  //部门联系人
                this.ruleForm.contactPhone = val.contactPhone   //部门电话
                this.id = val.id
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
// .dialog >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 30%;
//     top: 50%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
.dialog >>> .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: calc(50% + 120px);
    transform: translate(-50%, -50%);
    width: 30%;
}

.dialog >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>