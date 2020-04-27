<template>
    <div class="addTwo">
        <div class="dialog">
            <div slot="title" class="tit">
                <div class="line"></div>
                <p>添加运维部门</p>
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
                <el-form-item label="部门名称:" prop="depName">
                    <el-input v-model="ruleForm.depName"></el-input>
                </el-form-item>
                <el-form-item label="选择区域:" required>
                    <el-col :span="8">
                        <el-form-item prop="provinceCode" class="it">
                            <el-select
                                size="small"
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

                    <el-col :span="7" :offset="1">
                        <el-form-item prop="cityCode" class="it">
                            <el-select
                                size="small"
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

                    <el-col :span="7" :offset="1">
                        <el-form-item prop="areaCode" class="it">
                            <el-select
                                size="small"
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
                </el-form-item>
                <el-form-item label="详细地址:" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="负责人:" prop="depPeople">
                    <el-input v-model="ruleForm.depPeople"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" prop="linkPhone">
                    <el-input v-model="ruleForm.linkPhone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="foot">
                <el-button type="primary" @click="sureEditor" size="mini" v-has="'保存'">保存</el-button>
                <el-button @click="cancelEditor" size="mini">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

            
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用

            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组

            ruleForm: {
                depName: "", //部门名称
                address: "", //详细地址
                depPeople: "", //负责人
                linkPhone: "", //联系电话
                provinceCode:'',  //选中的省
                cityCode:'', //选中的市
                areaCode:'', //选中的区县
            },
            
            rules: {
                depName: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "部门名称不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "请输入详细地址",
                        trigger: "change"
                    },{
                        pattern: "^(?=.*?[\u4E00-\u9FA5]){5,100}",
                        message: "不能少于5个字符，不能都是数字和字母，必须有汉字",
                        trigger: "change"
                    }
                ],
                depPeople: [
                    
                    {
                        required: true,
                        message: "请输入负责人名称",
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
                ]
            }
        };
    },
    methods: {
        changeProvince(val){  //选择省份
            this.ruleForm.cityCode = ''
            this.cCode = ''
            this.ruleForm.areaCode = ''
            this.aCode = ''
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
            this.aCode = ''
            let arr =   this.cityList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.cCode = arr[i].value
                    break;
                }
            }
        },
        changeArea(val){  //选择区县
            let arr =   this.areaList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.aCode = arr[i].value
                    break;
                }
            }

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
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this =this
            this.$refs["ruleForm"].validate(valid => {             
                if (valid && _this.pCode && _this.aCode && _this.cCode) {
                    let params={
                        deptName:_this.ruleForm.depName, //部门名称
                        provinceId:_this.pCode,  //省code
                        cityId: _this.cCode, //城市code
                        countyId:_this.aCode, //区域code
                        addressDetail:_this.ruleForm.address,  //详细地址
                        contactMan:_this.ruleForm.depPeople,  //负责人
                        contactPhone: _this.ruleForm.linkPhone  //联系电话
                    }
                    _this.$api.oper
                        .addOper(params)
                        .then(res => {
                            if (res.data.code == 0) {
                                _this.$message({
                                    message: "运维部门添加成功",
                                    type: "success"
                                });
                                _this.$refs.ruleForm.resetFields();
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
            this.$refs.ruleForm.resetFields();  //重置from和rules
        }
    },
};
</script>

<style lang="scss" scoped>
.addTwo {
    height: 100%;
    position: relative;
    .dialog {
        width: 46%;
        height: 58%;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        .tit {
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
        .codeBtn {
            display: block;
            width: 100%;
        }
        .el-form {
            margin-top: 25px;
            padding-left: 10px;
            padding-right: 25px;
        }
        .demo-ruleForm {
            height: 68%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-top: 25px;
            padding-left: 64px;
            padding-right: 76px;
        }
        .foot {
            margin-top: 30px;
            display: flex;
            justify-content: center;
        }
    }
}

.it {
    margin-bottom: 0px !important;
}
//表单校验的图标颜色
.addTwo >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>