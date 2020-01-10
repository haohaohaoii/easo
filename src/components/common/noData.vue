<template>
    <div class="noData">
        <img src="../../assets/images/noData.png" alt />
        <p>暂无数据！</p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.noData {
    text-align: center;
    position: relative;
    top: 35%;
    transition: transform;
    transform: translateY(-50%);
}
</style>