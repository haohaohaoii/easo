<template>
    <!--实时数据-->
    <div class="realD">
        <div class="realTop">
            <div class="markMsg">
                <div></div>
                <p>实时数据</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select
                        size="small"
                        v-model="enterValue"
                        filterable
                        clearable
                        placeholder="选择企业"
                        @change="changeVal"
                    >
                        <el-option
                            v-for="item of enterprise"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select size="small" v-model="baseValue" filterable placeholder="选择基站">
                        <el-option
                            v-for="item of baseArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button
                        type="primary"
                        class="changeW"
                        @click="search"
                        size="mini"
                        style="width:120px"
                    >查询</el-button>
                </div>
            </div>
        </div>
        <!--有列表数据-->

        <real-list :datalist="dataList">
            <div class="tabPage">
                <p class="indic">注：红色字体代表超标数据，橙色字体代表异常数据。</p>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalLength"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                ></el-pagination>
            </div>
        </real-list>
    </div>
</template>

<script>
import realList from "./realList"; //引入子组件
import axios from "axios";
export default {
    components: {
        realList
    },
    data() {
        return {
            currentPage: 1, //初始页
            pagesize: 10, //每页显示多少条
            totalLength: 0, //总共多少条数据
            isShow: false, //控制dataList有没有数据
            dataList: [], //实时数据
            enterprise: [], //企业
            baseArr: [], //基站
            enterValue: "", //选择企业双向数据绑定值
            baseValue: "" //选择基站双向数据绑定值
        };
    },
    mounted() {
        this.getCompany();
        let pageNum = this.currentPage;
        this.sendAxios(pageNum);
    },
    methods: {
        //点击第几页
        handleCurrentChange(currentPage) {
            //重新赋值，重新请求
            this.currentPage = currentPage;
            let pageNum = this.currentPage;
            this.sendAxios(pageNum);
        },
        search() {
            //点击搜索
            if(this.enterValue && this.baseValue){
                this.currentPage = 1; //每次点击搜索的时候，从第一页开始
                let pageNum = this.currentPage;
                this.sendAxios(pageNum);
            }else{
                this.$message({
                    type: "warning",
                    message: "请填选择查询条件"
                });
            }
            
        },
        //发送数据请求
        sendAxios(pageNum) {
            let pageSize = this.pagesize;
            let userId = this.enterValue;
            let mn = this.baseValue;
            this.$api.data
                .realData({
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                        userId: userId,
                        mn: mn
                    }
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        if (
                            res.data.pageInfo.list &&
                            res.data.pageInfo.list.length >= 1
                        ) {
                            //说明有数据
                            this.isShow = true;
                            this.dataList = res.data.pageInfo.list;
                            this.totalLength = res.data.pageInfo.total; //获取总条数
                        } else {
                            //说明没有数据
                            this.isShow = false;
                        }
                    }
                })
                .catch(error => {});
        },
        //获取企业相关数据
        
        getCompany() {
            this.$api.company
                .companyAll()
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        let companyList = res.data.data;
                        let listArr = [];
                        for (let i = 0; i < companyList.length; i++) {
                            let obj = {
                                label: companyList[i].erpName,
                                value: companyList[i].id
                            };
                            listArr.push(obj);
                        }
                        this.enterprise = listArr;
                    }
                })
                .catch(error => {});
        },
        //根据企业获取对应基站相关数据
        getComsite(companyId) {
            this.$api.site
                .formComsite(companyId)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        let siteList = res.data.data;
                        let siteArr = [];
                        for (let k = 0; k < siteList.length; k++) {
                            let item = {
                                label: siteList[k].siteName,
                                value: siteList[k].mn
                            };
                            siteArr.push(item);
                        }
                        this.baseArr = siteArr;
                    }
                })
                .catch(error => {});
        },
        //选中企业事件
        changeVal(val) {
            this.baseValue = ""; //每次点击都要把之前选中的基站置空
            if (val) {
                //这个判断为了防止删除的时候，val的值为空
                this.getComsite(val);
            } else {
                //这个逻辑防止企业选择框删除的时候,基站的下拉框中还有值
                this.baseArr = [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.realD {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;

    .realTop {
        // height: 85px;
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
                width: 40%;
                display: flex;
                justify-content: space-between;
            }
            .changeW {
                margin-right: 2%;
            }
        }
    }
    .tabPage {
        text-align: center;
        padding-top: 8px;

        .indic {
            position: absolute;
            right: 2%;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 0, 0, 1);
        }
    }
}
</style>