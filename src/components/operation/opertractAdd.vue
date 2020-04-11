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
            <p>添加运维合同</p>
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
            <el-form-item label="运维部门:" required>
                <el-col :span="6">
                    <el-form-item prop="provinceCode">
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

                <el-col :span="6">
                    <el-form-item prop="cityCode">
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
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="areaCode">
                        <el-select
                            v-model="ruleForm.areaCode"
                            @change="changeArea"
                            @focus="getAreas"
                            placeholder="区/县"
                            filterable
                        >
                            <el-option
                                v-for="item in areaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="depCode">
                        <el-select
                            v-model="ruleForm.depCode"
                            @focus="getDep"
                            placeholder="运维部门"
                            filterable
                        >
                            <el-option
                                v-for="item in depList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="合同编号:" prop="contractN">
                <el-input v-model="ruleForm.contractN"></el-input>
            </el-form-item>
            <el-form-item label="合同名称:" prop="contractName">
                <el-input v-model="ruleForm.contractName"></el-input>
            </el-form-item>
            <el-form-item label="合同状态:" prop="contractStatus">
                <el-select v-model="ruleForm.contractStatus" placeholder="请选择合同状态" filterable>
                    <el-option
                        v-for="item in contractStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运维部门:" required>
                <el-col :span="6">
                    <el-form-item prop="provinceCode2">
                        <el-select
                            v-model="ruleForm.provinceCode2"
                            @change="changeProvince2"
                            @focus="getProvinces2"
                            placeholder="省份"
                            filterable
                        >
                            <el-option
                                v-for="item in provinceList2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="cityCode2">
                        <el-select
                            v-model="ruleForm.cityCode2"
                            @focus="getCities2"
                            @change="changeCity2"
                            placeholder="城市"
                            filterable
                        >
                            <el-option
                                v-for="item in cityList2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="areaCode2">
                        <el-select
                            v-model="ruleForm.areaCode2"
                            @change="changeArea2"
                            @focus="getAreas2"
                            placeholder="区/县"
                            filterable
                        >
                            <el-option
                                v-for="item in areaList2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="enterprise">
                        <el-select
                            v-model="ruleForm.enterprise"
                            @change="getSites"
                            @focus="getEnterprise"
                            placeholder="企业"
                            filterable
                        >
                            <el-option
                                v-for="item in enterpriseList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="站点:" prop="type">
                <el-checkbox-group v-model="ruleForm.type" v-if="siteList && siteList.length>0">
                    <el-checkbox
                        v-for="item of siteList"
                        :key="item.value"
                        :label="item.value"
                        name="type"
                    >{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <p v-else>无</p>
            </el-form-item>
            <el-form-item label="开始日期:" prop="startTime">
                <el-date-picker
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    class="changeW"
                    v-model="ruleForm.startTime"
                    placeholder="开始时间"
                    time-arrow-control
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="endTime">
                <el-date-picker
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    class="changeW"
                    v-model="ruleForm.endTime"
                    placeholder="结束时间"
                    time-arrow-control
                ></el-date-picker>
            </el-form-item>
            <el-form-item prop="inputVal" label="合同文件">
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
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用

            pCode2:'', //省份code，提交用
            cCode2:'', //城市code,提交用
            aCode2:'', //区域code,提交用

            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组

            provinceList2:[],  //省数组
            cityList2:[], //城市数据
            areaList2:[], //区县数组

            contractStatusList:[ //合同状态数组  0--生效   1-终止
                {label:'生效',value:0},
                {label:'终止',value:1}
            ], 
            dialogVisible:false, //合同放大的dialog
            dialogImageUrl: '',  //合同文件放大dialog中img的路径
            siteList:[], //站点数组
            depList:[],  //运维部门
            enterpriseList:[], //企业数组
            imageUrl:[],
            addShow:false,
            ruleForm: {
                contractN: "", //合同编号
                contractName: "", //合同名称
                contractStatus: "", //合同状态
                type: [], //站点
                startTime:'', //开始时间
                endTime:'',  //结束时间
                inputVal:'',  //文件名称

                provinceCode:'',  //选中的省
                cityCode:'', //选中的市
                areaCode:'', //选中的区县
                depCode:'', //选中的运维部门

                provinceCode2:'',  //选中的省
                cityCode2:'', //选中的市
                areaCode2:'', //选中的区县
                enterprise:'' //选中的企业
            },
            
            rules: {
                contractN: [
                    {
                        required: true,
                        message: "请输入合同编号",
                        trigger: "blur"
                    }
                ],
                contractName: [
                    {
                        required: true,
                        message: "请输入合同名称",
                        trigger: "change"
                    }
                ],
                contractStatus: [
                    {
                        required: true,
                        message: "请选择合同状态",
                        trigger: "change"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: "请选择站点",
                        trigger: "change"
                    }
                ],
                startTime:[
                    {
                        required: true,
                        message: "请选择开始时间",
                        trigger: "change"
                    }
                ],
                endTime:[
                    {
                        required: true,
                        message: "请选择结束时间",
                        trigger: "change"
                    }
                ],
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
                areaCode:[
                    {   
                     
                        required: true,
                        message: "请选择区域",
                        trigger: "change"
                    }
                ],
                provinceCode2:[
                    {   
                  
                        required: true,
                        message: "请选择省份",
                        trigger: "change"
                    }
                ],
                cityCode2:[
                    {   
                 
                        required: true,
                        message: "请选择城市",
                        trigger: "change"
                    }
                ],
                areaCode2:[
                    {   
                     
                        required: true,
                        message: "请选择区域",
                        trigger: "change"
                    }
                ],
                depCode:[
                    {
                        required: true,
                        message: "请选择运维部门",
                        trigger: "change"
                    }
                ],
                enterprise:[
                    {
                        required: true,
                        message: "请选择企业",
                        trigger: "change"
                    }
                ],
                // inputVal: [
                //     {required:true, validator: valiIcon, trigger: 'change' } 
                // ],
            }
        };
    },
    methods: {
         //获取照片的base64
        getFile(file, fileList) {
   
            let _this = this;

            this.getBase64(file.raw)
                .then(res => {          
                    let str = res.substring(res.indexOf(",")+1);
                    _this.imageUrl.push(str)
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
         //点击每个url放大的方法
        handlePictureCardPreview(file) {
            let _this = this;
            this.getBase64(file.raw).then(res => {

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
        //删除合同文件的方法
        handleRemove(file, fileList) {
            let _this = this;
            this.getBase64(file.raw).then(res => {

                   let str = res.substring(res.indexOf(",")+1);

                for (let i = 0; i < _this.imageUrl.length; i++) {
                    if (_this.imageUrl[i] == str) {
                        _this.imageUrl.splice(i, 1);
                       console.log( _this.imageUrl.length)
                        break;
                    }
                }
            });
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
        changeProvince2(val){  //选择省份
            this.ruleForm.type = []
            this.ruleForm.cityCode2 = ''
            this.cityList2 = []
            let arr =   this.provinceList2
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode2 = arr[i].value
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
        changeCity2(val){   //选择城市
            this.ruleForm.type = []
            this.ruleForm.areaCode2 = ''
            this.areaList2 = []
            let arr =   this.cityList2
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.cCode2 = arr[i].value
                    break;
                }
            }
        },
        changeArea(val){  //选择区县
            this.ruleForm.depCode = ''  //清空上一次选中的运维部门
            this.depList = []  //清空运维部门数组
            let arr =   this.areaList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.aCode = arr[i].value
                    break;
                }
            }
        },
        changeArea2(val){  //选择区县
            this.ruleForm.type = []
            let arr =   this.areaList2
            this.ruleForm.enterprise = ''  //清空上次选中的企业
            this.enterpriseList = [] //清空上次的企业数组
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.aCode2 = arr[i].value
                    break;
                }
            }
        },
        //根据选中的企业获取对应企业的站点
        getSites(val){
            this.ruleForm.type = []
            let companyId  = val
            this.$api.site.formComsite(companyId).then(res=>{
           
               if(res.data.code == 0){
                    let arr = res.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].siteName,
                            value:arr[i].mn
                        }
                        list.push(obj)
                    }
                    this.siteList = list
                }
            })
        },
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
        getProvinces2(){ //获取全部省份
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
                    this.provinceList2 = proList
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
        getCities2(){  //根据省份id获取城市列表
            let id = this.ruleForm.provinceCode2;
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
                        this.cityList2 = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应省份!");
            }
        },
        getAreas(){  //根据城市id获取区域列表
            let id = this.ruleForm.cityCode;
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
                        this.areaList = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应城市!");
            }
        },
        getAreas2(){  //根据城市id获取区域列表
            let id = this.ruleForm.cityCode2;
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
                        this.areaList2 = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应城市!");
            }
        },
        //获取运维部门
        getDep(){
            if(this.pCode && this.cCode && this.aCode){
                let params = {
                    province:this.pCode,
                    city:this.cCode,
                    county:this.aCode,
                }
                this.$api.oper.getOperThird({params}).then(depList=>{
                    if(depList.data.code == 0){
                        let arr = depList.data.data
                        let list = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].deptName,
                                value:arr[i].id
                            }
                            list.push(obj)
                        }
                        this.depList = list
                    }
                })
            }else{
                this.$message.error("请先选择对应的省份,城市和县区!");
            }
        },
        //获取企业
        getEnterprise(){
            if(this.pCode2 && this.cCode2 && this.aCode2){
                let params={
                    province:this.pCode2,
                    city:this.cCode2,
                    county:this.aCode2,
                }
                this.$api.company.companyThird({params}).then(depList=>{
                    if(depList.data.code == 0){
                        let arr = depList.data.data
                        let list = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].erpName,
                                value:arr[i].id
                            }
                            list.push(obj)
                        }
                        this.enterpriseList = list
                    }
                })
            }else{
                this.$message.error("请先选择对应的省份,城市和县区!");
            }
        },
        //关闭外层dialog
        closeDialog() {
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.$emit('changeAddDialog',false)
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this =this
            this.$refs["ruleForm"].validate(valid => { 
                debugger
                if (valid) {
                    let params={
                        mtDeptId:_this.ruleForm.depCode, //运维部门
                        contractCode:_this.ruleForm.contractN,  //合同编码
                        contractName: _this.ruleForm.contractName, //合同名称
                        state:_this.ruleForm.contractStatus, //合同状态
                        erpId:_this.ruleForm.enterprise,  //选中的企业
                        startTime:_this.ruleForm.startTime,  //开始时间
                        endTime: _this.ruleForm.endTime,
                        images: _this.imageUrl,  //上传的合同文件
                        mns: _this.ruleForm.type.join(',')
                    }
                    _this.$api.contarct
                        .addcon(params)
                        .then(res => {
                          
                            if (res.data.code == 0) {
                                _this.$message({
                                    message: "运维合同添加成功",
                                    type: "success"
                                });
                                _this.$emit('addSuccess',true)
                                _this.closeDialog();
                            }
                        })
                        .catch(error => {});
                  
                } else {
                    this.$message.error("请按规则填写后再提交!");
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
.dialog >>> .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: calc(50% + 120px);
    transform: translate(-50%, -50%);
}

.dialog >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
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