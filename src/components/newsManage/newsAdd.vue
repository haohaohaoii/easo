<template>
    <el-dialog
        :visible.sync="newsAdd"
        class="dialog"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加新闻</p>
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
            <el-form-item label="新闻来源:" prop="radio">
                <el-radio v-model="ruleForm.radio" :label="0">外部</el-radio>
                <el-radio v-model="ruleForm.radio" :label="1">本地</el-radio>
            </el-form-item>
            <el-form-item label="新闻标题:" prop="newsTitle" placeholder="请输入新闻标题">
                <el-input v-model="ruleForm.newsTitle"></el-input>
            </el-form-item>
            <el-form-item label="新闻分类:" prop="firmType">
                <el-select v-model="ruleForm.firmType" placeholder="请选择分类" @click.native="getTypes">
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="ruleForm.radio==0"
                label="URL链接地址:"
                prop="urlAddres"
                placeholder="请输入链接地址"
            >
                <el-input v-model="ruleForm.urlAddres"></el-input>
            </el-form-item>
            <el-form-item label="封面图片:" prop="upload">
                <el-upload
                    ref="pic"
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
            <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
        <el-dialog append-to-body :visible.sync="dialogVisible" width="50%">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </el-dialog>
</template>

<script>

            
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow'],
    data() {
        var valiIcon = (rule, value, callback) => { // 图片验证
            if (!this.imageUrl.length>0) {
                callback(new Error('请上传图片'));
            } else {
                callback();
            }
        }
        return {
            newsAdd:'',           //外层dialog是都显示
            dialogImageUrl: '',   //放大的url地址
            dialogVisible:false,  //放大的dialog是都显示
            imageUrl:[],  //图片数组
            types:[],   //新闻类型集合
            ruleForm: {
                radio:1,  //0本地  1外部
                newsTitle: "", //新闻标题
                firmType: "", //新闻类型
                urlAddres:'', //链接地址
            },
            
            rules: {
                radio:[
                    {
                        required: true,
                        message: "请输入新闻标题",
                        trigger: "change"
                    }
                ],
                newsTitle: [
                    
                    {
                        required: true,
                        message: "请输入新闻标题",
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
                urlAddres:[
                    {
                        required: true,
                        message: "请输入链接地址",
                        trigger: "blur"
                    }
                ],
                upload: [
                    {required:true, validator: valiIcon, trigger: 'change' } 
                ]
            }
        };
    },
    mounted(){

    },
    methods: {
        //获取企业类型
        getTypes(){
            this.types=[]  //每次都先清空
            this.$api.news.getNewtypes().then(res=>{
        
                if(res.data.code == 0){
                    let arr =res.data.data
                    for(let i=0; i<arr.length; i++){
                        let obj = {
                            label:arr[i].name,
                            value:arr[i].value
                        }
                        this.types.push(obj)
                    }
                }
            })
        },
        //获取照片的base64
        getFile(file, fileList) {
   
            let _this = this;

            this.getBase64(file.raw)
                .then(res => {                
                    let str = res.substring(res.indexOf(",")+1);

                    _this.imageUrl.push(str);
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
        //点击删除上传的图片 --营业执照
        handleRemove(file, fileList) {
            let _this = this;
            this.getBase64(file.raw).then(res => {
                console.log(res);
                   let str = res.substring(res.indexOf(",")+1);

                for (let i = 0; i < _this.imageUrl.length; i++) {
                    if (_this.imageUrl[i] == str) {
                        _this.imageUrl.splice(i, 1);
                       console.log( _this.imageUrl)
                        break;
                    }
                }
            });
        },
 
        //点击每个url放大的方法--营业执照
        handlePictureCardPreview(file) {
            let _this = this;
            this.getBase64(file.raw).then(res => {
                console.log(res);
                let str = res.substring(res.indexOf(",")+1);
                for (let i = 0; i < _this.imageUrl.length; i++) {
                    if (_this.imageUrl[i] == str) {
                        _this.dialogImageUrl = file.url;
                        
                        _this.dialogVisible = true;
                        break;
                    }
                }
            });
        },
        //关闭外层dialog
        closeDialog() {
            this.$emit('close',false)
            this.$refs.pic.clearFiles(); //清空文件
            this.imageUrl = []  //清空base64数组
            this.$refs.ruleForm.resetFields();  //重置from和rules
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            this.$refs["ruleForm"].validate(valid => {
                debugger
                if (valid) {
                    // 表单验证通过之后的操作
                    let params={
                        erpName:this.ruleForm.firmName,  //企业名称
                        erpAddr:this.ruleForm.firmAddress,  //企业地址
                        erpLinkMan:this.ruleForm.linkman,  //联系人
                        erpLinkTel:this.ruleForm.linkPhone, //联系电话
                        erpMail:this.ruleForm.mail,  //邮箱
                        images:this.imageUrl,  //图片base64数组
                        images2:this.imageUrl2,  //图片base64数组
                        erpType:this.ruleForm.firmType  //企业类型
                    }
                    let _this = this
                    this.$api.company.addCompany(params).then(res=>{
                        if(res.data.code ==0){
                            console.log(res)
                            _this.$message({
                                    message: '企业添加成功',
                                    type: 'success'
                                });
                            _this.$emit('addSuccess',true)
                            _this.closeDialog()
                        }
                    })
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
    watch:{
        isShow(val){
            this.newsAdd = val;
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
    height: 46%;
    overflow-y: auto;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;

    width: 32%;
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
.dialog >>> .el-select {
    width: 100%;
}
</style>