<template>
    <div class="content">
        <bread></bread>
        <history-data></history-data>
    </div>
</template>

<script>
import bread from "../common/bread";
import historyData from "../historyData/historyData";
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
    height: 90%;
    box-sizing: border-box;
    padding: 2% 1% 1% 1%;
}
</style>