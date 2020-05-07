<template>
    <div class="messageList">
        <div class="tabE">
            <el-table
                :height="tableHeight"
                :data="messList"
                stripe
                style="width: 100%"
                class="tab"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="erpName" label="企业名称" width="260"></el-table-column>
                <el-table-column align="center" prop="messageType" label="消息类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.messageType==2">预警</span>
                        <span v-else-if="scope.row.messageType==0">超标</span>
                        <span v-else-if="scope.row.messageType==1">异常</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="messageCon" label="消息内容">
                    <template slot-scope="scope">
                        <el-popover placement="top-start" title width="200" trigger="hover">
                            <p>{{scope.row.messageCon}}</p>
                            <p slot="reference">{{scope.row.at}}</p>
                        </el-popover>
                    </template>
                </el-table-column>
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
            <slot></slot>
        </div>
        <message-detail></message-detail>
    </div>
</template>

<script>
import messageDetail from './messageDetail'
import { mapMutations } from "vuex";
export default {
    props: {
        messageArr: {
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
           tableHeight:window.innerHeight -268,
            messageData:[

            ]
        };
    },
    computed: {
        iRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
        messList(){
            if(this.messageArr && this.messageArr.length>0){
                let messA=[]
                for(let i=0; i<this.messageArr.length; i++){
                    let newStr = this.messageArr[i].content.slice(0,10) +'...'

                    let obj = {
                        erpName:this.messageArr[i].companyName,   //企业名称
                        messageType:this.messageArr[i].type,  //企业类型
                        messageCon:this.messageArr[i].content,
                        messageTime:this.messageArr[i].createTime,
                        at:newStr,
                        id:this.messageArr[i].id
                    }
                    messA.push(obj)
                }
                return messA
            }
        },
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
            let id = row.id
            this.$store.dispatch('getMsgdetail',id)
            // this.$store.commit("messageDe", true);
        },
        //点击编辑--跳转编辑dialog
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该条消息, 是否继续?", "注意", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    console.log(index, row);
                    let id = row.id;
                    this.$api.msg.delMsgitem(id).then(res=>{
                        if(res.data.code == 0){
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
            
        }
    }
};
</script>

<style lang="scss" scoped>
.messageList {
    .tabE {
        padding-top: 15px;
    }
}
.messageList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>