<template>
    <el-dialog :visible.sync="baseEditor" class="baseAdd" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站编辑</p>
        </div>
        <el-form ref="baseE" :model="form" :rules="rules" label-width="100px">
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
            <el-form-item label="企业选择" prop="erpId">
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

            <el-form-item label="托管设备:" prop="factors">
                <el-checkbox-group v-model="form.factors">
                    <el-checkbox
                        v-for="item of Equilist"
                        :key="item.id"
                        :label="item.value"
                    >{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="addBase">编辑</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            isShowsite:false,
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
        ...mapState(["baseEditor","Equilist","companyArr",'baseItemlist'])

    },
    methods: {
        //添加基站
        addBase() {
            debugger
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
            if(siteName && this.stateType && mn && erpId && factors.length>0){
                let params={
                    siteName:siteName,
                    ioType:ioType,
                    mn:mn,
                    factors:factors,
                    erpId:erpId,
                    siteState:siteState
                }
                let _this = this
                this.$api.site.changeSitedetail(params,mn).then(res=>{
                    if(res.data.code == 0){
                        _this.$message({
                            message: '基站添加成功',
                            type: 'success'
                        });
                       _this.clearForm()
                    }
                }).catch(error=>{

                })
            }else{
                this.$message({
                    type: "warning",
                    message: "请将必填项填写完毕后再提交"
                });
            }
        },
        //清除表单内容
        clearForm(){
            this.$nextTick(() => {
                this.$refs['baseE'].resetFields()
            })
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
                if(val.siteDevices && val.siteDevices.length>0){
                    for(let j=0; j<val.siteDevices.length; j++){
                            if(this.Equilist && this.Equilist.length>0){
                                for(let k=0; k<this.Equilist.length; k++){
                                    if(this.Equilist[k].value == val.siteDevices[j]){
                                        this.form.factors.push(this.Equilist[k].value)
                                    }
                                }
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
.baseAdd {
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
.baseAdd >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    width: 32% !important;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
    width: 40%;
    overflow-y: auto;
}
</style>