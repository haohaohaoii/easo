<template>
    <div class="timeD">
        <div class="search">
            <div>
                <el-select placeholder="选择企业" class="changeW"></el-select>
                <el-select placeholder="选择基站" class="changeW"></el-select>
                <el-date-picker type="datetime" class="changeW" placeholder="开始时间"></el-date-picker>
                <el-date-picker type="datetime" class="changeW" placeholder="结束时间"></el-date-picker>
                <el-button type="primary">查询</el-button>
            </div>
            <div>
                <el-radio-group>
                    <el-radio-button label="top">列表</el-radio-button>
                    <el-radio-button label="right">折线</el-radio-button>
                    <el-radio-button label="bottom">柱状</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="tabE">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="基站点"></el-table-column>
                <el-table-column prop="name" label="企业名"></el-table-column>
                <el-table-column prop="address" label="COD(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column prop="address" label="NH3-N(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column prop="address" label="TN(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column prop="address" label="TP(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column prop="address" label="PH 最大/最小/平均"></el-table-column>
                <el-table-column prop="address" label="更新时间"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.timeD {
    height: 540px;
    background: #ffff;
    .search {
        display: flex;
        justify-content: space-between;
        .changeW {
            width: 140px;
        }
    }
    .tabE {
        margin-top: 20px;
    }
}
</style>