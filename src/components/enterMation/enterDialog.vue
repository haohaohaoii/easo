<template>
    <el-dialog :visible.sync="enterDialog" class="dialog" center>
        <div slot="title" class="tit">
            <div class="line"></div>
            <p>查看详情</p>
        </div>
        <el-table :data="tableData" border style="width: 100%" :show-header="status">
            <el-table-column prop="date" label="日期" width="180" align="right"></el-table-column>
            <el-table-column prop="name" label="姓名" align="left"></el-table-column>
        </el-table>
        <div slot="footer" class="footer">
            <el-button type="primary" size="mini">保存</el-button>
            <el-button size="mini">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            status: false, //控制表头不显示
            tableData: [
                {
                    date: "企业名称:",
                    name: "郑州富铭科技股份有限公司"
                },
                {
                    date: "企业地址:",
                    name: "郑州市金水区牛顿国际"
                },
                {
                    date: "联系人:",
                    name: "张冉冉"
                },
                {
                    date: "联系电话:",
                    name: "13588888888"
                },
                {
                    date: "用户名:",
                    name: "张xx"
                },
                {
                    date: "邮箱:",
                    name: "123456789@163.com"
                },
                {
                    date: "营业执照:",
                    name: "123456789@163.com"
                },
                {
                    date: "注册时间:",
                    name: "19/12/16 16:40:20"
                }
            ]
        };
    },
    computed: {
        ...mapState(["enterDialog"])
    }
};
</script>

<style lang="scss" scoped>
.dialog >>> .el-dialog {
    position: relative;
    margin: 0 auto;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 50%;
    top: 50%;
    transition: transform;
    transform: translateY(-50%);
    margin-top: 0 !important;
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
</style>