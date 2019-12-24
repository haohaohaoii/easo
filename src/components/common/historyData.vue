<template>
    <div class="historyD">
        <div class="historyTop">
             <div class="markMsg">
                <div></div>
                <p>历史数据</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select placeholder="选择企业" class="changeW"></el-select>
                    <el-select placeholder="选择基站" class="changeW"></el-select>
                    <el-date-picker type="datetime" class="changeW" placeholder="开始时间"></el-date-picker>
                    <el-date-picker type="datetime" class="changeW" placeholder="结束时间"></el-date-picker>
                    <el-button type="primary" class="changeW">查询</el-button>
                </div>
                <div>
                    <el-radio-group v-model="radio1">
                        <el-radio-button label="列表"></el-radio-button>
                        <el-radio-button label="折线"></el-radio-button>
                        <el-radio-button label="柱状"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>
       
        <div class="tabE">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background: 'rgba(237,237,237,1)'}">
                <el-table-column align="center" prop="date" label="基站点"></el-table-column>
                <el-table-column align="center" prop="name" label="企业名"></el-table-column>
                <el-table-column align="center" prop="address" :render-header="renderHeader" label="COD(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column align="center" prop="address" :render-header="renderHeader" label="NH3-N(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column align="center" prop="address" :render-header="renderHeader" label="TN(mg/L) 最大/最小/平均"  min-width="100"></el-table-column>
                <el-table-column align="center" prop="address" :render-header="renderHeader" label="TP(mg/L) 最大/最小/平均"></el-table-column>
                <el-table-column align="center" prop="address" :render-header="renderHeader" label="PH 最大/最小/平均"></el-table-column>
                <el-table-column align="center" prop="address" label="更新时间"></el-table-column>
            </el-table>
        </div>
        <div class="tabPage">
            <p class="indic">注：红色字体代表超标数据，橙色字体代表异常数据。</p>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        
        return {
            radio1: '列表',
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
    methods:{
        //label表格头部换行函数
        renderHeader(h, {column}) {
            let header = column.label.split(' ');
            return [h('p', [
                h('p', {}, header[0]),
                h('span', {}, header[1])
            ])];
        }      
    }
};
</script>

<style lang="scss" scoped>
.historyD {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .historyTop{
        height: 16.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .markMsg{
            display: flex;
            div{
                width: .15%;
                background: rgba(30,135,240,1);
                position: relative;
                right: 1%;
                top: 10%;
            }
            p{
                font-size: 20px;
                font-family: Adobe Heiti Std;
                font-weight: bold;
                color: rgba(51,62,68,1);
            }
        }
        .search {
            display: flex;
            justify-content: space-between;
            .searchL{
                width: 68%;
                display: flex;
                justify-content: space-between;
            }
            .changeW {
                width: 18%
            }
        }
    }
    .tabE{
        height: 62%;
        // overflow-y: auto;
        margin-top:1%;
        border: 1px solid rgba(235,235,235,1);
    }
    .tabPage{
        text-align: center;
        padding-top: 4%;

        .indic{
            position: absolute;
            right: 5%;
            bottom: 15%;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,0,0,1);
        }
    }
    
}
</style>