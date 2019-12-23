<template>
    <!--首页面-->
    <div class="home">
        <!--左侧内容-->
        <div class="homeLeft">
            <!--左部导航栏组件-->
            <home-leftNav></home-leftNav>
        </div>
        <!--右侧内容-->
        <div class="homeRight">
            <!--头部导航组件-->
            <home-headNav></home-headNav>
            <!--内容组件-->
            <home-content></home-content>
        </div>
    </div>
</template>

<script>
import head from "./homeRight"; //引入头部组件
import left from "./homeLeft"; //引入左侧菜单组件
import content from "./homeContent"; //引入右侧内容组件
export default {
    components: {
        homeHeadNav: head,
        homeLeftNav: left,
        homeContent: content
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

    //左侧内容
    .homeLeft {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 240px;
    }
    //右侧内容
    .homeRight {
        height: 100%;
        margin-left: 240px;
        background: #ededed;
    }
}
</style>