<template>
    <div class="error">
        <div class="errContent">
            <!-- <span class="iconfont">&#xe701;</span> -->
            <img src="../../assets/images/error.jpg" alt />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error {
    height: 100%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 15px;
    text-align: center;
    position: relative;
    .errContent {
        position: absolute;
        // top: 50%;
        // left: calc(50% + 120px);
        top: 50%;
        left: 50%;
        // transform: translate(calc(-50% + 120px), calc(-50% + 45px));
        transform: translate(-50%, -50%);
        span {
            font-size: 320px;
        }
    }
}
</style>