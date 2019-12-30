<template>
    <div class="realList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
            >
                <el-table-column align="center" prop="date" label="基站点"></el-table-column>
                <el-table-column align="center" prop="name" label="企业名"></el-table-column>
                <el-table-column align="center" prop="address" label="COD(mg/L)"></el-table-column>
                <el-table-column align="center" prop="address" label="NH3-N(mg/L)"></el-table-column>
                <el-table-column align="center" prop="address" label="TN(mg/L)" min-width="100"></el-table-column>
                <el-table-column align="center" prop="address" label="TP(mg/L)"></el-table-column>
                <el-table-column align="center" prop="address" label="PH"></el-table-column>
                <el-table-column align="center" prop="address" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                        >历史数据</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="tabPage">
            <p class="indic">注：红色字体代表超标数据，橙色字体代表异常数据。</p>
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>

<script>
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
        handleEdit(index, row) {
            //点击编辑
            console.log(index, row);
            alert("第" + (1 + index) + "行");
        }
    }
};
</script>

<style lang="scss" scoped>
.realList {
    height: 62.5%;

    .tabE {
        height: 99.5%;
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

        .indic {
            position: absolute;
            right: 5%;
            bottom: 15%;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 0, 0, 1);
        }
    }
}
</style>