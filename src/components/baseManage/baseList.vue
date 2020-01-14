<template>
    <div class="baseList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
                <el-table-column align="center" prop="date" label="基站名称"></el-table-column>
                <el-table-column align="center" prop="name" label="进口/出口"></el-table-column>
                <el-table-column align="center" prop="address" label="MN"></el-table-column>
                <el-table-column align="center" prop="address" label="因子">
                    <template slot-scope="scope">
                        <el-popover placement="top-start" title width="200" trigger="hover">
                            <p>{{scope.row.name}}</p>
                            <p slot="reference">{{scope.row.name}}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="address" label="站点状态" min-width="100"></el-table-column>
                <el-table-column align="center" prop="address" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="audit(scope.$index, scope.row)">审核</el-button>
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
        <div class="tabPage">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            radio1: "列表",
            whichLzz: "列表",
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    methods: {
        //详情--跳转详情dialog(detail)
        handleDetail(index, row) {
            this.$router.push({path:'/baseDetail'});
            this.$store.commit('baseDetail',true)
        },
        //点击编辑--跳转编辑dialog （add）
        handleEdit(index, row) {
            this.$router.push({ path: "/baseAdd" });
            this.$store.commit("baseAdd", true);
        },
        //审核
        audit(index, row) {}
    }
};
</script>

<style lang="scss" scoped>
.baseList {
    height: 72.5%;

    .tabE {
        height: 100%;
        margin-top: 1%;
        border: 1px solid rgba(235, 235, 235, 1);
        .tab {
            height: 100%;
            overflow-y: auto;
        }
    }
    .tabPage {
        text-align: center;
        padding-top: 4%;
    }
}
</style>