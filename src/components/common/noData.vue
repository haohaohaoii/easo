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
    top: 40%;

    transform: translateY(-50%);
    p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
    }
}
</style>