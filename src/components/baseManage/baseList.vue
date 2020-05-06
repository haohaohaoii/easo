<template>
    <div class="baseList">
        <div class="tabE">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                class="tab"
                :height="tableHeight"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
            >
                <el-table-column align="center" prop="siteName" label="基站名称"></el-table-column>
                <el-table-column align="center" prop="ioType" label="进口/出口"></el-table-column>
                <el-table-column align="center" prop="mn" label="MN"></el-table-column>
                <el-table-column align="center" prop="yinZ" label="因子">
                    <template slot-scope="scope">
                        <el-popover placement="top-start" title width="200" trigger="hover">
                            <p>{{scope.row.yinZ}}</p>
                            <p slot="reference">{{scope.row.yinZ}}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="siteState" label="站点状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.siteState==0">{{scope.row.stateMsg}}</span>
                        <span v-else-if="scope.row.siteState==1">{{scope.row.stateMsg}}</span>
                        <span v-else-if="scope.row.siteState==2">{{scope.row.stateMsg}}</span>
                        <span v-else-if="scope.row.siteState==3">{{scope.row.stateMsg}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="audit(scope.$index, scope.row)"
                            :disabled="!scope.row.siteState==0"
                            v-has="'审核'"
                        >审核</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDetail(scope.$index, scope.row)"
                            v-has="'详情'"
                        >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props:{
        baseAll:{
            type:Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tableHeight:window.innerHeight -230
        };
    }, 
   computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'62px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'62px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
        tableData(){
            if(this.baseAll && this.baseAll.length>0){
                let baseList= [];
                for(let i=0; i<this.baseAll.length; i++){
                    let witchType = ''  //进口出口类型
                    let yinZ = ''  //因子名称
                    let stateMsg = ''  //站点状态  对应的文字显示
                    if(this.baseAll[i].ioType == 0){
                        witchType = '进口'
                    }else if(this.baseAll[i].ioType == 1){
                        witchType = '出口'
                    }
                   
                    if(this.baseAll[i].siteDevices && this.baseAll[i].siteDevices.length>0){ //说明有因子
             
                        let yinZarr = this.baseAll[i].siteDevices;
                        for(let k=0; k<yinZarr.length; k++){
                            if(yinZarr[k].factorName == 'NH3-N'){
                                yinZarr[k].factorName = '氨氮'
                            }else if(yinZarr[k].factorName == 'TN'){
                                yinZarr[k].factorName = '总氮'
                            }else if(yinZarr[k].factorName == 'TP'){
                                yinZarr[k].factorName = '总磷'
                            }else if(yinZarr[k].factorName == 'FLOW'){
                                yinZarr[k].factorName = '流量'
                            }
                            if(yinZ == ''){
                                yinZ = yinZarr[k].factorName
                            }else{
                                 yinZ +=',' + yinZarr[k].factorName
                            }
                        }
                    }else{
                        yinZ=''
                    }
                    if(this.baseAll[i].siteState == 0){
                        stateMsg = '审核中'
                    }else if(this.baseAll[i].siteState == 1){
                        stateMsg = '运行中'
                    }else if(this.baseAll[i].siteState == 2){
                         stateMsg = '禁用'
                    }else if(this.baseAll[i].siteState == 3){
                        stateMsg = '审核失败'
                    }
                    let obj={
                        siteName:this.baseAll[i].siteName,  //基站名称
                        mn:this.baseAll[i].mn,  //mn
                        ioType:witchType,  //进口/出口
                        yinZ:yinZ,  //因子名称
                        siteState:this.baseAll[i].siteState, //站点状态
                        updateTime:this.baseAll[i].updateTime, //更新时间
                        stateMsg:stateMsg,
                        siteD:this.baseAll[i].siteDevices

                    }
                    baseList.push(obj)
                }
                return baseList
            }
        }
    },
    methods: {
        //点击删除
        roleDelete(index, row) {
            let id = row.id
            this.$confirm("此操作将永久删除该条角色, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.delete(id).then(res=>{
                        if(res =='success'){
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        }
                    })
                   
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        delete(roleId){
            return new Promise((resolve,reject)=>{
                this.$api.user.deleteUseritem(roleId).then(res=>{           
                    if(res.data.code == 0){
                        resolve('success')
                    }
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        //点击编辑
        handleEdit(index, row) {
            console.log(index, row);
            let mn = row.mn
            this.$store.dispatch('getBasei',mn)
        },
        //基站审核
        audit(index,row){
            console.log(row)
            let mn = row.mn
            this.$store.dispatch('changeSitestatus',mn)
        },
        //查看详情
        handleDetail(index,row){
            console.log(row)
            this.$store.dispatch('openSitedetail',row)
        }
    }
};
</script>

<style lang="scss" scoped>
.baseList {
    height: calc(100% - 40px);
    .tabE {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 15px;
    }
}
.baseList >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
</style>