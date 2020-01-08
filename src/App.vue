<template>
    <div id="app">
        <transition mode="out-in" appear-active-class="fade-enter-active" name="el-fade-in-linear">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: "App",
    created() {
        // this.getRoutes();
    },
    methods: {
        //注意，这个需要重新在添加吗？会不会重复?
        // getRoutes() {
        //     debugger;
        //     if (localStorage.getItem("menuRoutes")) {
        //         //如果本地存储的有路由表，就重新设置路由表(避免刷新的时候路由表丢失)
        //         let menuRoutes = JSON.parse(localStorage.getItem('menuRoutes'));
        //         debugger
        //         menuRoutes.forEach(route => {
        //             this.$router.options.routes[1].children.push(route);
        //         });
        //         this.$router.addRoutes(this.$router.options.routes);
        //     }
        // }
    }
};
</script>

<style>
@import "./assets/font/font.css";
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
* {
    padding: 0;
    margin: 0;
}
html,
body,
#app {
    height: 100%;
}
</style>
