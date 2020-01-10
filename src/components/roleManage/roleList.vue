<template>
    <div class="roleList">
        <div class="tabE">
            <el-table
                :data="roleData"
                stripe
                style="width: 100%"
                :header-cell-style="{ background: 'rgba(237,237,237,1)' }"
                class="tab"
            >
                <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
                <el-table-column align="center" prop="roleDate" label="时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="roleEditor(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="roleDelete(scope.$index, scope.row)"
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
export default {
    props:{
        rolelist:{
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
           
        };
    },
    computed:{
        roleData(){
            if(this.rolelist && this.rolelist.length>0){
                let roleArr = [];
                for(let i=0; i<this.rolelist.length; i++){
                    let obj={
                        roleName:this.rolelist[i].roleShow,  //角色名称
                        roleDate:this.rolelist[i].createTime,
                        id:this.rolelist[i].id
                    }
                    roleArr.push(obj)
                }
                return roleArr
            }
        }
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            this.$confirm("此操作将永久删除该条角色, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //点击编辑
        roleEditor(index, row) {
            debugger
            console.log(index, row);
            let roleId = row.id;  //获取角色id
            this.$api.roles.getRolemsg(roleId).then(res=>{
                debugger
                console.log(res)
            }).catch(error=>{

            })
        }
    }
};
</script>

<style lang="scss" scoped>
.roleList {
    height: 62.5%;

    .tabE {
        height: 99.5%;
        margin-top: 1%;
        border: 1px solid rgba(235, 235, 235, 1);
        .tab {
            height: 100%;
            overflow-y: auto;
        }
    }
}
</style>