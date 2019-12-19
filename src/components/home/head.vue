<template>
    <!--头部菜单-->

    <div class="header">
        <!--头部右侧菜单-->
        <div class="headerR">
            <img src="../../assets/images/admin.png" alt />

            <img src="../../assets/images/msg.png" alt />

            <img src="../../assets/images/change.png" alt />

            <img src="../../assets/images/out.png" alt />
        </div>
        <!--头部左侧菜单-->
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo headerL"
            mode="horizontal"
            @select="handleSelect"
            text-color="#333333"
            active-text-color="#5B8CFF"
        >
            <el-menu-item index="1">数据查看</el-menu-item>
            <el-submenu index="2">
                <template slot="title">企业管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3">权限管理</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "1"
        };
    },
    methods: {
        handleSelect() {}
    }
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    .headerL {
        width: 75%;
    }
    .headerR {
        width: 25%;
        display: flex;
        justify-content: space-around;
        img {
            width: 20px;
            height: 20px;
        }
    }
}
// .header {
//     .headerR {
//         position: relative;
//         right: 0;
//     }
// }
</style>