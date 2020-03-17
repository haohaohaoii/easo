<template>
    <div class="spamList">
        <spam-reply></spam-reply>
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
                <el-table-column align="center" prop="spamTitle" label="留言标题"></el-table-column>
                <el-table-column align="center" prop="firmName" label="企业名称"></el-table-column>
                <el-table-column align="center" prop="spamDate" label="留言时间"></el-table-column>
                <el-table-column align="center" prop="spamStatus" label="留言状态"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleReply(scope.$index, scope.row)"
                            v-has="'详情'"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-has="'删除'"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import spamReply from './spamReply'
export default {
    components:{
        spamReply
    },
    props:{
        spamAll:{
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {};
    },
    computed:{
        tableData(){
            if(this.spamAll && this.spamAll.length>0){
                let spamList = [];
                for(let i=0; i<this.spamAll.length; i++){
                    let stateMsg = ''
                    if(this.spamAll[i].state == 0){
                        stateMsg = '未读'
                    }else if(this.spamAll[i].state == 1){
                        stateMsg = '已读'
                    }else if(this.spamAll[i].state == 2){
                        stateMsg = '已回复'
                    }
                    let obj={
                        spamTitle:this.spamAll[i].title,  //留言标题
                        firmName:this.spamAll[i].erpName,  //企业名称
                        spamDate:this.spamAll[i].createTime, //留言时间
                        spamStatus:stateMsg,
                        id:this.spamAll[i].id //用户id
                    }
                    spamList.push(obj)
                }
                return spamList
            }
        }
    },
    methods: {
        //点击删除
        handleDelete(index, row) {
            let id = row.id
            this.$confirm("此操作将永久删除该条留言, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.delete(id).then(res=>{
                        if(res =='success'){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.$emit('delSuccess',true)
                        }
                    }).catch(error=>{
                        this.$message.error('删除失败');
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        delete(messageId){
            return new Promise((resolve,reject)=>{
                this.$api.spam.spamDelete(messageId).then(res=>{
                    if(res.data.code == 0){
                        resolve('success')
                    }
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        //点击回复
        handleReply(index, row) {
            console.log(index, row);
            let id = row.id
            this.$store.dispatch('spamDetail',id)
        }
    }
};
</script>

<style lang="scss" scoped>
.spamList {
    .tabE {
        margin-top: 1%;
        .tab {
            height: 100%;
            overflow-y: auto;
        }
    }
    .tabPage {
        text-align: center;
        padding-top: 20px;
    }
}
</style>