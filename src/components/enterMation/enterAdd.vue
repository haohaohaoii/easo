<template>
    <el-dialog :visible.sync="enterAdd" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑企业信息</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            status-icon
        >
            <el-form-item label="企业名称:" prop="erpName">
                <el-input v-model="ruleForm.erpName"></el-input>
            </el-form-item>
            <el-form-item label="企业地址:" prop="erpAddr">
                <el-input v-model="ruleForm.erpAddr"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="erpLinkMan">
                <el-input v-model="ruleForm.erpLinkMan"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="erpLinkTel">
                <el-input v-model="ruleForm.erpLinkTel"></el-input>
            </el-form-item>

            <el-form-item label="邮箱:" prop="erpMail">
                <el-input v-model="ruleForm.erpMail"></el-input>
            </el-form-item>
            <el-form-item label="上传营业执照">
                <el-upload
                    action="#"
                    :http-request="httpRequest"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
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
                erpName: "", //企业名称
                erpAddr: "", //企业地址
                erpLinkMan: "", //联系人
                erpLinkTel: "", //联系电话
                userName: "", //用户名
                erpMail: "", //邮箱
            },
            rules: {
                firmName: [
                    {
                        required: true,
                        message: "请输入企业名称",
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
                    }
                ],
                linkPhone: [
                    {
                        required: true,
                        message: "请输入联系电话",
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
                mail: [
                    {
                        required: true,
                        message: "请输入邮箱",
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
        //将url转为base64病存储起来
        httpRequest(data) {
            let _this = this;
            let rd = new FileReader(); // 创建文件读取对象
            let file = data.file;
            let name = data.file.name;
            rd.readAsDataURL(file); // 文件读取装换为base64类型
            rd.onloadend = function(e) {
                let obj = {
                    name: name,
                    url: this.result
                };
                _this.imageUrl.push(obj);
            };
        },
        //关闭外层dialog
        closeDialog() {
            this.$store.commit("setEditordialog", false);
        },
        //点击删除上传的图片
        handleRemove(file, fileList) {
            for (let i = 0; i < this.imageUrl.length; i++) {
                if (this.imageUrl[i].name == file.name) {
                    this.imageUrl.splice(i, 1);
                    break;
                }
            }
        },
        //点击每个url放大的方法
        handlePictureCardPreview(file) {
            for (let i = 0; i < this.imageUrl.length; i++) {
                if (this.imageUrl[i].name == file.name) {
                    this.$alert(
                        "<img src=" +
                            this.imageUrl[i].url +
                            ' alt / width="100%">',
                        {
                            dangerouslyUseHTMLString: true
                        }
                    );
                    break;
                }
            }
        },
        //获取验证码
        getCode() {},
        //确定编辑  --关闭dialog
        sureEditor(){
            this.$store.commit('changeEnterAdd',false)
        },
        //取消编辑  --关闭dialog
        cancelEditor(){
            this.$store.commit('changeEnterAdd',false)
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