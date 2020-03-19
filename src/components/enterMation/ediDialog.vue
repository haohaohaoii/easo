<template>
    <el-dialog
        :visible.sync="editorDialog"
        class="dialog"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
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
        >
            <el-form-item label="企业名称:" prop="firmName">
                <el-input v-model="ruleForm.firmName"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" prop="firmType">
                <el-select v-model="ruleForm.firmType" placeholder="请选择企业类型">
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
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
            <el-form-item label="邮箱:" prop="mail">
                <el-input v-model="ruleForm.mail"></el-input>
            </el-form-item>
            <el-form-item label="上传营业执照" prop="upload">
                <el-upload
                    action="#"
                    :on-change="handleChange"
                    list-type="picture-card"
                    :file-list="imageUrl"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="验证码:">
                <el-col :span="14">
                    <el-input v-model="ruleForm.veriCode"></el-input>
                </el-col>
                <el-col :span="4" :offset="6">
                    <el-button type="primary" @click="getCode" class="codeBtn">获取验证码</el-button>
                </el-col>
            </el-form-item>-->
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor">编辑</el-button>
            <el-button @click="cancelEditor">取消</el-button>
        </div>
        <el-dialog append-to-body :visible.sync="dialogVisible" width="28%">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        var valiIcon = (rule, value, callback) => {
            // 图片验证
            if (!this.imageUrl.length > 0 && !this.localUrl.length > 0) {
                callback(new Error("请上传图片"));
            } else {
                callback();
            }
        };
        return {
            id: "",
            dialogImageUrl: '',
            dialogVisible: false,
            imageUrl: [], //上传图片的url地址
            localUrl: [],
            types: [], //企业类型
            ruleForm: {
                firmName: "", //企业名称
                firmAddress: "", //企业地址
                linkman: "", //联系人
                linkPhone: "", //联系电话
                firmType: "", //企业类型
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
                        trigger: "change"
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
                        trigger: "change"
                    }
                ],
                firmType: [
                    {
                        required: true,
                        message: "请选择企业类型",
                        trigger: "change"
                    }
                ],
                upload: [
                    { required: true, validator: valiIcon, trigger: "change" }
                ]
            }
        };
    },
    computed: {
        ...mapState([ "enterRow"]),
        editorDialog:{
            get(){
               return this.$store.state.editorDialog
            },
            set(){
          
                
            }
        }

    },
    methods: {
       
        handleChange(file, fileList) {
            let obj = { url: file.url };
            this.localUrl.push(obj);
        },
        //服务器图片地址转base64
        getBase64Image(image, i, len) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            let imgObj = new Image();
            // 先设置图片跨域属性
            imgObj.setAttribute("crossOrigin", "anonymous");
            // 再给image赋值src属性，先后顺序不能颠倒
            imgObj.src = image[i].url;
            // 当图片加载完成后，绘制图片到canvas
            let _this = this;
            imgObj.onload = function() {
                // 设置canvas宽高等于图片实际宽高
                canvas.width = imgObj.width;
                canvas.height = imgObj.height;
                ctx.drawImage(imgObj, 0, 0);
                // 将图片转成base64格式
                var img = canvas.toDataURL("image/jpeg", 0.5);
                console.log("触发" + i + "次", img);
                i = i + 1;
                if (i < len) {
                    _this.getBase64Image(image, i, len);
                }
            };
            console.log("内外部");
        },
        //关闭外层dialog
        closeDialog() {
                 this.imageUrl = [];
            this.localUrl = []
            this.$store.commit("setEditordialog", false);
       
            this.$refs.ruleForm.resetFields(); //重置from和rules
        },
        //点击删除上传的图片
        handleRemove(file, fileList) {
            for (let i = 0; i < this.imageUrl.length; i++) {
                if (this.imageUrl[i].uid == file.uid) {
                    this.imageUrl.splice(i, 1);
                    break;
                }
            }
        },
        //点击每个url放大的方法
        handlePictureCardPreview(file) {

            let url = file.url;
            let urlArr = this.imageUrl.concat(this.localUrl); //合并
            for (let i = 0; i <urlArr.length; i++) {
                if (urlArr[i].url == url) {
                    this.dialogImageUrl = file.url;
                    
                    this.dialogVisible = true;
                    break;
                }
            }
        },
        //获取验证码
        getCode() {},
        //确定编辑  --关闭dialog
        sureEditor() {

            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    // // 表单验证通过之后的操作
                    let urlArr = this.imageUrl.concat(this.localUrl); //合并
                    let base64Arr = [];
                    let _this = this;
                    async function a() {
                        for (let i = 0; i < urlArr.length; i++) {
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            let imgObj = new Image();
                            // 先设置图片跨域属性
                            imgObj.setAttribute("crossOrigin", "anonymous");
                            // 再给image赋值src属性，先后顺序不能颠倒
                            imgObj.src = urlArr[i].url;
                            // 当图片加载完成后，绘制图片到canvas
                            var promise = new Promise(reslove => {
                                imgObj.onload = async function() {
                                    // 设置canvas宽高等于图片实际宽高
                                    canvas.width = imgObj.width;
                                    canvas.height = imgObj.height;
                                    ctx.drawImage(imgObj, 0, 0);
                                    // 将图片转成base64格式
                                    var img = canvas.toDataURL(
                                        "image/jpeg",
                                        0.5
                                    );
                                    console.log("触发" + i + "次", img);
                                    base64Arr.push(img);
                                    reslove();
                                };
                            });
                            await promise;
                        }
                        console.log(base64Arr);
            
                        let params = {
                            erpName: _this.ruleForm.firmName, //企业名称
                            erpAddr: _this.ruleForm.firmAddress, //企业地址
                            erpLinkMan: _this.ruleForm.linkman, //联系人
                            erpLinkTel: _this.ruleForm.linkPhone, //联系电话
                            erpMail: _this.ruleForm.mail, //邮箱
                            images: base64Arr, //图片base64数组
                            erpType: _this.ruleForm.firmType //企业类型
                        };
                        let erpId = _this.id;

                        _this.$api.company
                            .companyEditor(erpId, params)
                            .then(res => {
                                if (res.data.code == 0) {
                                    console.log(res);
                                    _this.$message({
                                        message: "企业信息修改成功",
                                        type: "success"
                                    });
                                    _this.$emit('ediSuccess',true)
                                    _this.closeDialog();
                                }
                            });
                    }
                    a();
                } else {
                    this.$message.error("表单校验失败，请重新填写后提交!");
                    return false;
                }
            });
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            this.closeDialog();
        }
    },
    watch: {
        enterRow(val) {
            this.types = val.companyType;
            this.id = val.id;
            this.ruleForm.firmName = val.erpName; //企业名称
            this.ruleForm.firmAddress = val.erpAddr; //企业地址
            this.ruleForm.linkman = val.erpLinkMan; //联系人
            this.ruleForm.linkPhone = val.erpLinkTel; //联系电话
            this.ruleForm.userName = ""; //没有这个参数，暂时写空值
            this.ruleForm.mail = val.erpMail; //邮箱
            let str = val.erpLicense;
            str = str.substring(0, str.lastIndexOf(","));
            let imgArr = str.split(",");
            if (imgArr && imgArr.length > 0) {
                //获取图片地址数组
                let imgOa = [];
                for (let i = 0; i < imgArr.length; i++) {
                    let obj = {
                        url: imgArr[i]
                    };
                    imgOa.push(obj);
                }
                this.imageUrl = imgOa;
            }
            if (val.companyType && val.companyType.length > 0) {
                //获取企业类型数组

                for (let i = 0; i < val.companyType.length; i++) {
                    if (val.companyType[i].value == val.erpType) {
                        //说明选中的是哪一项
                        this.ruleForm.firmType = val.companyType[i].value;
                    }
                }
            }
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

    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;

    width: 38%;
    height: 55%;
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