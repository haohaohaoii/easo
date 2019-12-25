<template>
    <div class="content">
        <bread></bread>
        <history-data></history-data>
    </div>
</template>

<script>
import bread from "../common/bread";
import historyData from "../common/historyData";
export default {
    components: {
        bread,
        historyData
    }
};
</script>

<style lang="scss" scoped>
.content {
    background: #ededed;
    height: 88%;
    box-sizing: border-box;
    position: relative;
    left: 1%;
    top: 0;
    width: 99;
    width: 98%;
}
</style>