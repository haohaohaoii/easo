<template>
    <el-dialog :visible.sync="baseEditor" class="baseEditor" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站编辑</p>
        </div>

        <el-form ref="baseE" :model="form" :rules="rules" label-width="100px" size="mini">
            <el-form-item label="当前企业:" v-if="!isFromcom">
                <el-input v-model="companyName" readonly="true"></el-input>
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
                <el-input v-model="form.mn" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="企业选择" prop="erpId" v-if="isFromcom">
                <el-select v-model="form.erpId" clearable>
                    <el-option
                        v-for="item of companyArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点状态" v-if="isShowsite" prop="siteS">
                <el-select v-model="form.siteS" clearable>
                    <el-option
                        v-for="item of siteSes"
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
                            placeholder="运维类型"
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
                            placeholder="请选择时间"
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
                            placeholder="运维类型"
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
                            placeholder="请选择时间"
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
                            placeholder="运维类型"
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
                            placeholder="请选择时间"
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
                            placeholder="运维类型"
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
                            placeholder="请选择时间"
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
                            placeholder="运维类型"
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
                            placeholder="请选择时间"
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
            isFromcom:true,
            isShowsite:false,
            companyName:'',
            types:[],
            siteSes:[  //站点状态数组
                {label:'启用',value:1},
                {label:'禁用',value:2}
            ],  
            status: false, //控制表头不显示
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
                siteS:'', //站点状态

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
                llDesc:'' //流量详情
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
                ],
                siteS:[
                     {
                        required: true,
                        message: "请选择状态",
                        trigger: "change"
                    }
                ]
            },
            stateType:false,  //这一步是为了分别0和空字符串相等的问题
            // companyArr:[]
        };
    },
    computed: {
        ...mapState(["Equilist","companyArr",'baseItemlist']),
        baseEditor:{
            get(){
               return this.$store.state.baseEditor
            },
            set(){}
        }

    },
    mounted(){
      if(this.$route.query.companyId && this.$route.query.companyName){
           this.isFromcom = false
           this.companyName = this.$route.query.companyName
        }else{
             this.isFromcom = true
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
        //获取设备类型
        getypes(){
            this.$api.site.getTypes().then(res=>{
              
                if(res.data.code ==0){
                    this.types = res.data.data
                }
            })
        },
        //添加基站
        addBase() {
        
            let siteName = this.form.siteName  //基站名称
            let ioType = this.form.ioType  //基站状态
            let erpId = this.form.erpId  //企业选择
            let siteState = this.form.siteS
            if(ioType ===0){
                this.stateType = true
            }
            if(ioType ===1){
                this.stateType = true
            }
            let mn = this.form.mn  //mn号
            let factors = this.form.factors
            if(siteName && this.stateType && mn){
            
                if((this.form.codIsC&&this.form.codTypes &&this.form.codDesc) || 
                (this.form.zlIsC &&this.form.zlTypes &&this.form.zlDesc) || 
                (this.form.anIsC &&　this.form.anTypes && this.form.anDesc) || 
                (this.form.zdIsC && this.form.zdTypes && this.form.zdDesc) || 
                (this.form.llIsC && this.form.llTypes && this.form.llDesc)){
                    let factorCode = ''
                    let actionType = ''
                    let actionDesc = ''
                    let arr=[]
                    if(this.form.codIsC){  //选中的是cod
                        let obj={
                            factorCode:'011',
                            deviceType:this.form.codTypes,
                            createTime:this.form.codDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.anIsC){  //选中的是氨氮
                        let obj = {
                            factorCode:'060',
                            deviceType:this.form.anTypes,
                            createTime:this.form.anDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.zlIsC){  //选中的是总磷
                        let obj = {
                            factorCode:'101',
                            deviceType:this.form.zlTypes,
                            createTime:this.form.zlDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.zdIsC){  //选中的是总氮
                        let obj = {
                            factorCode:'065',
                            deviceType:this.form.zdTypes,
                            createTime:this.form.zdDesc
                        }
                        arr.push(obj)
                    }
                    if(this.form.llIsC){  //选中的是流量
                        let obj = {
                            factorCode:'B01',
                            deviceType:this.form.llTypes,
                            createTime:this.form.llDesc
                        }
                        arr.push(obj)
                    }
                    let params={
                        siteName:siteName,
                        ioType:ioType,
                        mn:mn,
                        siteDevices:arr,
                        erpId:erpId,
                        siteState:siteState
                    }
                    let _this = this
                    this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                    this.$axios.put(`${base.localUrl}/admin/site/${mn}`,params,{
                        'Content-Type':'application/json'
                    }).then(res=>{
                      
                        if(res.data.code == 0){
                            _this.$message({
                                message: '基站编辑成功',
                                type: 'success'
                            });
                            _this.$emit('ediSuccess',true)
                            _this.clearForm()
                        }
                    })
                  
                    // this.$api.site.changeSitedetail(params,mn).then(res=>{
                    //     if(res.data.code == 0){
                    //         _this.$message({
                    //             message: '基站编辑成功',
                    //             type: 'success'
                    //         });
                    //         _this.$emit('ediSuccess',true)
                    //     _this.clearForm()
                    //     }
                    // }).catch(error=>{

                    // })
                }else{
                    this.$message.error("请选择因子、并填写运维类型和运维详情!");
                }
            }else{
                this.$message({
                    type: "warning",
                    message: "请将必填项填写完毕后再提交"
                });
            }
        },
        //清除表单内容
        clearForm(){
            
           this.$refs.baseE.resetFields()

            this.form.codIsC=false
            this.form.anIsC = false
            this.form.zlIsC = false
            this.form.zdIsC=false
            this.form.llIsC=false

            this.form.codDesc=''
            this.form.anDesc = ''
            this.form.zlDesc = ''
            this.form.zdDesc=''
            this.form.llDesc=''

            this.form.codTypes=''
            this.form.anTypes=''
            this.form.zlTypes=''
            this.form.zdTypes=''
            this.form.llTypes=''
            this.$store.commit("baseEditor", false); //关闭dialog
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
    },
    watch:{
       baseItemlist(val){
  
           console.log(val)
           let arr = Object.keys(val);
           if(arr && arr.length>0){
                this.form.siteName = val.siteName
                this.form.mn = val.mn
                this.form.ioType = val.ioType
                if(this.companyArr && this.companyArr.length>0){
                    for(let i=0; i<this.companyArr.length; i++){
                        if(this.companyArr[i].value == val.erpId){
                            this.form.erpId = this.companyArr[i].value
                        }
                    }
                }
                let siteDevices = val.siteDevices
                if(val.siteDevices && val.siteDevices.length>0){
                    for(let j=0; j<val.siteDevices.length; j++){
                        if(siteDevices[j].factorCode == '011'){  //cod
                            this.form.codIsC=true //cod是否选中
                            this.form.codTypes=siteDevices[j].deviceType//cod类型
                            this.form.codDesc=siteDevices[j].createTime //cod详情
                        } 
                        if(siteDevices[j].factorCode == '101'){  //氨氮
                            this.form.anIsC=true
                            this.form.anTypes=siteDevices[j].deviceType
                            this.form.anDesc=siteDevices[j].createTime 
                        }
                        if(siteDevices[j].factorCode == '060'){  //总磷
                            this.form.zlIsC=true
                            this.form.zlTypes=siteDevices[j].deviceType
                            this.form.zlDesc=siteDevices[j].createTime
                        }
                        if(siteDevices[j].factorCode == '065'){  //总氮
                            this.form.zdIsC=true
                            this.form.zdTypes= siteDevices[j].deviceType
                            this.form.zdDesc=siteDevices[j].createTime 
                        }
                        if(siteDevices[j].factorCode == 'B01'){  //流量
                            this.form.llIsC=true
                            this.form.llTypes=siteDevices[j].deviceType
                            this.form.llDesc=siteDevices[j].createTime
                        }
                    }
                }
                if(val.siteS== 0){
                    this.isShowsite = false
                }else if(val.siteS == 1){
                    this.isShowsite = true
                    this.form.siteS = 1
                }else if(val.siteS == 2){
                    this.isShowsite = true
                       this.form.siteS = 2
                }else if(val.siteS == 3){
                   this.isShowsite = false
                }
                this.form.factors = val.siteDevices
                
                console.log(this.companyArr)
                console.log(this.Equilist)
                console.log(this.form.erpId)
           }
       }
    }
};
</script>

<style lang="scss" scoped>
.baseEditor {
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
}
// .baseEditor >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
//     width: 34% !important;
// }
.baseEditor >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: -webkit-fill-available !important;
}
.baseEditor >>> .el-select {
    width: 100%;
}
</style>