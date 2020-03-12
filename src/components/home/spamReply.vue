<template>
    <el-dialog :visible.sync="spamReply" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>留言回复</p>
        </div>
        <div class="contentSpan">
            <p class="left">
                留言者标题：
                <span>{{title}}</span>
            </p>
            <p class="left">
                留言者分类：
                <span>{{spamType}}</span>
            </p>
            <div class="left neir">
                留言者内容：
                <p>{{spamContent}}</p>
            </div>
            <p class="left">
                回复内容：
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="spamReplymsg"
                    style="margin-top: 13px;"
                ></el-input>
            </p>
        </div>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="spam">回复</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            title:'', //留言标题
            spamType:'', //留言分类
            spamContent:'', //留言内容
            spamReplymsg:'',  //回复内容
            id:''   //留言id
        };
    },
    computed: {
        ...mapState(["spamReply","spamItemlist"])
    },
    methods: {
       spam() {
            let spamReplay = this.spamReplymsg
            let id = this.id
            if(spamReplay){
                let params={
                   spamReplay:spamReplay,
                   messageId:id
                }
                let _this = this
                this.$api.spam.spamReplay(params).then(res=>{
                    debugger
                    if(res.data.code == 0){
                        _this.$message({
                            message: '留言回复成功',
                            type: 'success'
                        });
                       _this.clearForm()
                    }
                }).catch(error=>{

                })
            }else{
                this.$message({
                    type: "warning",
                    message: "请填写完毕后再回复"
                });
            }
        },
        //清除表单内容
        clearForm(){
            this.title = ''
            this.spamType = ''
            this.spamContent = ''
            this.spamReplymsg = '',
            this.id = ''
            this.$store.commit("spamReply", false); //关闭dialog
        },
        //取消
        cancel() {
            this.clearForm()
        },
        //点击x号关闭
        closeDialog() {
            this.clearForm()
        },
    },
    watch: {
        spamItemlist(val){
            let arr = Object.keys(val);
           
            if(arr && arr.length>0){
                this.title = val.title  //留言标题
                this.spamType= val.messageType  //留言类型
                this.spamContent = val.content   //留言内容
                this.id = val.id //留言id
            }
        }
    },
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
    .contentSpan {
        font-weight: bold;
        .left {
            margin-top: 18px;
        }
        .neir {
            display: flex;
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
    width: 32%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
</style>