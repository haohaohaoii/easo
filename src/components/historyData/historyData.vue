<template>
    <div class="historyD">
        <div class="historyTop">
            <div class="markMsg">
                <div></div>
                <p>历史数据</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select placeholder="选择企业" class="changeW"></el-select>
                    <el-select placeholder="选择基站" class="changeW"></el-select>
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="startTime"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd HH:00:00"
                        format="yyyy-MM-dd HH:00:00"
                        time-arrow-control
                    ></el-date-picker>
                    <el-date-picker
                        type="datetime"
                        class="changeW"
                        v-model="endTime"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:00:00"
                        format="yyyy-MM-dd HH:00:00"
                        time-arrow-control
                    ></el-date-picker>
                    <el-button type="primary" class="changeW" @click="search">查询</el-button>
                </div>
                <div>
                    <el-radio-group v-model="btnMsg">
                        <el-radio-button label="列表"></el-radio-button>
                        <el-radio-button label="折线"></el-radio-button>
                        <el-radio-button label="柱状"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <list-data v-if="btnMsg=='列表'"></list-data>
        <line-data v-if="btnMsg=='折线'"></line-data>
        <bar-data v-if="btnMsg=='柱状'"></bar-data>
    </div>
</template>

<script>
import listData from "./listData"; //引入列表组件
import lineData from "./lineData"; //引入折线组件
import barData from "./barData";
import commonJs from "../common/common.js"; //引入全局公共方法
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        listData,
        lineData,
        barData
    },

    data() {
        return {
            btnMsg: "列表",
            startTime: "", //开始时间
            endTime: "" //结束时间
        };
    },
    computed: {
        ...mapState(["searchHours"])
    },
    methods: {
        search() {
            let _this = this;
            commonJs
                .getHours(this.startTime, this.endTime)
                .then(function(hoursArr) {
                    if (hoursArr.length == 0) {
                        alert("查询条件有误");
                    } else {
                        _this.$store.commit("getHours", hoursArr);
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.historyD {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .historyTop {
        height: 16.5%;
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
            display: flex;
            justify-content: space-between;
            .searchL {
                width: 68%;
                display: flex;
                justify-content: space-between;
            }
            .changeW {
                width: 18%;
            }
        }
    }
}
</style>