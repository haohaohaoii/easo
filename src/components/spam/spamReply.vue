<template>
    <el-dialog
        :visible.sync="spamReplys"
        class="spamReplys"
        center
        @close="closeDialog"
        :close-on-click-modal="false"
    >
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
            <p class="left">
                留言内容：
                {{spamContent}}
                <span></span>
            </p>
            <div v-if="hisReplymsg &&hisReplymsg.length>0">
                <el-divider></el-divider>
                <div style="height: 260px;overflow: auto;">
                    <div class="left neir" v-for="item of hisReplymsg " :key="item.id">
                        <div v-if="item.type ==1" class="f">
                            企业回复：
                            <p class="hfc">{{item.content}}</p>
                            <p class="rep">--{{item.createTime}}</p>
                        </div>
                        <div v-else-if="item.type ==0" class="f">
                            我的回复：
                            <p class="hfc">{{item.content}}</p>
                            <p class="rep">--{{item.createTime}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="left">
                <el-input type="textarea" placeholder="请输入回复内容" :rows="4" v-model="spamReplymsg"></el-input>
            </p>
        </div>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="spam">回复</el-button>
            <!-- <el-button size="mini" @click="cancel">取消</el-button> -->
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
            hisReplymsg:[],  //留言历史回复
            spamReplymsg:'',  //回复内容
            id:''   //留言id
        };
    },
    computed: {
        ...mapState(["spamItemlist"]),
        spamReplys:{
            get(){    
                return this.$store.state.spamReplys
            },
            set(){}
        }
    },
    methods: {
       spam() {
            let spamReplay = this.spamReplymsg
            let id = this.id
            if(spamReplay){
                let params={
                   replyContent:spamReplay,
                   messageId:id
                }
         
                let _this = this
                this.$api.spam.spamReplay(params).then(res=>{
                 
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
            this.$store.commit("spamReplys", false); //关闭dialog
            this.$emit('closeD')
        },
        //取消
        // cancel() {
        //     this.clearForm()
        // },
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
                let replies = val.replies;
                if(replies && replies.length>0){
                    this.hisReplymsg = replies
                }
            
        }
    },
};
</script>

<style lang="scss" scoped>
.spamReplys {
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
        .f {
            position: relative;
            width: 100%;
            .rep {
                position: absolute;
                right: 0;
                font-size: 12px;
                color: #ccc;
            }
            .hfc {
                width: 70%;
                margin-left: 8%;
            }
        }
    }
}
// .dialog >>> .el-dialog {
//     margin-top: 0 !important;
//     position: relative;
//     margin: 0 auto;
//     width: 32%;
//     top: 50%;
//     left: 10%;
//     transition: transform;
//     transform: translateY(-50%);
//     border: 1px solid #ebeef5;
// }
// .spamReplys >>> .el-dialog {
//     display: flex;
//     flex-direction: column;
//     margin: 0 !important;
//     position: absolute;
//     top: 50%;
//     left: calc(50% + 120px);
//     transform: translate(-50%, -50%);

//     width: 34%;
// }

// .spamReplys >>> .el-dialog .el-dialog__body {
//     flex: 1;
//     overflow: auto;
// }
</style>