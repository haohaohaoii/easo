<template>
    <el-dialog
        :visible.sync="enterAdd"
        class="dialog"
        center
        :close-on-click-modal="false"
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑企业信息</p>
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
            <el-form-item label="企业名称:" prop="firmName">
                <el-input v-model="ruleForm.firmName"></el-input>
            </el-form-item>
            <el-form-item label="企业地址:" prop="firmAddress">
                <el-input v-model="ruleForm.firmAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="linkman">
                <el-input v-model="ruleForm.linkman"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="linkPhone">
                <el-input v-model="ruleForm.linkPhone"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="mail">
                <el-input v-model="ruleForm.mail"></el-input>
            </el-form-item>
            <el-form-item label="上传营业执照" prop="upload" ref="pic">
                <el-upload
                    action="#"
                    :on-change="getFile"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor" size="mini">编辑</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            imageUrl: [], //上传图片的url地址
            ruleForm: {
                firmName: "", //企业名称
                firmAddress: "", //企业地址
                linkman: "", //联系人
                linkPhone: "", //联系电话
                userName: "", //用户名
                mail: "" //邮箱
            },
            rules: {
                firmName: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "change"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "企业名称不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                ],
                firmAddress: [
                    {
                        required: true,
                        message: "请输入企业地址",
                        trigger: "change"
                    }
                ],
                linkman: [
                    {
                        required: true,
                        message: "请输入联系人",
                        trigger: "change"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "联系人不能为特殊的字符串或数字",
                        trigger: "blur"
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
                        trigger: "blur"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "change"
                    }
                ],
                mail: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "change"
                    },
                    {
                        pattern: /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/,
                        message: "请填写正确的邮箱格式",
                        trigger: "blur"
                    }
                ],
                upload: [
                    {
                        required: true,
                        message: "请上传营业执照",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState(["enterAdd"])
    },
    methods: {
        //图片上传成功
        // picS() {
        //     debugger;
        //     this.$refs.pic.clearValidate();
        // },
        //获取照片的base64
        getFile(file, fileList) {
            let _this = this;
            this.getBase64(file.raw)
                .then(res => {
                    console.log(res);
                    // _this.$refs["pic"].clearValidate();

                    _this.imageUrl.push(res);
                })
                .catch(error => {
                    this.$message.error("图片上传失败");
                });
        },

        //转base64
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        },
        //点击删除上传的图片
        handleRemove(file, fileList) {
            let _this = this;
            this.getBase64(file.raw).then(res => {
                console.log(res);
                for (let i = 0; i < _this.imageUrl.length; i++) {
                    if (_this.imageUrl[i] == res) {
                        _this.imageUrl.splice(i, 1);
                        break;
                    }
                }
            });
        },
        //点击每个url放大的方法
        handlePictureCardPreview(file) {
            let _this = this;
            this.getBase64(file.raw).then(res => {
                console.log(res);
                for (let i = 0; i < _this.imageUrl.length; i++) {
                    if (_this.imageUrl[i] == res) {
                        _this.$alert(
                            "<img src=" +
                                _this.imageUrl[i] +
                                ' alt / width="100%">',
                            {
                                dangerouslyUseHTMLString: true,
                                showConfirmButton: false
                            }
                        );
                        break;
                    }
                }
            });
        },
        //关闭外层dialog
        closeDialog() {
            this.$store.commit("changeEnterAdd", false);
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            debugger;
            if (this.imageUrl.length > 0) {
                let field = this.$refs.ruleForm.fields;
                field.map(i => {
                    if (i.prop === "upload") {
                        //通过prop属性值相同来判断是哪个输入框，比如：要移除prop为'user'
                        i.resetField();
                        return false;
                    }
                });

                this.$refs.ruleForm.clearValidate("upload");
            }
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    debugger;
                    // 表单验证通过之后的操作
                } else {
                    debugger;
                    console.log("error submit!!");
                    return false;
                }
            });
            // this.closeDialog();
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
    height: 60%;
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