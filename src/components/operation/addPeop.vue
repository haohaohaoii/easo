<template>
    <div class="addPeop">
        <div class="dialog">
            <div slot="title" class="tit">
                <div class="line"></div>
                <p>添加运维人员</p>
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
                    <el-input v-model="ruleForm.passWord" show-password></el-input>
                </el-form-item>
                <el-form-item label="运维站点:" required>
                    <el-col :span="21">
                        <el-form-item prop="date1" v-if="sitCheckName &&　sitCheckName.length >0">
                            <span v-if="sitCheckName.length <3">{{sitCheckName.join(',')}}</span>
                            <span v-else>
                                {{sitCheckName.slice(0,3).join(',')}}...
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
                class="inlogs"
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
                class="inlogs"
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
                            style="display: inline-block;margin-left:20px"
                        >{{item}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
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
            addShow:false,
            innerVisible:false,
            innerOver:false,   //已选择的站点
            depList:[], //运维部门数组
            siteList:[], //站点数组
            sitCheckName:[],
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
                ],
                passWord:[
                     {
                        required: true,
                        message: "请输入密码",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
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
        //内层的确定dialog
        sureIn(){
    
            console.log(this.form.type)
            let types = this.form.type
            let List = this.siteList
            if(types.length>0 && List.length>0){
                this.getSiteName(types,List).then(list=>{
                    this.sitCheckName = list
                  
                    console.log(this.sitCheckName.slice(0,3).join(','),this.sitCheckName)
                })
            }
            this.siteList = []
            this.sitCheckName=[]
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
            this.$refs.ruleForm.resetFields();  //重置from和rules
            this.form.type = []
             this.siteList = []
            this.sitCheckName=[]
        },
        //确定编辑  --关闭dialog
        sureEditor() {
            let _this = this
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
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
                        .addOperp(params)
                        .then(res => {
                   
                            if (res.data.code == 0) {
                                _this.$message({
                                    message: "运维人员添加成功",
                                    type: "success"
                                });
                           
                                _this.closeDialog();
                            }
                        })
                        .catch(error => {});
                  
                } else {
                    this.$message.error("表单校验失败，请重新填写后提交!");
                    return false;
                }
                 
            });
            // this.closeDialog();
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
                   
                    this.siteList = list
                    this.innerVisible = true
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.addPeop >>> .el-select {
    width: 100%;
}
// .inlogs >>> .el-dialog {
//     height: 42%;

//     left: 22%;
//     top: 20%;
// }
.inlogs >>> .el-dialog__body {
    height: 55%;
    overflow-y: auto;
}
.inlogs >>> .el-form-item {
    margin-bottom: 0;
}
// .inlogs >>> .el-checkbox {
//     width: 142px;
//     margin-right: 0;
// }
.inlogs {
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
.addPeop {
    height: 100%;
    position: relative;
    .dialog {
        // width: 50%;
        // height: 65%;
        // background: white;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // box-sizing: border-box;
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
            // height: 68%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-top: 35px;
            padding-left: 64px;
            padding-right: 76px;
        }
        // .foot {
        //     margin-top: 30px;
        //     display: flex;
        //     justify-content: center;
        // }
    }
}

//表单校验的图标颜色
.addPeop >>> .el-input__suffix {
    color: #67c23a !important;
}
</style>