<template>
    <el-dialog :visible.sync="userAdddialog" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>添加菜单</p>
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="菜单名称:" prop="menuName">
                <el-input v-model="ruleForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="访问地址:" prop="menuAddress">
                <el-input v-model="ruleForm.menuAddress"></el-input>
            </el-form-item>
            <el-form-item label="菜单级别" prop="menuLevelO" v-if="oneOpations && oneOpations.length>0">
                <el-select v-model="ruleForm.menuLevelO" placeholder="请选择父级菜单">
                    <el-option
                        v-for="item in oneOpations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单级别" prop="menuLevelT" v-if="twoOpations && twoOpations.length>0">
                <el-select v-model="ruleForm.menuLevelT" placeholder="请选择父级菜单">
                    <el-option
                        v-for="item in twoOpations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单级别" prop="menuLevel">
                <el-select v-model="ruleForm.menuLevel" placeholder="请选择菜单级别">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            oneOpations:[],   //一级菜单
            twoOpations:[],   //二级菜单
            options:[
                {label:'一级菜单',value:0},
                {label:'二级菜单',value:1},
                {label:'三级菜单',value:2}
            ],
            ruleForm: {
                menuName: "", //菜单名称
                menuAddress: "", //访问代码
                menuLevel:"", //菜单级别(默认)
                menuLevelO:'', //一级菜单
                menuLevelT:''
            },
            rules: {
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }
                ],
                menuAddress: [
                    {
                        required: true,
                        message: "请输入访问代码地址",
                        trigger: "blur"
                    }
                ],
                menuLevel: [
                    {
                        required: true,
                        message: "请选择菜单级别",
                        trigger: "change"
                    }
                ],
                menuLevelO: [
                    {
                        required: true,
                        message: "请选择菜单级别",
                        trigger: "change"
                    }
                ],
                menuLevelT: [
                    {
                        required: true,
                        message: "请选择菜单级别",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$store.commit("changeUserAdd", false); //关闭dialog
            this.$refs.ruleForm.resetFields(); //重置from和rules
        },
        save() {
    
            if(this.ruleForm.menuName && this.ruleForm.menuAddress){
     
                let typeM = this.ruleForm.menuLevel
                let type
                if(typeM ==0){
                    type = ''
                }else if(typeM == 1){
                    type = this.ruleForm.menuLevelO
                }else if(typeM == 2){
                    type = this.ruleForm.menuLevelT
                }
                let params = {
                    menuName:this.ruleForm.menuName,
                    url:this.ruleForm.menuAddress,
                    menuType:typeM,
                    parentId:type
                }
                let _this = this
                this.$api.menu.menuAdd(params).then(res=>{
          
                    if(res.data.code ==0){
                         _this.$message({
                            message: '菜单添加成功',
                            type: 'success'
                        });
                        _this.closeDialog()
                    }
                })
            }else{
                this.$message({
                    type: "warning",
                    message: "请填写完毕后再添加"
                });
            }
           
        },
        cancel() {
            this.closeDialog()
        },
        getFmenuO(type){
            this.$api.menu.getFathermenu(type).then(res=>{
  
                if(res.data.code == 0){
                    let arr =res.data.data
                    for(let i=0; i<arr.length;i++){
                        let obj = {
                            label:arr[i].menuName,
                            value:arr[i].id
                        }
                        this.oneOpations.push(obj)
                        
                    }
                }
            })
        },
        getFmenuT(type){
            this.$api.menu.getFathermenu(type).then(res=>{

                if(res.data.code == 0){
                    let arr =res.data.data
                    for(let i=0; i<arr.length;i++){
                        let obj = {
                            label:arr[i].menuName,
                            value:arr[i].id
                        }
                        this.twoOpations.push(obj)
                        
                    }
                }
            })
        }
    },
    computed: {
        ...mapState(["userAdddialog"]),
        menuLevel(){
            return this.ruleForm.menuLevel
        }
    },
    watch:{
        menuLevel(val) {
    　　　　console.log(val)
            if(val == 1){    //二级菜单 需要找父级菜单一级菜单
             this.twoOpations=[]
                let type = 1-1
                this.getFmenuO(type)
            }else if(val == 0){
                this. oneOpations=[]
                this.twoOpations=[]
            }else if(val ==2){  //三级菜单 需要找父级菜单 二级菜单
               this. oneOpations=[]
                let type = 2-1
                this.getFmenuT(type)
            }
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
}
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    width: 28%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
.dialog >>> .el-select {
    width: 100%;
}
</style>