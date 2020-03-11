<template>
    <div class="messageList">
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="messageData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column align="center" prop="erpName" label="企业名称" width="260"></el-table-column>
                <el-table-column align="center" prop="messageTit" label="消息标题"></el-table-column>
                <el-table-column align="center" prop="messageCon" label="消息内容"></el-table-column>
                <el-table-column align="center" prop="messageTime" label="消息时间"></el-table-column>
                <el-table-column label="操作" align="center" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                        >查看详情</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <message-detail></message-detail>
        <slot></slot>
    </div>
</template>

<script>
import messageDetail from './messageDetail'
import { mapMutations } from "vuex";
export default {
    props: {
        companyList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    components:{
        messageDetail
    },
    data() {
        return {
            tableHeight: window.innerHeight * 0.6,
            messageData:[
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'},
                {erpName:'郑州思念食品厂',messageTit:'测试',messageCon:'发汤圆了',messageTime:'2020/00:00'}
            ]
        };
    },
    computed: {
        tableData() {
            if (this.companyList && this.companyList.length > 0) {
                let companyArr = [];
                for (let i = 0; i < this.companyList.length; i++) {
                    let obj = {
                        erpName: this.companyList[i].erpName, //企业名称
                        erpLinkMan: this.companyList[i].erpLinkMan, //联系人
                        erpLinkTel: this.companyList[i].erpLinkTel, //联系电话
                        erpAddr: this.companyList[i].erpAddr, //企业地址
                        userSection: this.companyList[i].auditState, //审核状态
                        turnTime: this.companyList[i].createTime, //更新时间
                        id: this.companyList[i].id //企业id
                    };
                    companyArr.push(obj);
                }
                return companyArr;
            }
        }
    },
    methods: {
        //详情--跳转详情dialog
        handleEdit(index, row) {
            this.$store.commit("messageDe", true);
        },
        //点击编辑--跳转编辑dialog
        handleDelete(index, row) {
            console.log(index, row);
            let erpId = row.id;
            this.$store.dispatch("getEnteritem", erpId);
        }
    }
};
</script>

<style lang="scss" scoped>
.messageList {
    .tabE {
        margin-top: 1%;
    }
    .tabPage {
        text-align: center;
        padding-top: 20px;
    }
}
</style>