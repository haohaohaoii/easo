<template>
    <div class="appS">
        <div class="adda">
            <div class="appTop">
                <div class="markMsg">
                    <div class="line"></div>
                    <p>App更新</p>
                </div>
            </div>
            <div class="content">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    size="mini"
                    class="demo-ruleForm"
                >
                    <el-form-item label="版本名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="版本号" prop="num">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
            </div>
            <div class="foot">
                <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
                <el-button @click="cancelEditor" size="mini">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
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
            ruleForm: {
                name: '',
                num:'',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请填写版本名称', trigger: 'blur' },
                ],
                num: [
                    { required: true, message: '请填写版本号', trigger: 'blur' }
                ]
                
            }
        };
    },
    methods:{
      fileC() {
          debugger
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
        sureEditor(){  //保存

        },
        cancelEditor(){  //取消

        }
    }
};
</script>

<style lang="scss" scoped>
.appS {
    height: 100%;
    position: relative;
    .adda {
        width: 50%;
        height: 50%;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        overflow-y: auto;
        .markMsg {
            margin-top: 10px;
            display: flex;
            align-items: flex-end;
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
        .content {
            .demo-ruleForm {
                width: 68%;
                margin: 0 auto;
            }
        }
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
    .foot {
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
}
</style>