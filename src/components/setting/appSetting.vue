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
                    label-width="120px"
                    size="mini"
                    class="demo-ruleForm"
                    status-icon
                >
                    <el-form-item label="版本名称:" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="版本号:" prop="num">
                        <el-input v-model.number="ruleForm.num"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="上传apk文件:" prop="fil">
                        <div class="fileupload">
                            选择文件
                            <input type="file" @change="fileC" ref="fileess" />
                        </div>
                        <div class="fileList" v-if="ruleForm.fil && ruleForm.fil !=''">
                            <div class="left">
                                <div class="left-img" v-if="files.filesExtensions == 'apk'">
                                    <img slot="icon-active" src="../../assets/images/apk.png" />
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
                <el-button type="primary" @click="sureEditor" size="mini" v-has="'保存'">保存</el-button>
                <el-button @click="cancelEditor" size="mini">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import base from '../../api/base.js'
export default {
    data() {
        var valiIcon = (rule, value, callback) => { // 文件校验
            if (!this.ruleForm.fil) {
                callback(new Error('请上传文件'));
            } else {
                callback();
            }
        }
        return {
            files: {
                fileName: '', // 文件名
                filesExtension: '', // 扩展名
                filesExtensions:'',
                fileDate: '', // 上传时间
                fileSize: '', // 上传大小
                fileData: '' // 文件数据
            },
            ruleForm: {
                fil:'',
                name: '',
                num:'',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请填写版本名称', trigger: 'blur' },
                     {
                        pattern: /^\d{1,2}(\.\d{1,2}){2,3}$/,
                        message: "请填写正确的版本名称格式",
                        trigger: "blur"
                    }
                ],
                num: [
                    { type: 'number', message: '版本号必须为整数类型'}
                ],
                fil: [
                    {required:true, validator: valiIcon, trigger: 'change' } 
                ],
                
            }
        };
    },
    methods:{
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
                        this.ruleForm.fil = myfile.files[0]
                        this.files.fileName = myfile.files[0].name
                    }else{
                        this.$message.error(`暂不支持${this.files.filesExtension}类型的文件`)
                    }
                })
               
            }
        },
        isAssetTypeAnImage(ext) {
            return new Promise(resolve =>{
                let arr = ['.apk']
                resolve(arr.indexOf(ext.toLowerCase()) !== -1)
            })
        },
        delFiles(){  //点击删除
            this.ruleForm.fil = '';
            this.files.fileName = '';
            this.files.filesExtension = '';
            this.files.fileDate = ''
            this.files.fileSize = ''
        },
        sureEditor(){  //保存
            this.$refs.ruleForm.validate((valid) => {

                if (valid) {
                    let adminId = localStorage.adminId
                    const formData = new FormData()
                    formData.append('file', this.ruleForm.fil)  //文件
                    formData.append('versionCode', this.ruleForm.num)  //版本号
                    formData.append('versionName', this.ruleForm.name) //版本名称
                    formData.append('description', this.ruleForm.desc) //描述
                    formData.append('createBy',adminId)  //当前admin id

                    this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                    this.$axios.post(`${base.localUrl}/admin/app`,formData,{
                        'Content-Type':'multipart/form-data'
                    }).then(res=>{
          
                        if(res.data.code == 0){
                            this.$message({
                                message: 'app更新成功',
                                type: 'success'
                            });
                            this.cancelEditor()
                        }
                    })
                } else {
                    this.$message.error("请按照要求填写!");
                    return false;
                }
            });
        },
        cancelEditor(){  //取消
            this.ruleForm.fil = ''
            this.$refs.ruleForm.resetFields();  //重置from和rules
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
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 4px;

        line-height: 28px;
        overflow: hidden;
    }
    .fileupload input {
        position: absolute;
        width: 75px;
        height: 28px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        -ms-filter: "alpha(opacity=0)";
    }
    .foot {
        position: absolute;
        left: 50%;
        bottom: 15%;
    }
}
.appS >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>