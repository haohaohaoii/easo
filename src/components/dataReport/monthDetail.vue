<template>
    <div class="opetract">
        <div class="conTit">{{siteName}}(月报表)</div>
        <div class="opetracttop">
            <p>
                <span>
                    站点名称：
                    <span style=" color: rgba(51, 51, 51, 1)">{{siteName}}</span>
                </span>
                <span class="pLeft">
                    排放口名称：
                    <span class="conT">{{siteType}}</span>
                </span>
                <span class="pLeft">
                    开始时间：
                    <span class="conT">{{startTime}}</span>
                </span>
                <span class="pLeft">
                    结束时间：
                    <span class="conT">{{endTime}}</span>
                </span>
            </p>
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
                <el-table-column align="center" label="COD(mg/L)">
                    <el-table-column align="center" prop="cod" label="平均值"></el-table-column>
                    <el-table-column align="center" prop="pfl" label="排放量"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="氨氮(mg/L)">
                    <el-table-column align="center" prop="ad" label="平均值"></el-table-column>
                    <el-table-column align="center" prop="pfl" label="排放量"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="总磷(mg/L)">
                    <el-table-column align="center" prop="zl" label="平均值"></el-table-column>
                    <el-table-column align="center" prop="pfl" label="排放量"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="总氮(mg/L)">
                    <el-table-column align="center" prop="zd" label="平均值"></el-table-column>
                    <el-table-column align="center" prop="pfl" label="排放量"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="流量">
                    <el-table-column align="center" prop="ll" label="平均值"></el-table-column>
                    <el-table-column align="center" prop="pfl" label="排放量"></el-table-column>
                </el-table-column>
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
            detailList:[],
            siteName:'',
            siteType:'',
            startTime:'',
            endTime:''
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
            return {padding:'0px'}
        },
    },
    mounted(){
        
        this.getItem()
        this.getItemxy()
    },
    
    methods: {
        getItemxy(){
        
            let itemT = JSON.parse(localStorage.itemXy)
            this.siteName = itemT.siteName
            this.siteType = itemT.ioType
            this.startTime = itemT.sTime
            this.endTime = itemT.eTime
        },
        getItem(){ 
 
            let itemDetail = JSON.parse(localStorage.item)
            let itemUp = itemDetail.reportDayList
            let itemDown = itemDetail.reportMonthList
            let arr =[]
            if(itemUp && itemUp.length>0){
             
                for(let i=0; i<itemUp.length; i++){
                    let obj={
                        siteName:itemUp[i].createTime
                    }
                    let yzList = itemUp[i].reports
                    for(let k=0; k<yzList.length; k++){
                        if(yzList[k].factorCode == '011'){   //cod
                            obj.cod = yzList[k].avgValue
                            obj.pfl =  yzList[k].avgDay
                        }
                        if(yzList[k].factorCode == '101'){  //氨氮
                           

                            obj.zl = yzList[k].avgValue
                            obj.pfl =  yzList[k].avgDay
                        }
                        if(yzList[k].factorCode == '060'){  //总磷
                            obj.ad = yzList[k].avgValue
                            obj.pfl =  yzList[k].avgDay
                        }
                        if(yzList[k].factorCode == '065'){  //总氮
                            obj.zd = yzList[k].avgValue
                            obj.pfl =  yzList[k].avgDay
                        }
                        if(yzList[k].factorCode == 'B01'){  //流量
                            obj.ll = yzList[k].avgValue
                            obj.pfl =  yzList[k].avgDay
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
                    objb.pfl = itemDown[m].maxDay
                }
                if(itemDown[m].factorCode == '101'){  //氨氮
                    objb.zl =itemDown[m].maxValue
                    objb.pfl = itemDown[m].maxDay
                }
                if(itemDown[m].factorCode == '060'){  //总磷
                    objb.ad = itemDown[m].maxValue
                    objb.pfl = itemDown[m].maxDay
                }
                if(itemDown[m].factorCode == '065'){  //总氮
                    objb.zd = itemDown[m].maxValue
                    objb.pfl = itemDown[m].maxDay
                }
                if(itemDown[m].factorCode == 'B01'){  //流量
                    objb.ll = itemDown[m].maxValue
                    objb.pfl = itemDown[m].maxDay
                }
                 
            }
            arr.push(objb)
            let objm={
                siteName:'最小值',
            }
            for(let t=0; t<itemDown.length; t++){
                
                if(itemDown[t].factorCode == '011'){   //cod
                    objm.cod = itemDown[t].minValue
                    objm.pfl = itemDown[t].minDay
                }
                if(itemDown[t].factorCode == '101'){  //氨氮
                    objm.zl =itemDown[t].minValue
                    objm.pfl = itemDown[t].minDay
                }
                if(itemDown[t].factorCode == '060'){  //总磷
                    objm.ad = itemDown[t].minValue
                    objm.pfl = itemDown[t].minDay
                }
                if(itemDown[t].factorCode == '065'){  //总氮
                    objm.zd = itemDown[t].minValue
                    objm.pfl = itemDown[t].minDay
                }
                if(itemDown[t].factorCode == 'B01'){  //流量
                    objm.ll = itemDown[t].minValue
                    objm.pfl = itemDown[t].minDay
                }
                
            }
            arr.push(objm)
           
            let objp={
                    siteName:'平均值',
                }
            for(let h=0; h<itemDown.length; h++){
                let x = String(itemDown[h].avgValue).indexOf('.') + 1; //小数点的位置
                let y = String(itemDown[h].avgValue).length - x; //小数的位数
                if(y>4){
                    itemDown[h].avgValue = itemDown[h].avgValue.toFixed(4)
                }
                if(itemDown[h].factorCode == '011'){   //cod
                    objp.cod = itemDown[h].avgValue
                    objp.pfl = itemDown[h].avgDay
                }
                if(itemDown[h].factorCode == '101'){  //氨氮
                    objp.zl =itemDown[h].avgValue
                    objp.pfl = itemDown[h].avgDay
                }
                if(itemDown[h].factorCode == '060'){  //总磷
                    
                    objp.ad = itemDown[h].avgValue
                    objp.pfl = itemDown[h].avgDay
                }
                if(itemDown[h].factorCode == '065'){  //总氮
                    objp.zd = itemDown[h].avgValue
                    objp.pfl = itemDown[h].avgDay
                }
                if(itemDown[h].factorCode == 'B01'){  //流量
                    objp.ll = itemDown[h].avgValue
                    objp.pfl = itemDown[h].avgDay
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
    .conTit {
        font-family: Adobe Heiti Std;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        font-size: 20px;
    }
    .opetracttop {
        height: 45px;
        line-height: 45px;
        color: rgba(153, 153, 153, 1);
        font-size: 16px;
        .pLeft {
            padding-left: 20px;
            .conT {
                color: rgba(51, 51, 51, 1);
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