<template>
    <div class="content">
        <bread></bread>
        <time-data></time-data>
    </div>
</template>

<script>
import bread from "../common/bread";
import timeData from "../common/timeData";
export default {
    components: {
        bread,
        timeData
    }
};
</script>

<style lang="scss" scoped>
.content {
    background: #ededed;
    margin: 36px 13px 13px 13px;
}
</style>