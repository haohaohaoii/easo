<template>
    <div class="opetract">
        <div class="opetracttop">
            <div class="markMsg">
                <div></div>
                <p>运维合同管理</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select
                        size="small"
                        v-model="provinceCode"
                        @change="changeProvince"
                        @focus="getProvinces"
                        placeholder="省份"
                        filterable
                    >
                        <el-option
                            v-for="item in provinceList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-select
                        size="small"
                        v-model="cityCode"
                        @change="changeCity"
                        @focus="getCities"
                        placeholder="城市"
                        filterable
                    >
                        <el-option
                            v-for="item in cityList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-select
                        size="small"
                        v-model="areaCode"
                        @change="changeArea"
                        @focus="getAreas"
                        placeholder="区/县"
                        filterable
                    >
                        <el-option
                            v-for="item in areaList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-select
                        size="small"
                        v-model="enterprise"
                        @focus="getEnterprise"
                        placeholder="选择企业"
                        filterable
                    >
                        <el-option
                            v-for="item in enterpriseList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="contractStatus"
                        placeholder="选择合同状态"
                        filterable
                        size="small"
                    >
                        <el-option
                            v-for="item in contractStatusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button
                        type="primary"
                        class="changeW"
                        @click="search"
                        size="small"
                        style="width:120px"
                    >查询</el-button>
                </div>
                <div>
                    <el-button
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        size="mini"
                        class="add"
                        @click="addTract"
                        v-has="'添加合同'"
                    >添加合同</el-button>
                </div>
            </div>
        </div>
        <div class="tabE" v-if="tractDatalist && tractDatalist.length>0">
            <el-table
                :height="tableHeight"
                :data="tractDatalist"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="tractNum" label="合同编号"></el-table-column>
                <el-table-column align="center" prop="tractName" label="合同名称"></el-table-column>
                <el-table-column align="center" prop="priseName" label="企业名称"></el-table-column>
                <el-table-column align="center" prop="operations" label="运维部门"></el-table-column>
                <el-table-column align="center" prop="startTime" label="开始日期"></el-table-column>
                <el-table-column align="center" prop="endTime" label="截止日期"></el-table-column>
                <el-table-column align="center" prop="tStatus" label="时效状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tStatus==0">未到期</span>
                        <span v-if="scope.row.tStatus==1">快到期</span>
                        <span v-if="scope.row.tStatus==2">已到期</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="tractStatus" label="合同状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tractStatus==0">生效</span>
                        <span v-if="scope.row.tractStatus==1">终止</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="签订日期"></el-table-column>

                <el-table-column label="操作" align="center" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleDetails(scope.$index, scope.row)"
                            v-has="'详情'"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'编辑'"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-has="'删除'"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabPage">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalLength"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                ></el-pagination>
            </div>
        </div>
        <no-data v-else></no-data>
        <opertract-add :isShow="addPeodilaog" @changeAddDialog="changeAdd" @addSuccess="addT"></opertract-add>
        <opertract-edi
            :isShow="ediPeodilaog"
            :item="tractItem"
            @changeEdiDialog="changeEdi"
            @ediSuccess="ediT"
        ></opertract-edi>
        <opertract-detail :isShow="detailPeodilaog" :item="tractD" @getDialogstatus="changDetail"></opertract-detail>
    </div>
</template>

<script>
import noData from "../common/noData";
import opertractAdd from './opertractAdd'
import opertractEdi from './opertractEdi'
import opertractDetail from './opertractDetail'
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        opertractAdd,
        opertractEdi,
        opertractDetail,
        noData
    },

    data() {
        return {
            id:'',
            tableHeight:window.innerHeight -260,
            addPeodilaog:false,
            ediPeodilaog:false,
            detailPeodilaog:false,
            tractD:'',  //详情
            tractItem:'',
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用

            provinceCode:'',  //选中的省
            cityCode:'', //选中的市
            areaCode:'', //选中的区县
            enterprise:'',  //选中的企业
            contractStatus:'', //选中的合同状态
            
            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组
            enterpriseList:[],  //企业数组
            tractDatalist: [], //运维人员数组
            contractStatusList:[ //合同状态数组  0--生效   1-终止
                {label:'生效',value:0},
                {label:'终止',value:1}
            ], 
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页
            pagesize: 10, //每页显示多少条
      
        };
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'58px'};
        },
        iCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0'};
        },
        iHeaderCellStyle:function ({row, column, rowIndex, columnIndex}) {
            return {padding:'0px',background:'rgba(237,237,237,1)'}
        },
    },
    mounted(){
        this.search()
    },
    
    methods: {
        //获取企业
        getEnterprise(){
            this.$api.company.companyAll().then(depList=>{
                if(depList.data.code == 0){
                    let arr = depList.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].erpName,
                            value:arr[i].id
                        }
                        list.push(obj)
                    }
                    this.enterpriseList = list
                }
            })
           
        },
        addTract(){  //添加运维合同dialog
            this.addPeodilaog = true
        },
        //关闭添加运维合同diglog
        changeAdd(val){
            this.addPeodilaog = val
        },
        changDetail(val){
            this.detailPeodilaog = val
        },
        //关闭编辑弹窗
        changeEdi(val){
            this.ediPeodilaog = val
        },
        //添加运维合同成功后，再次请求
        addT(val){
            if(val){
                this.search()
            }
        },
        //编辑成功后的回调
        ediT(val){
            if(val){
                this.search()
            }
        },
        changeProvince(val){  //选择省份

            let arr =   this.provinceList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode = arr[i].value
                    break;
                }
            }
        },
        changeCity(val){   //选择城市
            let arr =   this.cityList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.cCode = arr[i].value
                    break;
                }
            }
        },
        changeArea(val){  //选择区县
            let arr =   this.areaList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.aCode = arr[i].value
                    break;
                }
            }

        },

        getProvinces(){ //获取全部省份
            let id = 1
            this.$api.oper.getArea(id).then(res=>{
           
                if(res.data.code == 0){
                    let arr = res.data.data
                    let proList = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].name,
                            value:arr[i].code,
                            id:arr[i].id
                        }
                        proList.push(obj)
                    }
                    this.provinceList = proList
                }
            })
        },
        getCities(){  //根据省份id获取城市列表
            let id = this.provinceCode;
            if(id){
                this.$api.oper.getArea(id).then(res=>{
                    if(res.data.code == 0){
                        let arr = res.data.data
                        let proList = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].name,
                                value:arr[i].code,
                                id:arr[i].id
                            }
                            proList.push(obj)
                        }
                        this.cityList = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应省份!");
            }
        },
        getAreas(){  //根据城市id获取区域列表
            let id = this.cityCode;
            if(id){
                this.$api.oper.getArea(id).then(res=>{
                    if(res.data.code == 0){
                        let arr = res.data.data
                        let proList = []
                        for(let i=0; i<arr.length; i++){
                            let obj={
                                label:arr[i].name,
                                value:arr[i].code,
                                id:arr[i].id
                            }
                            proList.push(obj)
                        }
                        this.areaList = proList
                    }
                })
            }else{
                this.$message.error("请先选择对应城市!");
            }
        },
        getDep(){  //获取运维部门
            this.$api.oper.getOperall().then(depList=>{
               
                if(depList.data.code == 0){
                    let arr = depList.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].deptName,
                            value:arr[i].id
                        }
                        list.push(obj)
                    }
                    this.depList = list
                }
            })
        },
        //点击查询
        search() {
                this.currentPage = 1;
                let pageNum = this.currentPage;
                this.sendAxios(pageNum);
            
        },
        //点击第几页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            let pageNum = this.currentPage;

            this.sendAxios(pageNum);
        },
        //发送数据请求(分页)
        sendAxios(pageNum) {
            let pageSize = this.pagesize;
            this.$api.contarct
                .getTarctlist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        province:this.pCode,
                        city:this.cCode,
                        county:this.aCode,
                        erpId:this.enterprise, //选中的企业
                        state:this.contractStatus //选中的合同状态
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ==0){
                        this.totalLength = res.data.pageInfo.total  //获取总条数
                        let arr  = res.data.pageInfo.list;
                        if(arr && arr.length>0){
                            let listA = []
                            for(let k=0; k<arr.length; k++){
                                let obj = {
                                    tractNum:arr[k].contractCode, //合同编号
                                    tractName:arr[k].contractName, //合同名称
                                    priseName:arr[k].erpName, //企业名称
                                    operations:arr[k].deptName, //运维部门
                                    startTime:arr[k].startTime,  //开始时间
                                    endTime:arr[k].endTime, //介绍时间
                                    tStatus:arr[k].dateState,  //时效状态
                                    tractStatus:arr[k].state, //合同状态
                                    createTime:arr[k].createTime, //签订日期
                                    id:arr[k].id
                                }
                                listA.push(obj)
                            }
                            this.tractDatalist = listA //获取数据
                        }else{
                             this.tractDatalist = []
                        }
                       
                    }
                })
                .catch(error => {});
        },
        //详情
        handleDetails(index, row){
            console.log(index, row);
            let id = row.id;
            this.$api.contarct.getTarctitem(id).then(res=>{
                this.detailPeodilaog = true
                this.tractD = res.data.data[0]
            })
        },
         //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该条合同, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let newId = row.id;
                this.$api.contarct.deleteTarct(newId).then(res=>{
                    if(res.data.code == 0){
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                       this.search()
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
        //点击编辑--跳转编辑dialog
        handleEdit(index, row) {
        
            console.log(index, row);
            let id = row.id;
            this.$api.contarct.getTarctitem(id).then(res=>{
                this.ediPeodilaog = true
                this.tractItem = res.data.data[0]
            })
        }
    },

};
</script>

<style lang="scss" scoped>
.opetract >>> .el-input {
    width: 180px !important;
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
                width: 70%;
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