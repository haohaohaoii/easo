<template>
    <el-dialog :visible.sync="menuE" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑菜单</p>
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
                <el-input readonly v-model="ruleForm.menuAddress"></el-input>
            </el-form-item>
            <el-form-item label="菜单级别" prop="menuLevel">
                <el-select v-model="ruleForm.menuLevel" placeholder="请选择菜单级别" disabled>
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
            id:'',
            readonly: true,
            options:[
                {label:'一级菜单',value:0},
                {label:'二级菜单',value:1},
                {label:'三级菜单',value:2}
            ],
            ruleForm: {
                menuName: "", //菜单名称
                menuAddress: "", //访问代码
                menuLevel:"", //菜单级别
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
                ]
            }
        };
    },
    computed: {
        ...mapState(["menuItemD"]),
        menuE:{
            get(){
                return this.$store.state.menuE
            },
            set(){}
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit("menuEditor", false); //关闭dialog
            this.$refs.ruleForm.resetFields(); //重置from和rules
        },
        save() {
            if(this.ruleForm.menuName){
                let menuId = this.id
                let params = {
                    menuName:this.ruleForm.menuName,
                    url:this.ruleForm.menuAddress,
                    menuType:this.ruleForm.menuLevel
                }
                let _this = this
                this.$api.menu
                .menuChange(menuId, params)
                .then(res => {
                    if (res.data.code == 0) {
                        console.log(res);
                        _this.$message({
                            message: "菜单修改成功",
                            type: "success"
                        });
                        _this.$emit('ediSuccess',true)
                        _this.closeDialog();
                    }
                });
            }else{
                this.$message({
                    type: "warning",
                    message: "请填写完毕后再添加"
                });
            }
            
        },
        cancel() {
            this.closeDialog()
        }
    },
    watch:{
        menuItemD(val){
            this.id = val.id
            this.ruleForm.menuName =val.menuName
            this.ruleForm.menuAddress = val.url
            for(let i=0; i<this.options.length; i++){
                if(this.options[i].value == val.menuType){
                    this.ruleForm.menuLevel = this.options[i].value
                }
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