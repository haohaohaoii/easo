<template>
    <div class="opetract">
        <div class="opetracttop">
            <div class="markMsg">
                <div></div>
                <p>运维记录</p>
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
                        v-model="ywValue"
                        @focus="getDep"
                        placeholder="运维部门"
                        filterable
                    >
                        <el-option
                            v-for="item in depList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
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
                        v-model="siteStateVal"
                        @focus="getSites"
                        placeholder="选择站点"
                        filterable
                        size="small"
                    >
                        <el-option
                            v-for="item in siteList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime"
                        class="changeW"
                        v-model="startTime"
                        placeholder="开始时间"
                        time-arrow-control
                    ></el-date-picker>
                    <!-- <span>至</span> -->
                    <el-date-picker
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime"
                        class="changeW"
                        v-model="endTime"
                        placeholder="结束时间"
                        time-arrow-control
                    ></el-date-picker>
                    <!-- <el-button type="primary" class="changeW" size="mini" @click="chooseSb">选择设备</el-button> -->
                    <el-button
                        type="primary"
                        class="changeW"
                        size="mini"
                        @click="search"
                        style="width:110px"
                    >搜索</el-button>
                </div>
                <div>
                    <el-button
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        size="mini"
                        class="add"
                        @click="addTract"
                    >添加运维记录</el-button>
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
                <el-table-column align="center" prop="ywTime" label="运维时间"></el-table-column>
                <el-table-column align="center" prop="siteState" label="站点"></el-table-column>
                <el-table-column align="center" prop="ywPeople" label="运维人员"></el-table-column>
                <el-table-column align="center" prop="ywNum" label="运维单号"></el-table-column>

                <el-table-column label="操作" align="center" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
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
        <recodes-add :isShow="addPeodilaog" @changeAddDialog="changeAdd" @addSuccess="addT"></recodes-add>
        <recods-editor
            :isShow="ediPeodilaog"
            @changeEdiDialog="changeEdi"
            :item="recodesItem"
            @ediSuccess="ediT"
        ></recods-editor>
        <recods-detail
            :isShow="detailPeodilaog"
            :item="detailItem"
            @changeDetailDialog="changeDetaill"
        ></recods-detail>
    </div>
</template>

<script>
import noData from "../common/noData";
import recodesAdd from './recodsAdd'
import recodsEditor from './recodsEditor'
import recodsDetail from './recodsDetail'
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        recodesAdd,
        recodsEditor,
        recodsDetail,
        noData
    },

    data() {
        return {
            id:'',
            tableHeight:window.innerHeight -260,
            addPeodilaog:false,   //添加框
            ediPeodilaog:false,  //编辑框
            detailPeodilaog:false,  //详情框
            recodesItem:'',   //行数据信息
            detailItem:'',   //详情的行数据
            tractD:'',  //详情
            tractItem:'',
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用

            provinceCode:'',  //选中的省
            cityCode:'', //选中的市
            areaCode:'', //选中的区县
            enterprise:'',  //选中的企业
            siteStateVal:'', //选中的站点
            ywValue:'',  //选中的运维部门
            startTime:'', //开始时间
            endTime:'',  //结束时间

            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组
            enterpriseList:[],  //企业数组
            tractDatalist: [], //运维记录数组
            siteList:[],  //站点数组
            depList:[],  //运维部门
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
        ediT(){
            this.search()
        },
        addT(){
         
            this.search()
        },
        //选择设备
        chooseSb(){

        },
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
        addTract(){  //添加运维记录dialog
            this.addPeodilaog = true
        },
        //关闭添加运维记录diglog
        changeAdd(val){
            this.addPeodilaog = val
        },
        //关闭编辑运维记录
        changeEdi(){
            this.ediPeodilaog = false
        },
        //关闭详情运维记录
        changeDetaill(val){
            this.detailPeodilaog = val
        },
        changeProvince(val){  //选择省份
            this.areaCode = '';
            this.aCode = '';
            this.cityCode = '';
            this.cCode = ''
            let arr =   this.provinceList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode = arr[i].value
                    break;
                }
            }
        },
        changeCity(val){   //选择城市
            this.areaCode = '';
            this.aCode = '';
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
        //获取站点
        getSites(){
            this.$api.site.getAlls().then(res=>{
   
                if(res.data.code == 0){
                    let arr = res.data.data
                    let list = []
                    for(let i=0; i<arr.length; i++){
                        let obj={
                            label:arr[i].siteName,
                            value:arr[i].mn
                        }
                        list.push(obj)
                    }
                    this.siteList = list
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
            this.$api.recodes
                .getRecodeslist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        province:this.pCode,
                        city:this.cCode,
                        county:this.aCode,
                        erpId:this.enterprise, //选中的企业
                        mtDeptId:this.ywValue,  //选中的运维部门
                        mn:this.siteStateVal, //选中的站点
                        start:this.startTime,  //开始时间
                        end:this.endTime  //结束时间
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
                                    id:arr[k].id,    //id
                                    ywTime:arr[k].mtTime, //运维时间
                                    siteState:arr[k].siteName, //站点
                                    ywPeople:arr[k].realName, //运维人员
                                    ywNum:arr[k].mtCode //运维单号
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
            this.$api.recodes.getRecodesitem(id).then(res=>{
                if(res.data.code == 0){
                    this.detailPeodilaog = true;
                    this.detailItem = res.data.data[0]
                }
            })
        },
         //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该条运维记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let id = row.id;
                this.$api.recodes.deleteRecords(id).then(res=>{
           
                    if(res.data.code == 0){
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                       let pageNum = this.currentPage;
                        this.sendAxios(pageNum);
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
            this.$api.recodes.getRecodesitem(id).then(res=>{
                if(res.data.code == 0){
                    this.ediPeodilaog = true;
                    this.recodesItem = res.data.data[0]
                }
            })
        }
    },

};
</script>

<style lang="scss" scoped>
.opetract >>> .el-input {
    width: 140px !important;
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
                width: 86%;
                display: flex;
                justify-content: space-between;
                align-items: center;
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