<template>
    <div class="enterList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
                <el-table-column align="center" prop="erpName" label="企业名称" width="280"></el-table-column>
                <el-table-column align="center" prop="erpLinkMan" label="联系人"></el-table-column>
                <el-table-column align="center" prop="erpLinkTel" label="联系电话"></el-table-column>
                <el-table-column align="center" prop="erpAddr" label="企业地址" width="280"></el-table-column>
                <el-table-column align="center" prop="userSection" label="审核状态" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userSection==0">审核中</span>
                        <span v-else-if="scope.row.userSection==1">审核通过</span>
                        <span v-else-if="scope.row.userSection==2">审核未通过</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="turnTime" label="注册时间"></el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="base(scope.$index, scope.row)">基站</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDetail(scope.$index, scope.row)"
                        >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <edi-dialog></edi-dialog>
        <slot></slot>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import ediDialog from './ediDialog'
export default {
    components:{
        ediDialog
    },
    props:{
        companyList:{
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
            if(this.companyList && this.companyList.length>0){
                let companyArr = [];
                for(let i=0; i<this.companyList.length; i++){
                    let obj={
                        erpName:this.companyList[i].erpName,  //企业名称
                        erpLinkMan:this.companyList[i].erpLinkMan,  //联系人
                        erpLinkTel:this.companyList[i].erpLinkTel,  //联系电话
                        erpAddr:this.companyList[i].erpAddr,  //企业地址
                        userSection:this.companyList[i].auditState, //审核状态
                        turnTime:this.companyList[i].createTime, //更新时间
                        id:this.companyList[i].id//企业id
                    }
                    companyArr.push(obj)
                }
                return companyArr
            }
        }
    },
    methods: {
        //详情--跳转详情dialog
        handleDetail(index, row) {
 
            this.$store.commit("getDialogstatus", true);
        },
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
            console.log(index, row);
            let erpId = row.id
            this.$store.dispatch('getEnteritem',erpId)
        },
        //跳转基站
        base() {
            this.$router.push('/baseManage')
        }
    }
};
</script>

<style lang="scss" scoped>
.enterList {
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