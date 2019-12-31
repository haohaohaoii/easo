<template>
    <el-dialog :visible.sync="spamReply" class="dialog" center @close="closeDialog">
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>留言回复</p>
        </div>
        <div class="contentSpan">
            <p class="left">
                留言者标题：
                <span>需要技术支持</span>
            </p>
            <p class="left">
                留言者分类：
                <span>意见反馈</span>
            </p>
            <div class="left neir">
                <p  class="li">留言者内容：</p>
                <p>您好,我们这里需要技术支持，麻烦贵公司有时间派人协助您好,我们这里需要技术支持，麻烦贵公司有时间派人协助您好,我们这里需要技术支持，麻烦贵公司有时间派人协助您好,我们这里需要技术支持，麻烦贵公司有时间派人协助您好,我们这里需要技术支持，麻烦贵公司有时间派人协助</p>
            </div>
            <p class="left">
                回复内容：
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="spamContent" style="margin-top: 13px;"></el-input>
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
            status: false, //控制表头不显示
            spamContent:''  //回复内容
        };
    },
    methods: {
        closeDialog() {
            this.$store.commit("spamReply", false); //关闭dialog
        },
        spam() {
            this.$store.commit("spamReply", false); //关闭dialog
        },
        cancel() {
            this.$store.commit("spamReply", false); //关闭dialog
        }
    },
    computed: {
        ...mapState(["spamReply"])
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
    .contentSpan{
        font-weight:bold;
        .left{
            margin-top: 18px;
        }
        .neir{
            display: flex;
            .li{
                width: 21%;
            }
        }
    }
}
.dialog >>> .el-dialog {
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;

    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #ebeef5;
}
</style>