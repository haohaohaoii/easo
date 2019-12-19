<template>
    <!--首页面-->
    <div class="home">
        <!--左部导航栏组件-->
        <left-nav class="contentL"></left-nav>
        <!--右侧内容-->
        <div class="contentR">
            <!--头部导航组件-->
            <head-nav></head-nav>
            <!--内容组件-->
            <div class="home-content"></div>
        </div>
    </div>
</template>

<script>
import head from "./head"; //引入头部组件
import left from "./left";
export default {
    components: {
        headNav: head,
        leftNav: left
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
    display: flex;
    //左侧导航定宽
    @media screen and (min-width: 500px) {
        .contentL {
            width: 300px;
        }
    }

    //右侧内容定位
    .contentR {
        width: 72%;
    }
}
</style>