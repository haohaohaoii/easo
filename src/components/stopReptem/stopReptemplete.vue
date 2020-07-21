<template>
    <div class="stopRept">
        <div class="stopRepttop">
            <div class="markMsg">
                <div></div>
                <p>停产报告模板列表</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-input class="xx" size="small" v-model="name" placeholder="文件名称"></el-input>
                    <el-select
                        size="small"
                        v-model="provinceCode"
                        @change="changeProvince"
                        @focus="getProvinces"
                        placeholder="省份"
                        class="xx"
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
                        class="xx"
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
                    <el-button
                        type="primary"
                        class="changeW"
                        @click="search"
                        size="small"
                        style="width:120px"
                    >查询</el-button>
                    <el-button
                        type="primary"
                        class="changeW"
                        @click="reset"
                        size="small"
                        style="width:120px"
                    >重置</el-button>
                </div>
                <div>
                    <el-button
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        size="small"
                        class="add"
                        @click="addTract"
                    >添加</el-button>
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
                <el-table-column align="left" min-width="100px" prop="tempName" label="名称"></el-table-column>
                <el-table-column align="center" prop="area" label="地区"></el-table-column>
                <el-table-column align="center" prop="genre" label="类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.genre==1">停电</span>
                        <span v-else-if="scope.row.genre==0">停产</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="tempCode" label="模板代码"></el-table-column>
                <el-table-column label="操作" align="center" min-width="100px" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">查看</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="down(scope.$index, scope.row)"
                        >导出</el-button>
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
        <stoprep-add :isShow="addPeodilaog" @changeAddDialog="changeAdd" @closeDialog="cloeseA"></stoprep-add>
        <stoprep-detail :isShow="detailPeodilaog" :item="tractD" @getDialogstatus="changDetail"></stoprep-detail>
    </div>
</template>

<script>
import noData from "../common/noData";
import stoprepAdd from './stopRepAdd'
import stoprepDetail from './stopRepDetail'
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        stoprepAdd,
        stoprepDetail,
        noData
    },

    data() {
        return {
            tractD:'',
            name:'', //输入名称查询
            id:'',
            tableHeight:window.innerHeight -275,
            pCode:'', //省份code，提交用
            cCode:'', //城市code,提交用
            tractDatalist:[],

            provinceCode:'',  //选中的省
            cityCode:'', //选中的市

            detailPeodilaog:false,
            addPeodilaog:false,
            provinceList:[],  //省数组
            cityList:[], //城市数据

            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页
            pagesize: 13, //每页显示多少条
      
        };
    },
    computed:{
        iRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
        },
        iHeaderRowStyle:function ({row, rowIndex}) {
            return {height:'50px'};
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
        reset(){
            this.provinceCode = '';
            this.cityCode = '';
            this.pCode = '';
            this.cCode = '';
            this.name = '';
            this.search();
        },
        
        changeAdd(){
            this.addPeodilaog = false
            this.search();
        },
        cloeseA(){
            this.addPeodilaog = false
        },
        //点击添加
        addTract(){
            this.addPeodilaog = true
        },
        changDetail(val){
            this.detailPeodilaog = val
        },
        down(index, row){

            if ('ActiveXObject' in window) {
                var url = row.url
            } else {
                var url = row.url
            }
            window.location.href = url;
        },
        changeProvince(val){  //选择省份
            this.cityCode = '';
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
            if(this.provinceCode){
                if(!this.cCode){
                   this.$message.error("请先选择对应城市!");
                    return false
                }
            }

            let pageSize = this.pagesize;
            this.$api.storep
                .getTemplist({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        name:this.name,
                        city:this.cCode
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
                                    tempName:arr[k].name, //名称
                                    area:arr[k].cityName, //地区
                                    genre:arr[k].type, //类型
                                    tempCode:arr[k].tplCode, //运维部门
                                    url:arr[k].downloadUrl,
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
            this.$api.storep.getTempitem(id).then(res=>{
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
                let Id = row.id;
                this.$api.storep.tepDelete(Id).then(res=>{
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
        }
    },
    watch:{
        //删除页面最后一条数据时，currentPage没有减一，页面列表为空
        totalLength(){
            if(this.totalLength==(this.currentPage-1)*this.pagesize&& this.totalLength!=0){
            this.currentPage-=1;
            this.sendAxios(this.currentPage)
            }
        }
    }

};
</script>

<style lang="scss" scoped>
// .stopRept >>> .el-input {
//     width: 180px !important;
// }
.stopRept >>> .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
}
.xx {
    width: 160px;
}
.stopRept {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    .stopRepttop {
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
                width: 50%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .tabE {
        height: calc(100% - 85px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 15px;
    }
    .tabPage {
        text-align: center;
        // padding-top: 20px;
    }
}
</style>