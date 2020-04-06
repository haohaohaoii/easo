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
                        placeholder="省份"
                        
                        filterable>
                        <el-option
                        v-for="item in provinceList"
                        :key="item.provinceCode"
                        :label="item.provinceName"
                        :value="item.provinceCode">
                        </el-option>
                    </el-select>
                    <el-select
                    size="small"
                        v-model="cityCode"
                        @change="changeCity"
                        placeholder="城市"
                        filterable>
                        <el-option
                        v-for="item in cityList"
                        :key="item.cityCode"
                        :label="item.cityName"
                        :value="item.cityCode">
                        </el-option>
                    </el-select>
                    <el-select
                        size="small"
                        v-model="areaCode"
                        @change="changeArea"
                        placeholder="区/县"
                        filterable>
                        <el-option
                        v-for="item in areaList"
                        :key="item.areaCode"
                        :label="item.areaName"
                        :value="item.areaCode">
                        </el-option>
                    </el-select>
                    <el-button type="primary" class="changeW" @click="search">查询</el-button>
                </div>
                <div>
                   <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="mini"
                    class="add"
                    @click="addPeople"
                >添加人员</el-button>
                </div>
            </div>
        </div>
        <opeo-list :datalist="opeoDatalist">
            <!--插槽-->
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
        </opeo-list>
        <opeo-add :isShow='addPeodilaog' @changeAddDialog='changeAdd'></opeo-add>
    </div>
</template>

<script>
import opeoAdd from './opeoAdd'
import opeoList from "./opeoList";
import commonJs from "../common/common.js"; //引入全局公共方法
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        opeoList,
        opeoAdd
    },

    data() {
        return {
            addPeodilaog:false,
            provinceCode:'',  //选中的省
            cityCode:'', //选中的市
            areaCode:'', //选中的区县
            provinceList:[],  //省数组
            cityList:[], //城市数据
            areaList:[], //区县数组
            opeoDatalist: [ //运维人员数组
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                },
                {
                    name:'李亚玲',
                    linkPhone:'15136156035',
                    email:'641882555@qq.com',
                    userName:'admin',
                    ywbm:'运维部',
                    ywzd:'运维站点',
                    createTime:'2020/03/26'
                }
            ], 
            totalLength: 0, //总共多少条数据
            currentPage: 1, //初始页
            pagesize: 10, //每页显示多少条
      
        };
    },
    methods: {
        addPeople(){  //添加运维人员
            this.addPeodilaog = true
        },
        changeAdd(val){
            this.addPeodilaog = val
        },
        changeProvince(){  //选择省份

        },
        changeCity(){   //选择城市

        },
        changeArea(){  //选择区县

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
           
        }
    },

};
</script>

<style lang="scss" scoped>
.oPeopleDep >>> .el-input{
    width: 150px !important;
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
                width: 68%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .changeW {
                margin-right: 2%;
            }
        }
    }
    
}
</style>