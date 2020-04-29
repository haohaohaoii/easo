<template>
    <el-dialog
        :visible.sync="addShow"
        class="operEditor"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑运维部门</p>
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
                <el-col :lg="8" :xl="8">
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

                <el-col :lg="8" :xl="8">
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

                <el-col :lg="8" :xl="8">
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
            <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

            
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow','item'],
    data() {
        return {
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用
            id:'',  //行数据id
            
            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组
            addShow:false,
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
            this.cCode = ''
            this.ruleForm.cityCode = ''
            this.aCode = ''
            this.ruleForm.areaCode = ''
            let arr =   this.provinceList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode = arr[i].value
                    break;
                }
            }
        },
        changeCity(val){   //选择城市
       
            this.aCode = ''
            this.ruleForm.areaCode = ''
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
        //关闭外层dialog
        closeDialog() {
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.$emit('changeEdiDialog',false)
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this =this
            this.$refs["ruleForm"].validate(valid => {
                if (valid && _this.pCode && _this.aCode && _this.cCode) {
                    let id = this.id
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
                        .changeOperrow(id,params)
                        .then(res => {
                            if (res.data.code == 0) {
                                _this.$message({
                                    message: "运维部门修改成功",
                                    type: "success"
                                });
                                _this.$emit('ediSuccess',true)
                                _this.closeDialog();
                            }
                        })
                        .catch(error => {});
                  
                } else {
                    this.$message.error("请按规则填写后再提交!");
                    return false;
                }
                 
            });
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            this.closeDialog();
        },
        /**下面方法是遍历用的 */
        //异步获取到省
        ediGetPro(){
            return new Promise(resolve=>{
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
                        resolve(proList)
                    }
                })
            })
        },
        //异步获取到市
        ediGetCity(pId){
            return new Promise(resolve=>{
                let id =  pId
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
                        resolve(proList)
                    }
                })
            })
        },
        //异步获取到区域
        ediGetArea(cId){
            return new Promise(resolve=>{
                let id =  cId
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
                        resolve(proList)
                    }
                })
            })
        }
    },
    watch:{
        //dialog状态
        isShow(val){
            this.addShow = val
        },
        //行数据
        item(val){
            this.id =val.id
            this.pCode = val.provinceId   //省code
            this.cCode = val.cityId  //城市code
            this.aCode = val.countyId //地区code
            this.ruleForm.depName = val.deptName  //部门名称
            this.ruleForm.address = val.addressDetail //详细地址
            this.ruleForm.depPeople = val.contactMan  //负责人
            this.ruleForm.linkPhone= val.contactPhone //联系电话
            this.ediGetPro().then(pList=>{
                if(pList && pList.length>0){
                    for(let i=0; i<pList.length; i++){
                        console.log(i)
                        if(pList[i].value == this.pCode){
                            this.ruleForm.provinceCode = pList[i].id
                            this.ediGetCity( pList[i].id).then(cList=>{
                                if(cList && cList.length>0){
                                    for(let k=0; k<cList.length; k++){
                                        if(cList[k].value == this.cCode){
                                            this.ruleForm.cityCode = cList[k].id
                                            this.ediGetArea(cList[k].id).then(aList=>{
                                                if(aList && aList.length>0){
                                                    for(let j=0; j<aList.length; j++){
                                                        if(aList[j].value == this.aCode){
                                                            this.ruleForm.areaCode = aList[j].id
                                                            break
                                                        }
                                                    }
                                                }
                                            })
                                            break
                                        }
                                    }
                                }
                            })
                            break
                        }
                    }
                }
            })
          
           
        }
    }
};
</script>

<style lang="scss" scoped>
.operEditor {
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
// .operEditor >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;

//     top: 50%;

//     left: calc(50% + 240px);
//     transition: transform;
//     transform: translate(-50%,-50%);

//     border: 1px solid #ebeef5;

// }
// .operEditor >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
//     width: 34%;
// }

.operEditor >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.it {
    margin-bottom: 0px !important;
}
//表单校验的图标颜色
.operEditor >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>