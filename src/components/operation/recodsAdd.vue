<template>
    <el-dialog
        :visible.sync="addShow"
        class="addRecods"
        center
        :close-on-click-modal="false"
        append-to-body
        @close="closeDialog"
    >
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加运维记录</p>
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
            <el-form-item label="选择站点:" prop="siteVal">
                <el-select
                    size="small"
                    v-model="ruleForm.siteVal"
                    @focus="getSites"
                    placeholder="请选择站点"
                    filterable
                >
                    <el-option
                        v-for="item in siteList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运维人员:" prop="ywPeople">
                <el-select
                    size="small"
                    v-model="ruleForm.ywPeople"
                    @focus="getYWP"
                    placeholder="请选择运维人员"
                    filterable
                >
                    <el-option
                        v-for="item in ywPeoplelist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运维时间:" prop="ywTime">
                <el-date-picker
                    size="small"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    class="changeW"
                    v-model="ruleForm.ywTime"
                    placeholder="请选择运维时间"
                    time-arrow-control
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="运维单号:" prop="ywNum">
                <el-input placeholder="请输入运维单号" v-model="ruleForm.ywNum"></el-input>
            </el-form-item>
            <!--cod-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="codIsC">
                        <el-checkbox v-model="ruleForm.codIsC" @change="changeCod">COD</el-checkbox>
                    </el-form-item>
                </el-col>

                <el-col :lg="10" :xl="10">
                    <el-form-item prop="codType">
                        <el-select
                            v-model="ruleForm.codTypes"
                            @focus="getypes"
                            placeholder="运维类型"
                            filterable
                            :disabled="!ruleForm.codIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="codDesc">
                        <el-input
                            :disabled="!ruleForm.codIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.codDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--氨氮-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="anIsC">
                        <el-checkbox v-model="ruleForm.anIsC" @change="changeAn">氨氮</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :xl="10">
                    <el-form-item prop="anType">
                        <el-select
                            v-model="ruleForm.anTypes"
                            @focus="getypes"
                            placeholder="运维类型"
                            :disabled="!ruleForm.anIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="anDesc">
                        <el-input
                            :disabled="!ruleForm.anIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.anDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--总磷-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="zlIsC">
                        <el-checkbox v-model="ruleForm.zlIsC" @change="changeZl">总磷</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :xl="10">
                    <el-form-item prop="zlType">
                        <el-select
                            v-model="ruleForm.zlTypes"
                            @focus="getypes"
                            placeholder="运维类型"
                            filterable
                            :disabled="!ruleForm.zlIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="zlDesc">
                        <el-input
                            :disabled="!ruleForm.zlIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.zlDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--总氮-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="zdIsC">
                        <el-checkbox v-model="ruleForm.zdIsC" @change="changeZd">总氮</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :xl="10">
                    <el-form-item prop="zdType">
                        <el-select
                            v-model="ruleForm.zdTypes"
                            @focus="getypes"
                            :disabled="!ruleForm.zdIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="zdDesc">
                        <el-input
                            :disabled="!ruleForm.zdIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.zdDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--流量-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="llIsC">
                        <el-checkbox v-model="ruleForm.llIsC" @change="changeLl">流量</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :xl="10">
                    <el-form-item prop="llType">
                        <el-select
                            v-model="ruleForm.llTypes"
                            :disabled="!ruleForm.llIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="llDesc">
                        <el-input
                            :disabled="!ruleForm.llIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.llDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--ph-->
            <el-form-item>
                <el-col slot="label">
                    <el-form-item prop="phIsC">
                        <el-checkbox v-model="ruleForm.phIsC" @change="changeph">P&nbsp;&nbsp;H</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :xl="10">
                    <el-form-item prop="phType">
                        <el-select
                            v-model="ruleForm.phTypes"
                            :disabled="!ruleForm.phIsC"
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
                <el-col :lg="12" :xl="12" :offset="2">
                    <el-form-item prop="phDesc">
                        <el-input
                            :disabled="!ruleForm.phIsC"
                            placeholder="请输入运维详情"
                            v-model="ruleForm.phDesc"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="foot">
            <el-button type="primary" @click="sureEditor" size="mini">保存</el-button>
            <el-button @click="cancelEditor" size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import base from '../../api/base.js'; // 导入接口域名列表           
import { mapState, mapMutations } from "vuex";
export default {
    props:['isShow'],
    data() {
        return {
            siteList:[],  //站点
            types:[],
            ywPeoplelist:[], //运维人员数组
            addShow:false,
            ruleForm: {
                siteVal: "", //站点
                ywPeople: "", //运维人员
                ywTime: "", //运维时间
                ywNum: "", //运维单号

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
                siteVal: [
                    {
                        required: true,
                        message: "请选择站点",
                        trigger: "change"
                    }
                ],
                ywPeople: [
                    {
                        required: true,
                        message: "请填写运维人员",
                        trigger: "blur"
                    }
                ],
                ywTime: [
                    
                    {
                        required: true,
                        message: "请选择运维时间",
                        trigger: "change"
                    },
                ],
                ywNum:[
                    {   
                     
                        required: true,
                        message: "请填写运维单号",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        changeCod(val){  //当复选框为false时
            if(!val){
                this.ruleForm.codTypes='',
                this.ruleForm.codDesc=''
            }
        },
        changeAn(val){  //当复选框为false时
            if(!val){
                this.ruleForm.anTypes='',
                 this.ruleForm.anDesc=''
           }
        },
        changeZl(val){  //当复选框为false时
            if(!val){
                this.ruleForm.zlTypes='',
                this.ruleForm.zlDesc=''
            }
        },
        changeZd(val){ //当复选框为false时
            if(!val){
                this.ruleForm.zdTypes='',
                this.ruleForm.zdDesc=''
            }
        },
        changeLl(val){ //当复选框为false时
            if(!val){
                this.ruleForm.llTypes='',
                this.ruleForm.llDesc=''
            }
        },
        //获取类型
        getypes(){
            this.$api.recodes.getTypes().then(res=>{
           
                if(res.data.code ==0){
                    this.types = res.data.data
                }
            })
        },
        changeph(val){  //当复选框为false时
            if(!val){
                this.ruleForm.phTypes='',
                this.ruleForm.phDesc=''
            }
        },
        //获取运维人员
        getYWP(){
            this.$api.operp.getOperpAll().then(res=>{
            
                 if(res.data.code == 0){
                    let arr = res.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].realName,
                            value:arr[i].id
                        }
                        list.push(obj)
                    }
                    this.ywPeoplelist = list
                }
            })
        },
         //获取站点
        getSites(){
            this.$api.site.getAlls().then(depList=>{
                    
                if(depList.data.code == 0){
                    let arr = depList.data.data
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
        //关闭外层dialog
        closeDialog() {
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.ruleForm.codIsC=false
            this.ruleForm.anIsC = false
            this.ruleForm.zlIsC = false
            this.ruleForm.zdIsC=false
            this.ruleForm.llIsC=false 
            this.ruleForm.phIsC=false

            this.ruleForm.codDesc=''
            this.ruleForm.anDesc = ''
            this.ruleForm.zlDesc = ''
            this.ruleForm.zdDesc=''
            this.ruleForm.llDesc=''
            this.ruleForm.phDesc=''

            this.ruleForm.codTypes=''
            this.ruleForm.anTypes=''
            this.ruleForm.zlTypes=''
            this.ruleForm.zdTypes=''
            this.ruleForm.llTypes=''
            this.ruleForm.phTypes=''
            this.$emit('changeAddDialog',false)
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this =this
            this.$refs["ruleForm"].validate(valid => {  
                if (valid) {
                        let flag = false
                        let factorCode = ''
                        let actionType = ''
                        let actionDesc = ''
                        let arr=[]
                        if(_this.ruleForm.codIsC && _this.ruleForm.codTypes && _this.ruleForm.codDesc){  //选中的是cod
                            flag = true
                            let obj={
                                factorCode:'011',
                                actionType:_this.ruleForm.codTypes,
                                actionDesc:_this.ruleForm.codDesc
                            }
                            arr.push(obj)
                        }
                        if(_this.ruleForm.anIsC && _this.ruleForm.anTypes && _this.ruleForm.anDesc){  //选中的是氨氮
                            flag = true
                            let obj = {
                                factorCode:'060',
                                actionType:_this.ruleForm.anTypes,
                                actionDesc:_this.ruleForm.anDesc
                            }
                            arr.push(obj)
                        }
                        if(_this.ruleForm.zlIsC && _this.ruleForm.zlTypes && _this.ruleForm.zlDesc){  //选中的是总磷
                            flag = true
                            let obj = {
                                factorCode:'101',
                                actionType:_this.ruleForm.zlTypes,
                                actionDesc:_this.ruleForm.zlDesc
                            }
                            arr.push(obj)
                        }
                        if(_this.ruleForm.zdIsC && _this.ruleForm.zdTypes && _this.ruleForm.zdDesc){  //选中的是总氮
                            flag = true
                            let obj = {
                                factorCode:'065',
                                actionType:_this.ruleForm.zdTypes,
                                actionDesc:_this.ruleForm.zdDesc
                            }
                            arr.push(obj)
                        }
                        if(_this.ruleForm.llIsC && _this.ruleForm.llTypes && _this.ruleForm.llDesc){  //选中的是流量
                            flag = true
                            let obj = {
                                factorCode:'B01',
                                actionType:_this.ruleForm.llTypes,
                                actionDesc:_this.ruleForm.llDesc
                            }
                            arr.push(obj)
                        }
                        if(_this.ruleForm.phIsC && _this.ruleForm.phTypes && _this.ruleForm.phDesc){  //选中的是ph
                            flag = true
                            let obj = {
                                factorCode:'001',
                                actionType:_this.ruleForm.phTypes,
                                actionDesc:_this.ruleForm.phDesc
                            }
                            arr.push(obj)
                        }
                        if(flag){
                            let params={
                                mn:_this.ruleForm.siteVal, //站点mn
                                mtUserId:_this.ruleForm.ywPeople,  //运维人员
                                mtTime: _this.ruleForm.ywTime, //运维时间
                                mtCode:_this.ruleForm.ywNum, //运维单号
                                recordDetails:arr

                            }
                            _this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                            _this.$axios.post(`${base.localUrl}/admin/mtRecord`,params,{
                                'Content-Type':'application/json'
                            }).then(res=>{
                                if(res.data.code == 0){
                                    _this.$message({
                                        message: '运维记录添加成功',
                                        type: 'success'
                                    });
                                    _this.$emit('addSuccess',true)
                                    _this.closeDialog()
                                }
                            })
                        }else{
                            _this.$message.error("请选择因子、并填写设备型号和安装时间!");
                        }
                        
                    
                  
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
.addRecods {
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
}
//最外层弹窗
// addRecods >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;

//     top: 50%;

//     left: calc(50% + 240px);
//     transition: transform;
//     transform: translate(-50%,-50%);

//     border: 1px solid #ebeef5;

// }
// .addRecods >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     width: 38% !important;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);
// }
.addRecods >>> .el-date-editor.el-input,
.addRecods >>> .el-date-editor.el-input__inner {
    width: 100%;
}
.addRecods >>> .el-dialog--center .el-dialog__body {
    padding: 25px 45px 5px !important;
}
.addRecods >>> .el-select {
    width: 100%;
}

.addRecods >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}

//表单校验的图标颜色
.addRecods >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>