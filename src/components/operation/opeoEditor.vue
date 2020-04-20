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
            <p>编辑运维人员</p>
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
            <el-form-item label="运维部门:" prop="ywValue">
                <el-select
                    size="small"
                    v-model="ruleForm.ywValue"
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
            <el-form-item label="姓名:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="passWord">
                <el-input v-model="ruleForm.passWord" placeholder="不填写的话,使用原密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="运维站点:" required>
                <el-col :span="21">
                    <el-form-item prop="date1" v-if="sitCheckName &&　sitCheckName.length >0">
                        <span v-if="sitCheckName.length <3">{{sitCheckName.join(',')}}</span>
                        <span v-else>
                            {{sitCheckName.slice(0,3).join(',')}}
                            <span
                                @click="over"
                                style="color:#5B8CFF;cursor:pointer"
                            >查看更多>>></span>
                        </span>
                    </el-form-item>

                    <el-form-item v-else>
                        <span>无</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item>
                        <el-button type="primary" @click="edi">编辑</el-button>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <el-dialog
            title="内层 Dialog"
            width="25%"
            class="inlog"
            :visible.sync="innerVisible"
            :close-on-click-modal="false"
            append-to-body
        >
            <div slot="title" class="tit">
                <div class="line"></div>
                <p>全部运维站点</p>
            </div>
            <el-form>
                <el-form-item>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox
                            v-for="item of siteList"
                            :key="item.value"
                            :label="item.value"
                            name="type"
                        >{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="foot">
                <el-button type="primary" @click="sureIn" size="mini">确定</el-button>
                <el-button @click="cancelIn" size="mini">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="内层 Dialog"
            width="25%"
            class="inlog"
            :visible.sync="innerOver"
            :close-on-click-modal="false"
            append-to-body
        >
            <div slot="title" class="tit">
                <div class="line"></div>
                <p>已选择的运维站点</p>
            </div>
            <el-form>
                <el-form-item v-model="form.sitCheckName">
                    <span
                        v-for="(item,index) of sitCheckName"
                        :key="index"
                        style="width: 33.3%;display: inline-block;"
                    >{{item}}</span>
                </el-form-item>
            </el-form>
        </el-dialog>
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
            id:'',
            addShow:false,
            innerVisible:false, //所有的站点
            innerOver:false,   //已选择的站点
            depList:[], //运维部门数组
            siteList:[], //站点数组
            sitCheckName:[],
            sitCheckMN:[],
            form:{  //内层表单
                type:[]
            },
            ruleForm: {
                ywValue:'', //运维部门
                name: "", //姓名
                phone: "", //电话
                email: "", //邮箱
                userName: "", //用户名
                passWord:''  //密码
            },
            
            rules: {
                ywValue:[
                     {
                        required: true,
                        message: "请选择运维部门",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    },
                    {
                        pattern: "^[\u4E00-\u9FA5]+$",
                        message: "姓名不能为特殊的字符串或数字",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入电话",
                        trigger: "blur"
                    },
                    {
                        pattern:
                            /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/ ||
                            /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                        message: "目前只支持中国大陆的手机号码",
                        trigger: "change"
                    }
                ],
                email: [
                    
                    {
                        required: true,
                        message: "请输入正确的邮箱格式",
                        trigger: "change"
                    },
                    {
                        pattern:
                           /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: "请输入正确的邮箱格式",
                        trigger: "change"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "change"
                    }
                ]
               
               
            }
        };
    },
    methods: {
        //打开已选择的站点dialog
        over(){
            this.innerOver = true
        },
        //获取运维部门
        getDep(){  //获取运维部门
            this.$api.oper.getOperall().then(depList=>{
               
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
        },
        //watch监听异步遍历的时候需要用到
        getDepPro(){
            return new Promise(resolve=>{
                this.$api.oper.getOperall().then(depList=>{
                
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
                        resolve(list)
                    }
                })
            })
        },
        //内层的确定dialog
        sureIn(){
            this.sitCheckName=[]
            console.log(this.form.type)
            let types = this.form.type
            let List = this.siteList
            if(types.length>0 && List.length>0){
                this.getSiteName(types,List).then(list=>{
                    this.sitCheckName = list
                    console.log(this.sitCheckName.slice(0,3).join(','),this.sitCheckName)
                })
            }
            this.innerVisible = false
        },
        getSiteName(types,List){
            return new Promise(resolve=>{
          
                let arrName = []
                for(let k=0; k<types.length; k++){
                    for(let j=0;j<List.length; j++){
                        if(types[k] == List[j].value){
                            arrName.push(List[j].label)
                        }
                    }
                }
                 resolve(arrName)
            })
        },
        //内层的取消dialog
        cancelIn(){
            this.innerVisible = false
        },
        //关闭外层dialog
        closeDialog() {
            this.sitCheckName=[]
            this.sitCheckMN=[]
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.$emit('changeEdiDialog',false)
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this = this
            this.$refs["ruleForm"].validate(valid => {

                if (valid) {
                    let id = _this.id
                    let params={
                        siteMns :_this.form.type.join(','), //站点数组
                        mtDeptId:_this.ruleForm.ywValue,  //运维id
                        realName: _this.ruleForm.name, //姓名
                        phone:_this.ruleForm.phone, //电话
                        email:_this.ruleForm.email,  //邮箱
                        username:_this.ruleForm.userName,  //用户名
                        password: _this.ruleForm.passWord  //密码
                    }
                    _this.$api.operp
                        .changeOperprow(id,params)
                        .then(res => {
                        
                            if (res.data.code == 0) {
                                _this.$message({
                                    message: "编辑运维人员成功",
                                    type: "success"
                                });
                                _this.$emit('ediSuccess',true)
                                _this.closeDialog();
                            }
                        })
                        .catch(error => {});
                  
                } else {
                    this.$message.error("表单校验失败，请重新填写后提交!");
                    return false;
                }
                 
            });
        },
        //取消编辑  --关闭dialog
        cancelEditor() {
            this.closeDialog();
        },
        //点击编辑弹出内层dialog 并获取到所有站点
        edi(){
            this.$api.site.getAlls().then(res=>{
              
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
                    this.siteList = []
               
                    this.siteList = list
                    this.innerVisible = true
                }
            })
        }
    },
    watch:{
        isShow(val){
            this.addShow = val
        },
        item(val){

            this.getDepPro().then(res=>{
                if(res &&　res.length>0){
                    for(let i=0; i<res.length; i++){
                        if(res[i].value == val.mtDeptId){
                            this.ruleForm.ywValue = res[i].value  //获取运维部门
                            break
                        }
                    }
                }
            })
            this.id = val.id
            this.ruleForm.name = val.realName  //设置姓名
            this.ruleForm.phone = val.phone  //设置电话
            this.ruleForm.email = val.email  //设置email
            this.ruleForm.userName = val.username   //设置用户名
            let siteList = val.siteNames
            if(siteList && siteList.length>0){
                for(let k=0; k<siteList.length; k++){
                    this.sitCheckName.push(siteList[k].siteName)
                    this.form.type.push(siteList[k].mn)
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog >>> .el-select {
    width: 100%;
}
.inlog >>> .el-dialog {
    height: 42%;

    left: 22%;
    top: 23%;
}
.inlog >>> .el-dialog__body {
    height: 55%;
    overflow-y: auto;
}
.inlog {
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
    .foot {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
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
.dialog >>> .el-dialog--center .el-dialog__body {
    padding: 25px 40px 5px;
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
    width: 30% !important;
}

.dialog >>> .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.inlog >>> .el-checkbox {
    width: 142px;
    margin-right: 0;
}
//表单校验的图标颜色
.dialog >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>