<template>
    <el-dialog
        :visible.sync="addShow"
        class="dialog"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加运维部门</p>
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
            <el-form-item label="部门名称:" prop="depName">
                <el-input v-model="ruleForm.depName"></el-input>
            </el-form-item>
            <el-form-item label="详细地址:" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="负责人:" prop="depPeople">
                <el-input v-model="ruleForm.depPeople"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="linkPhone">
                <el-input v-model="ruleForm.linkPhone"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor" size="mini">添加</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

            
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow'],
    data() {
        return {
            addShow:false,
            ruleForm: {
                depName: "", //部门名称
                address: "", //详细地址
                depPeople: "", //负责人
                linkPhone: "" //联系电话
            },
            
            rules: {
                depName: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "部门名称不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "请输入详细地址",
                        trigger: "change"
                    }
                ],
                depPeople: [
                    
                    {
                        required: true,
                        message: "请输入负责人名称",
                        trigger: "change"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "联系人不能为特殊的字符串或数字",
                        trigger: "change"
                    }
                ],
                linkPhone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "change"
                    },
                    {
                        pattern:
                            /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/ ||
                            /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                        message: "目前只支持中国大陆的手机号码",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        //关闭外层dialog
        closeDialog() {
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.$emit('changeAddDialog',false)
        },
        //确定编辑  --关闭dialog
        sureEditor() {

            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                  
                } else {
                    this.$message.error("表单校验失败，请重新填写后提交!");
                    return false;
                }
                 
            });
            // this.closeDialog();
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            this.closeDialog();
        }
    },
    watch:{
        isShow(val){
            this.addShow = val
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
   
//     top: 50%;
    
//     left: calc(50% + 240px);
//     transition: transform;
//     transform: translate(-50%,-50%);
    
//     border: 1px solid #ebeef5;

 

// }
.dialog>>>.el-dialog{
          display: flex;
          flex-direction: column;
          margin:0 !important;
          position:absolute;
          top:50%;
          left:calc(50% + 120px);
          transform:translate(-50%,-50%);
      }
    
    .dialog>>>  .el-dialog .el-dialog__body{
          flex:1;
          overflow: auto;
      }

//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}

</style>