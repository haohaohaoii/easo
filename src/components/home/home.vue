<template>
    <!--首页面-->
    <div class="home">
        <!--左部导航栏组件-->
        <home-left></home-left>
        <!--右侧内容-->
        <home-right></home-right>
    </div>
</template>

<script>
import right from "./homeRight"; //引入头部组件
import left from "./homeLeft"; //引入左侧菜单组件
export default {
    components: {
        homeRight: right,
        homeLeft: left,
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    top: 0;
}
</style>