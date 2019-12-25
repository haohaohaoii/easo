<template>
    <!--头部菜单-->
    <div class="header">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#5B8CFF"
        >
            <el-menu-item index="1">
                <i class="iconfont icon-shuju" style="font-size:20px"></i>
                数据查看
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-office-building"></i>
                    企业管理
                </template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <i class="iconfont icon-quanxianguanli" style="font-size:20px"></i>
                {{msg}}
            </el-menu-item>
        </el-menu>
        <div class="tubiao">
            <i class="el-icon-s-custom"></i>
            <i class="el-icon-message-solid"></i>
            <i class="el-icon-unlock"></i>
            <i class="el-icon-switch-button"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            activeIndex2: "1"
        };
    },
    computed: {
        ...mapState(["msg"])
    },
    methods: {
        handleSelect() {}
    }
};
</script>

<style lang="scss" scoped>
.header {
    height: 10%;
    .tubiao {
        position: absolute;
        right: 0%;
        top: 1.5%;
        width: 20%;
        text-align: end;
        i {
            padding-right: 7%;
            font-size: 22px;
            color: #6d99f9;
        }
    }
}
</style>