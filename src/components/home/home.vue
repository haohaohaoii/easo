<template>
    <!--首页面-->
    <div class="home">
        <!--左部导航栏组件-->
        <home-left></home-left>
        <!--右侧内容-->
        <div class="homeRight loading-area" ref="rig">
            <headert></headert>
            <div class="content" ref="heig">
                <bread></bread>
                <transition enter-active-class="animated zoomInUp">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import headert from "../common/header";
import bread from "../common/bread";
import homecon from "./homeContent";
import left from "./homeLeft"; //引入左侧菜单组件
export default {
    components: {
        headert,
        homecon,
        bread,
        homeLeft: left
    },
    data() {
        return {
            
        };
    },
    mounted() {
        console.log(this.$refs.rig);
        this.$refs.rig.style.marginLeft = this.menuLeftwidth;
        this.$refs.heig.style.height = (window.innerHeight-60)+'px'  //获取content的高度
    },
    computed: {
        ...mapState(["menuLeftwidth"])
    },
    watch: {
        menuLeftwidth(val, oldval) {
            if (val != oldval) {
                this.$refs.rig.style.marginLeft = val;
            }
        }
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
    //右侧内容
    .homeRight {
        height: 100%;
        background: #ededed;
        .content {
            background: #ededed;

            box-sizing: border-box;
            padding: 30px 15px 15px 15px;
        }
    }
}
</style>