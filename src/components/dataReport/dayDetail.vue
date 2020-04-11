<template>
    <div class="opetract">
        <div class="opetracttop">
            <div class="markMsg">
                <div></div>
                <p>日报表详情</p>
            </div>
            <div class="search"></div>
        </div>
        <div class="tabE" v-if="detailList && detailList.length>0">
            <el-table
                :height="tableHeight"
                :data="detailList"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="siteName" label="检测时间"></el-table-column>
                <el-table-column align="center" prop="cod" label="COD(mg/L)"></el-table-column>
                <el-table-column align="center" prop="ad" label="氨氮(mg/L)"></el-table-column>
                <el-table-column align="center" prop="zl" label="总磷(mg/L)"></el-table-column>
                <el-table-column align="center" prop="zd" label="总氮(mg/L)"></el-table-column>
                <el-table-column align="center" prop="ll" label="流量"></el-table-column>
            </el-table>
        </div>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import noData from "../common/noData";
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        noData
    },

    data() {
        return {
            tableHeight:window.innerHeight -260,
            detailList:[]
        };
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'40px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'40px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
    },
    mounted(){
        
        this.getItem()
    },
    
    methods: {
        getItem(){
            
            let itemDetail = JSON.parse(localStorage.item)
            let itemUp = itemDetail.dataRecordList
            let itemDown = itemDetail.reportDayList
            let arr =[]
            if(itemUp && itemUp.length>0){
             
                for(let i=0; i<itemUp.length; i++){
                    let obj={
                        siteName:itemUp[i].createTime
                    }
                    let yzList = itemUp[i].dataInfoList
                    for(let k=0; k<yzList.length; k++){
                        if(yzList[k].factorCode == '011'){   //cod
                            obj.cod = yzList[k].factorValue
                        }
                        if(yzList[k].factorCode == '101'){  //氨氮
                            obj.ad = yzList[k].factorValue
                        }
                        if(yzList[k].factorCode == '060'){  //总磷
                            obj.zl = yzList[k].factorValue
                        }
                        if(yzList[k].factorCode == '065'){  //总氮
                            obj.zd = yzList[k].factorValue
                        }
                        if(yzList[k].factorCode == 'B01'){  //流量
                            obj.ll = yzList[k].factorValue
                        }
                      
                    }
                    arr.push(obj)
                }
             
               
                this.detailList = arr
            }
            let objb={
                siteName:'最大值',
            }
            for(let m=0; m<itemDown.length; m++){
            
                
                if(itemDown[m].factorCode == '011'){   //cod
                    objb.cod = itemDown[m].maxValue
                }
                if(itemDown[m].factorCode == '101'){  //氨氮
                    objb.ad = itemDown[m].maxValue
                }
                if(itemDown[m].factorCode == '060'){  //总磷
                    objb.zl =itemDown[m].maxValue
                }
                if(itemDown[m].factorCode == '065'){  //总氮
                    objb.zd = itemDown[m].maxValue
                }
                if(itemDown[m].factorCode == 'B01'){  //流量
                    objb.ll = itemDown[m].maxValue
                }
                 
            }
            arr.push(objb)
            let objm={
                siteName:'最小值',
            }
            for(let t=0; t<itemDown.length; t++){
                
                if(itemDown[t].factorCode == '011'){   //cod
                    objm.cod = itemDown[t].minValue
                }
                if(itemDown[t].factorCode == '101'){  //氨氮
                    objm.ad = itemDown[t].minValue
                }
                if(itemDown[t].factorCode == '060'){  //总磷
                    objm.zl =itemDown[t].minValue
                }
                if(itemDown[t].factorCode == '065'){  //总氮
                    objm.zd = itemDown[t].minValue
                }
                if(itemDown[t].factorCode == 'B01'){  //流量
                    objm.ll = itemDown[t].minValue
                }
                
            }
            arr.push(objm)
           
            let objp={
                    siteName:'平均值',
                }
            for(let h=0; h<itemDown.length; h++){
                
                if(itemDown[h].factorCode == '011'){   //cod
                    objp.cod = itemDown[h].avgValue
                }
                if(itemDown[h].factorCode == '101'){  //氨氮
                    objp.ad = itemDown[h].avgValue
                }
                if(itemDown[h].factorCode == '060'){  //总磷
                    objp.zl =itemDown[h].avgValue
                }
                if(itemDown[h].factorCode == '065'){  //总氮
                    objp.zd = itemDown[h].avgValue
                }
                if(itemDown[h].factorCode == 'B01'){  //流量
                    objp.ll = itemDown[h].avgValue
                }
                
            }
            arr.push(objp)
            
        }
      
    }

};
</script>

<style lang="scss" scoped>
.opetract >>> .el-input {
    width: 200px !important;
}
.opetract >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
.opetract {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .opetracttop {
        height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .markMsg {
            display: flex;
            div {
                width: 0.15%;
                background: rgba(30, 135, 240, 1);
                position: relative;
                right: 1%;
                top: 10%;
            }
            p {
                font-size: 20px;
                font-family: Adobe Heiti Std;
                font-weight: bold;
                color: rgba(51, 62, 68, 1);
            }
        }
        .search {
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            .searchL {
                width: 60%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .changeW {
                margin-right: 2%;
            }
        }
    }
    .tabE {
        margin-top: 15px;
    }
    .tabPage {
        text-align: center;
        // padding-top: 20px;
    }
}
</style>