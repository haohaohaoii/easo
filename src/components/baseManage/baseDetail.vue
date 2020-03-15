<template>
    <el-dialog :visible.sync="baseDetail" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="date" width="180" align="right"></el-table-column>
            <el-table-column prop="name" align="left"></el-table-column>
        </el-table>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="save">确定</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState,mapMutations} from "vuex";
export default {
    data() {
        return {
            tableData: []
        };
    },
    computed: {
        ...mapState(["baseDetail","siteRowlist"])
    },
    methods:{
        clearForm(){
            this.$store.commit('getSiterowList', '')
            this.tableData = []
            this.$store.commit("baseDetail", false); //关闭dialog
          
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
        //点击保存
        save(){
            this.clearForm()
        }
    },
    watch:{
        siteRowlist(val){
         
            if(val.siteName){
                let obj = {
                    date:'基站名称:',
                    name:val.siteName
                }
                this.tableData.push(obj)
            }
            if(val.ioType){
                let obj = {
                    date:'进出口:',
                    name:val.ioType
                }
                this.tableData.push(obj)
            }
            if(val.mn){
                let obj = {
                    date:'MN:',
                    name:val.mn
                }
                  this.tableData.push(obj)
            }
            if (val.yinZ){
                let obj = {
                    date:'因子:',
                    name:val.yinZ
                }
                this.tableData.push(obj)
            }
            if(val.stateMsg){
                let obj = {
                    date:'站点状态:',
                    name:val.stateMsg
                }
                this.tableData.push(obj)
            }
            if(val.updateTime){
                let obj = {
                    date:'更新时间:',
                    name:val.updateTime
                }
                this.tableData.push(obj)
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