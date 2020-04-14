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
            <p>上传文件</p>
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
            <el-form-item label="资源标题:" prop="resTitle" placeholder="请输入资源标题">
                <el-input v-model="ruleForm.resTitle"></el-input>
            </el-form-item>
            <el-form-item label="资源介绍:" prop="resIntor" placeholder="请输入资源介绍">
                <el-input v-model="ruleForm.resIntor"></el-input>
            </el-form-item>
            <el-form-item label="上传文件:">
                <div class="fileupload">
                    选择文件
                    <input type="file" @change="fileC" ref="fileess" />
                </div>
                <div class="fileList" v-if="fil && fil !=''">
                    <div class="left">
                        <div class="left-img" v-if="files.filesExtensions == 'pdf'">
                            <img slot="icon-active" src="../../assets/images/pdf.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'doc'">
                            <img slot="icon-active" src="../../assets/images/doc.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'docx'">
                            <img slot="icon-active" src="../../assets/images/docx.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'xlsx'">
                            <img slot="icon-active" src="../../assets/images/xlsx.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'rar'">
                            <img slot="icon-active" src="../../assets/images/rar.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'zip'">
                            <img slot="icon-active" src="../../assets/images/zip.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'xls'">
                            <img slot="icon-active" src="../../assets/images/xls.png" />
                        </div>
                        <div class="left-img" v-if="files.filesExtensions == 'ppt'">
                            <img slot="icon-active" src="../../assets/images/ppt.png" />
                        </div>
                    </div>
                    <div class="cont">
                        <div class="text">{{files.fileName}}</div>
                        <div class="date">{{files.fileSize}}M {{files.fileDate}}上传</div>
                    </div>
                    <div class="right" @click="delFiles">
                        <i class="el-icon-delete"></i>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import base from '../../api/base.js'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import qs from 'qs'; // 根据需求是否导入qs模块            
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow'],
    components:{
         quillEditor
    },
    data() {
        return {
            fil:'',
            files: {
                fileName: '', // 文件名
                filesExtension: '', // 扩展名
                filesExtensions:'',
                fileDate: '', // 上传时间
                fileSize: '', // 上传大小
                fileData: '' // 文件数据
            },
            newsAdd:false,   //外层dialog是都显示
            ruleForm: {
                resTitle: "", //资源标题
                resIntor: "", //资源介绍
            },
            
            rules: {
                resTitle:[
                    {
                        required: true,
                        message: "请输入资源标题",
                        trigger: "blur"
                    }
                ],
                resIntor: [
                    
                    {
                        required: true,
                        message: "请输入资源介绍",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        fileC() {
            let myfile = this.$refs.fileess
            if (myfile.files[0] == undefined) {
                
            } else {
          
                var filevalue = myfile.value;
                var index = filevalue.lastIndexOf('.');
                this.files.filesExtension = filevalue.substring(index)
              
                this.isAssetTypeAnImage(this.files.filesExtension).then(res=>{
                     
                    if(res){
                         this.files.filesExtensions = filevalue.substring(index+1)
                        let date = new Date()
                        const Y = date.getFullYear()
                        let m = date.getMonth() + 1
                        let d = date.getDate()
                        let H = date.getHours()
                        let i = date.getMinutes()
                        let s = date.getSeconds()
                        m = m < 10 ? '0' + m : m
                        d = d < 10 ? '0' + d : d
                        H = H < 10 ? '0' + H : H
                        i = i < 10 ? '0' + i : i
                        s = s < 10 ? '0' + s : s
                        this.files.fileDate = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
                        this.files.fileSize = parseFloat(myfile.files[0].size / 1024 / 1024).toPrecision(2)
                        this.fil = myfile.files[0]
                        this.files.fileName = myfile.files[0].name
                    }else{
                        this.$message.error(`暂不支持${this.files.filesExtension}类型的文件`)
                    }
                })
               
            }
        },
        isAssetTypeAnImage(ext) {
            return new Promise(resolve =>{
                let arr = ['.pdf','.doc','.docx','.xls','.xlsx','.rar','.zip','.ppt']
                resolve(arr.indexOf(ext.toLowerCase()) !== -1)
            })
        },
        delFiles(){  //点击删除
            this.fil = '';
            this.files.fileName = '';
            this.files.filesExtension = '';
            this.files.fileDate = ''
            this.files.fileSize = ''
        },
        //关闭外层dialog
        closeDialog(type) {
            if(type){
                this.$emit('refres')
            }
            this.$emit('close',false)
            this.fil = ''
            this.$refs.ruleForm.resetFields();  //重置from和rules
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this = this
            this.$refs["ruleForm"].validate(valid => {
                debugger
                if (valid && _this.fil!='') {
                    const formData = new FormData()
                    formData.append('file', _this.fil)
                    formData.append('fileName', _this.ruleForm.resTitle)
                    formData.append('fileDesc', _this.ruleForm.resIntor)
                 
                    _this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                    _this.$axios.post(`${base.localUrl}/admin/file`,formData,{
                        'Content-Type':'multipart/form-data'
                    }).then(res=>{
                        if(res.data.code == 0){
                            _this.$message({
                                message: '资源添加成功',
                                type: 'success'
                            });
                            let type = true
                            _this.closeDialog(type)
                        }
                    })

                } else {
                    _this.$message.error("请按照要求填写!");
                    return false;
                }
                 
            });
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            let type = false
            this.closeDialog(type);
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
    .fileList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        align-items: center;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        margin-top: 15px;
        .left-img {
            img {
                width: 55%;
            }
        }
        .cont {
            font-size: 12px;
        }
        .right {
            .el-icon-delete {
                font-size: 20px;
            }
        }
    }
    .fileupload {
        position: relative;
        width: 75px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        line-height: 34px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 4px;

        line-height: 35px;
        overflow: hidden;
    }
    .fileupload input {
        position: absolute;
        width: 75px;
        height: 34px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        -ms-filter: "alpha(opacity=0)";
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
    width: 30%;
    overflow-y: auto;
}
.dialog >>> .el-upload {
    display: flex;
}
.dialog >>> .hide .el-upload--picture-card {
    display: none;
}
.dialog >>> .ql-container.ql-snow {
    height: 260px;
    overflow-y: auto;
}
//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}
.dialog >>> .el-list-enter-active,
.el-list-leave-active {
    transition: none !important;
}

.dialog >>> .el-list-enter,
.dialog >>> .el-list-leave-active {
    opacity: 0 !important;
}
</style>