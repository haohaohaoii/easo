<template>
    <div class="listData">
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
                <el-table-column
                    align="center"
                    prop="address"
                    :render-header="renderHeader"
                    label="COD(mg/L) 最大/最小/平均"
                ></el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    :render-header="renderHeader"
                    label="NH3-N(mg/L) 最大/最小/平均"
                ></el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    :render-header="renderHeader"
                    label="TN(mg/L) 最大/最小/平均"
                    min-width="100"
                ></el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    :render-header="renderHeader"
                    label="TP(mg/L) 最大/最小/平均"
                ></el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    :render-header="renderHeader"
                    label="PH 最大/最小/平均"
                ></el-table-column>
                <el-table-column align="center" prop="address" label="更新时间"></el-table-column>
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
        //label表格头部换行函数
        renderHeader(h, { column }) {
            let header = column.label.split(" ");
            return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
        },
    }
};
</script>

<style lang="scss" scoped>
.listData {
    height: 62.5%;
    
    .tabE {
        height: 99.5%;
        margin-top: 1%;
        border: 1px solid rgba(235, 235, 235, 1);
        .tab{
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