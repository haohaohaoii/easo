<template>
    <div class="menuList">
        <menu-editor></menu-editor>
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
                <el-table-column align="center" prop="menuName" label="菜单名称"></el-table-column>
                <el-table-column align="center" prop="menuAddress" label="访问地址"></el-table-column>
                <el-table-column align="center" prop="menuLevel" label="菜单级别"></el-table-column>
                <el-table-column align="center" prop="menuTime" label="时间"></el-table-column>
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
import menuEditor from './menEditor'
export default {
    components:{
        menuEditor
    },
    props:{
        munuList:{
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
        tableData(){
             if(this.munuList && this.munuList.length>0){
                let menuArr = [];
                for(let i=0; i<this.munuList.length; i++){
                    let menuWitch = ''
                    console.log(this.munuList[i].menuType)
                    if(this.munuList[i].menuType == 0){
                        menuWitch= '一级菜单'
                    }else if(this.munuList[i].menuType == 1){
                            menuWitch= '二级菜单'
                    }else if(this.munuList[i].menuType == 2){
                        menuWitch= '三级菜单'
                    }
                    let obj={
                        menuName:this.munuList[i].menuName,  //菜单名称
                        menuAddress:this.munuList[i].url,  //菜单地址
                        menuLevel:menuWitch,  //菜单级别
                        menuTime:this.munuList[i].createTime, //更新时间
                        id:this.munuList[i].id //菜单id
                    }

                    menuArr.push(obj)
                }
                return menuArr
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
            console.log(index, row);
            this.$store.commit("menuEditor", true);
        }
    }
};
</script>

<style lang="scss" scoped>
.menuList {
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