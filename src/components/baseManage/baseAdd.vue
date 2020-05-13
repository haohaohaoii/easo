<template>
    <el-dialog :visible.sync="baseAdd" class="baseAdd" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站添加</p>
        </div>
        <!-- <p v-if="!isFromcom">{{companyName}}</p> -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
            <el-form-item label="当前企业:" v-if="!isFromcom">
                <el-input v-model="companyName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="基站名称:" prop="siteName">
                <el-input v-model="form.siteName"></el-input>
            </el-form-item>
            <el-form-item label="进出口:" prop="ioType">
                <el-select v-model="form.ioType" placeholder="请选择进出口">
                    <el-option
                        v-for="(item,index) of jcType"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MN:" prop="mn">
                <el-input v-model="form.mn"></el-input>
            </el-form-item>
            <el-form-item label="企业选择" prop="erpId" v-if="isFromcom">
                <el-select v-model="form.erpId" @visible-change="companyChoose" clearable>
                    <el-option
                        v-for="item of companyArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <!-- <el-form-item label="托管设备:" prop="factors">
                <el-checkbox-group v-model="form.factors">
                    <el-checkbox
                        v-for="item of Equilist"
                        :key="item.id"
                        :label="item.value"
                    >{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>-->
            <!--cod-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="codIsC">
                        <el-checkbox v-model="form.codIsC" @change="changeCod">COD</el-checkbox>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item prop="codType">
                        <el-select
                            v-model="form.codTypes"
                            @focus="getypes"
                            placeholder="设备型号"
                            filterable
                            :disabled="!form.codIsC"
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="codDesc">
                        <el-date-picker
                            :disabled="!form.codIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.codDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--氨氮-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="anIsC">
                        <el-checkbox v-model="form.anIsC" @change="changeAn">氨氮</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="anType">
                        <el-select
                            v-model="form.anTypes"
                            @focus="getypes"
                            placeholder="设备型号"
                            :disabled="!form.anIsC"
                            filterable
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="anDesc">
                        <el-date-picker
                            :disabled="!form.anIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.anDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--总磷-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="zlIsC">
                        <el-checkbox v-model="form.zlIsC" @change="changeZl">总磷</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="zlType">
                        <el-select
                            v-model="form.zlTypes"
                            @focus="getypes"
                            placeholder="设备型号"
                            filterable
                            :disabled="!form.zlIsC"
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="zlDesc">
                        <el-date-picker
                            :disabled="!form.zlIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.zlDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--总氮-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="zdIsC">
                        <el-checkbox v-model="form.zdIsC" @change="changeZd">总氮</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="zdType">
                        <el-select
                            v-model="form.zdTypes"
                            @focus="getypes"
                            :disabled="!form.zdIsC"
                            placeholder="设备型号"
                            filterable
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="zdDesc">
                        <el-date-picker
                            :disabled="!form.zdIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.zdDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--流量-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="llIsC">
                        <el-checkbox v-model="form.llIsC" @change="changeLl">流量</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="llType">
                        <el-select
                            v-model="form.llTypes"
                            :disabled="!form.llIsC"
                            @focus="getypes"
                            placeholder="设备型号"
                            filterable
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="llDesc">
                        <el-date-picker
                            :disabled="!form.llIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.llDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--ph-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="phIsC">
                        <el-checkbox v-model="form.phIsC" @change="changeph">P&nbsp;&nbsp;H</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="phType">
                        <el-select
                            v-model="form.phTypes"
                            :disabled="!form.phIsC"
                            @focus="getypes"
                            placeholder="设备型号"
                            filterable
                        >
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16" :offset="2">
                    <el-form-item prop="phDesc">
                        <el-date-picker
                            :disabled="!form.phIsC"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            type="datetime"
                            v-model="form.phDesc"
                            placeholder="安装时间"
                            time-arrow-control
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="addBase">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import base from '../../api/base.js'; // 导入接口域名列表     
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            types:[],

            isFromcom:true,
            status: false, //控制表头不显示
            companyName:'',
            jcType:[
                {label:'进口',value:0},
                {label:'出口',value:1}
            ],
            form:{
                siteName:'',  //基站名称
                ioType:' ',  //选择的是哪个进出口值
                mn:'', //mn
                factors:[], //托管设备
                erpId:'',

                codIsC:false, //cod是否选中
                codTypes:'',//cod类型
                codDesc:'', //cod详情

                anIsC:false, //氨氮是否选中
                anTypes:'',//氨氮类型
                anDesc:'', //氨氮详情

                zlIsC:false, //总磷是否选中
                zlTypes:'',//总磷类型
                zlDesc:'', //总磷详情

                zdIsC:false, //总氮是否选中
                zdTypes:'',//总氮类型
                zdDesc:'', //总氮详情

                llIsC:false, //流量是否选中
                llTypes:'',//流量类型
                llDesc:'', //流量详情

                phIsC:false, //ph是否选中
                phTypes:'',//ph类型
                phDesc:'' //ph详情
            },
            rules: {
                siteName: [
                    {
                        required: true,
                        message: "请输入基站名称",
                        trigger: "blur"
                    }
                ],
                ioType: [
                    {
                        required: true,
                        message: "请选择进出口值",
                        trigger: "change"
                    }
                ],
                mn: [
                    
                    {
                        required: true,
                        message: "请输入mn号",
                        trigger: "blur"
                    }
                ],
                factors: [
                    {
                        required: true,
                        message: "请选择设备托管",
                        trigger: "change"
                    }
                ],
                erpId:[
                     {
                        required: true,
                        message: "请选择企业",
                        trigger: "change"
                    }
                ]
            },
            stateType:false,  //这一步是为了分别0和空字符串相等的问题
            companyArr:[]
        };
    },
    mounted(){

        if(this.$route.query.companyId && this.$route.query.companyName){
           this.isFromcom = false
           this.companyName = this.$route.query.companyName
           let _this =this
           this.companyP().then(comArr=>{

               if(comArr && comArr.length>0){
                   for(let k=0; k<comArr.length; k++){
                       if(comArr[k].label ==_this.companyName){
                           _this.form.erpId=JSON.parse(comArr[k].value);
                           break;
                       }
                   }
               }
           })
        }else{
             this.isFromcom = true
        }
    },
    computed: {
        ...mapState(["Equilist"]),
        baseAdd:{
            get(){
               return this.$store.state.baseAdd
            },
            set(){}
        }
    },
    methods: {
        changeCod(val){  //当复选框为false时
            if(!val){
                this.form.codTypes='',
                this.form.codDesc=''
            }
        },
        changeAn(val){  //当复选框为false时
            if(!val){
                this.form.anTypes='',
                 this.form.anDesc=''
           }
        },
        changeZl(val){  //当复选框为false时
            if(!val){
                this.form.zlTypes='',
                this.form.zlDesc=''
            }
        },
        changeZd(val){ //当复选框为false时
            if(!val){
                this.form.zdTypes='',
                this.form.zdDesc=''
            }
        },
        changeLl(val){ //当复选框为false时
            if(!val){
                this.form.llTypes='',
                this.form.llDesc=''
            }
        },
        changeph(val){  //当复选框为false时
            if(!val){
                this.form.phTypes='',
                this.form.phDesc=''
            }
        },
        //获取设备类型
        getypes(){
            this.$api.site.getTypes().then(res=>{
              
                if(res.data.code ==0){
                    this.types = res.data.data
                }
            })
        },
        companyChoose(val){
            if(val == true){
                this.$api.company.companyAll().then(res=>{
                    if(res.data.code == 0){
                        if(res.data.data && res.data.data.length>0){
                            let itemArr = []
                            for(let i=0; i<res.data.data.length; i++){
                                let roleItem={
                                    label:res.data.data[i].erpName,
                                    value:res.data.data[i].id
                                }
                                itemArr.push(roleItem)
                            }
                            this.companyArr=itemArr
                        }
                    }
                })
            }
        },
        companyP(){
            return new Promise(resolve=>{
                this.$api.company.companyAll().then(res=>{
                    if(res.data.code == 0){
                        if(res.data.data && res.data.data.length>0){
                            let itemArr = []
                            for(let i=0; i<res.data.data.length; i++){
                                let roleItem={
                                    label:res.data.data[i].erpName,
                                    value:res.data.data[i].id
                                }
                                itemArr.push(roleItem)
                            }
                            this.companyArr=itemArr
                            resolve(itemArr)
                        }
                    }
                })
            })
        },
        //添加基站
        addBase() {
  
            let siteName = this.form.siteName  //基站名称
            let ioType = this.form.ioType  //基站状态
            let erpId = this.form.erpId  //企业选择
            if(ioType ===0){
                this.stateType = true
            }
            if(ioType ===1){
                this.stateType = true
            }
            let mn = this.form.mn  //mn号
            let factors = this.form.factors
            if(siteName && this.stateType && mn){
                    let flag = false
                    let factorCode = ''
                    let actionType = ''
                    let actionDesc = ''
                    let arr=[]
                    if(this.form.codIsC&&this.form.codTypes &&this.form.codDesc){  //选中的是cod
                        flag = true
                        let obj={
                            factorCode:'011',
                            deviceType:this.form.codTypes,
                            createTime:this.form.codDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.anIsC &&　this.form.anTypes && this.form.anDesc){  //选中的是氨氮
                        flag = true
                        let obj = {
                            factorCode:'060',
                            deviceType:this.form.anTypes,
                            createTime:this.form.anDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.zlIsC &&this.form.zlTypes &&this.form.zlDesc){  //选中的是总磷
                        flag = true
                        let obj = {
                            factorCode:'101',
                            deviceType:this.form.zlTypes,
                            createTime:this.form.zlDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.zdIsC && this.form.zdTypes && this.form.zdDesc){  //选中的是总氮
                        flag = true
                        let obj = {
                            factorCode:'065',
                            deviceType:this.form.zdTypes,
                            createTime:this.form.zdDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.llIsC && this.form.llTypes && this.form.llDesc){  //选中的是流量
                        flag = true
                        let obj = {
                            factorCode:'B01',
                            deviceType:this.form.llTypes,
                            createTime:this.form.llDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.phIsC && this.form.phTypes && this.form.phDesc){  //选中的是ph
                        flag = true
                        let obj = {
                            factorCode:'001',
                            deviceType:this.form.phTypes,
                            createTime:this.form.phDesc
                        }
                        arr.push(obj)
                    }
                    if(flag){
                        let params={
                            siteName:siteName,
                            ioType:ioType,
                            mn:mn,
                            siteDevices:arr,
                            erpId:erpId
                        }
                        let _this = this
                        this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                        this.$axios.post(`${base.localUrl}/admin/site`,params,{
                                'Content-Type':'application/json'
                            }).then(res=>{
                            
                                if(res.data.code == 0){
                                    _this.$message({
                                        message: '基站添加成功',
                                        type: 'success'
                                    });
                                    _this.$emit('addSuccess',true)
                                    _this.clearForm()
                                }
                            })
                    }else{
                        this.$message.error("请选择因子、并填写设备型号和安装时间!");
                    }
                    
            }else{
                this.$message({
                    type: "error",
                    message: "请将必填项填写完毕后再提交"
                });
            }
        },
        //清除表单内容
        clearForm(){
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })

            this.form.codIsC=false
            this.form.anIsC = false
            this.form.zlIsC = false
            this.form.zdIsC=false
            this.form.llIsC=false 
            this.form.phIsC=false

            this.form.codDesc=''
            this.form.anDesc = ''
            this.form.zlDesc = ''
            this.form.zdDesc=''
            this.form.llDesc=''
            this.form.phDesc=''

            this.form.codTypes=''
            this.form.anTypes=''
            this.form.zlTypes=''
            this.form.zdTypes=''
            this.form.llTypes=''
            this.form.phTypes=''
            
            this.$store.commit("baseAdd", false); //关闭dialog
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
    }
};
</script>

<style lang="scss" scoped>
.baseAdd {
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
}
// .baseAdd >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
//     width: 34% !important;
// }
.baseAdd >>> .el-select {
    width: 100%;
}
.baseAdd >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: -webkit-fill-available !important;
}
// .baseAdd >>> .el-dialog--center .el-dialog__body {
//     padding: 25px 70px 0px;
// }
</style>