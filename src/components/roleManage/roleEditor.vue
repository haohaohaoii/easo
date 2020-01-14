<template>
    <el-dialog :visible.sync="roleEditor" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>编辑角色</p>
        </div>
        <div>
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="角色名称：">
                    <el-col :span="10">
                        <el-input v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="tree">
                <p class="left">分配权限:</p>
                <el-tree
                    :data="treeList"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    highlight-current
                    class="right"
                    :default-checked-keys="checkedArr"
                    @getHalfCheckedKeys="test"
                    :default-expanded-keys="firstTree"
                ></el-tree>
            </div>
        </div>
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
            form: {
                roleName: "",//角色名称
               
            },
            firstTree:[], //默认展开第一层
            checkedArr:[]   //默认选中的id数组集合
        };
    },
    computed:{
        ...mapState(["roleEditor","roleTree","roleItem","roleName","roleId"]),
        //得到tree树形结构数据
        treeList(){
            if(this.roleTree.length>0){
                let menuArr = []
                for(let i=0; i<this.roleTree.length;i++){
                    let faObj={}
                    faObj.id= this.roleTree[i].id,
                    this.firstTree.push(this.roleTree[i].id)  //默认展开第一层
                    faObj.label = this.roleTree[i].menuName  
                    if(this.roleTree[i].subMenus && this.roleTree[i].subMenus.length>0){
                        faObj.children=[]
                        for(let k=0; k<this.roleTree[i].subMenus.length; k++){
                            let childObj ={
                                id:this.roleTree[i].subMenus[k].id,
                                label:this.roleTree[i].subMenus[k].menuName
                            }
                            faObj.children.push(childObj)
                            if(this.roleTree[i].subMenus[k].subMenus && this.roleTree[i].subMenus[k].subMenus.length>0){
                                childObj.children =[]
                                for(let j=0; j< this.roleTree[i].subMenus[k].subMenus.length; j++){
                                    let btnObj = {
                                        id:this.roleTree[i].subMenus[k].subMenus[j].id,
                                        label:this.roleTree[i].subMenus[k].subMenus[j].menuName
                                    }
                                   childObj.children.push(btnObj)
                                }
                            }
                        }
                    }
                    menuArr.push(faObj)
                }
                if(this.roleItem &&　this.roleItem.length>0){
                    let arrId = []
                    for(let i =0; i<this.roleItem.length; i++){  //第一层
                        if(this.roleItem[i].subMenus && this.roleItem[i].subMenus.length>0){ //第二层有数据取第二层的id
                            for(let k=0; k<this.roleItem[i].subMenus.length; k++){
                                if(this.roleItem[i].subMenus[k].subMenus && this.roleItem[i].subMenus[k].subMenus.length>0){ //第三层有数据取第三层的id
                                    for(let j=0; j<this.roleItem[i].subMenus[k].subMenus.length;j++){
                                        arrId.push(this.roleItem[i].subMenus[k].subMenus[j].id)
                                    }
                                }else{ //取第二层的id
                                    arrId.push(this.roleItem[i].subMenus[k].id)
                                }
                            }
                        }
                        // else{ //取第一层的id(不取第一层)
                        //     arrId.push(this.roleItem[i].id)
                        // }
                    }
                    this.checkedArr = arrId
                }
                if(this.roleName!=''){
                    this.form.roleName = this.roleName
                }
                return menuArr
            }
        }
    },
    methods: {
        //点击右上角x号
        closeDialog() {
            let obj = {
                isTrue:false,
                type:'close'
            }
            this.$store.commit("roleEdit", obj); //关闭dialog
        },
        test(){

        },
        //点击保存
        save() {
            debugger
           console.log(this.$refs.tree.getCheckedKeys());  
           let checkedArr = this.$refs.tree.getCheckedKeys();
           let name = this.form.roleName
           if(name && checkedArr){
               let params={roleShow:name,menus:checkedArr}
               let roleId=this.roleId
               this.$api.roles.editorRole(params,roleId).then(res=>{
                   debugger
                    if(res.data.code ==0){
                        console.log(res)
                        this.$message({
                                message: '修改角色成功',
                                type: 'success'
                            });
                        this.$refs.tree.setCheckedKeys([]);
                        let obj = {
                            isTrue:false,
                            type:'close'
                        }
                        this.$store.commit("roleEdit", obj); //关闭dialog
                    }
                })
           }else{
               this.$message.error("注意：请添加或选取后菜单再保存！");
           }
           
        },
        //点击取消
        cancel() {
            this.$refs.tree.setCheckedKeys([]);
            let obj = {
                isTrue:false,
                type:'close'
            }
            this.$store.commit("roleEdit", obj); //关闭dialog
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
    .tree {
        display: flex;
        .left {
            margin-left: 1.5%;
        }
        .right {
            margin-left: 2.5%;
            background: #ebf1fd;
            width: 75%;
            height: 312px;
            overflow: auto;
        }
    }
}
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: absolute;
    left: 38%;
    width: 40% !important;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}

//输入框的背景颜色
.dialog >>> .el-input__inner {
    background: #ebf1fd;
}
</style>