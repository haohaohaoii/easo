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
            <el-form-item v-if="ruleForm.radio==1">
                <quill-editor
                    ref="text"
                    v-model="content"
                    class="myQuillEditor"
                    :options="editorOption"
                />
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

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'            
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow'],
    components:{
         quillEditor
    },
    data() {
        var valiIcon = (rule, value, callback) => { // 图片验证
            if (!this.imageUrl.length>0) {
                callback(new Error('请上传图片'));
            } else {
                callback();
            }
        }
                // 工具栏配置
        const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
        ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
        [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
        [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
        [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
        [{ font: [] }], // 字体种类-----[{ font: [] }]
        [{ align: [] }], // 对齐方式-----[{ align: [] }]
        ['clean'], // 清除文本格式-----['clean']
        ['image'] // 链接、图片、视频-----['link', 'image', 'video']
        ]
        return {
             editorOption: {
                placeholder: '请输入文本...',
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: toolbarOptions
                    }
                }
            },
            content:'',
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
            debugger
            console.log(this.content)
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
    // height: 46%;
    overflow-y: auto;
    top: 54%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
    left: 4%;
    width: 50%;
    overflow-y: auto;
}
.dialog >>> .ql-container.ql-snow {
    height: 260px;
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
.dialog >>> .ql-container.ql-snow::-webkit-scrollbar {
    display: none !important;
}
.dialog >>> .ql-editor::-webkit-scrollbar {
    display: none !important;
}
.dialog >>> .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:" !important;
}
.dialog >>> .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px !important;
    content: "保存" !important;
    padding-right: 0px !important;
}

.dialog >>> .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:" !important;
}

.dialog >>> .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.dialog >>> .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="small"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="small"]::before {
    content: "10px" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="large"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="large"]::before {
    content: "18px" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-label[data-value="huge"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-size
    .ql-picker-item[data-value="huge"]::before {
    content: "32px" !important;
}

.dialog >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.dialog >>> .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="1"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="2"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="3"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="4"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="5"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-label[data-value="6"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-header
    .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
}

.dialog >>> .ql-snow .ql-picker.ql-font .ql-picker-label::before,
.dialog >>> .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="serif"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
}
.dialog
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="monospace"]::before,
.dialog
    >>> .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
}
</style>