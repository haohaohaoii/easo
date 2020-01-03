<template>
    <div id="app">
        <transition mode="out-in" appear-active-class="fade-enter-active" name="el-fade-in-linear">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
@import './assets/font/font.css';
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
