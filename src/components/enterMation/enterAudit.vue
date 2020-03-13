<template>
    <el-dialog :visible.sync="enterAud" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>企业信息审核</p>
        </div>
        <el-form ref="audit" :model="form" label-width="100px">
            <el-form-item label="基站状态更改:" prop="siteStatus">
                <el-select v-model="form.siteStatus" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核说明:" props="textarea">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="audit">审核</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState,mapMutations} from "vuex";
export default {
    data() {
        return {
            form:{
                siteStatus:'',
                textarea:''
            },
            options:[
                {label:'审核通过',value:1},
                {label:'审核未通过',value:2}
            ]
        };
    },
    computed: {
        ...mapState(["enterAud","enterId"])
    },
    methods:{
        clearForm(){
            this.tableData = []
            this.$store.commit("changeEnteraudit", false); //关闭dialog
           
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
        //点击审核
        audit(){
            if(this.form.siteStatus &&　localStorage.adminId && this.enterId){
                this.$confirm("此操作将更改企业信息状态, 确定提交审核?", "注意", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                     this.changeAudit().then(res=>{
                         if(res == 'success'){
                            this.$message({
                                type: "success",
                                message: "企业信息状态修改成功"
                            });
                            this.clearForm()
                         }
                     })
                    
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消修改"
                    });
                });
            }else{
                this.$message({
                    type: "warning",
                    message: "请将必填项填写完毕后再提交审核"
                });
            }
            
        },
        changeAudit(){
            return new Promise((resolve,reject)=>{
                let erpId = this.enterId;
                let auditState = this.form.siteStatus;
                let auditNode = this.form.textarea
                let params = {
                    erpId:erpId,
                    auditState:auditState,
                    auditNode:auditNode
                }
                this.$api.company
                .companyEditor(erpId,params)
                .then(res => {
                    debugger
                   if(res.data.code == 0){
                        resolve('success')
                    }
                })
                .catch(error => {
                    reject(error)
                });
            })
        },
    },
    watch:{
        
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
    width: 35%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
.dialog >>> .el-table td.is-right {
    background: #ebf2fb;
}
.dialog >>> .el-table th.is-right {
    background: #ebf2fb;
}
</style>