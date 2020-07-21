<template>
    <div class="divList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                class="tab"
                :height="tableHeight"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="deptName" label="部门名称"></el-table-column>
                <el-table-column align="center" prop="contactPhone" label="联系电话"></el-table-column>
                <el-table-column align="center" prop="contactName" label="部门联系人"></el-table-column>
                <el-table-column align="center" prop="turnTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="roleEditor(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="roleDelete(scope.$index, scope.row)"
                            v-has="'删除'"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    props:{
        divManas:{
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
             tableHeight:window.innerHeight -230
        };
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
        tableData(){
            if(this.divManas && this.divManas.length>0){
                let arr = [];
                for(let i=0; i<this.divManas.length; i++){
                    // if(this.userarr[i].)
                    let obj={
                        deptName:this.divManas[i].deptName,  //部门名称
                        contactName:this.divManas[i].contactName,  //部门联系人
                        contactPhone:this.divManas[i].contactPhone,  //部门联系电话
                        turnTime:this.divManas[i].createTime, //更新时间
                        id:this.divManas[i].id //部门id
                    }
                    arr.push(obj)
                }
                return arr
            }
        }
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            let id = row.id
            this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                    this.delete(id).then(res=>{
                        if(res =='success'){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.$emit('delSuccess',true)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        delete(deptId){
            return new Promise((resolve,reject)=>{
                this.$api.depart.deletDept(deptId).then(res=>{
                    if(res.data.code == 0){
                        resolve('success')
                    }
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        //点击编辑
        roleEditor(index, row) {
            console.log(index, row);
            let id = row.id
            this.$store.dispatch('divEdit',id)
        }
    }
};
</script>

<style lang="scss" scoped>
.divList {
    height: calc(100% - 40px);
    .tabE {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 15px;
    }
}
.divList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>