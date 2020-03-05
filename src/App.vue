<template>
    <div id="app">
        <transition enter-active-class="animated zoomInUp">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
@import "./assets/font/font.css";

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
