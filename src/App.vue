<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "App"
};
</script>

<style lang="scss">
@import "./assets/font/font.css";

* {
    padding: 0;
    margin: 0;
}
html,
body,
#app {
    height: 100%;
    cursor: pointer;
}
</style>
