<template>
    <el-dialog
        :visible.sync="addShow"
        class="stopRepAdd"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>停运报告模板添加</p>
        </div>
        <el-form
            size="small"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
            status-icon
            label-position="right "
        >
            <el-form-item label="地区:" required>
                <el-col :lg="9">
                    <el-form-item prop="provinceCode" class="it">
                        <el-select
                            v-model="ruleForm.provinceCode"
                            @change="changeProvince"
                            @focus="getProvinces"
                            placeholder="省份"
                            filterable
                        >
                            <el-option
                                v-for="item in provinceList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :lg="9">
                    <el-form-item prop="cityCode" class="it">
                        <el-select
                            v-model="ruleForm.cityCode"
                            @focus="getCities"
                            @change="changeCity"
                            placeholder="城市"
                            filterable
                        >
                            <el-option
                                v-for="item in cityList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="类型:" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择类型" filterable>
                    <el-option
                        v-for="item in typeArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文件:">
                <div class="fileupload">
                    选择文件
                    <input type="file" @change="fileC" ref="fileess" />
                </div>
                <span style="fontSize:12px;color:red">注意：只支持doc类型的文件</span>
                <div class="fileList" v-if="fil && fil !=''">
                    <div class="left">
                        <div class="left-img" v-if="files.filesExtensions == 'doc'">
                            <img slot="icon-active" src="../../assets/images/doc.png" />
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
import { mapState, mapMutations } from "vuex";
export default {
    
    props:['isShow'],
    data() {

        return {
            typeArr: [{
                value: 0,
                label: '停产'
                }, {
                value: 1,
                label: '停电'
                }
            ],
            fil:'',
            files: {
                fileName: '', // 文件名
                filesExtension: '', // 扩展名
                filesExtensions:'',
                fileDate: '', // 上传时间
                fileSize: '', // 上传大小
                fileData: '' // 文件数据
            },
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            provinceList:[],  //省数组
            cityList:[], //城市数据
            addShow:false,
            ruleForm: {
                provinceCode:'',  //选中的省
                cityCode:'', //选中的市
                type:''
            },
            
            rules: {
               
                provinceCode:[
                    {   
                  
                        required: true,
                        message: "请选择省份",
                        trigger: "change"
                    }
                ],
                cityCode:[
                    {   
                 
                        required: true,
                        message: "请选择城市",
                        trigger: "change"
                    }
                ],
                type:[{
                    required: true,
                    message: "请选择类型",
                    trigger: "change"
                }]
            }
        };
    },
    methods: {
        getProvinces(){ //获取全部省份
            let id = 1
            this.$api.oper.getArea(id).then(res=>{
           
                if(res.data.code == 0){
                    let arr = res.data.data
                    let proList = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].name,
                            value:arr[i].code,
                            id:arr[i].id
                        }
                        proList.push(obj)
                    }
     
                    this.provinceList = proList
                }
            })
        },
        getCities(){  //根据省份id获取城市列表
            let id = this.ruleForm.provinceCode;
            if(id){
                this.$api.oper.getArea(id).then(res=>{
                    if(res.data.code == 0){
                        let arr = res.data.data
                        let proList = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].name,
                                value:arr[i].code,
                                id:arr[i].id
                            }
                            proList.push(obj)
                        }

                        this.cityList = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应省份!");
            }
        },
        changeProvince(val){  //选择省份

            this.ruleForm.cityCode = ''
            this.cityList = []
            let arr =   this.provinceList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode = arr[i].value
                    break;
                }
            }
        },

        changeCity(val){   //选择城市
            this.ruleForm.areaCode = ''
            this.areaList = []
            let arr =   this.cityList
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.cCode = arr[i].value
                    break;
                }
            }
        },
   
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
                let arr = ['.doc']
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
            this.$refs.ruleForm.resetFields();  //重置from和rules
            if(type){
                this.$emit('changeAddDialog',true)
            }else{
                 this.$emit('closeDialog',false)
            }
            
        },
        //确定编辑  --关闭dialog
        sureEditor() {

            let _this = this
            this.$refs["ruleForm"].validate(valid => {
          
                if (valid && _this.fil!='') {
                    const formData = new FormData()
                    formData.append('file', _this.fil)
                    formData.append('type', _this.ruleForm.type)
                    formData.append('city', _this.ruleForm.cityCode)
                 
                    _this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                    _this.$axios.post(`${base.localUrl}/admin/reportTemplate`,formData,{
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
            this.addShow = val
        }
    }
};
</script>

<style lang="scss" scoped>
.stopRepAdd {
    .tit {
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
// .stopRepAdd >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;

//     top: 50%;

//     left: calc(50% + 240px);
//     transition: transform;
//     transform: translate(-50%,-50%);

//     border: 1px solid #ebeef5;

// }
.it {
    margin-bottom: 0px !important;
}
// .stopRepAdd >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     width: 36% !important;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
// }
.stopRepAdd >>> .el-date-editor.el-input,
.stopRepAdd >>> .el-date-editor.el-input__inner {
    width: 100%;
}
// .stopRepAdd >>> .el-dialog--center .el-dialog__body {
//     padding: 25px 40px 30px !important;
// }
.stopRepAdd >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
//表单校验的图标颜色
.stopRepAdd >>> .el-input__suffix {
    color: #67c23a !important;
}
//上传图片框
.stopRepAdd >>> .el-upload--picture-card {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
//上传图片 +框
.stopRepAdd >>> .el-upload--picture-card i {
    position: relative;
    top: -22px;
    color: #999999;
}
//已上传的图片框
.stopRepAdd >>> .el-upload-list--picture-card .el-upload-list__item {
    width: 90px;
    height: 90px;
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
}
.stopRepAdd >>> .el-select {
    width: 100%;
}
</style>