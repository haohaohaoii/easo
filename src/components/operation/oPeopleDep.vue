<template>
    <div class="oPeopleDep">
        <div class="oPeopleDeptop">
            <div class="markMsg">
                <div></div>
                <p>运维人员管理</p>
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
                        v-model="depCode"
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
                        size="small"
                        class="add"
                        @click="addPeople"
                        v-has="'添加人员'"
                    >添加人员</el-button>
                </div>
            </div>
        </div>
        <div class="tabE" v-if="opeoDatalist && opeoDatalist.length>0">
            <el-table
                :height="tableHeight"
                :data="opeoDatalist"
                stripe
                style="width: 100%"
                :row-style="iRowStyle"
                :cell-style="iCellStyle"
                :header-row-style="iHeaderRowStyle"
                :header-cell-style="iHeaderCellStyle"
                class="tab"
            >
                <el-table-column align="center" prop="name" label="姓名" min-width="100px"></el-table-column>
                <el-table-column align="center" prop="linkPhone" min-width="120px" label="电话"></el-table-column>
                <el-table-column align="center" prop="email" min-width="165px" label="邮箱"></el-table-column>
                <el-table-column align="center" prop="userName" min-width="100px" label="用户名"></el-table-column>
                <el-table-column align="center" prop="ywbm" label="运维部门" min-width="100px"></el-table-column>
                <el-table-column align="center" prop="ywzd" min-width="200px" label="运维站点"></el-table-column>
                <el-table-column align="center" prop="createTime" min-width="160px" label="添加时间"></el-table-column>

                <el-table-column label="操作" align="center" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)"
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
        <opeo-add :isShow="addPeodilaog" @changeAddDialog="changeAdd" @addSuccess="addT"></opeo-add>
        <opeo-editor
            :isShow="ediDilog"
            @changeEdiDialog="changeEdi"
            :item="operpItem"
            @ediSuccess="ediT"
        ></opeo-editor>
        <opeo-detail :isShow="detailPeodilaog" :item="operpItem" @closeDetail="closeD"></opeo-detail>
    </div>
</template>

<script>
import noData from "../common/noData";
import opeoAdd from './opeoAdd'
import opeoEditor from './opeoEditor'
import opeoDetail from './opeoDetail'
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        opeoAdd,
        noData,
        opeoEditor,
        opeoDetail
    },

    data() {
        return {
            id:'', //运维人员行id
            tableHeight:window.innerHeight -260,
            addPeodilaog:false,   //添加运维人员dialog弹窗状态
            ediDilog:false,       //编辑运维人员dialog弹窗状态
            detailPeodilaog:false,  //详情 dialog状态
            operpItem:'',  //运维人员行数据
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            aCode:'', //区域code,提交用

            provinceCode:'',  //选中的省
            cityCode:'', //选中的市
            areaCode:'', //选中的区县
            depCode:'',  //选中的运维部门
            
            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组
            depList:[],  //运维部门数组
            opeoDatalist: [], //运维人员数组
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
        handleDetail(index,row){
            console.log(index, row);
            let id = row.id;
            this.$api.operp.getOperpitem(id).then(res => {
                
                console.log(res)
                if (res.data.code == 0) {
                    this.operpItem = res.data.data[0]
                    this.detailPeodilaog = true
                }
            }).catch(error => {

            })
           
        },
        addPeople(){  //添加运维人员dialog
            this.addPeodilaog = true
        },
        //关闭添加运维人员diglog
        changeAdd(val){
            this.addPeodilaog = val
        },
        //关闭详情dialog
        closeD(val){
            this.detailPeodilaog =val
        },
        changeEdi(val){
            this.ediDilog = val
        },
        //添加运维人员成功后，再次请求
        addT(val){
            if(val){
                this.search()
            }
        },
        //编辑运维人员成功后,再次请求
        ediT(val){
            if(val){
                this.search()
            }
        },
        changeProvince(val){  //选择省份
             this.cityCode = ''
            this.cCode = ''
            this.areaCode = ''
            this.aCode = ''
            let arr =   this.provinceList 
            for(let i=0; i<arr.length;i++){
                if(arr[i].id == val){
                    this.pCode = arr[i].value
                    break;
                }
            }
        },
        changeCity(val){   //选择城市
            this.areaCode = ''
            this.aCode = ''
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
            this.$api.operp
                .getOperplist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        province:this.pCode,
                        city:this.cCode,
                        county:this.aCode,
                        mtDeptId:this.depCode
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
                                let siteList =  arr[k].siteNames
                                let name = ''
                                if(siteList && siteList.length>0){
                                    for(let i=0; i<siteList.length; i++){
                                        if(i==0){
                                            name+=siteList[i].siteName
                                        }else{
                                            name+=','+siteList[i].siteName
                                        }
                                    }
                                }
                             
                                let obj = {
                                    name:arr[k].realName, //姓名
                                    linkPhone:arr[k].phone, //手机号
                                    email:arr[k].email, //邮箱
                                    userName:arr[k].username, //用户名
                                    ywbm:arr[k].deptName,  //运维部门
                                    ywzd:name, //运维站点
                                    createTime:arr[k].createTime, //创建时间
                                    id:arr[k].id
                                }
                                listA.push(obj)
                            }
                            this.opeoDatalist = listA //获取数据
                        }else{
                             this.opeoDatalist = []
                        }
                       
                    }
                })
                .catch(error => {});
        },
         //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该运维人员, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let id = row.id;
                    this.$api.operp.deleteOperp(id).then(res=>{
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
            this.$api.operp.getOperpitem(id).then(res => {
                
                console.log(res)
                if (res.data.code == 0) {
                    this.operpItem = res.data.data[0]
                    this.ediDilog = true
                }
            }).catch(error => {

            })
        }
    },

};
</script>

<style lang="scss" scoped>
// .oPeopleDep >>> .el-input {
//     width: 180px !important;
// }
.oPeopleDep >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
.oPeopleDep {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .oPeopleDeptop {
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
                // width: 60%;
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