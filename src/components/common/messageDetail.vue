<template>
    <el-dialog :visible.sync="messageD" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>消息详情</p>
        </div>
        <div class="contentSpan">
            <p class="left">
                <span class="tits">消息类型：</span>

                <span>{{title}}</span>
            </p>
            <div class="left neir">
                <span class="tits">消息内容：</span>
                <span>{{messageContent}}</span>
            </div>
        </div>
        <!-- <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="sure">确定</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>-->
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            title:'', //消息类型
            messageContent:'' //消息内容
        };
    },
    computed: {
        ...mapState(["msgRowDetail"]),
        messageD:{
            get(){
                return this.$store.state.messageD
            },
            set(){
                
            }
        }
    },
    methods: {
    //    sure() {
           
    //     },
        //清除表单内容
        clearForm(){
            this.title = ''
            this.messageContent = ''
            this.$store.commit("messageDe", false); //关闭dialog
        },
        // //取消
        // cancel() {
        //     this.clearForm()
        // },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
    },
    watch:{
        msgRowDetail(val){
        
            if(val.type == 0){
                this.title = "预警"
            }else if(val.type == 1){
                this.title = "超标"
            }else if(val.type == 2){
                this.title = "异常"
            }
            this.messageContent = val.content
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
            font-weight: bold;
        }
    }
    .contentSpan {
        .tits {
            font-weight: bold;
        }

        .neir {
            margin-top: 2%;
            .li {
                width: 21%;
            }
        }
    }
}
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;
    width: 26%;
    height: 22%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
.dialog >>> .el-dialog--center .el-dialog__body {
    padding: 10px 25px 35px !important;
}
</style>