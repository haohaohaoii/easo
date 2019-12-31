<template>
    <el-dialog :visible.sync="baseDetail" class="dialog" center @close='closeDialog'>
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>基站审核</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" >
            <el-table-column prop="date" label="日期" width="180" align="right"></el-table-column>
            <el-table-column prop="name" label="姓名" align="left"></el-table-column>
           
        </el-table>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState,mapMutations} from "vuex";
export default {
    data() {
        return {
            status: false, //控制表头不显示
            tableData: [
                {
                    date: "基站名称",
                    name: "基站一"
                },
                {
                    date: "进出口:",
                    name: "进口"
                },
                {
                    date: "MN:",
                    name: "L1234964655646851"
                },
                {
                    date: "因子:",
                    name: "COD、氨氮、总磷、总氮、ph、流量"
                },
                {
                    date: "站点状态:",
                    name: "未审核"
                },
                {
                    date: "更新时间:",
                    name: "19/12/16 16:40:20"
                }
            ]
        };
    },
    methods:{
        closeDialog(){
            this.$store.commit('baseDetail',false)  //关闭dialog
        },
        save(){
            this.$store.commit('baseDetail',false) //关闭dialog
        },
        cancel(){
            this.$store.commit('baseDetail',false) //关闭dialog
        }
    },
    computed: {
        ...mapState(["baseDetail"])
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
}
.dialog >>> .el-dialog{
    margin-top: 0 !important;
    position: relative;
    margin: 0 auto;

    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    border: 1px solid #EBEEF5
}
</style>