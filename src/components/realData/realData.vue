<template>
    <div class="realD">
        <div class="realTop">
            <div class="markMsg">
                <div></div>
                <p>实时数据</p>
            </div>
            <div class="search">
                <div class="searchL">
                    <el-select v-model="enterValue" filterable placeholder="选择企业">
                        <el-option
                            v-for="item of enterprise"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select v-model="baseValue" filterable placeholder="选择基站">
                        <el-option
                            v-for="item of baseArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" class="changeW" @click="search">查询</el-button>
                </div>
            </div>
        </div>
        <real-list></real-list>
    </div>
</template>

<script>
import realList from "./realList";
export default {
    components: {
        realList
    },
    data() {
        return {
            enterprise: [
                //选择企业虚拟数据
                {
                    value: "选项1",
                    label: "企业1"
                },
                {
                    value: "选项2",
                    label: "企业2"
                },
                {
                    value: "选项3",
                    label: "企业3"
                },
                {
                    value: "选项4",
                    label: "企业4"
                },
                {
                    value: "选项5",
                    label: "企业5"
                }
            ],

            baseArr: [
                //选择基站虚拟数据
                {
                    value: "选项1",
                    label: "基站1"
                },
                {
                    value: "选项2",
                    label: "基站2"
                },
                {
                    value: "选项3",
                    label: "基站3"
                },
                {
                    value: "选项4",
                    label: "基站4"
                },
                {
                    value: "选项5",
                    label: "基站5"
                }
            ],
            enterValue: "", //选择企业双向数据绑定值
            baseValue: "" //选择基站双向数据绑定值
        };
    },
    methods: {
        search() {}
    }
};
</script>

<style lang="scss" scoped>
.realD {
    height: 100%;
    background: #ffff;
    box-sizing: border-box;
    padding: 1%;
    .realTop {
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
    }
}
</style>