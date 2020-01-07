<template>
    <div class="realList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{background: 'rgba(237,237,237,1)'}"
                class="tab"
                align="center"
            >
                <el-table-column align="center" prop="siteName" label="基站点"></el-table-column>
                <el-table-column align="center" prop="erpName" label="企业名"></el-table-column>
                <el-table-column align="center" prop="cod" label="COD(mg/L)">
                    <template slot-scope="scope">
                        <span v-if="scope.row.codOverflag==1" style="color: red">{{ scope.row.cod }}</span>
                        <span v-else-if="scope.row.codExceptionFlag==1" style="color:#FFA247">{{ scope.row.cod }}</span>
                        <span v-else>{{ scope.row.cod}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="nh3n" label="NH3-N(mg/L)">
                    <template slot-scope="scope">
                        <span v-if="scope.row.nh3nOverflag==1" style="color: red">{{ scope.row.nh3n }}</span>
                        <span v-else-if="scope.row.nh3nExceptionFlag==1" style="color:#FFA247">{{ scope.row.nh3n }}</span>
                        <span v-else>{{ scope.row.nh3n}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="tn" label="TN(mg/L)" min-width="100">
                     <template slot-scope="scope">
                        <span v-if="scope.row.tnOverflag==1" style="color: red">{{ scope.row.tn }}</span>
                        <span v-else-if="scope.row.tnExceptionFlag==1" style="color:#FFA247">{{ scope.row.tn }}</span>
                        <span v-else>{{ scope.row.tn}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="tp" label="TP(mg/L)">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tpOverflag==1" style="color: red">{{ scope.row.tp }}</span>
                        <span v-else-if="scope.row.tpExceptionFlag==1" style="color:#FFA247">{{ scope.row.tp }}</span>
                        <span v-else>{{ scope.row.tp}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="ph" label="PH">
                    <template slot-scope="scope">
                        <span v-if="scope.row.phOverflag==1" style="color: red">{{ scope.row.ph }}</span>
                        <span v-else-if="scope.row.phExceptionFlag==1" style="color:#FFA247">{{ scope.row.ph }}</span>
                        <span v-else>{{ scope.row.ph}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="toHistorydata(scope.$index, scope.row)"
                        >历史数据</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
       
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:{
        datalist:{     //tab数据
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {};
    },
    computed:{
        tableData(){
            if(this.datalist && this.datalist.length>=1){
                let arrlist = []
                let realData = this.datalist;
                for(let i=0;i<realData.length;i++){
                    let obj={
                        erpName: realData[i].erpName,  //企业名称
                        siteName: realData[i].siteName, //基站名称
                        createTime: realData[i].createTime //创建时间
                    }
                    
                    if(realData[i].dataInfoList && realData[i].dataInfoList.length){
                        for(let k=0; k<realData[i].dataInfoList.length; k++){
                            let flag = false
                            if(realData[i].dataInfoList[k].factorCode == 'cod'){
                                flag = true
                                obj.cod = realData[i].dataInfoList[k].factorValue
                                obj.codOverflag = realData[i].dataInfoList[k].overFlag  //cod超标字段 0是正常  1是超标
                                obj.codExceptionFlag= realData[i].dataInfoList[k].exceptionFlag //cod异常字段 0是正常  1异常
                            }else{
                                if(k==realData[i].dataInfoList[k].length -1 && !flag){
                                    obj.cod = '/'
                                }
                            }
                            if(realData[i].dataInfoList[k].factorCode == 'nh3n'){
                                flag =true
                                obj.nh3n = realData[i].dataInfoList[k].factorValue
                                obj.nh3nOverflag = realData[i].dataInfoList[k].overFlag  //nh3n超标字段
                                obj.nh3nExceptionFlag= realData[i].dataInfoList[k].exceptionFlag //nh3n异常字段
                            }else{
                                if(k==realData[i].dataInfoList[k].length -1 && !flag){
                                    obj.nh3n = '/'
                                }
                            }
                            if(realData[i].dataInfoList[k].factorCode == 'tn'){
                                obj.tn = realData[i].dataInfoList[k].factorValue
                                obj.tnOverflag =realData[i].dataInfoList[k].overFlag  //tn超标字段
                                obj.tnExceptionFlag= realData[i].dataInfoList[k].exceptionFlag //tn异常字段
                            }else{
                                if(k==realData[i].dataInfoList[k].length -1 && !flag){
                                    obj.tn = '/'
                                }
                            }
                            if(realData[i].dataInfoList[k].factorCode == 'tp'){
                                obj.tp = realData[i].dataInfoList[k].factorValue
                                obj.tpOverflag = realData[i].dataInfoList[k].overFlag  //tp超标字段
                                obj.tpExceptionFlag= realData[i].dataInfoList[k].exceptionFlag //tp异常字段
                            }else{
                                if(k==realData[i].dataInfoList[k].length -1 && !flag){
                                    obj.tp = '/'
                                }
                            }
                            if(realData[i].dataInfoList[k].factorCode == 'ph'){
                                obj.ph = realData[i].dataInfoList[k].factorValue
                                obj.phOverflag = realData[i].dataInfoList[k].overFlag  //ph超标字段
                                obj.phExceptionFlag= realData[i].dataInfoList[k].exceptionFlag //ph异常字段
                            }else{
                                if(k==realData[i].dataInfoList[k].length -1 && !flag){
                                    obj.ph = '/'
                                }
                            }
                        }
                    }
                    arrlist.push(obj)
                }
                return arrlist
            }
        }
    },
    methods: {
        toHistorydata(index, row) {  //跳转到历史数据信息
            console.log(index, row);
            this.$store.commit('changeDefaultmenu','hisData')
            this.$router.push({path:'/hisData'})
        }
    }
};
</script>

<style lang="scss" scoped>
.realList {
    height: 100%;

    .tabE {
        height: 99.5%;
        margin-top: 1%;
        border: none;
        .tab {
            height: auto;
            overflow-y: auto;
        }
    }
}
</style>