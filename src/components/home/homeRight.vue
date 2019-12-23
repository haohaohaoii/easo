<template>
    <!--头部菜单-->
    <div class="header">
        <!--头部上右侧菜单-->
        <div class="headerTop">
            <img src="../../assets/images/admin.png" alt />

            <img src="../../assets/images/msg.png" alt />

            <img src="../../assets/images/change.png" alt />

            <img src="../../assets/images/out.png" alt />
        </div>
        <!--头部下导航栏菜单-->
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1">数据查看</el-menu-item>
            <el-submenu index="2">
                <template slot="title">企业管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">{{msg}}</el-menu-item>
        </el-menu>
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
    height: 100px;
    .headerTop {
        height: 40px;
        background: burlywood;
        line-height: 40px;
        z-index: 555;
        img {
            width: 18px;
            height: 18px;
            float: right;
            padding-right: 20px;
            padding-top: 11px;
        }
    }
    .headerNav {
        height: 59px;
    }
}
</style>